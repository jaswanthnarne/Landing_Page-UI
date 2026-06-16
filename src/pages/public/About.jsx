import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import {
    CalendarDays, Target, Lightbulb, ArrowRight,
    Users, BookOpen, GraduationCap, Building2, MapPin, Compass, Rocket
} from 'lucide-react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { getOptimizedImageUrl } from '../../utils/cloudinary';


/* ─── Animation Components ─── */
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─── Timeline Data ─── */
const milestones = [
    { year: 2014, title: 'Establishment' },
    { year: 2015, title: 'Crossing milestone of 1000 students' },
    { year: 2016, title: 'First Centre of Excellence' },
    { year: 2022, title: '10th Centre of Excellence' },
    { year: 2024, title: '25th Centre of Excellence' },
    { year: 2025, title: '50th Centre of Excellence' },
    { year: 2026, title: '75+ Global Centre of Excellence' },
];

/* ─── Educational Partners ─── */
// Loaded dynamically from useWebsiteStore

const industryPartners = [
    { name: "Microsoft", logo: "/Partners/Microsoft-2012.svg" },
    { name: "AWS Academy", logo: "/Partners/aws-academy.jpg.jpeg" },
    { name: "Intel", logo: "/Partners/intel-logo-1.png" },
    { name: "NVIDIA", logo: "/Partners/Nvidia-Horizontal.png" },
    { name: "Adobe", logo: "/Partners/Adobe.jpg.jpeg" },
    { name: "Meta", logo: "/Partners/Facebook-Meta.svg" },
    { name: "IBM", logo: "/Partners/IBM-Career-Education.jpg.jpeg" },
    { name: "Schneider Electric", logo: "/Partners/Schneider-Electric-New.svg" },
    { name: "ABB", logo: "/Partners/ABB-New.svg" },
    { name: "MathWorks", logo: "/Partners/MathWorks-Logo.jpg.jpeg" },
    { name: "Autodesk", logo: "/Partners/autodesk.png" },
    { name: "Ansys", logo: "/Partners/Ansys.svg" },
    { name: "AMD", logo: "/Partners/amd-new.png" },
    { name: "Unity", logo: "/Partners/unity.png" },
    { name: "Mahindra", logo: "/Partners/mahindra-logo-1.png" },
    { name: "Tally", logo: "/Partners/Tally.svg" },
    { name: "Certiport", logo: "/Partners/certiport-logo-1.png" },
    { name: "Cambridge", logo: "/Partners/cambridge-1.jpg.jpeg" },
];

const About = () => {
    const educationalPartners = useWebsiteStore((state) => state.educationalPartners);
    const pageImages = useWebsiteStore((state) => state.pageImages || {});

    return (
        <PublicLayout>
            {/* ══════════ HERO SECTION & VISION/MISSION ══════════ */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden" style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                {/* Background Rotating Rings from CoE UI */}
                <div className="absolute -top-16 -right-16 w-[480px] h-[480px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                <div className="absolute top-4 right-4 w-[320px] h-[320px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                <div className="absolute top-20 right-20 w-[180px] h-[180px] rounded-full bg-[#004AAD]/[0.04] pointer-events-none" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-32 right-64 w-9 h-9 rounded-xl border-[1.5px] border-[#004AAD]/15 pointer-events-none hidden lg:block" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-24 right-1/3 w-5 h-5 rounded bg-[#004AAD]/10 pointer-events-none hidden lg:block" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-20 lg:mb-28">
                        {/* ── Left Content ── */}
                        <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-5 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                About Ethnotech
                            </motion.span>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[2.8rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.02em] mb-7">
                                Transforming Education<br className="hidden lg:block" /><span className="text-[#004AAD]"> Through Innovation</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                className="text-[16.5px] text-slate-500 leading-[1.8] max-w-lg mb-8">
                                At Ethnotech, we are committed to redefining education with cutting-edge solutions and a learner-centric approach. Our mission is to bridge the gap between knowledge and real-world application, empowering students and professionals with the skills they need to excel in an evolving world.
                            </motion.p>
                        </div>

                        {/* ── Right Collage (Events & Conferences) ── */}
                         <div className="flex-1 w-full hidden lg:flex items-center justify-center gap-4 relative">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-4 mt-24">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="w-44 h-56 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                    <img src={getOptimizedImageUrl(pageImages['about-1'] || "/Events/Light Ceremony .png", { width: 500 })} alt="Action Lighting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                    className="w-44 h-40 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                    <img src={getOptimizedImageUrl(pageImages['about-2'] || "/Events/Group Lighting.png", { width: 500 })} alt="Group Lighting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                </motion.div>
                            </div>

                            {/* Column 2 (Centerpiece) */}
                            <div className="flex flex-col gap-4 -mt-10 relative z-10">
                                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                    className="w-64 h-72 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[6px] border-white relative group">
                                    <img src={getOptimizedImageUrl(pageImages['about-3'] || "/Events/Keynote Speaker.png", { width: 600 })} alt="Keynote Speaker" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-[#004AAD]/5 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                    className="w-64 h-48 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                    <img src={getOptimizedImageUrl(pageImages['about-4'] || "/Events/Screenshot 2026-03-29 201005.png", { width: 500 })} alt="Handover Ceremony" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                </motion.div>
                            </div>

                            {/* Column 3 (Wide Panel) */}
                            <div className="flex flex-col gap-4 mt-16">
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                    className="w-48 h-64 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                    <img src={getOptimizedImageUrl(pageImages['about-5'] || "/Events/Panel Discussion .png", { width: 500 })} alt="Panel Discussion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                </motion.div>
                            </div>

                        </div>
                    </div>

                    {/* ── Vision / Mission Section ── */}
                    <div className="relative w-full">
                        {/* Central Divider Symbol (Hidden on Mobile) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] hidden md:flex flex-col items-center justify-center gap-3 z-0">
                            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 rotate-45 border border-white" />
                            <div className="w-px flex-1 bg-gradient-to-t from-transparent via-slate-200 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 w-full relative z-10">
                            {/* Vision Card */}
                            <FadeIn delay={0.25} direction="up">
                                <div className="group bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/60 p-7 flex items-start gap-5 hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)] transition-all duration-300 cursor-default h-full">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/[0.04] rounded-xl flex items-center justify-center text-[#004AAD] group-hover:bg-[#004AAD] group-hover:text-white transition-colors duration-300">
                                        <Compass size={22} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em]">Our Vision</h3>
                                            <div className="h-px w-6 bg-blue-100" />
                                        </div>
                                        <h4 className="text-[16px] font-bold text-slate-800 mb-2 group-hover:text-[#004AAD] transition-colors duration-200">
                                            "Building the Nation's Tomorrow Today"
                                        </h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">
                                            To impart students with necessary Knowledge, for them to take control of their own life, impose a sense of direction towards the fulfillment of their own Goals.
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Mission Card */}
                            <FadeIn delay={0.35} direction="up">
                                <div className="group bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/60 p-7 flex items-start gap-5 hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)] transition-all duration-300 cursor-default h-full">
                                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/[0.04] rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                        <Rocket size={22} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Our Mission</h3>
                                            <div className="h-px w-6 bg-emerald-100" />
                                        </div>
                                        <h4 className="text-[16px] font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                                            "Raising inquisitive learners"
                                        </h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">
                                            Our mission is to raise independent, ingenious and inquisitive learners. The dynamic and engaging nature of learning encourages discovery, creativity, and exploration in a supportive environment.
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ MILESTONES / TIMELINE ══════════ */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-slate-50 mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center max-w-2xl mx-auto mb-20">
                            <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">Our Journey</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Milestones of Growth & Innovation</h3>
                            <p className="text-slate-500 text-lg">
                                From our inception to becoming a trusted name in education, Ethnotech has continuously evolved to meet the needs of learners and industry. Explore our key milestones that define our commitment to excellence.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Desktop Horizontal Timeline */}
                    <div className="hidden md:block relative mt-16 mb-10 mx-4">
                        {/* Connecting Line positioned exactly behind the circles */}
                        <div className="absolute top-[80px] left-[8%] right-[8%] h-[3px] bg-slate-200 z-0"></div>
                        <div className="absolute top-[80px] left-[8%] w-[84%] h-[3px] bg-blue-500 z-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                        <div className="grid grid-cols-7 gap-4 relative z-10">
                            {milestones.map((m, i) => (
                                <FadeIn key={m.year} delay={i * 0.1} className="flex flex-col items-center group">
                                    {/* Top Label (Year) */}
                                    <div className={`text-xl font-bold h-8 flex items-center justify-center mb-6 transition-colors duration-300 ${i < 5 ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                                        {m.year}
                                    </div>

                                    {/* Icon Node */}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${i < 6 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-white'}`}>
                                        <CalendarDays size={20} />
                                    </div>

                                    {/* Bottom Content (Title) */}
                                    <div className="mt-8 text-center px-1 w-full">
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300 relative min-h-[96px] flex items-center justify-center">
                                            {/* Top Caret */}
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 group-hover:border-blue-200 rotate-45 transition-colors"></div>
                                            <p className="text-[13.5px] font-semibold text-slate-700 relative z-10 leading-snug">{m.title}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Vertical Timeline */}
                    <div className="block md:hidden relative ml-4 mt-10">
                        <div className="absolute top-0 bottom-0 left-[19px] w-1 bg-slate-200 z-0"></div>
                        <div className="absolute top-0 h-[80%] left-[19px] w-1 bg-blue-500 z-0"></div>

                        <div className="space-y-10 relative z-10">
                            {milestones.map((m, i) => (
                                <FadeIn key={m.year} delay={i * 0.1} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md shrink-0 transition-transform ${i < 5 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-white'}`}>
                                            <CalendarDays size={16} />
                                        </div>
                                    </div>
                                    <div className="pt-1 pb-4">
                                        <div className={`text-xl font-bold mb-2 ${i < 5 ? 'text-blue-600' : 'text-slate-500'}`}>{m.year}</div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                                            <p className="font-semibold text-slate-700">{m.title}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ══════════ PARTNERS SECTION ══════════ */}
            <section id="educational-partners" className="py-24 bg-slate-50 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Educational Partners</h2>
                            <p className="text-slate-500 text-lg">
                                We proudly partner with leading institutions, organizations, and industry experts to create a dynamic learning ecosystem with real-world knowledge and opportunities.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {educationalPartners.map((partner, i) => (
                            <FadeIn key={i} delay={i * 0.03} direction="up">
                                <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-between h-40 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group cursor-default text-center overflow-hidden">
                                    <div className="flex-1 flex items-center justify-center w-full p-1 opacity-85 group-hover:opacity-100 transition-opacity">
                                        <img
                                            src={getOptimizedImageUrl(partner.logo, { width: 250 })}
                                            alt={partner.name}
                                            className="max-h-[75px] max-w-full object-contain mix-blend-multiply"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="h-10 mt-2 flex items-center justify-center border-t border-slate-50 w-full pt-1">
                                        <p className="text-[12px] font-semibold text-slate-600 leading-tight group-hover:text-blue-700 line-clamp-2">
                                            {partner.name}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4} className="mt-16 flex justify-center">
                        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 group">
                            Partner With Us
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* ══════════ INDUSTRY PARTNERS ══════════ */}
            <section id="corporate-partners" className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Technology & Corporate Partners</h2>
                            <p className="text-slate-500">
                                Collaborating with global tech pioneers to bring industry-standard tools, methodology, and leading-edge technology to our learners.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16 pt-8 pb-4">
                        {industryPartners.map((partner, i) => (
                            <FadeIn key={i} delay={i * 0.02} direction="up" className="group flex items-center justify-center">
                                <img
                                    src={getOptimizedImageUrl(partner.logo, { width: 200 })}
                                    alt={partner.name}
                                    title={partner.name}
                                    className="w-auto h-10 md:h-12 max-w-[130px] md:max-w-[170px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 mix-blend-multiply"
                                    loading="lazy"
                                />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
};

export default About;
