/*
  # Remove Founder Profile Feature

  ## Overview
  This migration removes the founder profile storage bucket, table, and all associated database objects.
  The website will revert to using a local image file from the /public folder instead of dynamic storage.

  ## Removed Storage
  - `founder-images` storage bucket and all associated policies

  ## Removed Tables
  - `founder_profile` table
  - Associated indexes, triggers, and functions

  ## Important Notes
  - This migration is safe to run as it only removes objects related to the founder profile feature
  - Any existing founder profile data will be permanently deleted
  - The About page will use hardcoded content with a local image file
*/

-- Drop storage policies for founder-images bucket
DROP POLICY IF EXISTS "Public can view founder images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload founder images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update founder images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete founder images" ON storage.objects;

-- Remove the storage bucket (this will also remove all files in it)
DELETE FROM storage.buckets WHERE id = 'founder-images';

-- Drop RLS policies on founder_profile table
DROP POLICY IF EXISTS "Anyone can view visible founder profiles" ON founder_profile;
DROP POLICY IF EXISTS "Authenticated users can view all founder profiles" ON founder_profile;
DROP POLICY IF EXISTS "Authenticated users can insert founder profiles" ON founder_profile;
DROP POLICY IF EXISTS "Authenticated users can update founder profiles" ON founder_profile;
DROP POLICY IF EXISTS "Authenticated users can delete founder profiles" ON founder_profile;

-- Drop trigger
DROP TRIGGER IF EXISTS founder_profile_updated_at ON founder_profile;

-- Drop function
DROP FUNCTION IF EXISTS update_founder_profile_updated_at();

-- Drop index
DROP INDEX IF EXISTS idx_founder_profile_visible;

-- Drop table
DROP TABLE IF EXISTS founder_profile;
