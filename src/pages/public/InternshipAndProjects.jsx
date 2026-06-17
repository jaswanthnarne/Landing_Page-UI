import { motion } from 'framer-motion';
import { Clock, Users, Star, BookOpen, Rocket } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';

const FadeIn = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}>
        {children}
    </motion.div>
);

const offerings = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="12" y="13" width="24" height="20" rx="2.5" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <path d="M17 20H31" stroke="#004AAD" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M17 25H25" stroke="#004AAD" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.35" />
                <path d="M27 28L31 24L29 22L25 26V28H27Z" fill="#004AAD" fillOpacity="0.45" />
            </svg>
        ),
        title: 'Industry-Aligned Internships',
        desc: 'Structured 4–12 week internship programs with leading companies, giving students hands-on exposure to real business challenges.',
        tags: ['Paid Stipend', '4–12 Weeks', 'Certificate'],
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="24" cy="21" r="8" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <path d="M24 14V21L28 25" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16 33H32" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
                <circle cx="24" cy="21" r="2.5" fill="#004AAD" fillOpacity="0.3" />
            </svg>
        ),
        title: 'Capstone Projects',
        desc: 'End-to-end project development under expert guidance — solving real industry problems that strengthen your portfolio.',
        tags: ['Team-based', '8 Weeks', 'Industry Problem'],
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="14" y="12" width="13" height="18" rx="1.5" fill="#004AAD" fillOpacity="0.3" />
                <rect x="21" y="15" width="13" height="18" rx="1.5" stroke="#004AAD" strokeWidth="1.5" fill="white" />
                <path d="M24 20H31" stroke="#004AAD" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M24 24H29" stroke="#004AAD" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.35" />
                <circle cx="32" cy="30" r="4" fill="#004AAD" />
                <path d="M30.5 30L32 31.5L34 29.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Portfolio Development',
        desc: 'Dedicated sessions to craft a compelling professional portfolio with curated projects and documentation.',
        tags: ['GitHub', 'Documentation', 'Presentation'],
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <path d="M13 24H35" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M24 13L35 24L24 35" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="13" cy="24" r="2.5" fill="#004AAD" />
                <path d="M17 19L21 24L17 29" stroke="#004AAD" strokeWidth="1.1" strokeOpacity="0.3" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Live Projects',
        desc: 'Work on actual client projects — experiencing the full software development lifecycle with code reviews and agile methodologies.',
        tags: ['Agile', 'Real Clients', 'Live Deployment'],
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="19" cy="17" r="5" fill="#004AAD" />
                <path d="M11 35C11 29 14.6 25 19 25" stroke="#004AAD" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="30" cy="20" r="4" fill="#004AAD" fillOpacity="0.4" />
                <path d="M25 31C25 27 27.5 24 30 24C32.5 24 35 27 35 31" stroke="#004AAD" strokeWidth="1.6" strokeOpacity="0.4" fill="none" strokeLinecap="round" />
                <path d="M19 25C21.5 25 24 26.5 26 26.5" stroke="#004AAD" strokeWidth="1.6" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
        title: 'Mentorship & Guidance',
        desc: 'One-on-one mentoring from industry professionals providing career advice, technical guidance, and interview prep support.',
        tags: ['1-on-1', 'Industry Experts', 'Weekly Sessions'],
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <path d="M24 14L13 20L24 26L35 20L24 14Z" fill="#004AAD" />
                <path d="M17 23V29C17 29 20 32 24 32C28 32 31 29 31 29V23L24 26L17 23Z" fill="#004AAD" fillOpacity="0.4" />
                <path d="M33 20V28" stroke="#004AAD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Global Certifications',
        desc: 'Internationally recognized certifications validated by industry-leading technology partners and global skill bodies.',
        tags: ['Validated', 'Professional', 'Worldwide'],
    },
];

const process = [
    { step: '01', title: 'Apply & Enroll', desc: 'Register for an internship or project program that matches your interest and skill level.' },
    { step: '02', title: 'Orientation & Teams', desc: 'Get introduced to your project, team, mentor, and tools in a structured onboarding.' },
    { step: '03', title: 'Execute & Build', desc: 'Work on real problems under expert supervision with weekly milestones.' },
    { step: '04', title: 'Present & Certify', desc: 'Present your work, receive feedback, and earn a verifiable certificate.' },
];

export default function InternshipAndProjects() {
    const pageImages = useWebsiteStore((state) => state.pageImages || {});
    return (
        <PublicLayout>
            <SEO 
                title="Internships & Projects" 
                description="Gain practical experience with industry-aligned internships, capstone projects, portfolio building, and live client projects."
                keywords="ethnotech internships, student projects, capstone projects, career skilling, engineering portfolio"
                path="/internship-and-projects"
            />
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    <div className="absolute -top-16 -right-16 w-[440px] h-[440px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-[300px] h-[300px] rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-16 right-16 w-[180px] h-[180px] rounded-full bg-[#004AAD]/[0.04] pointer-events-none" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-40 right-56 w-7 h-7 rounded-lg border-[1.5px] border-[#004AAD]/15 pointer-events-none hidden lg:block" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-24 right-1/4 w-5 h-5 rounded bg-[#004AAD]/10 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-12">
                            {/* ── Left Content ── */}
                            <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                    className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Experiential Learning
                                </motion.span>
                                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.02em] mb-7">
                                    Real-World Experience<br className="hidden lg:block" /><span className="text-[#004AAD]"> for Career Success</span>
                                </motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16.5px] text-slate-500 leading-relaxed mb-10 max-w-lg">
                                    Bridging the gap between classroom learning and industry expectations through structured internships, capstone projects, live engagements, and expert mentorship.
                                </motion.p>

                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap gap-3">
                                    {[
                                        { icon: Clock, val: '4–12 Wks', label: 'Duration' },
                                        { icon: Users, val: '500+', label: 'Active Interns' },
                                        { icon: Star, val: '4.9/5', label: 'Rating' },
                                        { icon: BookOpen, val: '50+', label: 'Live Projects' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                                            <s.icon size={15} className="text-[#004AAD]" />
                                            <div>
                                                <p className="text-[15px] font-extrabold text-slate-900 leading-none">{s.val}</p>
                                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">{s.label}</p>
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
                                        <img src={pageImages['internships-1'] || "/Images/4-1.jpg.jpeg"} alt="Project Hardware" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['internships-2'] || "/Images/5-1.jpg.jpeg"} alt="Mentorship" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white relative group">
                                        <img src={pageImages['internships-3'] || "/Images/6-1.jpg.jpeg"} alt="Live Projects" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['internships-4'] || "/Images/7-1.jpg.jpeg"} alt="AR/VR Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Offerings ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-3">What we offer</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Our Internship & Project Offerings</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-14 leading-relaxed">Every program is designed to develop job-ready skills through experiential, project-based learning.</p>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {offerings.map((o, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-6 h-full
                                               hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)]
                                               transition-colors duration-300 cursor-default">
                                    <div className="mb-4">{o.icon}</div>
                                    <h3 className="text-[15px] font-bold text-slate-800 mb-2 group-hover:text-[#004AAD] transition-colors duration-200">{o.title}</h3>
                                    <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{o.desc}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {o.tags.map(t => (
                                            <span key={t} className="inline-block px-2.5 py-1 bg-[#004AAD]/[0.07] text-[#004AAD] text-[11px] font-bold rounded-md">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Process ── */}
                <section className="py-20 lg:py-28" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-3">How it works</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Bridging Academics with Industry</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-14 leading-relaxed">A structured four-step journey from application to certification.</p>
                        </FadeIn>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {process.map((p, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="bg-white rounded-2xl border border-slate-100 p-6 h-full hover:border-[#004AAD]/20 hover:shadow-lg transition-all duration-300 relative">
                                    <p className="text-[3.5rem] font-extrabold text-[#004AAD]/[0.07] leading-none mb-3">{p.step}</p>
                                    <h3 className="text-[15px] font-bold text-slate-800 mb-2">{p.title}</h3>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">{p.desc}</p>
                                    {/* connector line */}
                                    {i < process.length - 1 && (
                                        <div className="absolute top-1/2 -right-2 w-4 h-px bg-slate-200 hidden lg:block" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#004AAD] py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">Ready to gain real-world experience?</h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">Apply for an internship or project program and start building your career today.</p>
                            <motion.a href="mailto:info@ethnotech.in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                info@ethnotech.in
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
