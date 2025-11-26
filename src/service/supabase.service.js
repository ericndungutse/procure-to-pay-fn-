import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Do not throw at import time to allow parts of app that don't need supabase to work,
  // but warn in console so developer knows to set env vars.
  // eslint-disable-next-line no-console
  console.warn('Supabase environment variables are not set: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

/**
 * Upload a file (File object) to the `purchase_orders` bucket and return a signed URL.
 * The returned URL is a time-limited signed URL using Supabase Storage.
 *
 * @param {File} file
 * @param {string} [folder] optional folder inside bucket (defaults to root)
 * @returns {Promise<string>} signed URL
 */
export const uploadProformaToSupabase = async (file, folder = '') => {
  if (!file) throw new Error('No file provided for upload');

  const timestamp = Date.now();
  // sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${folder ? `${folder}/` : ''}${timestamp}_${safeName}`;

  const bucket = 'purchase_orders';

  // Upload file
  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (uploadError) throw new Error(uploadError.message || 'Failed to upload file to Supabase');

  // Create signed URL (valid for 24 hours)
  const expiresIn = 60 * 60 * 24; // seconds
  const { data: signedData, error: signedError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);

  if (signedError) throw new Error(signedError.message || 'Failed to create signed URL');

  return signedData.signedUrl;
};

export default supabase;
