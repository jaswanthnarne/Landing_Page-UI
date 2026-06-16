import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, X, ChevronLeft, MapPin, ExternalLink, Activity, Cpu, MonitorPlay, Zap, Boxes, ArrowRight, ZoomIn, Award } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { getOptimizedImageUrl } from '../../utils/cloudinary';


// ── Partner Logo Map ──────────────────────────────────────────────────
const partnerLogos = {
    'Apple': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584345/ethnotech/logos/ikb5gdvfvuajzo0zbafy.svg', bg: '#f5f5f7', fg: '#1d1d1f' },
    'IBM': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584348/ethnotech/logos/pekv8rmn3y12z9zhttq4.svg', bg: '#f0f4ff', fg: '#052FAD' },
    'Intel': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584350/ethnotech/logos/fupilsth9vnty4yxca1i.svg', bg: '#f0f4ff', fg: '#0068B5' },
    'Schneider Electric': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584353/ethnotech/logos/mnkou1ofitmnta21mzkv.svg', bg: '#f0fdf0', fg: '#3DCD58' },
    'Festo': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584355/ethnotech/logos/vg8grpnznigfd4sbmxfd.svg', bg: '#eff6ff', fg: '#003399' },
    'AR / VR': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584357/ethnotech/logos/qmqzp2io0xpn3xaxnu0u.svg', bg: '#f5f3ff', fg: '#6D28D9' },
    'Facilities': { src: null, bg: '#eff6ff', fg: '#004AAD' },
};

// ── India map city data ─────────────────────────────────────────────
const cities = [
    { city: 'Hyderabad', state: 'Telangana', hl: true },
    { city: 'Pune (DYPATU)', state: 'Maharashtra', hl: true },
    { city: 'Delhi / NCR', state: 'Delhi' },
    { city: 'Chandigarh', state: 'Punjab' },
    { city: 'Solan', state: 'Himachal Pradesh' },
    { city: 'Gurgaon', state: 'Haryana' },
    { city: 'Faridabad', state: 'Haryana' },
    { city: 'Meerut', state: 'Uttar Pradesh' },
    { city: 'Bhopal', state: 'Madhya Pradesh' },
    { city: 'Vadodara', state: 'Gujarat' },
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Sangli', state: 'Maharashtra' },
    { city: 'Kolhapur', state: 'Maharashtra' },
    { city: 'Kolkata', state: 'West Bengal' },
    { city: 'Bhubaneswar', state: 'Odisha' },
    { city: 'Gulbarga', state: 'Karnataka' },
    { city: 'Vizag', state: 'Andhra Pradesh' },
    { city: 'Rajahmundry', state: 'Andhra Pradesh' },
    { city: 'Vijayawada', state: 'Andhra Pradesh' },
    { city: 'Bengaluru', state: 'Karnataka' },
    { city: 'Mangalore', state: 'Karnataka' },
    { city: 'Mysore', state: 'Karnataka' },
    { city: 'Chennai', state: 'Tamil Nadu' },
    { city: 'Coimbatore', state: 'Tamil Nadu' },
    { city: 'Erode', state: 'Tamil Nadu' },
    { city: 'Salem', state: 'Tamil Nadu' },
    { city: 'Villupuram', state: 'Tamil Nadu' },
    { city: 'Pondicherry', state: 'Puducherry' },
    { city: 'Kochi', state: 'Kerala' },
];

// ── Partner Logo Pill component ─────────────────────────────────────
function PartnerPill({ name, size = 'md' }) {
    if (name === 'NSDC & Ethnotech') {
        const logoHeight = size === 'sm' ? 'h-3.5' : 'h-5';
        return (
            <span className={`inline-flex items-center gap-2 px-2.5 py-1 bg-[#eff6ff]/30 border border-blue-200/40 rounded-full shadow-sm`}>
                <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584360/ethnotech/assets/y23u3jp1twt4tpyzx2lg.png", { width: 150 })} alt="NSDC" className={`${logoHeight} w-auto object-contain`} loading="lazy" />
                <span className="text-[10px] font-bold text-slate-400 select-none">+</span>
                <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png", { width: 150 })} alt="Ethnotech" className={`${logoHeight} w-auto object-contain`} loading="lazy" />
            </span>
        );
    }
    const p = partnerLogos[name] || { src: null, bg: '#f1f5f9', fg: '#334155' };
    const imgSize = size === 'sm' ? 'h-4 w-auto' : 'h-5 w-auto';
    const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3.5 py-1.5';
    const textSize = size === 'sm' ? 'text-[10px]' : 'text-[12px]';
    return (
        <span className={`inline-flex items-center gap-2 ${padding} bg-white border border-slate-200 rounded-full shadow-sm`}>
            {p.src && (
                <img src={getOptimizedImageUrl(p.src, { width: 150 })} alt={name} className={`${imgSize} object-contain`}
                    style={{ filter: p.fg === '#1d1d1f' ? 'none' : 'none' }} loading="lazy" />
            )}
            <span className={`${textSize} font-bold`} style={{ color: p.fg }}>{name}</span>
        </span>
    );
}

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

// ── Features (from CFS) ──────────────────────────────────────────────
const features = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <path d="M24 14L13 20L24 26L35 20L24 14Z" fill="#004AAD" />
                <path d="M17 23V29C17 29 20 32 24 32C28 32 31 29 31 29V23L24 26L17 23Z" fill="#004AAD" fillOpacity="0.4" />
                <path d="M33 20V28" stroke="#004AAD" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="33" cy="29.5" r="1.5" fill="#004AAD" />
            </svg>
        ),
        title: 'Advanced Training Programs',
        desc: 'Cutting-edge curriculum in AI, ML, Cloud Computing, Cybersecurity, Data Science co-designed with sector skill councils and industry experts.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="11" y="15" width="26" height="18" rx="2.5" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <rect x="15" y="19" width="8" height="6" rx="1" fill="#004AAD" fillOpacity="0.35" />
                <rect x="25" y="19" width="9" height="2.5" rx="0.5" fill="#004AAD" fillOpacity="0.25" />
                <rect x="25" y="24" width="6" height="2" rx="0.5" fill="#004AAD" fillOpacity="0.18" />
                <path d="M20 33V37" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M28 33V37" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16 37H32" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        title: 'State of the Art Infrastructure',
        desc: 'Modern labs equipped with the latest hardware and software, including VR/AR stations, IoT kits, and cloud computing environments.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="17" cy="19" r="5" fill="#004AAD" />
                <circle cx="31" cy="19" r="5" fill="#004AAD" fillOpacity="0.35" />
                <path d="M10 36C10 30.5 13.1 26 17 26" stroke="#004AAD" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M31 26C34.9 26 38 30.5 38 36" stroke="#004AAD" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.35" />
                <path d="M17 26C19.5 26 22 27.5 24 27.5C26 27.5 28.5 26 31 26" stroke="#004AAD" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.65" />
            </svg>
        ),
        title: 'Industry-Academia Collaboration',
        desc: 'Deep partnerships with 80+ institutions and corporates ensure the curriculum stays relevant, practical, and aligned with market needs.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="23" cy="23" r="10" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <ellipse cx="23" cy="23" rx="4.5" ry="10" stroke="#004AAD" strokeWidth="1.3" fill="none" />
                <path d="M13 23H33" stroke="#004AAD" strokeWidth="1.1" strokeOpacity="0.4" />
                <circle cx="32" cy="32" r="5" fill="#004AAD" />
                <path d="M30.5 32L32 33.5L34 31" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Global Certifications',
        desc: 'Internationally recognized certifications validated by industry-leading technology partners and global skill bodies.',
    },
];

// Lab Sections will be loaded dynamically inside the component from the Zustand store

// ── Lightbox Modal ────────────────────────────────────────────────────
function LightboxModal({ items, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);
    const prev = () => setCurrent(i => (i - 1 + items.length) % items.length);
    const next = () => setCurrent(i => (i + 1) % items.length);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-5xl w-full"
                onClick={e => e.stopPropagation()}>
                {items.length > 0 && <img src={getOptimizedImageUrl(items[current]?.src, { width: 1200 })} alt={items[current]?.caption}
                    className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" loading="eager" />}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 rounded-b-2xl"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                    <p className="text-white text-[14px] font-semibold">{items[current]?.caption}</p>
                    <p className="text-white/50 text-[12px] mt-0.5">{current + 1} / {items.length}</p>
                </div>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10">
                    <ChevronLeft size={22} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10">
                    <ChevronRight size={22} />
                </button>
                <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10">
                    <X size={16} />
                </button>
            </motion.div>
        </motion.div>
    );
}

// ── Lab Card ──────────────────────────────────────────────────────────
function LabCard({ lab, onImageClick, globalImageOffset }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all duration-300">

            {/* Image(s) */}
            {lab.images.length === 1 ? (
                <div className="relative aspect-[16/10] cursor-pointer group overflow-hidden"
                    onClick={() => onImageClick(globalImageOffset)}>
                    <img src={getOptimizedImageUrl(lab.images[0].src, { width: 600 })} alt={lab.images[0].caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                            <ZoomIn size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                        <p className="text-white text-[12px] font-semibold">{lab.images[0].caption}</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-0.5">
                    {lab.images.slice(0, 4).map((img, i) => {
                        const isWide = lab.images.length > 2 && i === 0;
                        return (
                            <div key={i}
                                className={`relative cursor-pointer group overflow-hidden ${isWide ? 'col-span-2' : ''}`}
                                onClick={() => onImageClick(globalImageOffset + i)}>
                                <div className={isWide ? 'h-40' : 'h-28'}>
                                    <img src={getOptimizedImageUrl(img.src, { width: isWide ? 600 : 300 })} alt={img.caption}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                                        <ZoomIn size={14} className="text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-2"
                                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                                    <p className="text-white text-[10px] font-semibold leading-tight">{img.caption}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info */}
            <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                    <PartnerPill name={lab.partner} size="sm" />
                    <div>
                        <h3 className="text-[16px] font-extrabold text-slate-900 leading-snug">{lab.name}</h3>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">{lab.tag}</p>
                    </div>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">{lab.desc}</p>
            </div>
        </motion.div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function CentreOfExcellence() {
    const coeLabs = useWebsiteStore((state) => state.coeLabs);
    const pageImages = useWebsiteStore((state) => state.pageImages || {});
    
    // Adapt Zustand lab representation to multi-image structure expected by this page
    const labSections = coeLabs.map(lab => ({
        ...lab,
        images: [{ src: lab.image, caption: lab.name }]
    }));

    const allImages = labSections.flatMap(l => l.images);
    const [lightbox, setLightbox] = useState(null);

    const offsets = labSections.reduce((acc, lab, i) => {
        acc[i] = i === 0 ? 0 : acc[i - 1] + labSections[i - 1].images.length;
        return acc;
    }, {});

    return (
        <PublicLayout>
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    <div className="absolute -top-16 -right-16 w-[480px] h-[480px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-[320px] h-[320px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-20 right-20 w-[180px] h-[180px] rounded-full bg-[#004AAD]/[0.04] pointer-events-none" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-32 right-64 w-9 h-9 rounded-xl border-[1.5px] border-[#004AAD]/15 pointer-events-none hidden lg:block" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-24 right-1/3 w-5 h-5 rounded bg-[#004AAD]/10 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-12">
                            {/* ── Left Content ── */}
                            <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                    className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Ethnotech Academy
                                </motion.span>
                                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[3.6rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.025em] mb-6">
                                    Centre of<br /><span className="text-[#004AAD]">Excellence</span>
                                </motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16px] text-slate-500 leading-[1.8] mb-8 max-w-xl">
                                    Empowering innovation through industry-aligned training, state-of-the-art infrastructure co-built with global tech leaders, and globally recognized certifications.
                                </motion.p>
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}
                                    className="flex flex-wrap items-center gap-3 mt-8">
                                    <span className="text-[12px] font-semibold text-slate-400 mr-2 hidden sm:block">Powered by:</span>
                                    {['Apple', 'IBM', 'Intel', 'Schneider Electric', 'Festo', 'AR / VR'].map((p, i) => (
                                        <PartnerPill key={i} name={p} size="md" />
                                    ))}
                                </motion.div>
                            </div>

                            {/* ── Right Collage ── */}
                            <div className="flex-1 w-full hidden lg:flex items-center justify-center gap-4 relative">
                                {/* Column 1 */}
                                <div className="flex flex-col gap-4 mt-20">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="w-52 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={getOptimizedImageUrl(pageImages['coe-1'] || "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584293/ethnotech/page_images/dfivijh6zw9zu44lm4er.jpg", { width: 500 })} alt="Apple Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="eager" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={getOptimizedImageUrl(pageImages['coe-2'] || "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584294/ethnotech/page_images/hxbwq7wsmlcxsanhgork.jpg", { width: 500 })} alt="Festo Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="eager" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white relative group">
                                        <img src={getOptimizedImageUrl(pageImages['coe-3'] || "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584296/ethnotech/page_images/sgwtst9dx9xmnu0xeme4.jpg", { width: 600 })} alt="AR VR Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="eager" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={getOptimizedImageUrl(pageImages['coe-4'] || "https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584297/ethnotech/page_images/h1wymxwvdkmrehzqttlm.jpg", { width: 600 })} alt="Festo Hydraulics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="eager" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Stats Strip ── */}
                <section className="bg-[#004AAD]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { val: '6+', label: 'Partner Labs' },
                                { val: '220+', label: 'Programs Offered' },
                                { val: '80+', label: 'Partner Institutions' },
                                { val: '2.7L+', label: 'Students Trained' },
                            ].map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="text-center md:border-r md:last:border-r-0 border-white/15">
                                    <p className="text-[2.4rem] font-extrabold text-white leading-none">{s.val}</p>
                                    <p className="text-blue-200 text-[11px] font-bold mt-1.5 uppercase tracking-[0.12em]">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Key Features ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">What sets us apart</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Key Features of the Centre</h2>
                            <p className="text-slate-500 text-[14px] max-w-lg mb-14 leading-relaxed">
                                Four pillars that make this the most trusted upskilling platform in India.
                            </p>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {features.map((f, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-7 flex items-start gap-5 hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)] transition-all duration-300 cursor-default">
                                    <div className="flex-shrink-0">{f.icon}</div>
                                    <div>
                                        <h3 className="text-[16px] font-bold text-slate-800 mb-2 group-hover:text-[#004AAD] transition-colors duration-200">{f.title}</h3>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Lab Image Gallery ── */}
                <section className="py-20 lg:py-28" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Our Infrastructure</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Inside Our Labs</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-12 leading-relaxed">
                                World-class facilities co-built with Apple, IBM, Intel, Schneider Electric, and Festo where students train on the exact same equipment used by industry professionals.
                            </p>
                        </FadeIn>

                        {/* Row 1 */}
                        <FadeIn delay={0.05}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                {[
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584234/ethnotech/coe/qd89a0ea0ki3x2agagsi.jpg', label: 'Apple iMac Lab', sub: '30+ Workstations', h: 'h-72' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584238/ethnotech/coe/k4gcz6xu4jloahmr16ts.jpg', label: 'AR/VR Innovation Lab', sub: 'Green Screen & Production Studio', h: 'h-72' },
                                ].map((img, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }}
                                        className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.h}`}
                                        onClick={() => setLightbox({ startIndex: i === 0 ? 0 : 3 })}>
                                        <img src={getOptimizedImageUrl(img.src, { width: 600 })} alt={img.label} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                                                <ZoomIn size={20} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 px-5 py-4">
                                            <p className="text-white text-[14px] font-bold">{img.label}</p>
                                            <p className="text-white/65 text-[12px] mt-0.5">{img.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Row 2 */}
                        <FadeIn delay={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                {[
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584318/ethnotech/coe/v0ioajqlzzwvw7omp8vb.jpg', label: 'VR Device Library', sub: 'Headsets & Equipment' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584235/ethnotech/coe/f2nby1qy1qfhpaymmmhz.jpg', label: 'IBM Centre of Excellence', sub: 'Enterprise Computing' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584237/ethnotech/coe/oaawcqdvmmkkia2ycm9h.jpg', label: 'Intel Computing Lab', sub: 'AI & Processor Architecture' },
                                ].map((img, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}
                                        className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                        <img src={getOptimizedImageUrl(img.src, { width: 400 })} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 px-4 py-3">
                                            <p className="text-white text-[12px] font-bold">{img.label}</p>
                                            <p className="text-white/65 text-[10px] mt-0.5">{img.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Row 3 */}
                        <FadeIn delay={0.13}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }}
                                    className="relative overflow-hidden rounded-2xl group cursor-pointer h-52 md:col-span-2">
                                    <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584321/ethnotech/coe/xpopw6xki8o26cuhb3wa.jpg", { width: 600 })} alt="Festo Pneumatics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-5 py-4">
                                        <p className="text-white text-[13px] font-bold">Festo Pneumatics Classroom</p>
                                        <p className="text-white/65 text-[11px]">Industrial Training Stations</p>
                                    </div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}
                                    className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                    <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584324/ethnotech/coe/hhvyydzhtr3pdi8zvato.jpg", { width: 400 })} alt="Conference Room" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                        <p className="text-white text-[12px] font-bold">Conference Room</p>
                                        <p className="text-white/65 text-[10px]">Industry Interactions</p>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeIn>

                        {/* Row 4 */}
                        <FadeIn delay={0.16}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584240/ethnotech/coe/zjpyiu6dye8fzd1uukhf.jpg', label: 'Festo Pneumatics Lab' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584320/ethnotech/coe/w8ijp9bfsp1iyngoyp7c.jpg', label: 'Festo Hydraulics Lab' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584323/ethnotech/coe/y5hq7vb2hsdcqaqyk3fr.jpg', label: 'Hydraulics Classroom' },
                                    { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584239/ethnotech/coe/vta1dmy3p5er5lic0crr.jpg', label: 'Schneider Automation' },
                                ].map((img, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.4, delay: i * 0.06 }}
                                        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                        className="relative overflow-hidden rounded-2xl group cursor-pointer h-44">
                                        <img src={getOptimizedImageUrl(img.src, { width: 300 })} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 px-3 py-3">
                                            <p className="text-white text-[11px] font-bold leading-tight">{img.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ── Lab Cards (Detailed) ── */}
                <section id="labs" className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Our Facilities</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Industry-Grade Lab Infrastructure</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-14 leading-relaxed">
                                Every lab is equipped, designed, and certified by its respective industry partner ensuring students train with the exact tools used in the real world.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {labSections.map((lab, i) => (
                                <LabCard
                                    key={lab.id}
                                    lab={lab}
                                    globalImageOffset={offsets[i] || 0}
                                    onImageClick={(imgIndex) => setLightbox({ startIndex: imgIndex })}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Pan-India Map ── */}
                <section id="presence" className="py-20 lg:py-28" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Pan-India Network</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Our Presence Across India</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-12 leading-relaxed">
                                With centres and partnerships spanning multiple states, we bring world-class skill training to students everywhere.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-10 mb-6">
                                <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584362/ethnotech/assets/pr4ilpxivofnevyuomiz.jpg", { width: 800 })}
                                    alt="Ethnotech Pan-India Presence Map — 30+ cities across India"
                                    className="w-full max-w-3xl mx-auto h-auto object-contain block"
                                    loading="lazy" />
                                <div className="mt-5 flex items-center gap-2 justify-center">
                                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-sm" />
                                    <span className="text-[13px] text-slate-500 font-medium">Ethnotech Centre / Partner Location</span>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.15}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                                {cities.map((loc, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.3, delay: i * 0.018 }}
                                        whileHover={{ y: -3, transition: { duration: 0.15 } }}
                                        className={`rounded-xl border px-3 py-2.5 cursor-default ${loc.hl
                                            ? 'bg-[#004AAD] border-[#004AAD]'
                                            : 'bg-white border-slate-100 hover:border-[#004AAD]/30 hover:bg-blue-50/50'
                                            } transition-all duration-200`}>
                                        <p className={`text-[12px] font-bold leading-tight ${loc.hl ? 'text-white' : 'text-slate-800'}`}>{loc.city}</p>
                                        <p className={`text-[10px] mt-0.5 ${loc.hl ? 'text-blue-200' : 'text-slate-400'}`}>{loc.state}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#004AAD] py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">Get in touch with us today</h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">Ready to transform your career? Reach out and take the first step.</p>
                            <motion.a href="mailto:info@ethnotech.in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                info@ethnotech.in →
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <LightboxModal
                        items={allImages}
                        startIndex={lightbox.startIndex}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
