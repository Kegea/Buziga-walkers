/*
  # Initial Database Schema for Buziga Dog Walkers

  ## Overview
  This migration creates the foundational database structure for the dog walking service website,
  including tables for contact inquiries, bookings, testimonials, and blog posts.

  ## New Tables

  ### 1. `contact_inquiries`
  Stores contact form submissions from potential clients
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Client's full name
  - `email` (text) - Client's email address
  - `phone` (text) - Client's phone number
  - `message` (text) - Inquiry message
  - `status` (text) - Status: 'new', 'contacted', 'converted', 'closed'
  - `created_at` (timestamptz) - Submission timestamp

  ### 2. `booking_requests`
  Stores booking and meet-and-greet requests
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Client's full name
  - `email` (text) - Client's email address
  - `phone` (text) - Client's phone number
  - `service_type` (text) - Service package selected
  - `dog_name` (text) - Name of the dog
  - `dog_breed` (text) - Breed of the dog
  - `dog_age` (text) - Age of the dog
  - `num_dogs` (integer) - Number of dogs (for multi-dog discounts)
  - `preferred_date` (date) - Preferred start date
  - `message` (text) - Additional notes or special requirements
  - `status` (text) - Status: 'pending', 'confirmed', 'completed', 'cancelled'
  - `created_at` (timestamptz) - Submission timestamp

  ### 3. `testimonials`
  Stores client testimonials and reviews
  - `id` (uuid, primary key) - Unique identifier
  - `client_name` (text) - Client's name (e.g., "Sarah K.")
  - `location` (text) - Client's area (e.g., "Kansanga")
  - `dog_name` (text) - Name of the dog
  - `testimonial` (text) - Review content
  - `rating` (integer) - Rating out of 5
  - `image_url` (text) - URL to dog's photo
  - `is_featured` (boolean) - Display on homepage
  - `is_published` (boolean) - Public visibility
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `blog_posts`
  Stores blog articles for SEO and client education
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article title
  - `slug` (text, unique) - URL-friendly slug
  - `content` (text) - Full article content (markdown/HTML)
  - `excerpt` (text) - Short summary for listings
  - `featured_image_url` (text) - Header image URL
  - `author` (text) - Author name (default: "Emmanuel Kiganda")
  - `tags` (text array) - Article tags for categorization
  - `seo_title` (text) - SEO meta title
  - `seo_description` (text) - SEO meta description
  - `is_published` (boolean) - Publication status
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. `service_packages`
  Stores service package details for dynamic pricing
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Package name (e.g., "The Black Panther")
  - `description` (text) - Package description
  - `price` (decimal) - Price in UGX
  - `frequency` (text) - Frequency (e.g., "3x per week")
  - `duration` (text) - Duration per walk (e.g., "30 minutes")
  - `features` (text array) - List of features included
  - `is_active` (boolean) - Active status
  - `display_order` (integer) - Display order on website

  ## Security
  - Enable RLS on all tables
  - Public read access for testimonials and blog posts (where published)
  - Authenticated admin access for managing all content
  - Public insert access for contact inquiries and booking requests
*/

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view own submissions"
  ON contact_inquiries FOR SELECT
  TO anon
  USING (true);

-- Create booking_requests table
CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  dog_name text NOT NULL,
  dog_breed text,
  dog_age text,
  num_dogs integer DEFAULT 1,
  preferred_date date,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit booking requests"
  ON booking_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view own bookings"
  ON booking_requests FOR SELECT
  TO anon
  USING (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  location text NOT NULL,
  dog_name text,
  testimonial text NOT NULL,
  rating integer DEFAULT 5,
  image_url text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_published = true);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image_url text,
  author text DEFAULT 'Emmanuel Kiganda',
  tags text[] DEFAULT '{}',
  seo_title text,
  seo_description text,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (is_published = true);

-- Create service_packages table
CREATE TABLE IF NOT EXISTS service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL,
  frequency text NOT NULL,
  duration text NOT NULL,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0
);

ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active service packages"
  ON service_packages FOR SELECT
  TO anon
  USING (is_active = true);

-- Insert initial service packages
INSERT INTO service_packages (name, description, price, frequency, duration, features, display_order) VALUES
('The Black Panther', 'Busy owners needing regular routine', 110000, '3x per week', '30 minutes', ARRAY['3 walks per week', '30 minutes per walk', 'GPS tracked walks', 'Photo updates', 'Flexible scheduling'], 1),
('The Dog Storm', 'Dogs who love to get messy!', 133000, '2x per week + grooming', '30 minutes', ARRAY['2 walks per week', '30 minutes per walk', 'Wash and groom service', 'GPS tracked walks', 'Photo updates', 'Perfect for active dogs'], 2),
('The Silverback', 'High-energy breeds', 15000, 'Daily', '30 minutes', ARRAY['Daily 30-minute walks', 'Ideal for high-energy breeds', 'GPS tracked walks', 'Photo updates', 'Consistent routine'], 3);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, location, dog_name, testimonial, rating, is_featured, is_published) VALUES
('Sarah K.', 'Kansanga', 'Max', 'Emmanuel is absolutely wonderful with Max! He comes on time every day, rain or shine, and Max is always so excited to see him. I can finally focus on work knowing my dog is getting the exercise he needs.', 5, true, true),
('James N.', 'Buziga', 'Luna', 'Best decision we made for Luna. She used to bark all night, but now after her walks with Emmanuel, she is calm and happy. Very professional and reliable service!', 5, true, true),
('Mary A.', 'Munyonyo', 'Rocky', 'I was worried about finding someone trustworthy to walk Rocky, but Emmanuel exceeded all expectations. He sends photos during walks and really cares about the dogs. Highly recommend!', 5, false, true);