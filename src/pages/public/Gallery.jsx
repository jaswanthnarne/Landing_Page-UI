import { useState } from 'react';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import { ImageTrail } from '../../components/ui/image-trail';
import { getOptimizedImageUrl } from '../../utils/cloudinary';
import { useWebsiteStore } from '../../store/useWebsiteStore';


const FadeIn = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}>
        {children}
    </motion.div>
);

const categories = [
    {
        id: 'cfs',
        label: 'Centre For Future Skills',
        count: 12,
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584304/ethnotech/gallery/zt6lpirckmrgcmx2ly6a.jpg', label: 'Centre Inauguration', sub: 'NSDC Centre for Future Skills Launch — DYPATU' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584305/ethnotech/gallery/xzpiab9j4nsqc04kkklw.jpg', label: 'Inaugural Ceremony', sub: 'Centre for Future Skills, D Y Patil University' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584306/ethnotech/gallery/e3jzgilmufrbs2etaywn.jpg', label: 'Centre Unveiling', sub: 'DYPATU Campus — Official Ceremony' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584309/ethnotech/gallery/ab9apcyntgufvmlkhmdi.jpg', label: 'NSDC Recognition', sub: 'Award Ceremony — Centre for Future Skills' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584310/ethnotech/gallery/ue9zlx4mvtkiuxkkodz5.jpg', label: 'VR Technology Demo', sub: 'Industry Expert — Immersive Tech Workshop' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584311/ethnotech/gallery/jxbrncykhz3a63rdfnlj.jpg', label: 'Guest Lecture Series', sub: 'Expert Talk on Emerging Technologies' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584312/ethnotech/gallery/x9j96kqtniyl00u28hol.jpg', label: 'Skill Training Session', sub: 'Hands-on Lab Session' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584313/ethnotech/gallery/ounijxvsojpuwpw5gtyj.jpg', label: 'Certification Event', sub: 'Program Completion Ceremony' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584314/ethnotech/gallery/qgj8f1ev4a9ti82eg6k3.jpg', label: 'Industry Collaboration', sub: 'Corporate Partnership Meet' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584316/ethnotech/gallery/ldhcyi9oo5bmsosj2ggh.jpg', label: 'Student Workshop', sub: 'Advanced Technology Training' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584317/ethnotech/gallery/edruebczqwfttnzyjc4n.jpg', label: 'Panel Discussion', sub: 'Future of Work — Expert Panel' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584292/ethnotech/page_images/eyfrannjprdhyfl9p7t2.jpg', label: 'Resource Centre', sub: 'Learning & Development Library' },
        ],
    },
    {
        id: 'labs',
        label: 'Labs & Infra',
        count: 12,
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584234/ethnotech/coe/qd89a0ea0ki3x2agagsi.jpg', label: 'Apple iMac Lab', sub: 'Apple Centre of Excellence — 30+ Workstations' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584238/ethnotech/coe/k4gcz6xu4jloahmr16ts.jpg', label: 'AR/VR Innovation Lab', sub: 'Green Screen & Production Studio' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584318/ethnotech/coe/v0ioajqlzzwvw7omp8vb.jpg', label: 'VR Device Library', sub: 'Headsets & Immersive Equipment' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584235/ethnotech/coe/f2nby1qy1qfhpaymmmhz.jpg', label: 'IBM Centre of Excellence', sub: 'Enterprise AI & Cloud Computing Lab' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584237/ethnotech/coe/oaawcqdvmmkkia2ycm9h.jpg', label: 'Intel Computing Lab', sub: 'AI & Processor Architecture Training' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584239/ethnotech/coe/vta1dmy3p5er5lic0crr.jpg', label: 'Schneider Automation Lab', sub: 'PLC & SCADA Training Stations' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584319/ethnotech/coe/wsf7giftgtlvqbxibkpa.jpg', label: 'Schneider Advanced Stations', sub: 'Industrial Automation Equipment' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584240/ethnotech/coe/zjpyiu6dye8fzd1uukhf.jpg', label: 'Festo Pneumatics Lab', sub: 'Industry-Grade Pneumatics Workstations' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584320/ethnotech/coe/w8ijp9bfsp1iyngoyp7c.jpg', label: 'Festo Hydraulics Lab', sub: 'Hydraulic Systems Training' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584321/ethnotech/coe/xpopw6xki8o26cuhb3wa.jpg', label: 'Festo Pneumatics Classroom', sub: 'Industrial Training Stations' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584323/ethnotech/coe/y5hq7vb2hsdcqaqyk3fr.jpg', label: 'Festo Hydraulics Classroom', sub: 'Mechatronics & Fluid Power' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584324/ethnotech/coe/hhvyydzhtr3pdi8zvato.jpg', label: 'Conference & Meeting Centre', sub: 'Executive Board Room — Industry Interactions' },
        ],
    },
    {
        id: 'global',
        label: 'Beyond Boundaries: Global Citizens',
        count: 6,
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584325/ethnotech/gallery/lcchn6gz2a964pwgieeg.jpg', label: 'Global Citizens Summit', sub: 'Beyond Boundaries — International Conference' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584327/ethnotech/gallery/jbyyuvuxyurwy80q9s5x.jpg', label: 'Cultural Exchange', sub: 'Cross-Cultural Collaboration Event' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584328/ethnotech/gallery/fssrbrbpgvompuijizgi.jpg', label: 'International Delegation', sub: 'Global Partnership Programme' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584330/ethnotech/gallery/lv4hi1vfsbll2hxhqjwf.jpg', label: 'MoU Signing', sub: 'University Partnership Agreement' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584331/ethnotech/gallery/jcoayrfb5wwmxz9joste.jpg', label: 'Skill Summit', sub: 'Future of Work — Global Panel' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584333/ethnotech/gallery/eclu2b1kea8utgovwwiq.jpg', label: 'Global Networking', sub: 'International Mentors & Students' },
        ],
    },
];

function LightboxModal({ items, startIndex, onClose }) {
    const [index, setIndex] = useState(startIndex);
    const item = items[index];

    const prev = (e) => { e.stopPropagation(); setIndex((i) => (i - 1 + items.length) % items.length); };
    const next = (e) => { e.stopPropagation(); setIndex((i) => (i + 1) % items.length); };

    // Keyboard nav
    const handleKey = (e) => {
        if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + items.length) % items.length);
        if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % items.length);
        if (e.key === 'Escape') onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
            onKeyDown={handleKey}
            tabIndex={0}
            ref={el => el && el.focus()}>

            <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                onClick={e => e.stopPropagation()}>

                {/* Image */}
                <div className="relative bg-black aspect-[16/10]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            src={getOptimizedImageUrl(item.src, { width: 1200 })}
                            alt={item.label}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    </AnimatePresence>
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-5"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                        <p className="text-white text-[18px] font-bold leading-snug">{item.label}</p>
                        <p className="text-white/65 text-[13px] mt-1">{item.sub}</p>
                    </div>
                </div>

                {/* Footer nav bar */}
                <div className="bg-[#0d1117] px-5 py-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 flex-1">
                        {items.map((_, i) => (
                            <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                                className={`rounded-full transition-all duration-200 ${i === index ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'}`} />
                        ))}
                    </div>
                    <p className="text-slate-500 text-[12px] font-bold">{index + 1} / {items.length}</p>
                </div>

                {/* Prev / Next */}
                <button onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-[60%] w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-[60%] w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10">
                    <ChevronRight size={20} />
                </button>
                <button onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10">
                    <X size={16} />
                </button>
            </motion.div>
        </motion.div>
    );
}

export default function Gallery() {
    const galleryCategories = useWebsiteStore((state) => state.galleryCategories);
    const [activeCategory, setActiveCategory] = useState('cfs');
    const [lightbox, setLightbox] = useState(null);
    const heroRef = useRef(null);

    const displayCategories = galleryCategories && galleryCategories.length > 0 ? galleryCategories : categories;
    const cat = displayCategories.find(c => c.id === activeCategory) || displayCategories[0] || { id: 'cfs', label: 'Centre For Future Skills', items: [] };

    // Real images from the gallery
    const trailImages = [
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584304/ethnotech/gallery/zt6lpirckmrgcmx2ly6a.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584305/ethnotech/gallery/xzpiab9j4nsqc04kkklw.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584306/ethnotech/gallery/e3jzgilmufrbs2etaywn.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584234/ethnotech/coe/qd89a0ea0ki3x2agagsi.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584238/ethnotech/coe/k4gcz6xu4jloahmr16ts.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584325/ethnotech/gallery/lcchn6gz2a964pwgieeg.jpg",
        "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584331/ethnotech/gallery/jcoayrfb5wwmxz9joste.jpg",
    ];

    return (
        <PublicLayout>
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section ref={heroRef} className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>

                    {/* Image Trail container - absolute positioned behind content */}
                    <div className="absolute inset-0 z-0 select-none">
                        <ImageTrail containerRef={heroRef}>
                            {trailImages.map((url, index) => (
                                <div
                                    key={index}
                                    className="flex relative overflow-hidden w-28 h-28 sm:w-32 sm:h-32 rounded-xl shadow-lg border-[3px] border-white"
                                >
                                    <img
                                        src={getOptimizedImageUrl(url, { width: 250 })}
                                        alt={`Trail image ${index + 1}`}
                                        className="object-cover absolute inset-0 hover:scale-110 transition-transform"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </ImageTrail>
                    </div>

                    <div className="absolute -top-16 -right-16 w-[440px] h-[440px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-[300px] h-[300px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-16 right-16 w-[180px] h-[180px] rounded-full bg-[#004AAD]/[0.04] pointer-events-none" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-32 right-64 w-8 h-8 rounded-lg border-[1.5px] border-[#004AAD]/15 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-2xl">
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                Visual Archive
                            </motion.span>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[2.8rem] lg:text-[3.4rem] font-extrabold text-slate-900 leading-[1.08] tracking-[-0.025em] mb-6">
                                Moments That <span className="text-[#004AAD]">Inspire</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                className="text-[16px] text-slate-500 leading-[1.8] max-w-xl">
                                A visual journey through Ethnotech's milestones from centre inaugurations to international summits.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* ── Gallery ── */}
                <section className="py-16 lg:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        {/* Category Tabs */}
                        <FadeIn>
                            <div className="flex flex-wrap gap-2.5 mb-10">
                                {displayCategories.map(c => (
                                    <motion.button key={c.id}
                                        onClick={() => setActiveCategory(c.id)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${activeCategory === c.id || cat.id === c.id
                                            ? 'bg-[#004AAD] text-white shadow-[0_4px_16px_rgba(0,74,173,0.25)]'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}>
                                        {c.label}
                                        <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-md ${activeCategory === c.id || cat.id === c.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            {c.items ? c.items.length : 0}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
                                {cat.items && cat.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => setLightbox({ items: cat.items, index: i })}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
                                        className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300">

                                        {/* Real photo */}
                                        <img
                                            src={getOptimizedImageUrl(item.src, { width: 1000 })}
                                            alt={item.label}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                                        {/* Bottom caption — always visible */}
                                        <div className="absolute bottom-0 left-0 right-0 px-3 py-3"
                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                                            <p className="text-white text-[12px] font-bold leading-tight">{item.label}</p>
                                            <p className="text-white/60 text-[10px] mt-0.5 hidden group-hover:block">{item.sub}</p>
                                        </div>

                                        {/* Expand icon on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                                                <ZoomIn size={18} className="text-white" />
                                            </div>
                                        </div>

                                        {/* Number badge */}
                                        <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-black/35 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <span className="text-white text-[9px] font-bold">{i + 1}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#004AAD] py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">Be Part of Our Story</h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">Join Ethnotech and create your own moments of growth and transformation.</p>
                            <motion.a href="mailto:info@ethnotech.in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                Join Ethnotech Academy →
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <LightboxModal
                        items={lightbox.items}
                        startIndex={lightbox.index}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
