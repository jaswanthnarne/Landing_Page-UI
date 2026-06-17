import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { Plus, Trash2, Edit2, X, FileText, Calendar, Clock, Image, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

const POPULAR_CATEGORIES = [
    'Cyber Security',
    'Software Development',
    'Artificial Intelligence',
    'Career Advice',
    'Cloud Computing'
];

export default function BlogManager() {
    const blogs = useWebsiteStore((state) => state.blogs) || [];
    const addBlog = useWebsiteStore((state) => state.addBlog);
    const updateBlog = useWebsiteStore((state) => state.updateBlog);
    const deleteBlog = useWebsiteStore((state) => state.deleteBlog);

    // Modal states
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // Form fields
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('Cyber Security');
    const [customCategory, setCustomCategory] = useState('');
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('Academic Board, Ethnotech');
    const [readTime, setReadTime] = useState('5 min read');
    const [coverImage, setCoverImage] = useState('');
    const [date, setDate] = useState('');

    // SEO Metadata
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [keywords, setKeywords] = useState('');

    // Auto-generate slug from Title
    const handleTitleChange = (val) => {
        setTitle(val);
        // Only auto-generate slug if not editing
        if (!editId) {
            const generatedSlug = val
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setSlug(generatedSlug);
        }
    };

    // Auto-fill SEO suggestions
    const generateSeoSuggestions = () => {
        if (!title) return;
        setSeoTitle(`${title} | Ethnotech Academy`);
        setSeoDescription(excerpt || `Read our latest article on ${title}. Expand your knowledge and tech capabilities with Ethnotech.`);
        setKeywords(`${category.toLowerCase()}, finishing schools, corporate training, ethnotech ${title.toLowerCase()}`);
    };

    const openModal = (id = null) => {
        if (id !== null) {
            const blog = blogs.find((b) => b._id === id);
            if (!blog) return;

            setEditId(id);
            setTitle(blog.title || '');
            setSlug(blog.slug || '');
            
            const isPredefined = POPULAR_CATEGORIES.includes(blog.category);
            if (isPredefined) {
                setCategory(blog.category);
                setIsCustomCategory(false);
                setCustomCategory('');
            } else {
                setCategory('custom');
                setIsCustomCategory(true);
                setCustomCategory(blog.category || '');
            }

            setExcerpt(blog.excerpt || '');
            setContent(blog.content || '');
            setAuthor(blog.author || 'Academic Board, Ethnotech');
            setReadTime(blog.readTime || '5 min read');
            setCoverImage(blog.coverImage || '');
            setDate(blog.date || '');

            // SEO Info
            setSeoTitle(blog.seoTitle || '');
            setSeoDescription(blog.seoDescription || '');
            setKeywords(blog.keywords || '');
        } else {
            setEditId(null);
            setTitle('');
            setSlug('');
            setCategory('Cyber Security');
            setIsCustomCategory(false);
            setCustomCategory('');
            setExcerpt('');
            setContent('');
            setAuthor('Academic Board, Ethnotech');
            setReadTime('5 min read');
            setCoverImage('');
            setDate('');

            // SEO Info
            setSeoTitle('');
            setSeoDescription('');
            setKeywords('');
        }
        setIsOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        const finalCategory = isCustomCategory ? customCategory.trim() : category;
        if (!finalCategory) {
            alert('Please select or specify a category');
            return;
        }

        const blogData = {
            title: title.trim(),
            slug: slug.trim().toLowerCase(),
            category: finalCategory,
            excerpt: excerpt.trim(),
            content: content.trim(),
            author: author.trim(),
            readTime: readTime.trim(),
            coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
            date: date.trim() || new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            seoTitle: seoTitle.trim() || `${title} | Ethnotech Academy`,
            seoDescription: seoDescription.trim() || excerpt.trim(),
            keywords: keywords.trim()
        };

        try {
            if (editId !== null) {
                await updateBlog(editId, blogData);
            } else {
                await addBlog(blogData);
            }
            setIsOpen(false);
        } catch (error) {
            alert('Error saving blog: ' + error.message);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2">
                        <FileText className="text-blue-500" size={18} />
                        Insights Blog Manager
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                        Create, modify, and optimize industry-aligned career roadmaps, guides, and learning blogs
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                    >
                        <Plus size={16} />
                        Create Blog Post
                    </button>
                </div>
            </div>

            {/* Main blog list */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                        <h3 className="font-extrabold text-[14px] text-slate-800">Seeded Blog Articles ({blogs.length})</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Manage existing articles, update SEO keywords, or delete outdated posts</p>
                    </div>
                </div>

                {blogs.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                        <BookOpen size={40} className="text-slate-300 mb-2 animate-pulse" />
                        <p className="text-sm font-bold">No blog posts found in the database.</p>
                        <p className="text-xs text-slate-400 mt-1">Click the 'Create Blog Post' button to add your first post.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                          <div
                            key={blog._id}
                            className="bg-white rounded-2xl border border-slate-150/70 overflow-hidden flex flex-col hover:shadow-md hover:border-blue-500/20 transition-all duration-300 group"
                          >
                            {/* Preview Cover */}
                            <div className="h-44 w-full bg-slate-50 relative overflow-hidden">
                              <img
                                src={blog.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="px-2.5 py-0.5 bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-bold rounded-md uppercase tracking-wider">
                                  {blog.category}
                                </span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col flex-1 space-y-3">
                              <div className="flex items-center gap-3 text-slate-400 text-[10px] font-semibold">
                                <span className="flex items-center gap-1">
                                  <Calendar size={11} />
                                  {blog.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  {blog.readTime}
                                </span>
                              </div>

                              <h4 className="font-extrabold text-[14px] text-slate-800 leading-snug group-hover:text-[#004AAD] transition-colors line-clamp-2">
                                {blog.title}
                              </h4>

                              <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                                {blog.excerpt}
                              </p>

                              {/* Footer Action buttons */}
                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                <a
                                  href={`/blog/${blog.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#004AAD] transition-colors"
                                >
                                  View Live
                                  <ExternalLink size={11} />
                                </a>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => openModal(blog._id)}
                                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm bg-white cursor-pointer"
                                    title="Edit Blog"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete "${blog.title}"? This will also disable any navbar link pointed to this post.`)) {
                                        deleteBlog(blog._id);
                                      }
                                    }}
                                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm bg-white cursor-pointer"
                                    title="Delete Blog"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal - Create/Edit Post */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                              <h3 className="font-extrabold text-[15px] text-slate-800">
                                  {editId !== null ? 'Modify Insights Blog Article' : 'Draft New Blog Article'}
                              </h3>
                              <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">Setup metadata, HTML body content, and SEO values</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:shadow-sm transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Article Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Java Full Stack Roadmap for Beginners"
                                />
                            </div>

                            {/* Slug & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">URL Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="java-full-stack-roadmap-beginners"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Category Classification</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={isCustomCategory ? 'custom' : category}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === 'custom') {
                                                    setIsCustomCategory(true);
                                                    setCategory('custom');
                                                } else {
                                                    setIsCustomCategory(false);
                                                    setCategory(val);
                                                }
                                            }}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all font-semibold cursor-pointer"
                                        >
                                            {POPULAR_CATEGORIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                            <option value="custom">── Custom Category ──</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Category Input if selected */}
                            {isCustomCategory && (
                                <div className="space-y-1 animate-fade-in bg-blue-50/20 p-3 rounded-xl border border-blue-100/40">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Specify Custom Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={customCategory}
                                        onChange={(e) => setCustomCategory(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all font-semibold"
                                        placeholder="e.g. Hardware Engineering, Quantum Computing..."
                                    />
                                </div>
                            )}

                            {/* Author & Read Time & Date */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Author</label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all font-medium"
                                        placeholder="Academic Board, Ethnotech"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Read Time</label>
                                    <input
                                        type="text"
                                        value={readTime}
                                        onChange={(e) => setReadTime(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all font-medium"
                                        placeholder="e.g. 6 min read"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Publish Date</label>
                                    <input
                                        type="text"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all font-medium"
                                        placeholder="e.g. June 14, 2026 (leave empty for current)"
                                    />
                                </div>
                            </div>

                            {/* Cover Image URL */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Cover Image URL</label>
                                <div className="flex gap-2">
                                    <span className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <Image size={18} />
                                    </span>
                                    <input
                                        type="url"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="https://images.unsplash.com/... or cloudinary path"
                                    />
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Card Excerpt / Short Summary</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] outline-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                                    placeholder="Write a brief 2-sentence hook displayed in list cards..."
                                />
                            </div>

                            {/* Content HTML Editor */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Article Content (HTML/Plain Text)</label>
                                    <span className="text-[10px] text-slate-400 font-bold">Supports tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;strong&gt;</span>
                                </div>
                                <textarea
                                    required
                                    rows={8}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 font-mono focus:border-[#004AAD] outline-none transition-all placeholder:text-slate-400 leading-relaxed"
                                    placeholder="<p>Write your detailed article body content here...</p>"
                                />
                            </div>

                            {/* SEO Optimization Settings */}
                            <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-150 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-extrabold text-[12px] text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                                        <Sparkles size={14} className="text-amber-500" />
                                        SEO Meta Configurations
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={generateSeoSuggestions}
                                        className="text-[10.5px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer active:scale-97"
                                    >
                                        Auto-Suggest Tags
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-600 uppercase">Meta Title Tag</label>
                                        <input
                                            type="text"
                                            value={seoTitle}
                                            onChange={(e) => setSeoTitle(e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:border-[#004AAD] outline-none"
                                            placeholder="Page Title inside <title> tag"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-600 uppercase">Keywords (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={keywords}
                                            onChange={(e) => setKeywords(e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-[#004AAD] outline-none"
                                            placeholder="e.g. java roadmap, full stack, ethnotech academy"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase">Meta Description</label>
                                    <textarea
                                        rows={2}
                                        value={seoDescription}
                                        onChange={(e) => setSeoDescription(e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-[#004AAD] outline-none leading-relaxed"
                                        placeholder="Brief page snippet showing on search engine results..."
                                    />
                                </div>
                            </div>

                            {/* Footer Submit Buttons */}
                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6 bg-slate-50/50 -mx-6 -mb-6 p-6">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
                                >
                                    {editId !== null ? 'Update Post' : 'Publish Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
