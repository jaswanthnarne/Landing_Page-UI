import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'framer-motion';
import {
    ArrowRight, Star, Sparkles,
    GraduationCap, BriefcaseBusiness, Cpu, ShieldCheck, Globe2, Rocket,
    ChevronLeft, ChevronRight,
    CheckCircle, Award, Zap, Settings, Building2, Monitor, Briefcase, Palette, Radio, ZoomIn
} from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';
import SEO from '../components/common/SEO';
import { GradientCard } from '@/components/ui/gradient-card';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { useWebsiteStore } from '../store/useWebsiteStore';
import { getOptimizedImageUrl } from '../utils/cloudinary';


/* ─── Counter ─── */
const Counter = ({ target }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const [val, setVal] = useState('0');
    useEffect(() => {
        if (!inView) return;
        const n = parseFloat(target.replace(/[^0-9.]/g, ''));
        const dec = target.includes('.');
        const c = animate(0, n, {
            duration: 2, ease: 'easeOut',
            onUpdate(v) { setVal(dec ? v.toFixed(1) : Math.floor(v).toString()); }
        });
        return () => c.stop();
    }, [inView, target]);
    return <span ref={ref}>{inView ? val + target.replace(/[0-9.]/g, '') : '0'}</span>;
};

/* ─── Render Department Icon Helper ─── */
const renderDeptIcon = (name) => {
    switch (name) {
        case 'Cpu': return <Cpu size={16} />;
        case 'Radio': return <Radio size={16} />;
        case 'Zap': return <Zap size={16} />;
        case 'Settings': return <Settings size={16} />;
        case 'Building2': return <Building2 size={16} />;
        case 'Monitor': return <Monitor size={16} />;
        default: return <Cpu size={16} />;
    }
};

/* ─── Fade-in wrapper ─── */
const FadeIn = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}>
            {children}
        </motion.div>
    );
};

/* ─── Premium Animated Icons ─── */
const IconBase = ({ Icon, bgColor, iconColor, shadowColor, className = 'w-12 h-12' }) => (
    <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center justify-center rounded-xl overflow-hidden group ${className}`}
        style={{
            backgroundColor: bgColor,
            boxShadow: `0 4px 15px ${shadowColor}`,
            border: `1px solid ${iconColor}20`
        }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="w-[55%] h-[55%] z-10 transition-transform duration-300 group-hover:scale-110" style={{ color: iconColor }} strokeWidth={1.8} />
        {/* Glow behind the icon */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-full scale-150" style={{ backgroundColor: iconColor }} />
        {/* Shine line */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12" />
    </motion.div>
);

const IconGraduation = ({ className }) => <IconBase Icon={GraduationCap} bgColor="#f0f5ff" iconColor="#004AAD" shadowColor="rgba(0,74,173,0.15)" className={className} />;
const IconBriefcase = ({ className }) => <IconBase Icon={BriefcaseBusiness} bgColor="#ecfdf5" iconColor="#059669" shadowColor="rgba(5,150,105,0.15)" className={className} />;
const IconBrain = ({ className }) => <IconBase Icon={Cpu} bgColor="#f0f5ff" iconColor="#004AAD" shadowColor="rgba(0,74,173,0.15)" className={className} />;
const IconShieldLock = ({ className }) => <IconBase Icon={ShieldCheck} bgColor="#f5f3ff" iconColor="#7c3aed" shadowColor="rgba(124,58,237,0.15)" className={className} />;
const IconGlobe = ({ className }) => <IconBase Icon={Globe2} bgColor="#ecfeff" iconColor="#0891b2" shadowColor="rgba(8,145,178,0.15)" className={className} />;
const IconRocket = ({ className }) => <IconBase Icon={Rocket} bgColor="#fffbeb" iconColor="#d97706" shadowColor="rgba(217,119,6,0.15)" className={className} />;


const IconBuilding = ({ className = '' }) => (
    <svg viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 30V12L18 6L30 12V30H6Z" fill="white" fillOpacity="0.15" />
        <path d="M18 6L6 12V30H30V12L18 6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <rect x="11" y="16" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.5" />
        <rect x="21" y="16" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.5" />
        <rect x="15" y="22" width="6" height="8" rx="1" fill="white" fillOpacity="0.4" />
        <path d="M16 8H20" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
);

const IconPeople = ({ className = '' }) => (
    <svg viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="12" r="4" fill="#004AAD" />
        <path d="M10 28C10 23.6 13.6 20 18 20C22.4 20 26 23.6 26 28" stroke="#004AAD" strokeWidth="2" fill="none" />
        <circle cx="28" cy="14" r="3" fill="#004AAD" fillOpacity="0.35" />
        <path d="M25 28C25 24.5 27 22 29 22" stroke="#004AAD" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        <circle cx="8" cy="14" r="3" fill="#004AAD" fillOpacity="0.35" />
        <path d="M11 28C11 24.5 9 22 7 22" stroke="#004AAD" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
    </svg>
);

const IconBooks = ({ className = '' }) => (
    <svg viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="8" width="6" height="20" rx="1.5" fill="#004AAD" />
        <rect x="15" y="6" width="6" height="22" rx="1.5" fill="#004AAD" fillOpacity="0.6" />
        <rect x="23" y="10" width="6" height="18" rx="1.5" fill="#004AAD" fillOpacity="0.3" />
        <path d="M9 12H11" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M17 10H19" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M25 14H27" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
);

const IconStarRating = ({ className = '' }) => (
    <svg viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L21.7 13.5L30 14.7L24 20.5L25.4 28.7L18 24.8L10.6 28.7L12 20.5L6 14.7L14.3 13.5L18 6Z" fill="#d97706" />
        <path d="M18 6L21.7 13.5L30 14.7L24 20.5L25.4 28.7L18 24.8L10.6 28.7L12 20.5L6 14.7L14.3 13.5L18 6Z" fill="white" fillOpacity="0.15" />
    </svg>
);

const internshipSteps = [
    { step: '01', title: 'Apply & Enroll', desc: 'Select an internship track or capstone project mapping to your major and career trajectory.' },
    { step: '02', title: 'Onboard & Team Up', desc: 'Receive your development tools, align with a project team, and meet your industry mentor.' },
    { step: '03', title: 'Execute & Build', desc: 'Work on actual industry problems, submit code, and hit weekly agile milestones.' },
    { step: '04', title: 'Present & Certify', desc: 'Present your completed portfolio, perform code review, and earn your verified certification.' }
];

/* ═══════════════════════════════════════════════════ */
const LandingPage = () => {
    const heroSlides = useWebsiteStore((state) => state.heroSlides);
    const deptCourses = useWebsiteStore((state) => state.deptCourses);
    const coeLabs = useWebsiteStore((state) => state.coeLabs);
    const placementPartners = useWebsiteStore((state) => state.placementPartners);
    const educationalPartners = useWebsiteStore((state) => state.educationalPartners);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const [activeSlide, setActiveSlide] = useState(0);
    const [activeDept, setActiveDept] = useState('CSE');
    const timerRef = useRef(null);

    useEffect(() => {
        if (deptCourses.length > 0 && !deptCourses.some(d => d.dept === activeDept)) {
            setActiveDept(deptCourses[0].dept);
        }
    }, [deptCourses, activeDept]);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (heroSlides.length > 0) {
                setActiveSlide((prev) => (prev + 1) % heroSlides.length);
            }
        }, 5000); // 5 seconds
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [heroSlides]);

    const nextSlide = () => {
        if (heroSlides.length === 0) return;
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        resetTimer();
    };

    const prevSlide = () => {
        if (heroSlides.length === 0) return;
        setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        resetTimer();
    };

    const goToSlide = (index) => {
        setActiveSlide(index);
        resetTimer();
    };

    const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400";

    return (
        <PublicLayout>
            <SEO path="/" />
            <div className="bg-white overflow-x-hidden">

                {/* ══════════ HERO ══════════ */}
                <section ref={heroRef} id="home" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 40%, #f0f4ff 100%)' }}>
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10"
                    >
                        {/* Left */}
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#004AAD]/[0.07] text-[#004AAD] text-[12px] font-semibold rounded-md tracking-wide">
                                    <Sparkles size={12} className="text-amber-500" />
                                    SKILL DEVELOPMENT · TRAINING · PLACEMENT
                                </span>
                            </motion.div>

                            {/* Animated Heading */}
                            <div className="grid grid-cols-1 grid-rows-1 items-start">
                                <AnimatePresence>
                                    <motion.h1
                                        key={`heading-${activeSlide}`}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        className="col-start-1 row-start-1 text-[2.5rem] sm:text-[2.9rem] lg:text-[3.2rem] font-extrabold text-slate-900 leading-[1.1] tracking-[-0.02em]"
                                    >
                                        {heroSlides[activeSlide]?.heading}
                                    </motion.h1>
                                </AnimatePresence>
                            </div>

                            {/* Animated Description */}
                            <div className="grid grid-cols-1 grid-rows-1 items-start">
                                <AnimatePresence>
                                    <motion.p
                                        key={`desc-${activeSlide}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className="col-start-1 row-start-1 text-[15px] text-slate-500 max-w-md leading-[1.7]"
                                    >
                                        {heroSlides[activeSlide]?.description}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}
                                className="flex flex-wrap gap-4 pt-4">
                                <button onClick={() => window.open('https://ethops.jaswanthnarne.online/', '_blank', 'noopener,noreferrer')}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#004AAD] text-white text-[15px] font-bold rounded-xl hover:bg-[#003a8c] transition-all hover:shadow-xl hover:shadow-blue-500/30 group active:scale-[0.98]">
                                    Student Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a href="/programmes"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 text-[15px] font-bold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all hover:shadow-lg active:scale-[0.98]">
                                    View Programs
                                </a>
                            </motion.div>

                            {/* Slide Indicators */}
                            <div className="flex items-center gap-2 pt-2">
                                {heroSlides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide
                                            ? 'w-8 bg-[#004AAD]'
                                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Preload all hero images to avoid transition lag */}
                            <div className="hidden" aria-hidden="true">
                                {heroSlides.map((slide, index) => (
                                    <img
                                        key={`preload-${index}`}
                                        src={getOptimizedImageUrl(slide.image, { width: 1000 })}
                                        alt=""
                                    />
                                ))}
                            </div>

                            {/* Quick trust line */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="flex items-center gap-4 pt-2 text-[13px] text-slate-400">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                                    <span className="ml-1 font-medium">4.8</span>
                                </div>
                                <span className="w-px h-4 bg-slate-200" />
                                <span><span className="text-slate-600 font-semibold">250k+</span> students trained</span>
                                <span className="w-px h-4 bg-slate-200" />
                                <span><span className="text-slate-600 font-semibold">6000+</span> reviews</span>
                            </motion.div>
                        </div>

                        {/* Right — Hero Image Carousel */}
                        <div className="relative min-h-[500px] flex items-center justify-center">
                            <div className="relative w-full aspect-[16/10] lg:aspect-auto h-full min-h-[400px] flex items-center justify-center">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-blue-100/40 rounded-[3rem] blur-3xl opacity-60 animate-pulse" />
                                <div className="relative z-10 w-full max-w-lg">
                                    <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl p-4 overflow-hidden group/carousel">
                                        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden">
                                            <AnimatePresence>
                                                <motion.img
                                                    key={`hero-img-${activeSlide}`}
                                                    src={getOptimizedImageUrl(heroSlides[activeSlide]?.image, { width: 1000 })}
                                                    alt={`Ethnotech Academy slide ${activeSlide + 1}`}
                                                    initial={{ opacity: 0, scale: 1.05 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                    className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-lg"
                                                    loading="eager"
                                                    fetchPriority="high"
                                                />
                                            </AnimatePresence>
                                        </div>


                                        {/* Left Navigation Arrow */}
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white hover:text-[#004AAD] text-slate-800 rounded-full flex items-center justify-center border border-slate-200/50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-20 md:opacity-0 md:group-hover/carousel:opacity-100"
                                            aria-label="Previous slide"
                                        >
                                            <ChevronLeft size={20} strokeWidth={2.5} />
                                        </button>

                                        {/* Right Navigation Arrow */}
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white hover:text-[#004AAD] text-slate-800 rounded-full flex items-center justify-center border border-slate-200/50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-20 md:opacity-0 md:group-hover/carousel:opacity-100"
                                            aria-label="Next slide"
                                        >
                                            <ChevronRight size={20} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════ STATS BANNER ══════════ */}
                <section className="bg-[#004AAD] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M20 20h20v20H20z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                            {[
                                { val: `${deptCourses.reduce((sum, d) => sum + d.courses.length, 0)}+`, label: 'Programs Offered' },
                                { val: `${educationalPartners.length}+`, label: 'Partner Institutions' },
                                { val: '270 K+', label: 'Students Trained' },
                                { val: '6000+', label: 'Google Reviews' },
                            ].map((s, i) => (
                                <FadeIn key={i} delay={i * 0.08}>
                                    <div className="text-center md:border-r md:last:border-r-0 border-white/15">
                                        <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                            <Counter target={s.val} />
                                        </p>
                                        <p className="text-blue-200 text-[12px] font-medium mt-1 uppercase tracking-wider">{s.label}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ PARTNERS ══════════ */}
                <section className="py-14 bg-white border-b border-slate-100 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-10">Accredited by & Partnered with</p>

                            <div className="relative w-full overflow-hidden py-4">
                                <InfiniteSlider
                                    className="flex items-center w-full"
                                    duration={25}
                                    gap={64}
                                >
                                    {[
                                        { src: 'Skill-India-1.png', alt: 'Skill India' },
                                        { src: '300x300-1.png', alt: 'MSDE' },
                                        { src: 'NSDC.png', alt: 'NSDC' },
                                        { src: '300x300-3.png', alt: 'NEAT' },
                                        { src: 'Skill-India-1.png', alt: 'Skill India' },
                                        { src: '300x300-1.png', alt: 'MSDE' },
                                        { src: 'NSDC.png', alt: 'NSDC' },
                                        { src: '300x300-3.png', alt: 'NEAT' }
                                    ].map((logo, i) => (
                                        <div key={i} className="flex items-center justify-center shrink-0 w-44 sm:w-56 md:w-64 lg:w-72 group">
                                            <img
                                                src={`/assets/${logo.src}`}
                                                alt={logo.alt}
                                                className="h-24 sm:h-32 md:h-36 lg:h-44 w-auto object-contain mix-blend-darken contrast-[1.1] transition-all duration-500 group-hover:scale-105"
                                                loading="eager"
                                            />
                                        </div>
                                    ))}
                                </InfiniteSlider>

                                {/* Progressive Blurs on left and right for high-end aesthetic */}
                                <ProgressiveBlur
                                    className="pointer-events-none absolute top-0 left-0 h-full w-[80px] sm:w-[120px] md:w-[160px] z-10"
                                    direction="left"
                                    blurIntensity={0.8}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute top-0 right-0 h-full w-[80px] sm:w-[120px] md:w-[160px] z-10"
                                    direction="right"
                                    blurIntensity={0.8}
                                />
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ══════════ WHAT WE OFFER ══════════ */}
                <section id="programs" className="py-20 lg:py-24 relative overflow-hidden" style={{ background: '#fafbfc' }}>
                    {/* Decorative Background Shapes */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                        {/* Soft Circle Top Left */}
                        <motion.div
                            animate={{
                                y: [0, -40, 0],
                                rotate: [0, 45, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-20 -left-20 w-80 h-80 rounded-[4rem] bg-gradient-to-br from-[#004AAD]/[0.03] to-transparent border border-[#004AAD]/[0.02]"
                        />

                        {/* Floating Small Circle Middle */}
                        <motion.div
                            animate={{
                                x: [0, 100, 0],
                                y: [0, 50, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-blue-500/[0.04] blur-sm"
                        />

                        {/* Geometric Square Bottom Right */}
                        <motion.div
                            animate={{
                                rotate: [0, 90, 180, 270, 360],
                                x: [0, -30, 0]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-20 -right-10 w-64 h-64 rounded-3xl border-2 border-slate-200/40 opacity-40 rotate-12"
                        />

                        {/* Tiny Accent Dot */}
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-40 right-1/4 w-3 h-3 rounded-full bg-blue-400 group-hover:scale-150 transition-transform"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <FadeIn>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                                <div className="max-w-xl">
                                    <p className="text-[12px] font-bold text-[#004AAD] uppercase tracking-[0.15em] mb-2">What we offer</p>
                                    <h2 className="text-[1.85rem] lg:text-[2.1rem] font-extrabold text-slate-900 tracking-tight leading-tight">
                                        Bridging the gap between <br className="hidden md:block" />academia and industry
                                    </h2>
                                    <p className="text-slate-500 text-[14px] mt-3 leading-relaxed">
                                        Comprehensive programs designed for the next generation of tech professionals.
                                    </p>
                                </div>

                                {/* Minimal Abstract Design Element */}
                                <div className="hidden md:block relative h-24 w-64 mr-4 lg:mr-8 opacity-80">
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 256 96">
                                        {/* Bridge Line */}
                                        <motion.path
                                            d="M 20 48 C 80 48, 120 16, 180 16 C 210 16, 230 64, 250 64"
                                            fill="none"
                                            stroke="#004AAD"
                                            strokeWidth="2"
                                            strokeDasharray="4 6"
                                            strokeOpacity="0.25"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                        {/* Academia Node */}
                                        <circle cx="20" cy="48" r="16" fill="#f0f5ff" />
                                        <circle cx="20" cy="48" r="16" fill="none" stroke="#004AAD" strokeOpacity="0.2" strokeWidth="1" />

                                        {/* Industry Node */}
                                        <circle cx="250" cy="64" r="20" fill="#ecfdf5" />
                                        <circle cx="250" cy="64" r="20" fill="none" stroke="#059669" strokeOpacity="0.2" strokeWidth="1" />
                                    </svg>

                                    {/* Icon Overlays */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute left-[4px] top-[32px] pointer-events-none flex items-center justify-center"
                                    >
                                        <GraduationCap size={14} className="text-[#004AAD]" strokeWidth={1.5} />
                                    </motion.div>

                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], y: [0, -3, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                        className="absolute right-[-10px] top-[48px] pointer-events-none flex items-center justify-center"
                                    >
                                        <BriefcaseBusiness size={16} className="text-emerald-600" strokeWidth={1.5} />
                                    </motion.div>

                                    {/* Animated Connection Dot */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#004AAD] shadow-[0_0_10px_rgba(0,74,173,0.5)]"
                                        style={{ offsetPath: 'path("M 20 48 C 80 48, 120 16, 180 16 C 210 16, 230 64, 250 64")' }}
                                        animate={{ offsetDistance: ["0%", "100%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </div>
                        </FadeIn>

                        {/* Gradient Cards Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 w-full">
                            {[
                                {
                                    badgeText: "Industry-Aligned Curriculum",
                                    title: "B.Tech Programs",
                                    description: "Industry-aligned degree programs in AI, ML, Python FSD, Java FSD, Data Science & Cyber Security co-designed with global corporates.",
                                    ctaText: "Explore programs",
                                    ctaHref: "/programmes",
                                    icon: GraduationCap,
                                },
                                {
                                    badgeText: "95% Placement Rate",
                                    title: "Placement Support",
                                    description: "End-to-end recruitment assistance connecting students with top-tier companies. Dedicated placement cell across 80+ partner institutions.",
                                    ctaText: "Learn more",
                                    ctaHref: "/placements",
                                    icon: BriefcaseBusiness,
                                },
                                {
                                    badgeText: "AI · Cloud · Cyber Security",
                                    title: "Future Skills Hub",
                                    description: "State-of-the-art training hubs for AI, ML, Cloud Computing, Cybersecurity and Data Science with hands-on project experience.",
                                    ctaText: "Visit skills hub",
                                    ctaHref: "/centre-for-future-skills",
                                    icon: Cpu,
                                },
                                {
                                    badgeText: "Globally Recognized",
                                    title: "Certifications & Credentials",
                                    description: "Earn globally recognized certifications from industry leaders to validate your expertise in future skills.",
                                    ctaText: "Get certified",
                                    ctaHref: "/programmes",
                                    icon: Award,
                                },
                            ].map((card, index) => (
                                <FadeIn key={index} delay={0.05 + index * 0.08}>
                                    <GradientCard
                                        badgeText={card.badgeText}
                                        title={card.title}
                                        description={card.description}
                                        ctaText={card.ctaText}
                                        ctaHref={card.ctaHref}
                                        icon={card.icon}
                                    />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ FEATURED PROGRAMS ══════════ */}
                <section id="programs-list" className="py-20 lg:py-24 bg-white border-t border-slate-100 animate-fade-in">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <p className="text-[12px] font-bold text-[#004AAD] uppercase tracking-[0.15em] mb-2">Programmes by Major</p>
                                <h2 className="text-[1.85rem] lg:text-[2.2rem] font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Explore Courses by Department
                                </h2>
                                <p className="text-slate-500 text-[14px] mt-3 leading-relaxed">
                                    Explore industry-aligned training programs built in partnership with top technology leaders.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Tabs Filter */}
                        <FadeIn delay={0.05}>
                            <div className="flex flex-wrap justify-center gap-2 mb-10">
                                {deptCourses.map((d) => (
                                    <button
                                        key={d.dept}
                                        onClick={() => setActiveDept(d.dept)}
                                        className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 cursor-pointer ${activeDept === d.dept
                                            ? 'bg-[#004AAD] text-white shadow-lg shadow-blue-500/20 scale-[1.02]'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {renderDeptIcon(d.iconName)}
                                            {d.dept}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Tabs Content */}
                        <div className="relative min-h-[220px]">
                            <AnimatePresence mode="wait">
                                {deptCourses
                                    .filter((d) => d.dept === activeDept)
                                    .map((dept) => (
                                        <motion.div
                                            key={dept.dept}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                        >
                                            {dept.courses.map((course, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                    className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex gap-4 items-start shadow-sm hover:border-[#004AAD]/20 hover:bg-white hover:shadow-md transition-all duration-300"
                                                >
                                                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#004AAD] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                                                        {i + 1}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-[14px] font-bold text-slate-800 leading-snug">{course}</h4>
                                                        <p className="text-[11px] text-[#004AAD] font-semibold mt-1 uppercase tracking-wider"> </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    ))}
                            </AnimatePresence>
                        </div>

                        {/* CTA Link Button */}
                        <FadeIn delay={0.1}>
                            <div className="text-center mt-12">
                                <a
                                    href="/programmes"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#004AAD] text-white text-[14px] font-bold rounded-xl hover:bg-[#003a8c] transition-all hover:shadow-lg active:scale-[0.98] group font-semibold"
                                >
                                    Learn More & View Full Syllabus <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ══════════ CENTRE OF EXCELLENCE LABS ══════════ */}
                <section id="coe-labs-list" className="py-20 lg:py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/70 border border-blue-100/30 text-[#004AAD] text-[11px] font-bold rounded-full uppercase tracking-wider mb-3">
                                    Centre for Future Skills
                                </span>
                                <h2 className="text-[1.85rem] lg:text-[2.2rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                                    Empowering Innovation, Transforming Education
                                </h2>
                                <p className="text-slate-600 text-[14px] leading-relaxed mb-3">
                                    Ethnotech Academy, in collaboration with the National Skill Development Corporation (NSDC), has established the Centre for Future Skills. This initiative aims to equip students with competencies in emerging technologies to meet the evolving demands of the industry.
                                </p>
                                <p className="text-slate-600 text-[14px] leading-relaxed">
                                    Our center fosters a dynamic learning ecosystem where students gain hands-on experience with real-world technologies, preparing them for successful careers. Through strategic collaborations with leading tech corporations, we ensure our learners stay ahead in an ever evolving digital landscape designed to serve as a hub for innovation and skill development, contributing to the vision of a <span className="font-semibold text-[#004AAD]">'Viksit Bharat' (Developed India) by 2047</span>.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Labs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coeLabs.map((lab, index) => (
                                <FadeIn key={lab.id} delay={index * 0.05}>
                                    <div
                                        className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200 transition-all duration-300 h-full flex flex-col group cursor-default"
                                    >
                                        {/* Lab Cover Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={getOptimizedImageUrl(lab.image, { width: 600 })}
                                                alt={lab.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-sm text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                                                    {lab.partner}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Lab Info */}
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-[#004AAD] rounded">
                                                        {lab.tag}
                                                    </span>
                                                </div>
                                                <h3 className="text-[16px] font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-[#004AAD] transition-colors">
                                                    {lab.name}
                                                </h3>
                                                <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
                                                    {lab.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* CTA Link Button */}
                        <FadeIn delay={0.1}>
                            <div className="text-center mt-12">
                                <a
                                    href="/centre-of-excellence"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 text-[14px] font-bold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all hover:shadow-lg active:scale-[0.98] group font-semibold"
                                >
                                    Learn More & Explore Facilities <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ══════════ LAKSHYA 2047 PROMOTIONAL SECTION ══════════ */}
                <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-y border-slate-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[100px]" />
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-8 space-y-5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    Featured CFS Location
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                    Lakshya 2047: Centre for Future Skills <br />
                                    <span className="text-blue-400">Parul University, Gujarat</span>
                                </h2>
                                <p className="text-[14.5px] text-slate-300 leading-relaxed font-medium">
                                    Inaugurated by Union Minister Dr. Jitendra Singh, this dedicated two-floor building houses 15 specialized labs in partnerships with NVIDIA, Cisco, ABB, and Apple to prepare students for Viksit Bharat 2047.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <a href="/lakshya-2047" className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold rounded-xl shadow-lg shadow-blue-500/20 group active:scale-[0.98] transition-all duration-200">
                                        Explore Lakshya 2047 Labs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex justify-center">
                                <div className="relative border border-slate-800 rounded-2xl overflow-hidden aspect-[4/3] w-full max-w-sm shadow-2xl">
                                    <img src={getOptimizedImageUrl("https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576801/ethnotech/lakshya/mqgm0wi0nq8kdr30fn4p.jpg", { width: 500 })} alt="Lakshya 2047 Building" className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-slate-950/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ INTERNSHIPS & CAPSTONE PROJECTS ══════════ */}
                <section id="internships-list" className="py-20 lg:py-24 bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <p className="text-[12px] font-bold text-[#004AAD] uppercase tracking-[0.15em] mb-2">Experiential Learning</p>
                                <h2 className="text-[1.85rem] lg:text-[2.2rem] font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Structured Internship & Capstone Journey
                                </h2>
                                <p className="text-slate-500 text-[14px] mt-3 leading-relaxed">
                                    Bridge academic fundamentals with enterprise standards through a guided project delivery workflow.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {internshipSteps.map((step, index) => (
                                <FadeIn key={index} delay={index * 0.08}>
                                    <div
                                        className="bg-slate-50 rounded-2xl border border-slate-100 p-6 h-full hover:border-[#004AAD]/20 hover:bg-white hover:shadow-lg transition-all duration-300 relative group cursor-default"
                                    >
                                        <p className="text-[3.2rem] font-extrabold text-[#004AAD]/10 leading-none mb-3 group-hover:text-[#004AAD]/20 transition-colors">
                                            {step.step}
                                        </p>
                                        <h3 className="text-[15px] font-bold text-slate-800 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">
                                            {step.desc}
                                        </p>
                                        {/* Connector line */}
                                        {index < internshipSteps.length - 1 && (
                                            <div className="absolute top-1/2 -right-3.5 w-7 h-px bg-slate-200 hidden lg:block" />
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* CTA Link Button */}
                        <FadeIn delay={0.1}>
                            <div className="text-center mt-12">
                                <a
                                    href="/internship-and-projects"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#004AAD] text-white text-[14px] font-bold rounded-xl hover:bg-[#003a8c] transition-all hover:shadow-lg active:scale-[0.98] group font-semibold"
                                >
                                    Learn More & Apply for Internships <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ══════════ PLACEMENTS & HIRING PARTNERS ══════════ */}
                <section id="placements-list" className="py-20 lg:py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <p className="text-[12px] font-bold text-[#004AAD] uppercase tracking-[0.15em] mb-2">Placement Services</p>
                                <h2 className="text-[1.85rem] lg:text-[2.2rem] font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Our Marquee Hiring Partners
                                </h2>
                                <p className="text-slate-500 text-[14px] mt-3 leading-relaxed">
                                    Join the placement network hired by top global tech leaders and leading multinational corporations.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Partner Logo Grid */}
                        <FadeIn delay={0.05}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-12">
                                {placementPartners.map((partner, i) => (
                                    <div
                                        key={i}
                                        className="group px-6 py-6 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-center hover:shadow-md hover:border-[#004AAD]/20 transition-all duration-300 cursor-default"
                                    >
                                        <img
                                            src={getOptimizedImageUrl(partner.logo, { width: 200 })}
                                            alt={partner.name}
                                            className="h-10 w-auto max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 mix-blend-multiply"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* CTA Link Button */}
                        <FadeIn delay={0.1}>
                            <div className="text-center">
                                <a
                                    href="/placements"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 text-[14px] font-bold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all hover:shadow-lg active:scale-[0.98] group font-semibold"
                                >
                                    Learn More & View Placement Records <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ══════════ WHY US ══════════ */}
                <section className="py-20 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <FadeIn>
                                <p className="text-[12px] font-bold text-[#004AAD] uppercase tracking-[0.15em] mb-2">Why Ethnotech</p>
                                <h2 className="text-[1.85rem] lg:text-[2.1rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
                                    Empowering students with real-world skills
                                </h2>
                                <p className="text-slate-500 text-[14px] leading-relaxed mb-8">
                                    We go beyond traditional academics, integrating industry mentorship, hands-on projects, and global certification pathways to build career-ready professionals.
                                </p>
                                <div className="space-y-3.5">
                                    {[
                                        'Direct industry partnerships with 80+ institutions',
                                        'Curriculum co-designed with sector skill councils',
                                        'Hands-on projects and real-world case studies',
                                        'Dedicated placement cell with 95% success rate',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#004AAD] mt-[7px] flex-shrink-0 group-hover:scale-150 transition-transform duration-200" />
                                            <span className="text-[14px] text-slate-600 leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href="/programmes" className="inline-flex items-center gap-2 mt-8 text-[14px] font-semibold text-[#004AAD] hover:gap-3 transition-all duration-200 group">
                                    Explore our programs <ArrowRight size={15} />
                                </a>
                            </FadeIn>

                            <FadeIn delay={0.15}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#004AAD] rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-[#004AAD]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                                        <IconBuilding className="w-8 h-8 mb-2" />
                                        <p className="text-3xl font-extrabold">80+</p>
                                        <p className="text-blue-200 text-[12px] font-medium mt-0.5">Partner Institutions</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                                        <IconPeople className="w-8 h-8 mb-2" />
                                        <p className="text-3xl font-extrabold text-slate-800">2.7L+</p>
                                        <p className="text-slate-500 text-[12px] font-medium mt-0.5">Students Trained</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                                        <IconBooks className="w-8 h-8 mb-2" />
                                        <p className="text-3xl font-extrabold text-slate-800">220+</p>
                                        <p className="text-slate-500 text-[12px] font-medium mt-0.5">Programs</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                                        <IconStarRating className="w-8 h-8 mb-2" />
                                        <p className="text-3xl font-extrabold text-slate-800">4.8<span className="text-lg">/5</span></p>
                                        <p className="text-slate-500 text-[12px] font-medium mt-0.5">Student Rating</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ══════════ BOTTOM CTA ══════════ */}
                <section className="bg-[#004AAD] relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
                    </div>
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-white tracking-tight mb-3 leading-tight">
                                Ready to elevate your career?
                            </h2>
                            <p className="text-blue-200 text-[14px] max-w-md mx-auto mb-8 leading-relaxed">
                                Join thousands of students across India who trust Ethnotech for future skill development and placement support.
                            </p>
                            <button
                                onClick={() => window.open('https://ethops.jaswanthnarne.online/', '_blank', 'noopener,noreferrer')}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-all hover:scale-[1.02] shadow-xl shadow-black/10 group active:scale-[0.98]"
                            >
                                Go to Student Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
};

export default LandingPage;
