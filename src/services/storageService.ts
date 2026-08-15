import { supabase } from '../lib/supabase/supabaseClient';
import logger from '../utils/logger';

interface UploadResult {
  path: string;
  fullPath: string;
}

export const storageService = {
  // Upload a file to Supabase Storage
  async uploadFile(
    bucket: string,
    file: File,
    folderPath?: string
  ): Promise<UploadResult> {
    try {
      logger.log(`Uploading file to ${bucket}/${folderPath || ''}`);

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      logger.log('File uploaded successfully', {
        path: filePath,
        fullPath: data.fullPath
      });

      return {
        path: filePath,
        fullPath: data.fullPath
      };
    } catch (error) {
      logger.error('Error uploading file', error);
      throw error;
    }
  },

  // Get public URL for a file
  async getPublicUrl(bucket: string, path: string): Promise<string> {
    try {
      logger.log(`Getting public URL for ${bucket}/${path}`);

      const { data, error } = supabase
        .storage
        .from(bucket)
        .getPublicUrl(path);

      if (error) throw error;

      logger.log('Public URL generated', { url: data.publicUrl });
      return data.publicUrl;
    } catch (error) {
      logger.error('Error getting public URL', error);
      throw error;
    }
  },

  // Delete a file
  async deleteFile(bucket: string, path: string): Promise<void> {
    try {
      logger.log(`Deleting file from ${bucket}/${path}`);

      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;

      logger.log('File deleted successfully', { path });
    } catch (error) {
      logger.error('Error deleting file', error);
      throw error;
    }
  }
};