import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are not set: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

/**
 * Upload a file (File object) to the `purchase_orders` bucket and return a public URL.
 * This assumes the `purchase_orders` bucket is public. The returned URL is permanent
 * (not a signed short-lived URL).
 *
 * @param {File} file
 * @param {string} [folder] optional folder inside bucket (defaults to root)
 * @returns {Promise<string>} public URL
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
  // Return a public URL for the uploaded file. This works when the bucket is public.
  const { data: publicData, error: publicError } = supabase.storage.from(bucket).getPublicUrl(filePath);
  if (publicError) throw new Error(publicError.message || 'Failed to get public URL');

  // `publicData` is expected to have `publicUrl` property
  return publicData?.publicUrl || null;
};

export default supabase;
