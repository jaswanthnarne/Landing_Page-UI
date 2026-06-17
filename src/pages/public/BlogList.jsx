import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';

// Reusable micro-animation wrapper
const FadeIn = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function BlogList() {
    const blogData = useWebsiteStore((state) => state.blogs);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(blogData.map(post => post.category))];

    // Filter posts based on search query and category
    const filteredPosts = blogData.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <PublicLayout>
            <SEO 
                title="Insights Blog" 
                description="Expert career roadmaps, cybersecurity trends, software engineering guides, and AI skills from Ethnotech Academy."
                keywords="ethnotech academy blog, cybersecurity roadmap, software engineer guide, resume building fresher, AI skills engineering"
                path="/blog"
            />
            
            <div className="bg-white overflow-x-hidden min-h-screen">
                
                {/* ══════════ HERO SECTION ══════════ */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden" 
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    
                    {/* Decorative Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-[#004AAD]/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full bg-[#004AAD]/[0.03] pointer-events-none" />
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-40 right-1/4 w-12 h-12 rounded-xl border border-[#004AAD]/20 pointer-events-none" 
                    />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <FadeIn>
                                <span className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Insights & Knowledge
                                </span>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.05] tracking-[-0.02em] mb-6">
                                    Ethnotech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-blue-500">Academy Blog.</span>
                                </h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-[17px] md:text-[19px] text-slate-500 leading-relaxed font-normal">
                                    Deep-dive tutorials, career roadmaps, job search strategies, and tech tutorials designed to keep students and professionals ahead in a changing market.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ══════════ FILTER & SEARCH ══════════ */}
                <section className="py-10 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            
                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap gap-2 order-2 md:order-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                                            selectedCategory === cat 
                                                ? 'bg-[#004AAD] text-white shadow-md shadow-blue-500/20' 
                                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Input */}
                            <div className="relative w-full md:w-80 order-1 md:order-2">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* ══════════ ARTICLES LIST ══════════ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredPosts.map((post, index) => (
                                        <motion.article 
                                            key={post.id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="bg-white rounded-3xl border border-slate-150/60 overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-[#004AAD]/5 hover:border-[#004AAD]/15 transition-all duration-300 h-full"
                                        >
                                            {/* Image container */}
                                            <div className="h-52 w-full overflow-hidden relative bg-slate-100 shrink-0">
                                                <img 
                                                    src={post.coverImage} 
                                                    alt={post.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#004AAD] text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content container */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                {/* Meta Row */}
                                                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium mb-4">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={13} />
                                                        {post.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={13} />
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-[17px] font-extrabold text-slate-800 leading-snug tracking-tight mb-3 group-hover:text-[#004AAD] transition-colors">
                                                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                                                        {post.title}
                                                    </Link>
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-normal mb-6 flex-grow">
                                                    {post.excerpt}
                                                </p>

                                                {/* Card Footer Button */}
                                                <div className="pt-4 border-t border-slate-100 shrink-0">
                                                    <Link 
                                                        to={`/blog/${post.slug}`}
                                                        className="inline-flex items-center gap-2 text-[12px] font-bold text-[#004AAD] group/link hover:gap-3.5 transition-all"
                                                    >
                                                        Read Full Article 
                                                        <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <BookOpen size={40} className="mx-auto text-slate-400 mb-4" />
                                <h3 className="text-[16px] font-extrabold text-slate-800 mb-2">No articles found</h3>
                                <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
                                    We couldn't find any articles matching your search query or category filter. Try using different keywords.
                                </p>
                            </div>
                        )}
                        
                    </div>
                </section>
                
            </div>
        </PublicLayout>
    );
}
