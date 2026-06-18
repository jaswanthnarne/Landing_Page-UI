import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';

const FadeIn = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}>
        {children}
    </motion.div>
);

function FaqItem({ faq, isOpen, onToggle, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                    ? 'border-[#004AAD]/20 shadow-[0_8px_30px_rgba(0,74,173,0.08)]'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
            }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer group"
                aria-expanded={isOpen}
            >
                <span className={`text-[15px] font-bold leading-snug transition-colors duration-200 ${
                    isOpen ? 'text-[#004AAD]' : 'text-slate-800 group-hover:text-[#004AAD]'
                }`}>
                    {faq.question}
                </span>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen
                        ? 'bg-[#004AAD] text-white rotate-180'
                        : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#004AAD]'
                }`}>
                    <ChevronDown size={16} />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-6 pb-6 pt-0">
                            <div className="w-12 h-[2px] bg-[#004AAD]/15 rounded-full mb-4" />
                            <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-line">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQs() {
    const faqs = useWebsiteStore((state) => state.faqs) || [];
    const [openId, setOpenId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(faqs.map(f => f.category).filter(Boolean))];
        return ['All', ...cats];
    }, [faqs]);

    // Filter FAQs
    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesSearch = searchQuery === '' ||
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [faqs, searchQuery, selectedCategory]);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <PublicLayout>
            <SEO
                title="Frequently Asked Questions"
                description="Find answers to common questions about Ethnotech Academy's programs, certifications, placements, labs, admissions, and more."
                keywords="ethnotech FAQ, frequently asked questions, academy admissions, course details, placement support, certification queries"
                path="/faqs"
            />
            <div className="bg-white overflow-x-hidden min-h-screen">

                {/* Hero Section */}
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
                                    Help Centre
                                </span>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.05] tracking-[-0.02em] mb-6">
                                    Frequently Asked{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-blue-500">
                                        Questions.
                                    </span>
                                </h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-[17px] md:text-[19px] text-slate-500 leading-relaxed font-normal">
                                    Everything you need to know about our programs, certifications, placements, and infrastructure. Can't find your answer? Reach out to our team.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Search and Filter */}
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
                                    placeholder="Search questions..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* FAQ List */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">

                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-3">
                                {filteredFaqs.map((faq, index) => (
                                    <FaqItem
                                        key={faq._id || faq.order || index}
                                        faq={faq}
                                        isOpen={openId === (faq._id || faq.order || index)}
                                        onToggle={() => toggleFaq(faq._id || faq.order || index)}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <HelpCircle size={40} className="mx-auto text-slate-400 mb-4" />
                                <h3 className="text-[16px] font-extrabold text-slate-800 mb-2">No questions found</h3>
                                <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
                                    We couldn't find any questions matching your search. Try different keywords or browse all categories.
                                </p>
                            </div>
                        )}

                    </div>
                </section>

                {/* Still Have Questions CTA */}
                <section className="bg-[#004AAD] py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <MessageCircle className="mx-auto text-white/60 mb-6" size={44} strokeWidth={1.5} />
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">
                                Still have questions?
                            </h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">
                                Our counselors are here to help. Reach out and we will get back to you within 24 hours.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                            >
                                Contact Us
                            </Link>
                        </FadeIn>
                    </div>
                </section>

            </div>
        </PublicLayout>
    );
}
