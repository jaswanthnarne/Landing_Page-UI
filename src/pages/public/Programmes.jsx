import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, Cpu, Radio, Zap, Settings, Building2, Monitor, Briefcase, Palette } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
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

const renderDeptIcon = (name, size = 24) => {
    switch (name) {
        case 'Cpu': return <Cpu size={size} />;
        case 'Radio': return <Radio size={size} />;
        case 'Zap': return <Zap size={size} />;
        case 'Settings': return <Settings size={size} />;
        case 'Building2': return <Building2 size={size} />;
        case 'Monitor': return <Monitor size={size} />;
        case 'Briefcase': return <Briefcase size={size} />;
        case 'Palette': return <Palette size={size} />;
        default: return <Cpu size={size} />;
    }
};

const benefits = [
    'Live instructor-led sessions with industry experts',
    'Hands-on lab access with real tools and equipment',
    'Global certifications recognized by top companies',
    'Placement assistance & career counseling',
    'Flexible weekend and evening batches',
    'Project-based learning with live industry problems',
];

export default function Programmes() {
    const deptCourses = useWebsiteStore((state) => state.deptCourses);
    const placementPartners = useWebsiteStore((state) => state.placementPartners);
    const totalCourses = deptCourses.reduce((sum, d) => sum + d.courses.length, 0);
    const pageImages = useWebsiteStore((state) => state.pageImages || {});

    const highlights = [
        { val: `${totalCourses}+`, label: 'Courses Available' },
        { val: `${placementPartners.length}+`, label: 'Industry Partners' },
        { val: '2.7L+', label: 'Students Trained' },
        { val: '100%', label: 'Placement Support' },
    ];

    const [activeDept, setActiveDept] = useState(null);

    return (
        <PublicLayout>
            <SEO 
                title="Academic Programmes" 
                description="Explore industry-aligned certification and training programs in computer science, cybersecurity, and engineering disciplines."
                keywords="ethnotech programmes, computer science courses, engineering training, skilling india"
                path="/programmes"
            />
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    <div className="absolute -top-16 -right-16 w-[440px] h-[440px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-[300px] h-[300px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-16 right-16 w-[180px] h-[180px] rounded-full bg-[#004AAD]/[0.04] pointer-events-none" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-32 right-64 w-8 h-8 rounded-lg border-[1.5px] border-[#004AAD]/15 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-12">
                            {/* ── Left Content ── */}
                            <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.02em] mb-7">
                                    Our <br className="hidden lg:block"/><span className="text-[#004AAD]">Programmes</span>
                                </motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16.5px] text-slate-500 leading-relaxed mb-8 max-w-lg">
                                    Industry-aligned certification courses for every engineering, science, and management discipline — from CSE to Arts.
                                </motion.p>
                                
                                {/* Stats row */}
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap gap-3">
                                    {highlights.map((h, i) => (
                                        <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                                            <div>
                                                <p className="text-[15px] font-extrabold text-slate-900 leading-none">{h.val}</p>
                                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">{h.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* ── Right Collage ── */}
                            <div className="flex-1 w-full hidden lg:flex items-center justify-center gap-4 relative">
                                {/* Column 1 */}
                                <div className="flex flex-col gap-4 mt-20">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="w-52 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['programmes-1'] || "/Images/1-2.jpg.jpeg"} alt="Learning" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['programmes-2'] || "/Images/2-1.jpg.jpeg"} alt="Computing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white relative group">
                                        <img src={pageImages['programmes-3'] || "/Images/3-1.jpg.jpeg"} alt="AR Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['programmes-4'] || "/Images/Library-3-e1738919055776-600x401.jpg.jpeg"} alt="Intel Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Department Filter Tabs ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">By Department</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Programmes by Department</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-10 leading-relaxed">
                                Click any department to explore the full course list. All programmes include hands-on labs and global certifications.
                            </p>
                        </FadeIn>

                        {/* Dept tabs */}
                        <FadeIn delay={0.05}>
                            <div className="flex flex-wrap gap-2 mb-10">
                                <button onClick={() => setActiveDept(null)}
                                    className={`px-5 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 ${activeDept === null ? 'bg-[#004AAD] text-white shadow-[0_4px_16px_rgba(0,74,173,0.25)]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    All Departments
                                </button>
                                {deptCourses.map(d => (
                                    <button key={d.dept} onClick={() => setActiveDept(d.dept === activeDept ? null : d.dept)}
                                        className={`px-5 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 ${activeDept === d.dept ? 'bg-[#004AAD] text-white shadow-[0_4px_16px_rgba(0,74,173,0.25)]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {d.dept}
                                    </button>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Department cards grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDept || 'all'}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                                {deptCourses
                                    .filter(d => activeDept === null || d.dept === activeDept)
                                    .map((dept, i) => (
                                        <motion.div key={dept.dept}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.05 }}
                                            whileHover={{ y: -4, transition: { duration: 0.18 } }}
                                            className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,74,173,0.1)] hover:border-[#004AAD]/20 transition-all duration-300 cursor-default">
                                            {/* Dept header - Solid Color with Icon */}
                                            <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: dept.color }}>
                                                <div>
                                                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">Department</p>
                                                    <p className="text-white text-[20px] font-extrabold leading-tight mt-0.5">{dept.dept}</p>
                                                    <p className="text-white/65 text-[10px] mt-0.5 leading-snug">{dept.fullName}</p>
                                                </div>
                                                <div className="text-white/20">
                                                    {renderDeptIcon(dept.iconName)}
                                                </div>
                                            </div>
                                            {/* Course list */}
                                            <div className="p-5 space-y-3">
                                                {dept.courses.map((course, j) => (
                                                    <div key={j} className="flex items-start gap-2.5">
                                                        <span className="w-[5px] h-[5px] rounded-full mt-[6.5px] flex-shrink-0" style={{ backgroundColor: dept.color, opacity: 0.7 }} />
                                                        <p className="text-[12.5px] text-slate-600 leading-snug">{course}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── Programme Benefits ── */}
                <section className="py-20 lg:py-24" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <FadeIn>
                                <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Why Ethnotech</p>
                                <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-4">Every Programme is Designed to Get You Hired</h2>
                                <p className="text-slate-500 text-[14px] leading-relaxed">
                                    Our curriculum is built with industry experts to ensure every skill you learn is immediately applicable in the workplace.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <div className="space-y-3">
                                    {benefits.map((b, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, x: 16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.4, delay: i * 0.07 }}
                                            className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-100">
                                            <CheckCircle size={16} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                                            <p className="text-[13px] text-slate-700 leading-snug">{b}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#004AAD] py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">Ready to Enroll?</h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">Reach out to us and our counselors will help you find the right programme for your goals.</p>
                            <motion.a href="mailto:info@ethnotech.in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                info@ethnotech.in →
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
