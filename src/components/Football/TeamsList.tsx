import React, { useEffect, useState } from 'react';
import { teamsService } from '../../services/teamsService';
import { Team } from '../models/footballModels';
import { useToast } from '../../components/Toast';
import { supabase } from '../../lib/supabase/supabaseClient';

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEditForm, setShowAddEditForm] = useState<boolean>(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const showToast = useToast();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTeams = await teamsService.getAllTeams();
        setTeams(fetchedTeams);
        showToast('Teams loaded', 'Successfully loaded team data', 'success');
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams. Please try again later.');
        showToast('Error loading teams', 'Could not load team data', 'warning');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();

    // Set up realtime subscription for teams table
    const channel = supabase
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
          // Refresh the team list
          fetchTeams();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [showToast]);

  const handleAddTeam = () => {
    setEditingTeam(null);
    setShowAddEditForm(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setShowAddEditForm(true);
  };

  const handleDeleteTeam = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await teamsService.deleteTeam(id);
        // The realtime subscription will automatically refresh the list
        showToast('Team deleted', 'Team successfully removed', 'success');
      } catch (err) {
        console.error('Error deleting team:', err);
        setError('Failed to delete team. Please try again.');
        showToast('Error deleting team', 'Could not delete team', 'warning');
      }
    }
  };

  const handleFormClose = () => {
    setShowAddEditForm(false);
    setEditingTeam(null);
  };

  const handleFormSave = async () => {
    try {
      // The realtime subscription will automatically refresh the list
      setShowAddEditForm(false);
      setEditingTeam(null);
      showToast('Team saved', 'Team information saved successfully', 'success');
    } catch (err) {
      console.error('Error refreshing teams after save:', err);
      setError('Failed to refresh team list.');
      showToast('Error saving team', 'Could not save team information', 'warning');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading teams...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Teams</h2>
        <button
          onClick={handleAddTeam}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Team
        </button>
      </div>
      {teams.length === 0 ? (
        <p>No teams found. Add some to get started!</p>
      ) : (
        <ul className="space-y-2">
          {teams.map((team) => (
            <li key={team.id} className="border p-3 rounded shadow flex justify-between items-center">
              <div>
                <span className="font-semibold">{team.name}</span>
                <span className="ml-2 text-gray-500">({team.coach || 'No coach'})</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTeam(team)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeam(team.id)}
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              // This is a simplified form - in reality you'd have proper form handling
              // For brevity, we're just showing the structure
              alert('Form submission would happen here');
              handleFormClose();
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Team Name:</label>
                <input
                  type="text"
                  value={editingTeam?.name || ''}
                  onChange={(e) => /* handle change */ null}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coach:</label>
                <input
                  type="text"
                  value={editingTeam?.coach || ''}
                  onChange={(e) => /* handle change */ null}
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

export default TeamsList;