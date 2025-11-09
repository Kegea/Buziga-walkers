/*
  # Remove Gallery Feature

  ## Overview
  This migration removes the gallery storage bucket, table, and all associated database objects.
  The website will revert to using hardcoded gallery content similar to the founder profile approach.

  ## Removed Storage
  - `gallery-images` storage bucket and all associated policies

  ## Removed Tables
  - `gallery_images` table
  - Associated indexes, triggers, and functions

  ## Important Notes
  - This migration is safe to run as it only removes objects related to the gallery feature
  - Any existing gallery data will be permanently deleted
  - The Gallery page will use hardcoded content with static image references
*/

-- Drop storage policies for gallery-images bucket
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

-- Remove the storage bucket (this will also remove all files in it)
DELETE FROM storage.buckets WHERE id = 'gallery-images';

-- Drop RLS policies on gallery_images table
DROP POLICY IF EXISTS "Anyone can view published gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can view all gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can insert gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON gallery_images;

-- Drop trigger
DROP TRIGGER IF EXISTS gallery_images_updated_at ON gallery_images;

-- Drop function
DROP FUNCTION IF EXISTS update_gallery_images_updated_at();

-- Drop indexes
DROP INDEX IF EXISTS idx_gallery_images_category;
DROP INDEX IF EXISTS idx_gallery_images_published;
DROP INDEX IF EXISTS idx_gallery_images_display_order;

-- Drop check constraint
ALTER TABLE gallery_images DROP CONSTRAINT IF EXISTS gallery_images_category_check;

-- Drop table
DROP TABLE IF EXISTS gallery_images;