import { useState, FormEvent } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BlogGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
    tone: 'professional',
    length: 'medium',
  });
  const [generatedContent, setGeneratedContent] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: [] as string[],
    seoTitle: '',
    seoDescription: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'generated' | 'published' | 'error'>('idle');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setStatus('idle');

    try {
      const mockContent = `
        <h2>Introduction</h2>
        <p>This is a sample blog post about ${formData.title}. In Kampala, dog owners face unique challenges and opportunities when it comes to caring for their pets.</p>

        <h2>Key Points</h2>
        <p>Here are some important considerations:</p>
        <ul>
          <li>Regular exercise is essential for your dog's health and happiness</li>
          <li>The Kampala climate requires special attention to hydration and timing of walks</li>
          <li>Local knowledge of safe walking routes is crucial for pet safety</li>
          <li>Professional dog walking services can make a significant difference in your dog's behavior</li>
        </ul>

        <h2>Practical Tips</h2>
        <p>Based on years of experience working with dogs in the Buziga area, here are our top recommendations for keeping your furry friend happy and healthy.</p>

        <h2>Conclusion</h2>
        <p>Whether you're a busy professional or simply want the best for your pet, understanding these aspects of dog care in Kampala will help ensure your dog lives their best life.</p>
      `;

      const tags = formData.keywords.split(',').map(k => k.trim()).filter(k => k);

      setGeneratedContent({
        title: formData.title,
        content: mockContent,
        excerpt: `Discover essential insights about ${formData.title.toLowerCase()} for dog owners in Kampala. Professional tips from experienced dog walkers.`,
        tags: tags,
        seoTitle: `${formData.title} | Buziga Dog Walkers`,
        seoDescription: `Expert advice on ${formData.title.toLowerCase()} for dogs in Kampala. Learn from professional dog walkers serving Buziga and surrounding areas.`,
      });

      setStatus('generated');
    } catch (error) {
      console.error('Error generating content:', error);
      setStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      const slug = generateSlug(generatedContent.title);

      const { error } = await supabase.from('blog_posts').insert([
        {
          title: generatedContent.title,
          slug: slug,
          content: generatedContent.content,
          excerpt: generatedContent.excerpt,
          author: 'Emmanuel Kiganda',
          tags: generatedContent.tags,
          seo_title: generatedContent.seoTitle,
          seo_description: generatedContent.seoDescription,
          is_published: true,
          published_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setStatus('published');
      setFormData({ title: '', keywords: '', tone: 'professional', length: 'medium' });
      setGeneratedContent({
        title: '',
        content: '',
        excerpt: '',
        tags: [],
        seoTitle: '',
        seoDescription: '',
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      setStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">AI Blog Assistant</h2>
        </div>
        <p className="text-gray-600 mb-8">
          Generate SEO-optimized blog posts for your dog walking business using AI
        </p>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Post Topic *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Best Dog Walking Routes in Buziga"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., dog walking, Kampala, pet care, exercise"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="informative">Informative</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Length
              </label>
              <select
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="short">Short (300-500 words)</option>
                <option value="medium">Medium (500-800 words)</option>
                <option value="long">Long (800-1200 words)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Blog Post</span>
              </>
            )}
          </button>
        </form>
      </div>

      {status === 'generated' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Content</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Title</h3>
              <p className="text-lg font-semibold text-gray-900">{generatedContent.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Excerpt</h3>
              <p className="text-gray-700">{generatedContent.excerpt}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {generatedContent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-700 font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Content</h3>
              <div
                className="prose max-w-none p-6 bg-gray-50 rounded-lg border border-gray-200"
                dangerouslySetInnerHTML={{ __html: generatedContent.content }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">SEO Title</h3>
                <p className="text-gray-700">{generatedContent.seoTitle}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">SEO Description</h3>
                <p className="text-gray-700">{generatedContent.seoDescription}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish Blog Post'}
          </button>
        </div>
      )}

      {status === 'published' && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-800 font-semibold text-lg">
            Blog post published successfully!
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 font-semibold text-lg">
            An error occurred. Please try again.
          </p>
        </div>
      )}

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Note about AI Integration</h3>
        <p className="text-blue-800">
          This demo uses placeholder content. To enable real AI content generation, you'll need to integrate with OpenAI's API.
        </p>
      </div>
    </div>
  );
}
