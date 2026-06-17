import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Facebook, Twitter, Award, ChevronRight } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const blogs = useWebsiteStore((state) => state.blogs) || [];
    const isStoreInitialized = useWebsiteStore((state) => state.isStoreInitialized);

    // Show loading spinner if store hasn't initialized
    if (!isStoreInitialized) {
        return (
            <PublicLayout>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-[#004AAD] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-slate-500 font-bold tracking-wide">Loading article...</span>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    // Find the current post
    const post = blogs.find(p => p.slug === slug);

    // Scroll to top on mount or slug change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (!post) {
        return (
            <PublicLayout>
                <SEO title="Article Not Found" description="The requested blog post could not be found." />
                <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
                        <ArrowLeft size={30} />
                    </div>
                    <h2 className="text-[20px] font-extrabold text-slate-800 mb-2">Article Not Found</h2>
                    <p className="text-[13px] text-slate-500 max-w-sm mb-6 leading-relaxed">
                        We couldn't find the article you are looking for. It might have been moved or renamed.
                    </p>
                    <Link 
                        to="/blog"
                        className="px-6 py-2.5 bg-[#004AAD] text-white font-bold text-[13px] rounded-xl hover:bg-[#003a8c] transition-colors"
                    >
                        Back to Insights
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    // Get other articles for the sidebar recommendation
    const recommendedPosts = blogs
        .filter(p => (p._id || p.id) !== (post._id || post.id))
        .slice(0, 3);

    // Dynamic sharing URLs
    const currentUrl = `https://finishingschools.jaswanthnarne.online/blog/${post.slug}`;
    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
    };
    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };
    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
    };

    return (
        <PublicLayout>
            <SEO 
                title={post.title} 
                description={post.seoDescription}
                keywords={post.keywords}
                path={`/blog/${post.slug}`}
            />
            
            <div className="bg-slate-50 overflow-x-hidden min-h-screen pt-24 pb-20">
                
                {/* ══════════ BREADCRUMB & BACK BUTTON ══════════ */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold text-slate-400 mb-4">
                        <Link to="/" className="hover:text-[#004AAD] transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link to="/blog" className="hover:text-[#004AAD] transition-colors">Blog</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-600 truncate max-w-xs md:max-w-md">{post.title}</span>
                    </div>

                    <button 
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-[12px] font-bold text-slate-600 hover:text-[#004AAD] hover:border-[#004AAD]/20 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                        <ArrowLeft size={14} />
                        Back to Insights
                    </button>
                </div>

                {/* ══════════ MAIN CONTENT CONTAINER ══════════ */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* LEFT COLUMN: Main Post Article */}
                        <main className="lg:col-span-8 bg-white border border-slate-150/60 rounded-3xl overflow-hidden shadow-sm">
                            
                            {/* Header Image */}
                            <div className="h-64 md:h-[400px] w-full overflow-hidden relative bg-slate-100">
                                <img 
                                    src={post.coverImage} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />
                                
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block px-3 py-1 bg-[#004AAD] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider mb-3 shadow-md">
                                        {post.category}
                                    </span>
                                    <h1 className="text-[20px] md:text-[32px] font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                                        {post.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Author & Meta Row */}
                            <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#004AAD]/10 flex items-center justify-center text-[#004AAD] font-bold text-[13px] border border-[#004AAD]/20">
                                        EA
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-extrabold text-slate-800 leading-tight">{post.author}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Academic Board Contributor</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-slate-500 text-[11px] font-semibold">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={13} />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={13} />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Article Body */}
                            <div className="p-6 md:p-10">
                                {/* Styled Content Parser */}
                                <div 
                                    className="prose prose-slate max-w-none 
                                               prose-headings:font-extrabold prose-headings:text-slate-800 prose-headings:tracking-tight 
                                               prose-h2:text-[20px] prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                                               prose-h3:text-[15px] prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-slate-700
                                               prose-p:text-[14px] prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-5
                                               prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5 prose-ul:text-[13.5px] prose-ul:text-slate-600 prose-ul:space-y-2
                                               prose-strong:text-slate-800 prose-strong:font-bold"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Social Sharing Footer */}
                                <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-slate-500 flex items-center gap-1.5">
                                        <Share2 size={14} /> Share this article
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={shareOnLinkedIn}
                                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all cursor-pointer"
                                            title="Share on LinkedIn"
                                        >
                                            <Linkedin size={15} />
                                        </button>
                                        <button 
                                            onClick={shareOnTwitter}
                                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-black hover:border-black transition-all cursor-pointer"
                                            title="Share on Twitter"
                                        >
                                            <Twitter size={14} />
                                        </button>
                                        <button 
                                            onClick={shareOnFacebook}
                                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#1877f2] hover:border-[#1877f2] transition-all cursor-pointer"
                                            title="Share on Facebook"
                                        >
                                            <Facebook size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* RIGHT COLUMN: Sidebar */}
                        <aside className="lg:col-span-4 space-y-6">
                            
                            {/* Academic CTA Banner */}
                            <div className="bg-[#004AAD] rounded-3xl p-6 relative overflow-hidden text-white shadow-md">
                                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border-[10px] border-white/5 pointer-events-none" />
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-[8px] border-white/5 pointer-events-none" />
                                
                                <Award className="text-white/80 mb-4" size={36} strokeWidth={1.5} />
                                
                                <h3 className="text-[17px] font-extrabold leading-tight mb-3">
                                    Want Hands-On Skills?
                                </h3>
                                <p className="text-blue-100 text-[12.5px] leading-relaxed mb-6 font-medium">
                                    Join Ethnotech Academy's Advanced Finishing School programs. Train in real security operations, cloud labs, and secure placement drives.
                                </p>
                                
                                <Link 
                                    to="/contact" 
                                    className="w-full inline-flex items-center justify-center py-2.5 bg-white text-[#004AAD] text-[12px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                                >
                                    Speak to Counselor
                                </Link>
                            </div>

                            {/* Related Articles Card */}
                            <div className="bg-white border border-slate-150/60 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-[15px] font-extrabold text-slate-800 pb-3 border-b border-slate-100 mb-4">
                                    Related Articles
                                </h3>

                                <div className="space-y-4">
                                    {recommendedPosts.map(p => (
                                        <Link 
                                            key={p._id || p.id} 
                                            to={`/blog/${p.slug}`}
                                            className="flex gap-3 items-start group"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                                <img 
                                                    src={p.coverImage} 
                                                    alt={p.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-[12px] font-bold text-slate-800 leading-snug group-hover:text-[#004AAD] group-hover:underline transition-colors line-clamp-2">
                                                    {p.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-400 font-medium mt-1">
                                                    {p.category} • {p.readTime}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            
                        </aside>
                        
                    </div>
                </div>
                
            </div>
        </PublicLayout>
    );
}
