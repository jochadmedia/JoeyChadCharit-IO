import React, { useState, useEffect } from 'react';
import { playersService } from '../../services/playersService';
import { Player } from '../models/footballModels';
import { teamsService } from '../../services/teamsService';
import { Team } from '../models/footballModels';
import PlayerMediaUpload from './PlayerMediaUpload';

interface AddEditPlayerProps {
  player?: Player; // Optional: If provided, it's for editing
  onClose: () => void; // Function to close the modal/form
  onSave: () => void; // Function to call after successful save
}

const AddEditPlayer: React.FC<AddEditPlayerProps> = ({ player, onClose, onSave }) => {
  const [name, setName] = useState(player?.name || '');
  const [position, setPosition] = useState(player?.position || '');
  const [teamId, setTeamId] = useState<string | undefined>(player?.team_id || '');
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(player?.media_url || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);

  const isEditing = !!player;

  useEffect(() => {
    // Fetch teams if we need to populate the team selection dropdown
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamsService.getAllTeams();
        setTeams(fetchedTeams);
        // If editing and team_id is not set, but teams are loaded, default to first team if available
        if (player && !player.team_id && fetchedTeams.length > 0) {
          setTeamId(fetchedTeams[0].id);
        } else if (player?.team_id) {
            setTeamId(player.team_id);
        } else if (fetchedTeams.length > 0) {
            setTeamId(fetchedTeams[0].id);
        }
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams. Team selection may not work.');
      }
    };

    fetchTeams();
  }, [player]); // Re-run if player prop changes (e.g., when switching from add to edit mode)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !teamId) {
      setError('Player name and team are required.');
      setLoading(false);
      return;
    }

    try {
      const playerData = {
        name,
        position,
        team_id: teamId,
        media_url: mediaUrl,
      };

      if (isEditing) {
        // Update existing player
        await playersService.updatePlayer(player.id, playerData);
      } else {
        // Add new player
        await playersService.addPlayer(playerData);
      }

      onSave(); // Notify parent component that save was successful
      onClose(); // Close the form/modal
    } catch (err: any) {
      console.error('Error saving player:', err);
      setError(err.message || 'Failed to save player.');
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUploadComplete = (url: string) => {
    setMediaUrl(url);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{isEditing ? 'Edit Player' : 'Add New Player'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Player Name*:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Position:</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="teamId" className="block text-gray-700 text-sm font-bold mb-2">Team*:</label>
            <select
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {error && error.includes('team') && <p className="text-red-500 text-xs italic">{error}</p>}
            {!teams.length && !error && <p className="text-xs italic">Loading teams...</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Player Media:</label>
            <PlayerMediaUpload
              playerId={player?.id || 'new'}
              currentMediaUrl={mediaUrl}
              onUploadComplete={handleMediaUploadComplete}
            />
          </div>
          {error && !error.includes('team') && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Player' : 'Add Player')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPlayer;