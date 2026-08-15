import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../components/Toast';

interface PlayerMediaUploadProps {
  playerId: string;
  currentMediaUrl?: string;
  onUploadComplete: (mediaUrl: string) => void;
}

const PlayerMediaUpload: React.FC<PlayerMediaUploadProps> = ({
  playerId,
  currentMediaUrl,
  onUploadComplete,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentMediaUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file type and size
      if (!selectedFile.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Upload to Supabase Storage
      const result = await storageService.uploadFile(
        'player-media',
        file,
        `players/${playerId}`
      );

      // Get public URL
      const publicUrl = await storageService.getPublicUrl(
        'player-media',
        result.path
      );

      // Call the onUploadComplete callback with the new URL
      onUploadComplete(publicUrl);
      showToast('Upload successful', 'Player media uploaded successfully', 'success');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file. Please try again.');
      showToast('Upload failed', 'Could not upload player media', 'warning');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentMediaUrl) return;

    try {
      // Extract path from current URL
      const path = currentMediaUrl.split('/').slice(4).join('/');
      await storageService.deleteFile('player-media', path);
      onUploadComplete(''); // Clear the media URL
      setPreviewUrl(null);
      showToast('Media deleted', 'Player media deleted successfully', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete file. Please try again.');
      showToast('Delete failed', 'Could not delete player media', 'warning');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Player media"
              className="w-32 h-32 object-cover rounded-full border-2 border-emerald-500"
            />
            <button
              onClick={handleDelete}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Delete media"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">No media</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-emerald-50 file:text-emerald-700
            hover:file:bg-emerald-100"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isUploading ? 'bg-emerald-400' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {isUploading ? 'Uploading...' : 'Upload Media'}
        </button>
      )}
    </div>
  );
};

export default PlayerMediaUpload;