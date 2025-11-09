/*
  # Founder Profile Storage and Database Table

  ## Overview
  This migration sets up the storage infrastructure and database table for the founder profile feature,
  allowing admins to manage the founder's photo and information displayed on the About page.

  ## Storage Buckets
  
  ### `founder-images` bucket
  Public bucket for storing founder profile photos
  - Public read access for displaying the founder image on the website
  - Authenticated insert/update access for admins to upload photos
  - File size limit: 5MB per file
  - Allowed MIME types: image/jpeg, image/png, image/webp

  ## New Tables

  ### `founder_profile`
  Stores founder profile information and image metadata
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Founder's full name
  - `title` (text) - Founder's job title/role
  - `bio_paragraph_1` (text) - First biography paragraph
  - `bio_paragraph_2` (text) - Second biography paragraph
  - `bio_paragraph_3` (text) - Third biography paragraph
  - `storage_path` (text) - Full path to image in storage bucket
  - `file_size` (integer) - Image file size in bytes
  - `is_visible` (boolean) - Whether to display the founder section
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on founder_profile table
  - Public read access for visible profiles
  - Authenticated write access for admins
  - Storage bucket configured for public read, authenticated write

  ## Important Notes
  - This table should only contain one row (the current founder)
  - When updating the founder image, old images should be cleaned up from storage
*/

-- Create storage bucket for founder images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'founder-images',
  'founder-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for founder-images bucket
CREATE POLICY "Public can view founder images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'founder-images');

CREATE POLICY "Authenticated users can upload founder images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'founder-images');

CREATE POLICY "Authenticated users can update founder images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'founder-images');

CREATE POLICY "Authenticated users can delete founder images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'founder-images');

-- Create founder_profile table
CREATE TABLE IF NOT EXISTS founder_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio_paragraph_1 text NOT NULL DEFAULT '',
  bio_paragraph_2 text NOT NULL DEFAULT '',
  bio_paragraph_3 text NOT NULL DEFAULT '',
  storage_path text,
  file_size integer,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_founder_profile_visible ON founder_profile(is_visible);

-- Enable RLS
ALTER TABLE founder_profile ENABLE ROW LEVEL SECURITY;

-- RLS Policies for founder_profile
CREATE POLICY "Anyone can view visible founder profiles"
  ON founder_profile FOR SELECT
  TO public
  USING (is_visible = true);

CREATE POLICY "Authenticated users can view all founder profiles"
  ON founder_profile FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert founder profiles"
  ON founder_profile FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update founder profiles"
  ON founder_profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete founder profiles"
  ON founder_profile FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_founder_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER founder_profile_updated_at
  BEFORE UPDATE ON founder_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_founder_profile_updated_at();

-- Insert default founder profile data
INSERT INTO founder_profile (name, title, bio_paragraph_1, bio_paragraph_2, bio_paragraph_3)
VALUES (
  'Emmanuel S. Kiganda',
  'Founder & Lead Dog Walker',
  'With years of experience working with dogs of all breeds, sizes, and temperaments, Emmanuel has built a reputation for reliability and genuine care. He understands that every dog has unique needs and personality traits, and takes the time to build trust with each furry client.',
  'Emmanuel''s deep knowledge of the Buziga area and surrounding neighborhoods ensures safe, enjoyable walks on routes that are both secure and stimulating for your dog. He''s committed to showing up consistently, rain or shine, because he knows your dog counts on that routine.',
  ''
)
ON CONFLICT DO NOTHING;