/*
  # Gallery Storage and Images Table

  ## Overview
  This migration sets up the storage infrastructure for the gallery feature,
  including a public storage bucket for images and a database table for metadata.

  ## Storage Buckets
  
  ### `gallery-images` bucket
  Public bucket for storing gallery photos with thumbnails
  - Public read access for displaying images on the website
  - Authenticated insert access for admins to upload photos
  - File size limit: 10MB per file
  - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

  ## New Tables

  ### `gallery_images`
  Stores metadata for gallery images
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Image title/description
  - `category` (text) - Image category: 'walks', 'routes', 'grooming', 'other'
  - `storage_path` (text) - Full path to image in storage bucket
  - `thumbnail_path` (text) - Path to thumbnail version
  - `file_size` (integer) - File size in bytes
  - `width` (integer) - Image width in pixels
  - `height` (integer) - Image height in pixels
  - `is_published` (boolean) - Visibility status
  - `display_order` (integer) - Manual ordering (lower numbers appear first)
  - `created_at` (timestamptz) - Upload timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on gallery_images table
  - Public read access for published images
  - Storage bucket configured for public read, authenticated write
*/

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for gallery-images bucket
CREATE POLICY "Public can view gallery images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update gallery images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete gallery images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-images');

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'other',
  storage_path text NOT NULL UNIQUE,
  thumbnail_path text,
  file_size integer,
  width integer,
  height integer,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add check constraint for category
ALTER TABLE gallery_images 
ADD CONSTRAINT gallery_images_category_check 
CHECK (category IN ('walks', 'routes', 'grooming', 'other'));

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON gallery_images(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published gallery images"
  ON gallery_images FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all gallery images"
  ON gallery_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_gallery_images_updated_at();