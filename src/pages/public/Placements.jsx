import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
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

const services = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="24" cy="19" r="5.5" fill="#004AAD" />
                <path d="M14 35C14 29.5 18.5 25 24 25C29.5 25 34 29.5 34 35" stroke="#004AAD" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M29 17L33 21L29 25" stroke="#004AAD" strokeWidth="1.4" strokeOpacity="0.4" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Career Counseling',
        desc: 'Personalized guidance sessions with experienced mentors who help you identify the right career path and build a roadmap to achieve your goals.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="13" y="14" width="22" height="18" rx="2.5" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <path d="M17 20H31" stroke="#004AAD" strokeWidth="1.1" strokeOpacity="0.4" />
                <path d="M17 24H26" stroke="#004AAD" strokeWidth="1.1" strokeOpacity="0.35" />
                <path d="M17 28H22" stroke="#004AAD" strokeWidth="1.1" strokeOpacity="0.25" />
                <circle cx="33" cy="33" r="4" fill="#004AAD" />
                <path d="M31.5 33L33 34.5L35 32" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Resume & Interview Prep',
        desc: 'Expert review of your resume, LinkedIn profile, mock interviews with detailed feedback, and soft-skills coaching.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <path d="M13 24H35" stroke="#004AAD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13 19L22 24L13 29" fill="#004AAD" fillOpacity="0.25" />
                <path d="M26 19L35 24L26 29" fill="#004AAD" fillOpacity="0.12" />
                <circle cx="13" cy="24" r="2.5" fill="#004AAD" />
                <circle cx="35" cy="24" r="2.5" fill="#004AAD" fillOpacity="0.4" />
            </svg>
        ),
        title: 'Industry Partnerships',
        desc: 'Strategic alliances with 80+ leading companies across IT, manufacturing, BFSI, and more giving students direct access to recruiters.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="12" y="20" width="24" height="16" rx="2.5" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <path d="M17 20V17C17 14.8 18.8 13 21 13H27C29.2 13 31 14.8 31 17V20" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <rect x="21" y="25" width="6" height="4.5" rx="1" fill="#004AAD" fillOpacity="0.35" />
            </svg>
        ),
        title: 'Placement Drives & Job Fairs',
        desc: 'Regular on-campus hiring events, virtual recruitment drives, and dedicated job fairs connecting students directly with top employers.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <circle cx="19" cy="17" r="4" fill="#004AAD" />
                <circle cx="30" cy="22" r="3.5" fill="#004AAD" fillOpacity="0.4" />
                <circle cx="24" cy="31" r="3.5" fill="#004AAD" fillOpacity="0.25" />
                <path d="M23 17H30" stroke="#004AAD" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4" />
                <path d="M19 21L23 28" stroke="#004AAD" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4" />
                <path d="M30 25.5L26 28" stroke="#004AAD" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.3" />
            </svg>
        ),
        title: 'Alumni Network',
        desc: 'Access to a thriving community of Ethnotech alumni working at top companies globally  for mentorship, referrals, and lasting connections.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#004AAD" fillOpacity="0.09" />
                <rect x="15" y="14" width="18" height="22" rx="2" stroke="#004AAD" strokeWidth="1.6" fill="none" />
                <path d="M19 21H29" stroke="#004AAD" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
                <path d="M19 26H25" stroke="#004AAD" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
                <path d="M19 31H27" stroke="#004AAD" strokeWidth="1.2" strokeOpacity="0.2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Pre-Placement Training',
        desc: 'Intensive training modules covering aptitude, logical reasoning, and core technical skills to ensure you are day-one ready for your dream job.',
    },
];

// Hiring Partners will be loaded dynamically inside the component from useWebsiteStore

export default function Placements() {
    const hiringPartners = useWebsiteStore((state) => state.placementPartners);
    const pageImages = useWebsiteStore((state) => state.pageImages || {});

    return (
        <PublicLayout>
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
                                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                    className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Career Services
                                </motion.span>
                                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.02em] mb-7">
                                    Your Path to<br className="hidden lg:block"/><span className="text-[#004AAD]"> Career Success</span> Starts Here
                                </motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16.5px] text-slate-500 leading-relaxed mb-10 max-w-lg">
                                    Connecting talent with leading employers through dedicated placement support, expert career counseling, and a vast network of global industry partnerships.
                                </motion.p>
                                
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap gap-3">
                                    {[
                                        { icon: Briefcase, title: 'Top Employers', subtitle: 'Global Network' },
                                        { icon: Users, title: 'Dedicated Support', subtitle: 'Placement Cell' },
                                        { icon: TrendingUp, title: 'Career Growth', subtitle: 'Proven Track Record' },
                                        { icon: Award, title: 'Skill Excellence', subtitle: 'Industry Ready' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white hover:bg-[#004AAD]/[0.02] rounded-2xl border border-slate-100 hover:border-[#004AAD]/20 shadow-sm transition-all cursor-default">
                                            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                                                <s.icon size={16} className="text-[#004AAD]" />
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-bold text-slate-900 leading-none">{s.title}</p>
                                                <p className="text-[11px] text-slate-500 font-semibold mt-1 tracking-wide">{s.subtitle}</p>
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
                                        <img src={pageImages['placements-1'] || "/Images/8-1.jpg.jpeg"} alt="Interview Prep" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['placements-2'] || "/Images/9-1.jpg.jpeg"} alt="Skills Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white relative group">
                                        <img src={pageImages['placements-3'] || "/Images/10-1.jpg.jpeg"} alt="Corporate Connect" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['placements-4'] || "/Images/11-1.jpg.jpeg"} alt="Placement Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Services ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-3">How we help</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Connecting Talent with Leading Employers</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-14 leading-relaxed">End-to-end placement support from day one of your program until you sign your offer letter.</p>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {services.map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-6 h-full
                                               hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)]
                                               transition-colors duration-300 cursor-default">
                                    <div className="mb-4">{s.icon}</div>
                                    <h3 className="text-[15px] font-bold text-slate-800 mb-2 group-hover:text-[#004AAD] transition-colors duration-200">{s.title}</h3>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Hiring Partners ── */}
                <section id="recruitment-partners" className="py-20 lg:py-28" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-3">Hiring Ecosystem</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Our Recruitment Partners</h2>
                            <p className="text-slate-500 text-[14px] max-w-lg mb-12 leading-relaxed">Leading companies that actively hire from Ethnotech Academy programs.</p>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                                {hiringPartners.map((partner, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: i * 0.05 }}
                                        className="group px-6 py-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-center hover:shadow-[0_8px_30px_rgba(0,74,173,0.06)] hover:border-[#004AAD]/20 transition-all duration-300">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="w-full h-12 object-contain grayscale-[100%] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 mix-blend-multiply"
                                            loading="lazy"
                                        />
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
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed">Let our placement team help you land the right job at the right company.</p>
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
