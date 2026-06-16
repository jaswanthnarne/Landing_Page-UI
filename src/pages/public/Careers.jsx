import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Briefcase, MapPin, Clock, X, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';

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

const expertise = [
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <path d="M22 13L12 18.5L22 24L32 18.5L22 13Z" fill="#004AAD" />
                <path d="M16 21V26.5C16 26.5 18.5 29 22 29C25.5 29 28 26.5 28 26.5V21L22 24L16 21Z" fill="#004AAD" fillOpacity="0.45" />
            </svg>
        ),
        title: 'EdTech & E-Learning',
        desc: 'Designing next-gen digital learning ecosystems including LMS platforms, virtual labs, and AI-powered tutoring tools.',
    },
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <circle cx="22" cy="18" r="4.5" fill="#004AAD" />
                <path d="M14 32C14 27.6 17.6 24 22 24C26.4 24 30 27.6 30 32" stroke="#004AAD" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M29 14L33 18L29 22" stroke="#004AAD" strokeWidth="1.3" strokeOpacity="0.45" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Talent Development',
        desc: 'End-to-end skilling solutions — from onboarding programs and upskilling tracks to advanced corporate training.',
    },
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <rect x="12" y="16" width="20" height="13" rx="2" fill="#004AAD" fillOpacity="0.85" />
                <path d="M17 16V14C17 12.9 17.9 12 19 12H25C26.1 12 27 12.9 27 14V16" stroke="#004AAD" strokeWidth="1.4" fill="none" />
                <path d="M12 22H32" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
                <rect x="19" y="20" width="6" height="3.5" rx="0.8" fill="white" fillOpacity="0.5" />
            </svg>
        ),
        title: 'Corporate Upskilling',
        desc: 'Customized training modules for enterprises looking to reskill or upskill their workforce in emerging technologies.',
    },
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <circle cx="22" cy="22" r="9" stroke="#004AAD" strokeWidth="1.5" fill="none" />
                <ellipse cx="22" cy="22" rx="4" ry="9" stroke="#004AAD" strokeWidth="1.2" fill="none" />
                <path d="M13 22H31" stroke="#004AAD" strokeWidth="1" strokeOpacity="0.4" />
                <circle cx="30" cy="30" r="3.5" fill="#004AAD" />
                <path d="M28.5 30L29.5 31L31 29" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Global Skill Frameworks',
        desc: 'Internationally aligned skill frameworks and micro-credential pathways recognized by global industry bodies.',
    },
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <rect x="11" y="14" width="22" height="16" rx="2" stroke="#004AAD" strokeWidth="1.5" fill="none" />
                <path d="M15 20H29" stroke="#004AAD" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M15 24H22" stroke="#004AAD" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.35" />
                <path d="M26 22L29 24L26 26" stroke="#004AAD" strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.5" />
            </svg>
        ),
        title: 'Certifications & Credentials',
        desc: 'Industry-aligned learning pathways leading to recognized digital credentials and career certifications.',
    },
    {
        icon: (
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                <rect width="44" height="44" rx="11" fill="#004AAD" fillOpacity="0.08" />
                <path d="M22 11L25.5 18.5L34 19.8L28 25.5L29.4 34L22 30L14.6 34L16 25.5L10 19.8L18.5 18.5L22 11Z" fill="#004AAD" fillOpacity="0.6" />
            </svg>
        ),
        title: 'Award-Winning Research',
        desc: 'Cutting-edge research in pedagogy, future of work, and emerging technology education adopted by leading universities.',
    },
];

// Decorative dot grid
const DotGrid = ({ rows = 6, cols = 10, className = '' }) => (
    <svg width={cols * 18} height={rows * 18} viewBox={`0 0 ${cols * 18} ${rows * 18}`} className={className}>
        {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="1.5" fill="#004AAD" fillOpacity="0.12" />
            ))
        )}
    </svg>
);

export default function Careers() {
    const jobOpenings = useWebsiteStore((state) => state.jobOpenings);
    const addJobApplication = useWebsiteStore((state) => state.addJobApplication);
    const pageImages = useWebsiteStore((state) => state.pageImages || {});

    const [selectedJob, setSelectedJob] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cover, setCover] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setName('');
        setEmail('');
        setPhone('');
        setCover('');
        setResumeFile(null);
        setIsSuccess(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            alert('Please select and upload your resume/portfolio.');
            return;
        }

        setIsUploading(true);
        try {
            // Upload file to Cloudinary under 'resumes' folder
            const uploadedUrl = await uploadToCloudinary(resumeFile, 'resumes');

            // Save job application details to Zustand store
            addJobApplication({
                jobId: selectedJob.id,
                jobTitle: selectedJob.title,
                candidateName: name,
                candidateEmail: email,
                candidatePhone: phone,
                coverMessage: cover,
                resumeUrl: uploadedUrl
            });

            setIsSuccess(true);
        } catch (err) {
            alert(err.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <PublicLayout>
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    {/* Decorative shapes */}
                    <div className="absolute top-12 right-12 w-72 h-72 rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-24 right-24 w-44 h-44 rounded-full border-[1.5px] border-[#004AAD]/10 pointer-events-none" />
                    <div className="absolute top-36 right-36 w-20 h-20 rounded-full bg-[#004AAD]/5 pointer-events-none" />
                    <DotGrid rows={5} cols={8} className="absolute bottom-10 right-10 opacity-70 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-12">
                            {/* ── Left Content ── */}
                            <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45 }}
                                    className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Join Our Team
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.02em] mb-7">
                                    A Workplace That Fuels<br className="hidden lg:block"/><span className="text-[#004AAD]"> Innovation & Growth</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16.5px] text-slate-500 leading-relaxed mb-8 max-w-lg">
                                    At Ethnotech, we believe great education starts with great people. Join a team of educators, technologists, and strategists working together to transform how India learns.
                                </motion.p>
                                <motion.a
                                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    href="mailto:info@ethnotech.in"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#004AAD] text-white text-[14px] font-bold rounded-xl hover:bg-[#003a8c] transition-colors shadow-[0_4px_16px_rgba(0,74,173,0.3)]">
                                    <Mail size={16} />
                                    info@ethnotech.in
                                </motion.a>
                            </div>

                            {/* ── Right Collage ── */}
                            <div className="flex-1 w-full hidden lg:flex items-center justify-center gap-4 relative">
                                {/* Column 1 */}
                                <div className="flex flex-col gap-4 mt-20">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="w-52 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['careers-1'] || "/Images/12-1.jpg.jpeg"} alt="Team Meeting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['careers-2'] || "/Images/4-2.jpg.jpeg"} alt="Innovation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white relative group">
                                        <img src={pageImages['careers-3'] || "/Images/2-2.jpg.jpeg"} alt="Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src={pageImages['careers-4'] || "/Images/5-2.jpg.jpeg"} alt="Creative Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#004AAD]/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── What We Do ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-3">What we do</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Our Expertise</h2>
                            <p className="text-slate-500 text-[14px] max-w-lg mb-14 leading-relaxed">
                                We're building the future of education and workforce development across six core domains.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {expertise.map((e, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-6 cursor-default
                                               hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)]
                                               transition-colors duration-300">
                                    <div className="mb-4">{e.icon}</div>
                                    <h3 className="text-[15px] font-bold text-slate-800 mb-2 group-hover:text-[#004AAD] transition-colors duration-200">{e.title}</h3>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">{e.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Current Job Openings ── */}
                <section id="openings" className="py-20 lg:py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Join us</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Current Job Openings</h2>
                            <p className="text-slate-500 text-[14px] max-w-lg mb-12 leading-relaxed">
                                Explore active career paths and training opportunities. Submit your application online below.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 gap-6">
                            {jobOpenings.length === 0 ? (
                                <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl text-slate-400">
                                    <Briefcase size={36} className="opacity-25 mx-auto mb-2" />
                                    <p className="text-[13px] font-bold">No active job openings at the moment. Check back soon!</p>
                                </div>
                            ) : (
                                jobOpenings.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-2.5 py-0.5 bg-blue-50 text-[#004AAD] text-[10px] font-bold rounded uppercase">
                                                    {job.department}
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                                                    {job.type}
                                                </span>
                                                <span className="text-[12px] text-slate-400 font-semibold">{job.location} · {job.experience} exp</span>
                                            </div>
                                            <h3 className="text-[18px] font-extrabold text-slate-800 leading-snug">{job.title}</h3>
                                            <div className="text-[13px] text-slate-500 leading-relaxed max-w-3xl space-y-2">
                                                <p><strong className="text-slate-700 font-bold">Role:</strong> {job.description}</p>
                                                <p><strong className="text-slate-700 font-bold">Requirements:</strong> {job.requirements}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleApplyClick(job)}
                                            className="px-6 py-3 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer shrink-0 align-self-start"
                                        >
                                            Apply Now
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Job Application Modal ── */}
                <AnimatePresence>
                    {selectedJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedJob(null)}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />

                            {/* Modal Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
                            >
                                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-extrabold text-[15px] text-slate-800">Job Application</h3>
                                        <span className="text-[10px] text-[#004AAD] font-bold block mt-1 uppercase">Role: {selectedJob.title}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(null)}
                                        className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {isSuccess ? (
                                    <div className="p-8 text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                            <CheckCircle2 size={36} />
                                        </div>
                                        <h4 className="text-[18px] font-extrabold text-slate-800">Application Submitted!</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                                            Thank you for applying. Our talent recruitment team will review your resume and contact you soon.
                                        </p>
                                        <button
                                            onClick={() => setSelectedJob(null)}
                                            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold rounded-xl transition-colors mt-4"
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                        <div className="space-y-1">
                                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all font-medium"
                                                placeholder="e.g. Jaswanth Narne"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all font-medium"
                                                    placeholder="name@email.com"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all font-medium"
                                                    placeholder="e.g. +91 9876543210"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Cover Message (Optional)</label>
                                            <textarea
                                                rows={3}
                                                value={cover}
                                                onChange={(e) => setCover(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all font-medium"
                                                placeholder="Briefly introduce yourself and why you'd fit this role..."
                                            />
                                        </div>

                                        {/* File Upload to Cloudinary */}
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide block">Resume / CV (PDF/Doc/Image)</label>
                                            <div className="relative border-2 border-dashed border-slate-200 hover:border-[#004AAD] rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                                {isUploading ? (
                                                    <>
                                                        <Loader2 className="animate-spin text-[#004AAD] mb-1.5" size={24} />
                                                        <span className="text-[11px] font-bold text-slate-600">Uploading resume to Cloudinary...</span>
                                                    </>
                                                ) : resumeFile ? (
                                                    <>
                                                        <CheckCircle2 className="text-emerald-600 mb-1.5" size={24} />
                                                        <span className="text-[11px] font-bold text-slate-700 truncate max-w-[220px]">
                                                            {resumeFile.name}
                                                        </span>
                                                        <span className="text-[9px] text-slate-400 mt-0.5">Click to choose a different file</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UploadCloud className="text-slate-400 mb-1.5" size={26} />
                                                        <span className="text-[11px] font-bold text-slate-500">Click to Select Resume File</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    required
                                                    disabled={isUploading}
                                                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedJob(null)}
                                                className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isUploading}
                                                className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] disabled:bg-blue-400 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                                            >
                                                {isUploading ? 'Uploading...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* ── CTA ── */}
                <section className="py-20 lg:py-24 bg-[#004AAD] relative overflow-hidden">
                    {/* Decorative rings */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    {/* Dot grid */}
                    <div className="absolute top-8 left-8 pointer-events-none hidden lg:block">
                        {Array.from({ length: 4 }).map((_, r) =>
                            Array.from({ length: 6 }).map((_, c) => (
                                <span key={`${r}-${c}`} className="inline-block w-1 h-1 rounded-full bg-white/20 m-2" />
                            ))
                        )}
                    </div>

                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6 mx-auto">
                                <Mail size={28} className="text-white" />
                            </div>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">
                                Interested in Working With Us?
                            </h2>
                            <p className="text-blue-200 text-[15px] mb-8 leading-relaxed max-w-lg mx-auto">
                                We're always looking for passionate educators, technologists, and changemakers. Reach out and let's talk.
                            </p>
                            <motion.a
                                href="mailto:info@ethnotech.in"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#004AAD] text-[15px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                <Mail size={16} />
                                info@ethnotech.in
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
