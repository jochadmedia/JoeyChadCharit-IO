import React, { useEffect, useState } from 'react';
import { playersService } from '../../services/playersService';
import { Player } from '../models/footballModels';
import AddEditPlayer from './AddEditPlayer';
import { useToast } from '../../components/Toast';
import { supabase } from '../../lib/supabase/supabaseClient';

const PlayersList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEditForm, setShowAddEditForm] = useState<boolean>(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const showToast = useToast();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPlayers = await playersService.getAllPlayers();
        setPlayers(fetchedPlayers);
        showToast('Players loaded', 'Successfully loaded player data', 'success');
      } catch (err) {
        console.error('Error fetching players:', err);
        setError('Failed to load players. Please try again later.');
        showToast('Error loading players', 'Could not load player data', 'warning');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();

    // Set up realtime subscription for players table
    const channel = supabase
      .channel('players_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'joey_chad_football',
          table: 'players',
        },
        (payload) => {
          console.log('Realtime event:', payload.event, payload.new);
          showToast(
            `Player ${payload.event}`,
            `Player ${payload.new?.name || payload.old?.name} was ${payload.event}d`,
            'info'
          );
          // Refresh the player list
          fetchPlayers();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [showToast]);

  const handleAddPlayer = () => {
    setEditingPlayer(null);
    setShowAddEditForm(true);
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setShowAddEditForm(true);
  };

  const handleDeletePlayer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await playersService.deletePlayer(id);
        // The realtime subscription will automatically refresh the list
        showToast('Player deleted', 'Player successfully removed', 'success');
      } catch (err) {
        console.error('Error deleting player:', err);
        setError('Failed to delete player. Please try again.');
        showToast('Error deleting player', 'Could not delete player', 'warning');
      }
    }
  };

  const handleFormClose = () => {
    setShowAddEditForm(false);
    setEditingPlayer(null);
  };

  const handleFormSave = async () => {
    try {
      // The realtime subscription will automatically refresh the list
      setShowAddEditForm(false);
      setEditingPlayer(null);
      showToast('Player saved', 'Player information saved successfully', 'success');
    } catch (err) {
      console.error('Error refreshing players after save:', err);
      setError('Failed to refresh player list.');
      showToast('Error saving player', 'Could not save player information', 'warning');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading players...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Players</h2>
        <button
          onClick={handleAddPlayer}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Player
        </button>
      </div>
      {players.length === 0 ? (
        <p>No players found. Add some to get started!</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li key={player.id} className="border p-3 rounded shadow flex justify-between items-center">
              <div>
                <span className="font-semibold">{player.name}</span> ({player.position || 'N/A'})
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPlayer(player)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlayer(player.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showAddEditForm && (
        <AddEditPlayer
          player={editingPlayer}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
};

export default PlayersList;