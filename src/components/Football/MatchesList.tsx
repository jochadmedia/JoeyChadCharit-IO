import React, { useEffect, useState } from 'react';
import { matchesService } from '../../services/matchesService';
import { teamsService } from '../../services/teamsService';
import { Match } from '../models/footballModels';
import { Team } from '../models/footballModels';
import { useToast } from '../../components/Toast';
import { supabase } from '../../lib/supabase/supabaseClient';

const MatchesList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEditForm, setShowAddEditForm] = useState<boolean>(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [fetchedMatches, fetchedTeams] = await Promise.all([
          matchesService.getAllMatches(),
          teamsService.getAllTeams(),
        ]);
        setMatches(fetchedMatches);
        setTeams(fetchedTeams);
        showToast('Matches loaded', 'Successfully loaded match data', 'success');
      } catch (err) {
        console.error('Error fetching matches or teams:', err);
        setError('Failed to load data. Please try again later.');
        showToast('Error loading matches', 'Could not load match data', 'warning');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up realtime subscription for matches table
    const matchesChannel = supabase
      .channel('matches_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'joey_chad_football',
          table: 'matches',
        },
        (payload) => {
          console.log('Realtime event:', payload.event, payload.new);
          showToast(
            `Match ${payload.event}`,
            `Match between ${payload.new?.home_team_id || payload.old?.home_team_id} and ${payload.new?.away_team_id || payload.old?.away_team_id} was ${payload.event}d`,
            'info'
          );
          // Refresh the match list
          fetchData();
        }
      )
      .subscribe();

    // Set up realtime subscription for teams table
    const teamsChannel = supabase
      .channel('teams_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'joey_chad_football',
          table: 'teams',
        },
        (payload) => {
          console.log('Realtime event:', payload.event, payload.new);
          showToast(
            `Team ${payload.event}`,
            `Team ${payload.new?.name || payload.old?.name} was ${payload.event}d`,
            'info'
          );
          // Refresh the match list to update team names
          fetchData();
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(matchesChannel);
      supabase.removeChannel(teamsChannel);
    };
  }, [showToast]);

  const handleAddMatch = () => {
    setEditingMatch(null);
    setShowAddEditForm(true);
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setShowAddEditForm(true);
  };

  const handleDeleteMatch = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchesService.deleteMatch(id);
        // The realtime subscription will automatically refresh the list
        showToast('Match deleted', 'Match successfully removed', 'success');
      } catch (err) {
        console.error('Error deleting match:', err);
        setError('Failed to delete match. Please try again.');
        showToast('Error deleting match', 'Could not delete match', 'warning');
      }
    }
  };

  const handleFormClose = () => {
    setShowAddEditForm(false);
    setEditingMatch(null);
  };

  const handleFormSave = async () => {
    try {
      // The realtime subscription will automatically refresh the list
      setShowAddEditForm(false);
      setEditingMatch(null);
      showToast('Match saved', 'Match information saved successfully', 'success');
    } catch (err) {
      console.error('Error refreshing matches after save:', err);
      setError('Failed to refresh match list.');
      showToast('Error saving match', 'Could not save match information', 'warning');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading matches...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Matches</h2>
        <button
          onClick={handleAddMatch}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Match
        </button>
      </div>
      {matches.length === 0 ? (
        <p>No matches found. Add some to get started!</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match) => {
            const homeTeam = teams.find((t) => t.id === match.home_team_id);
            const awayTeam = teams.find((t) => t.id === match.away_team_id);
            return (
              <li key={match.id} className="border p-3 rounded shadow flex justify-between items-center">
                <div>
                  <span className="font-semibold">
                    {homeTeam?.name ?? 'TBD'} vs {awayTeam?.name ?? 'TBD'}
                  </span>
                  <br />
                  <span className="text-sm text-gray-500">
                    {new Date(match.match_date).toLocaleDateString()} @{' '}
                    {match.location ?? 'TBD'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditMatch(match)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMatch(match.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {showAddEditForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingMatch ? 'Edit Match' : 'Add New Match'}
              </h2>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Form submission would happen here');
              handleFormClose();
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Home Team
                </label>
                <select
                  disabled={!editingMatch}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">Select home team</option>
                  {teams.map((team) => (
                    <option
                      key={team.id}
                      value={team.id}
                      selected={editingMatch?.home_team_id === team.id}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Away Team
                </label>
                <select
                  disabled={!editingMatch}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">Select away team</option>
                  {teams.map((team) => (
                    <option
                      key={team.id}
                      value={team.id}
                      selected={editingMatch?.away_team_id === team.id}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Match Date
                </label>
                <input
                  type="datetime-local"
                  disabled={!editingMatch}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  disabled={!editingMatch}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleFormSave}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  onClick={handleFormClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesList;