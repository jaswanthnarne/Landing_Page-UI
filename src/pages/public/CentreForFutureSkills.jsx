import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';

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
        desc: 'Cutting-edge curriculum in AI, ML, Cloud Computing, Cybersecurity, Data Science — co-designed with sector skill councils and industry experts.',
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
        title: 'State-of-the-Art Infrastructure',
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

// Dept-wise course catalogue
const deptCourses = [
    {
        dept: 'CSE',
        fullName: 'Computer Science & Engineering',
        color: '#004AAD',
        courses: ['Artificial Intelligence & Machine Learning', 'Full Stack Web Development', 'Cloud Computing & DevOps', 'Cybersecurity & Ethical Hacking', 'Data Science & Analytics', 'Blockchain Technology'],
    },
    {
        dept: 'ECE',
        fullName: 'Electronics & Communication Engineering',
        color: '#0D47A1',
        courses: ['Internet of Things (IoT)', 'Embedded Systems & RTOS', 'VLSI Design', 'Signal Processing', '5G & Wireless Networks', 'Robotics & Automation'],
    },
    {
        dept: 'EEE',
        fullName: 'Electrical & Electronics Engineering',
        color: '#1565C0',
        courses: ['PLC & SCADA Automation', 'Electric Vehicle Technology', 'Power Electronics', 'Smart Grid Technology', 'Renewable Energy Systems', 'Industrial Automation'],
    },
    {
        dept: 'MECH',
        fullName: 'Mechanical Engineering',
        color: '#1976D2',
        courses: ['CAD/CAM & CNC Machining', '3D Printing & Additive Manufacturing', 'Industry 4.0 & Smart Manufacturing', 'Robotics & Mechatronics', 'Product Design & Prototyping', 'Quality Management'],
    },
    {
        dept: 'CIVIL',
        fullName: 'Civil Engineering',
        color: '#0288D1',
        courses: ['AutoCAD & Revit BIM', 'Structural Analysis Software', 'GIS & Remote Sensing', 'Construction Management', 'Urban Planning', 'Environmental Engineering'],
    },
    {
        dept: 'BCA / BSc',
        fullName: 'BCA, B.Sc Computer Science / IT',
        color: '#0277BD',
        courses: ['Python Programming', 'Mobile App Development', 'Database Management (SQL/NoSQL)', 'Cybersecurity Fundamentals', 'UI/UX Design', 'Game Development'],
    },
    {
        dept: 'MBA / BBA',
        fullName: 'Management & Business Studies',
        color: '#01579B',
        courses: ['Digital Marketing & Growth Hacking', 'Business Analytics & BI', 'E-Commerce Management', 'FinTech & Banking Technology', 'HR Technology & People Analytics', 'Supply Chain & Logistics Tech'],
    },
    {
        dept: 'ARTS / HUMANITIES',
        fullName: 'Arts, Humanities & Social Science',
        color: '#006064',
        courses: ['Graphic Design & Branding', 'Video Production & Editing', 'Content Writing & SEO', 'Social Media Management', 'Photography & Multimedia', 'Communication Skills & Soft Skills'],
    },
];

// India map city data
const mapCities = [
    { name: 'Delhi', top: '22%', left: '33%' },
    { name: 'Chandigarh', top: '17%', left: '29%' },
    { name: 'Hyderabad', top: '65%', left: '39%' },
    { name: 'Pune', top: '62%', left: '29%' },
    { name: 'Bengaluru', top: '76%', left: '33%' },
    { name: 'Mumbai', top: '57%', left: '25%' },
    { name: 'Chennai', top: '79%', left: '41%' },
    { name: 'Kolkata', top: '44%', left: '61%' },
    { name: 'Bhopal', top: '45%', left: '37%' },
    { name: 'Vizag', top: '58%', left: '50%' },
    { name: 'Kochi', top: '84%', left: '31%' },
    { name: 'Coimbatore', top: '82%', left: '34%' },
    { name: 'Vadodara', top: '49%', left: '23%' },
    { name: 'Bhubaneshwar', top: '51%', left: '56%' },
    { name: 'Gurgaon', top: '24%', left: '34%' },
];

export default function CentreForFutureSkills() {
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
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-20 right-1/3 w-5 h-5 rounded bg-[#004AAD]/10 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-2xl">
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                Ethnotech Academy
                            </motion.span>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[2.8rem] lg:text-[3.4rem] font-extrabold text-slate-900 leading-[1.08] tracking-[-0.025em] mb-6">
                                Centre for<br /><span className="text-[#004AAD]">Future Skills</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                className="text-[16px] text-slate-500 leading-[1.8] mb-8 max-w-xl">
                                Empowering innovation and transforming education through industry-aligned training, state-of-the-art infrastructure, and globally recognized certifications.
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap gap-3">
                                <a href="#programmes" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#004AAD] text-white text-[14px] font-bold rounded-xl hover:bg-[#003a8c] transition-colors shadow-[0_4px_16px_rgba(0,74,173,0.3)]">
                                    View Programmes →
                                </a>
                                <a href="#presence" className="inline-flex items-center gap-2 px-7 py-3.5 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 text-[14px] transition-all">
                                    Our Presence
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Stats Strip ── */}
                <section className="bg-[#004AAD]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { val: '220+', label: 'Programs Offered' },
                                { val: '80+', label: 'Partner Institutions' },
                                { val: '2.7L+', label: 'Students Trained' },
                                { val: '6+', label: 'States Covered' },
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
                            <p className="text-slate-500 text-[14px] max-w-lg mb-14 leading-relaxed">Four pillars that make the Centre for Future Skills the most trusted upskilling platform in India.</p>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {features.map((f, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-7 flex items-start gap-5
                                               hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_8px_30px_rgba(0,74,173,0.09)] transition-colors duration-300 cursor-default">
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
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Our Infrastructure</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Inside Our Labs</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-12 leading-relaxed">
                                World-class facilities co-built with Apple, IBM, Intel, Schneider Electric, and Festo  where students train on the exact same equipment used by industry professionals.
                            </p>
                        </FadeIn>

                        {/* Row 1: Apple (wide) + AR/VR */}
                        <FadeIn delay={0.05}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-64">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584234/ethnotech/coe/qd89a0ea0ki3x2agagsi.jpg" alt="Apple iMac Lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-5 py-4">
                                        <p className="text-white text-[13px] font-bold">Apple iMac Lab</p>
                                        <p className="text-white/65 text-[11px]">30+ Workstations</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-64">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584238/ethnotech/coe/k4gcz6xu4jloahmr16ts.jpg" alt="AR/VR Studio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-5 py-4">
                                        <p className="text-white text-[13px] font-bold">AR/VR Innovation Lab</p>
                                        <p className="text-white/65 text-[11px]">Green Screen & Production Studio</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Row 2: 3 equal columns */}
                        <FadeIn delay={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584318/ethnotech/coe/v0ioajqlzzwvw7omp8vb.jpg" alt="VR Equipment Lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                        <p className="text-white text-[12px] font-bold">VR Device Library</p>
                                        <p className="text-white/65 text-[10px]">Headsets & Equipment</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584235/ethnotech/coe/f2nby1qy1qfhpaymmmhz.jpg" alt="IBM Lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                        <p className="text-white text-[12px] font-bold">IBM Centre of Excellence</p>
                                        <p className="text-white/65 text-[10px]">Enterprise Computing</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584237/ethnotech/coe/oaawcqdvmmkkia2ycm9h.jpg" alt="Intel Lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                        <p className="text-white text-[12px] font-bold">Intel Computing Lab</p>
                                        <p className="text-white/65 text-[10px]">AI & Processor Architecture</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Row 3: Festo Pneumatics (wide) + Conference */}
                        <FadeIn delay={0.13}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-52 md:col-span-2">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584321/ethnotech/coe/xpopw6xki8o26cuhb3wa.jpg" alt="Festo Pneumatics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-5 py-4">
                                        <p className="text-white text-[13px] font-bold">Festo Pneumatics Classroom</p>
                                        <p className="text-white/65 text-[11px]">Industrial Training Stations</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-52">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584324/ethnotech/coe/hhvyydzhtr3pdi8zvato.jpg" alt="Conference Room" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                        <p className="text-white text-[12px] font-bold">Conference Room</p>
                                        <p className="text-white/65 text-[10px]">Industry Interactions</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Row 4: 4 equal small cards */}
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
                                        className="relative overflow-hidden rounded-2xl group cursor-pointer h-44">
                                        <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 px-3 py-3">
                                            <p className="text-white text-[11px] font-bold leading-tight">{img.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2} className="mt-8 text-center">
                            <a href="/centre-of-excellence"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#004AAD] text-white text-[14px] font-bold rounded-xl hover:bg-[#003a8c] transition-colors shadow-[0_4px_16px_rgba(0,74,173,0.25)]">
                                Explore Full Centre of Excellence →
                            </a>
                        </FadeIn>
                    </div>
                </section>

                {/* ── Programmes Teaser ── */}

                <section id="programmes" className="py-20 lg:py-24" style={{ background: '#f9fafb' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <div className="bg-[#004AAD] rounded-2xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center gap-8">
                                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-[40px] border-white/5 pointer-events-none" />
                                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border-[30px] border-white/5 pointer-events-none" />

                                <div className="flex-1 relative z-10">
                                    <p className="text-blue-200 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Course Catalogue</p>
                                    <h2 className="text-[1.8rem] lg:text-[2.2rem] font-extrabold text-white mb-3 leading-tight">Programmes by Department</h2>
                                    <p className="text-blue-200 text-[14px] leading-relaxed max-w-lg">
                                        Industry-aligned certifications for CSE, ECE, EEE, MECH, CIVIL, BCA, BSc, MBA and Arts — 220+ courses designed with sector skill councils and industry experts.
                                    </p>
                                </div>

                                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 relative z-10">
                                    {['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'BCA', 'MBA', 'ARTS'].map(d => (
                                        <div key={d} className="px-3 py-1.5 bg-white/15 rounded-lg text-white text-[11px] font-bold tracking-wide hidden lg:block">
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                <motion.a href="/programmes"
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                    className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#004AAD] text-[14px] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                                    View All Programmes →
                                </motion.a>
                            </div>
                        </FadeIn>
                    </div>
                </section>


                {/* ── Pan-India Presence with Map ── */}
                <section id="presence" className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-2">Pan-India Network</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Our Presence Across India</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-12 leading-relaxed">
                                With centres and partnerships spanning multiple states, we bring world-class skill training to students everywhere.
                            </p>
                        </FadeIn>

                        {/* Full-width Map */}
                        <FadeIn>
                            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white p-6 lg:p-10">
                                <img
                                    src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584362/ethnotech/assets/pr4ilpxivofnevyuomiz.jpg"
                                    alt="Ethnotech Pan-India Presence Map — 30+ cities across India"
                                    className="w-full max-w-3xl mx-auto h-auto object-contain block"
                                />
                                <div className="mt-5 flex items-center gap-2 justify-center">
                                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-sm" />
                                    <span className="text-[13px] text-slate-500 font-medium">Ethnotech Centre / Partner Location</span>
                                </div>
                            </div>
                        </FadeIn>

                        {/* City grid below map */}
                        <FadeIn delay={0.1} className="mt-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {[
                                    { city: 'Hyderabad', state: 'Telangana', highlight: true },
                                    { city: 'Pune (DYPATU)', state: 'Maharashtra', highlight: true },
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
                                ].map((loc, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.3, delay: i * 0.02 }}
                                        className={`rounded-xl border px-3 py-2.5 ${loc.highlight
                                            ? 'bg-[#004AAD] border-[#004AAD]'
                                            : 'bg-white border-slate-100 hover:border-[#004AAD]/30 hover:bg-blue-50/50'
                                            } transition-colors duration-200 cursor-default`}>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${loc.highlight ? 'bg-white' : 'bg-[#004AAD]'}`} />
                                            <p className={`text-[12px] font-bold leading-tight ${loc.highlight ? 'text-white' : 'text-slate-800'}`}>{loc.city}</p>
                                        </div>
                                        <p className={`text-[10px] font-medium pl-3 mt-0.5 ${loc.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{loc.state}</p>
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
                                info@ethnotech.in
                            </motion.a>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
