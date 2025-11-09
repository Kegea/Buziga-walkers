import { BookOpen } from 'lucide-react';
import BlogGenerator from '../components/BlogGenerator';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className="flex-1 px-6 py-4 font-semibold text-lg transition-colors flex items-center justify-center space-x-2 text-amber-600 border-b-2 border-amber-600 bg-amber-50"
            >
              <BookOpen className="w-5 h-5" />
              <span>Blog Posts</span>
            </button>
          </div>
        </div>

        <BlogGenerator />
      </div>
    </div>
  );
}
