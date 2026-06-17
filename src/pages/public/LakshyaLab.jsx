import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, ChevronRight, X, ChevronLeft, MapPin, 
    ExternalLink, Activity, Cpu, MonitorPlay, Zap, 
    Boxes, ArrowRight, ZoomIn, Award, Users, BookOpen, 
    Microscope, Landmark, GraduationCap, Compass, Play, Pause
} from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { getOptimizedImageUrl } from '../../utils/cloudinary';


// ── Partner Logo Map ──────────────────────────────────────────────────
const partnerLogos = {
    'Apple': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584345/ethnotech/logos/ikb5gdvfvuajzo0zbafy.svg', bg: '#f5f5f7', fg: '#1d1d1f' },
    'NVIDIA': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584245/ethnotech/partners/y3a0a3bactwfmikzjerj.png', bg: '#f0fdf4', fg: '#76b900' },
    'Cisco': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586786/ethnotech/logos/uhk1tc6bzahmsmppsvvy.svg', bg: '#ecfeff', fg: '#1ba0d7' },
    'ABB': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584254/ethnotech/partners/bmtgr5oak9r1pavqycaw.svg', bg: '#fef2f2', fg: '#ff0000' },
    'AR / VR': { src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%236D28D9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z"/><path d="M9 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/><path d="M12 10v3"/></svg>', bg: '#f5f3ff', fg: '#6D28D9' },
    'ANSYS': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586789/ethnotech/logos/h5khxljvjvlt0sufvlaw.svg', bg: '#fffbeb', fg: '#ffb700' },
    'Adobe': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584241/ethnotech/partners/smzcrqbppjyy57zunrhb.jpg', bg: '#fdf2f8', fg: '#ff0080' },
    'Autodesk': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584258/ethnotech/partners/olepxeyzmcscza8mxysn.png', bg: '#f8fafc', fg: '#0696d7' },
    'AWS': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584246/ethnotech/partners/kyihiccexi3gg0iis6gg.jpg', bg: '#fff7ed', fg: '#ff9900' },
    'VLSI': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586790/ethnotech/logos/t4v9oeeopad9d6wrbjx0.svg', bg: '#faf5ff', fg: '#8b5cf6' },
    'NSDC': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584360/ethnotech/assets/y23u3jp1twt4tpyzx2lg.png', bg: '#f0f9ff', fg: '#0284c7' },
    'Ethnotech': { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png', bg: '#eff6ff', fg: '#004AAD' }
};

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
        <span className={`inline-flex items-center gap-2 ${padding} bg-white border border-slate-200 rounded-full shadow-sm`}
            style={{ backgroundColor: p.bg, borderColor: `${p.fg}20` }}>
            {p.src ? (
                <img src={getOptimizedImageUrl(p.src, { width: 150 })} alt={name} className={`${imgSize} object-contain`} loading="lazy" />
            ) : (
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.fg }} />
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

// ── Fallback Constants (if MongoDB is not yet seeded) ──────────────────
const FALLBACK_QUOTES = [
    {
        quote: "The launch of the first Centre for Future Skills in Gujarat is an important step as we move towards building a Viksit Bharat. With this, the model is now active across 11 institutions and have already trained over 50,000+ candidates.",
        author: "Mr. Nitin Kapoor",
        title: "Vice President, National Skill Development Corporation (NSDC)"
    },
    {
        quote: "CFS has been very effective in bringing elite global certification programs to the doorstep of colleges at the most affordable cost. We are committed to bridging the gap between academics and industry by creating globally skilled, innovation-driven professionals.",
        author: "Dr. Kiran Rajanna",
        title: "CEO, Ethnotech Academy"
    },
    {
        quote: "Lakshya 2047 is not only contemporary but also very futuristic. The age of isolation is over, and you cannot leave everything to the government... we are open to the private sector because we realise that if we have to move on, we cannot move in isolation.",
        author: "Dr. Jitendra Singh",
        title: "Union Minister of State (I/C), Science & Technology and Earth Sciences"
    },
    {
        quote: "It is another step in creating a future-ready ecosystem, which combines innovations and ethics.",
        author: "Dr. Devanshu Patel",
        title: "President, Parul University"
    }
];

const FALLBACK_LABS = [
    {
        id: 'nvidia',
        partner: 'NSDC & Ethnotech',
        name: 'Aero Vision Drone Lab',
        tag: 'Drone Technology & Flight Dynamics',
        desc: 'Advanced training setup for quadcopter design, flight controllers, autonomous pathing, and agricultural spraying drone technologies.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586068/ethnotech/lakshya_images/okvtxirv0qjmzvxlt2ql.jpg'
    },
    {
        id: 'apple',
        partner: 'Apple',
        name: 'Apple iOS Developer Academy',
        tag: 'Swift Ecosystem & iOS Architectures',
        desc: 'Equipped with state-of-the-art blue iMac stations and macOS development environments for hands-on iOS app prototyping and Swift coding.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586053/ethnotech/lakshya_images/uxddcyffyu4qqk6j9sb3.jpg'
    },
    {
        id: 'abb',
        partner: 'ABB',
        name: 'ABB Industrial Automation Lab',
        tag: 'Industry 4.0 & Robotic Arms',
        desc: 'Features an IRB 1090 Education robotic arm inside a protective glass cage, enabling student scripting of automated pick-and-place lines.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586051/ethnotech/lakshya_images/r1ll3go6bw49ho7qdq7y.jpg'
    },
    {
        id: 'cisco',
        partner: 'NSDC & Ethnotech',
        name: 'Major Machine Zone (Idea Lab)',
        tag: 'Precision Fabrication & Laser Engraving',
        desc: 'Equipped with high-performance SIL laser engraving and cutting machinery for rapid wood, acrylic, and plastic sheet prototyping.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586057/ethnotech/lakshya_images/w4c41wyyez8ow8t2rmrq.jpg'
    },
    {
        id: 'arvr',
        partner: 'NSDC & Ethnotech',
        name: 'Microsoft Lab',
        tag: 'Enterprise Software & Cloud Development',
        desc: 'Spacious training hall with dedicated computing setups and an interactive smart board focused on cloud infrastructure, DevOps, and communication.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586063/ethnotech/lakshya_images/jhwcnp7xmqbcmz6f3mw1.jpg'
    },
    {
        id: 'sensor',
        partner: 'NSDC & Ethnotech',
        name: 'AR / VR Spatial Computing Studio',
        tag: 'Immersive Production & Green Screen',
        desc: 'Equipped with green screen backdrop walls, cameras, professional softbox lighting, VR headsets, and an interactive driving simulator cockpit.',
        image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586064/ethnotech/lakshya_images/g54tjr9wimtj9jjgme1u.jpg'
    }
];

const FALLBACK_GALLERY = [
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576841/ethnotech/lakshya/kdqpithnzk8vj0ap1kve.jpg', caption: 'Medical Auditorium Launch', sub: 'Medical auditorium packed with Parul University students and guests during the inaugural address.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576844/ethnotech/lakshya/xgg4leycisaiokal6pds.jpg', caption: 'Agricultural Drone Close-up', sub: 'A heavy-duty hexacopter drone equipped with spraying attachments for precision farming studies.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576847/ethnotech/lakshya/osdybbj2y5lou80c77zv.jpg', caption: 'Memento Presentation', sub: 'Union Minister Dr. Jitendra Singh receiving a memento celebrating the establishment of the CFS.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576831/ethnotech/lakshya/xcvwthyxjtwvpob2s2ft.jpg', caption: 'IRB 1090 Education Arm', sub: 'Industrial-grade ABB robotic manipulator training rig inside the glass enclosure.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576816/ethnotech/lakshya/dqlyzecehrgg9i9mj8e5.jpg', caption: 'VIP Gallery Walkthrough', sub: 'Union Minister Dr. Jitendra Singh and university directors reviewing student-made software on large displays.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576819/ethnotech/lakshya/nf7q6ukfygtdqwb8epk6.jpg', caption: 'Academic Review Walkthrough', sub: 'University coordinators and coordinators touring the state-of-the-art facilities.' },
    { type: 'image', src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576851/ethnotech/lakshya/spovyte62fvcesvqrvja.jpg', caption: 'Inaugural Speech by Dr. Jitendra Singh', sub: 'Union Minister of State delivering a speech on youth empowerment in Amrit Kaal.' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584334/ethnotech/lakshya_videos/d46f4b09ftrbygatdgcy.mp4', caption: 'Robotic Exoscope Neurosurgery Demo', sub: 'Dr. Iype Cherian demonstrating cranial channel operations' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584336/ethnotech/lakshya_videos/p1zbqupcurzhbqg9f4m4.mp4', caption: 'Inaugural Walkthrough Loop', sub: 'Minister arriving at Lakshya 2047 CFS' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584337/ethnotech/lakshya_videos/zvwerpwdtp0820iwfayt.mp4', caption: 'PIERC Innovation & Incubation Showcase', sub: '250+ active startups generating Rs. 40 Cr revenue' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584339/ethnotech/lakshya_videos/znmrhf2xspcxubrfidpc.mp4', caption: 'Pragya Advanced Simulation Centre', sub: 'एमबीबीएस simulation infrastructure' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584340/ethnotech/lakshya_videos/lphbvgqfoljbv8ugwmvu.mp4', caption: 'Apple Swift Mobile App Lab', sub: 'Interactive dry-eye software development overview' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584342/ethnotech/lakshya_videos/rhmptxp5nqlgerquytx3.mp4', caption: 'VR Device Spatial Computing Session', sub: 'Meta Quest headgear training in AR/VR Lab' },
    { type: 'video', src: 'https://res.cloudinary.com/ddwxonjbd/video/upload/v1781584343/ethnotech/lakshya_videos/xdket0nfyejnrt5mvifi.mp4', caption: 'ABB Robotics Interface Demo', sub: 'Configuring mechanical manipulators and automated lines' }
];

const FALLBACK_PM_QUOTE = "Amrit Kaal represents a unique 25-year window of opportunity (2022-2047) where the skill, dedication, and innovation of our youth will drive India's transition into a developed nation (Viksit Bharat). Empowering our students with future-ready skills is the ultimate key to global technological leadership.";
const FALLBACK_PM_AUTHOR = "Shri Narendra Modi, Prime Minister of India";
const FALLBACK_PM_DESC = "In alignment with this prime ministerial roadmap, Lakshya 2047 was built to prepare skilled youth in emerging technological areas (Robotics, Cloud, Drone tech, IoT, Chip design) during the Amrit Kaal window.";

const FALLBACK_ECOSYSTEM_LABS = [
    {
        id: 'apple',
        partner: 'Apple',
        name: 'Apple Lab',
        desc: 'The Apple Lab at Parul University trains students across the iOS application development lifecycle: Swift programming, SwiftUI for UI development, backend logic, App Store submission, and UI/UX design. The lab also supports development for watchOS, tvOS, macOS, and visionOS. The B.Tech track that feeds this lab is the B.Tech in Computer Science Engineering. During the inauguration, a Computer Science student presented an iOS application recognised among Apple’s top 350 apps in India.'
    },
    {
        id: 'arvr',
        partner: 'AR / VR',
        name: 'AR/VR Lab',
        desc: 'The AR/VR Lab is fitted with Apple Vision Pro and Meta Quest headsets supporting direct hand and finger tracking. Application domains taught span surgical training, architectural visualisation, flight simulation, industrial maintenance, and product prototyping. Dr Jitendra Singh donned a Vision Pro headset and explored a photorealistic 3D rendering of a car during the inauguration walkthrough.'
    },
    {
        id: 'abb',
        partner: 'ABB',
        name: 'ABB Industrial Automation Lab',
        desc: 'The lab is fitted with operational ABB robotic systems, including an articulated robotic arm capable of fluid path-traced motion and adaptive task replication. The B.Tech in Robotics and Automation and B.Tech in Mechatronics feed students into this lab. Curriculum covers robot programming, path planning, end-effector selection, vision system integration, and multi-robot cell design.'
    },
    {
        id: 'nvidia',
        partner: 'NVIDIA',
        name: 'NVIDIA Lab',
        desc: 'The NVIDIA Lab houses GPU-accelerated workstations for artificial intelligence and graphics processing unit computation. Students train neural networks, work on computer vision and natural language processing models, and experiment with reinforcement learning and generative AI architectures. The aligned programme is the B.Tech in Artificial Intelligence and Machine Learning.'
    },
    {
        id: 'cisco',
        partner: 'Cisco',
        name: 'Cisco Lab',
        desc: 'The Cisco Lab covers networking and cybersecurity. Students configure routing and switching hardware, implement firewalls, intrusion detection, and VPN configurations. CCNA and CCNP certification preparation runs through this lab. Relevant to India’s expanding cybersecurity industry and the global shortage of certified network engineers.'
    },
    {
        id: 'aws',
        partner: 'AWS',
        name: 'AWS Lab',
        desc: 'The AWS Lab covers compute, storage, databases, networking, security, machine learning, and DevOps services on Amazon Web Services. Students build and deploy cloud applications, architect for scalability, and develop infrastructure-as-code skills. AWS certification preparation is integrated.'
    },
    {
        id: 'vlsi',
        partner: 'VLSI',
        name: 'VLSI Lab',
        desc: 'The VLSI Lab teaches integrated circuit design using electronic design automation tools, IC layout, simulation, semiconductor device physics, and fabrication-process understanding. Aligned with the India Semiconductor Mission. The B.Tech track is the B.Tech in Electronics with VLSI Design specialisation.'
    },
    {
        id: 'ansys',
        partner: 'ANSYS',
        name: 'ANSYS Lab',
        desc: 'The ANSYS Lab at Parul University delivers training in engineering simulation, finite element analysis (FEA), computational fluid dynamics (CFD), and multiphysics modelling using the ANSYS suite. Career relevance covers automotive, aerospace, oil and gas, manufacturing, and electronics product development. The lab adds depth to the engineering programmes by teaching the simulation tooling that industry uses for design validation before physical prototyping.'
    },
    {
        id: 'adobe',
        partner: 'Adobe',
        name: 'Adobe Lab',
        desc: 'The Adobe Lab at Parul University focuses on creative design, digital media production, and visual communication using the Adobe Creative Cloud suite including Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, and XD. The lab serves students across Design, Architecture, Fine Arts, Mass Communication, and any engineering or computer science student building product interfaces. UI/UX design and digital media skills are increasingly central to product engineering careers.'
    },
    {
        id: 'autodesk',
        partner: 'Autodesk',
        name: 'Autodesk Lab',
        desc: 'The Autodesk Lab is the digital design studio of Lakshya 2047, running AutoCAD, Fusion 360, Revit, and Inventor at professional standard. The curriculum runs the complete design workflow from engineering drawings to parametric 3D models, technical documentation, and CAM preparation.'
    }
];

const features = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#10b981" fillOpacity="0.09" />
                <path d="M24 14L13 20L24 26L35 20L24 14Z" fill="#10b981" />
                <path d="M17 23V29C17 29 20 32 24 32C28 32 31 29 31 29V23L24 26L17 23Z" fill="#10b981" fillOpacity="0.4" />
                <path d="M33 20V28" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="33" cy="29.5" r="1.5" fill="#10b981" />
            </svg>
        ),
        title: 'Advanced Training Programs',
        desc: 'Cutting-edge curriculum in AI, ML, Cloud Computing, Cybersecurity, Data Science co-designed with sector skill councils and industry experts.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#10b981" fillOpacity="0.09" />
                <rect x="11" y="15" width="26" height="18" rx="2.5" stroke="#10b981" strokeWidth="1.6" fill="none" />
                <rect x="15" y="19" width="8" height="6" rx="1" fill="#10b981" fillOpacity="0.35" />
                <rect x="25" y="19" width="9" height="2.5" rx="0.5" fill="#10b981" fillOpacity="0.25" />
                <rect x="25" y="24" width="6" height="2" rx="0.5" fill="#10b981" fillOpacity="0.18" />
                <path d="M20 33V37" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M28 33V37" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16 37H32" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        title: 'State of the Art Infrastructure',
        desc: 'Modern labs equipped with the latest hardware and software, including VR/AR stations, IoT kits, and cloud computing environments.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#10b981" fillOpacity="0.09" />
                <circle cx="17" cy="19" r="5" fill="#10b981" />
                <circle cx="31" cy="19" r="5" fill="#10b981" fillOpacity="0.35" />
                <path d="M10 36C10 30.5 13.1 26 17 26" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M31 26C34.9 26 38 30.5 38 36" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.35" />
                <path d="M17 26C19.5 26 22 27.5 24 27.5C26 27.5 28.5 26 31 26" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.65" />
            </svg>
        ),
        title: 'Industry-Academia Collaboration',
        desc: 'Deep partnerships with 80+ institutions and corporates ensure the curriculum stays relevant, practical, and aligned with market needs.',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
                <rect width="48" height="48" rx="13" fill="#10b981" fillOpacity="0.09" />
                <circle cx="23" cy="23" r="10" stroke="#10b981" strokeWidth="1.6" fill="none" />
                <ellipse cx="23" cy="23" rx="4.5" ry="10" stroke="#10b981" strokeWidth="1.3" fill="none" />
                <path d="M13 23H33" stroke="#10b981" strokeWidth="1.1" strokeOpacity="0.4" />
                <circle cx="32" cy="32" r="5" fill="#10b981" />
                <path d="M30.5 32L32 33.5L34 31" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Global Certifications',
        desc: 'Internationally recognized certifications validated by industry-leading technology partners and global skill bodies.',
    },
];

// ── Lightbox Modal component ──────────────────────────────────────────
function LightboxModal({ items, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);
    const prev = () => setCurrent(i => (i - 1 + items.length) % items.length);
    const next = () => setCurrent(i => (i + 1) % items.length);

    const activeItem = items[current];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-5xl w-full flex flex-col items-center"
                onClick={e => e.stopPropagation()}>
                
                {/* Media Container */}
                <div className="w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
                    {activeItem.type === 'video' ? (
                        <video 
                            src={activeItem.src} 
                            controls 
                            autoPlay 
                            className="w-full max-h-[75vh] object-contain"
                        />
                    ) : (
                        <img 
                            src={getOptimizedImageUrl(activeItem.src, { width: 1200 })} 
                            alt={activeItem.caption}
                            className="w-full max-h-[75vh] object-contain"
                            loading="eager"
                        />
                    )}
                </div>

                {/* Caption Bar */}
                <div className="w-full text-center mt-4 px-6 py-2 bg-slate-900/60 rounded-xl max-w-xl border border-slate-800">
                    <p className="text-white text-[14px] font-semibold">{activeItem.caption}</p>
                    <p className="text-white/50 text-[12px] mt-0.5">{activeItem.sub} ({current + 1} / {items.length})</p>
                </div>

                {/* Controls */}
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10 shadow-lg cursor-pointer">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10 shadow-lg cursor-pointer">
                    <ChevronRight size={24} />
                </button>
                <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10 shadow-lg cursor-pointer">
                    <X size={18} />
                </button>
            </motion.div>
        </motion.div>
    );
}

// ── Lab Card Component ───────────────────────────────────────────────
function LabCard({ lab, onImageClick, globalImageOffset }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all duration-300">

            {/* Cover Image */}
            <div className="relative h-56 cursor-pointer group overflow-hidden"
                onClick={() => onImageClick(lab.images[0].src)}>
                <img src={getOptimizedImageUrl(lab.images[0].src, { width: 600 })} alt={lab.images[0].caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy" />
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

// ── Main Page Component ───────────────────────────────────────────────
export default function LakshyaLab() {
    const [lightbox, setLightbox] = useState(null);
    const lakshyaConfig = useWebsiteStore((state) => state.lakshyaConfig);

    // Bind state dynamically or fall back to constants
    const configQuotes = lakshyaConfig?.quotes || FALLBACK_QUOTES;
    const configLabs = lakshyaConfig?.labs || FALLBACK_LABS;
    const configGallery = lakshyaConfig?.gallery || FALLBACK_GALLERY;
    const configEcosystemLabs = lakshyaConfig?.ecosystem_labs || FALLBACK_ECOSYSTEM_LABS;
    const pmQuote = lakshyaConfig?.pm_quote || FALLBACK_PM_QUOTE;
    const pmAuthor = lakshyaConfig?.pm_author || FALLBACK_PM_AUTHOR;
    const pmDesc = lakshyaConfig?.pm_desc || FALLBACK_PM_DESC;

    // Adapt Zustand representation to expected structure
    const labSections = configLabs.map((lab) => ({
        ...lab,
        images: [{ src: lab.image, caption: lab.name }]
    }));

    // All gallery items for lightbox navigation
    const allGalleryItems = configGallery.map((item, idx) => ({
        ...item,
        globalIdx: idx
    }));

    const handleMediaClick = (src) => {
        const index = allGalleryItems.findIndex(img => img.src === src);
        if (index !== -1) {
            setLightbox({ startIndex: index, items: allGalleryItems });
        } else {
            setLightbox({
                startIndex: 0,
                items: [{ src, caption: 'Laboratory View', sub: 'CFS Infrastructure Details', type: 'image' }]
            });
        }
    };

    return (
        <PublicLayout>
            <SEO 
                title="Lakshya 2047" 
                description="Explore Lakshya 2047 - Ethnotech Academy's Advanced Centre for Future Skills, offering high-fidelity computing labs and industry ecosystems."
                keywords="lakshya 2047, centre for future skills, advanced computer labs, nvidia cisco labs, ethnotech finishing school"
                path="/lakshya-2047"
            />
            <div className="bg-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden"
                    style={{ background: 'linear-gradient(155deg, #f0fdf4 0%, #ffffff 55%, #ecfdf5 100%)' }}>
                    <div className="absolute -top-16 -right-16 w-[480px] h-[480px] rounded-full border-[1.5px] border-emerald-500/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-[320px] h-[320px] rounded-full border-[1.5px] border-emerald-500/10 pointer-events-none" />
                    <div className="absolute top-20 right-20 w-[180px] h-[180px] rounded-full bg-emerald-500/[0.04] pointer-events-none" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-32 right-64 w-9 h-9 rounded-xl border-[1.5px] border-emerald-500/15 pointer-events-none hidden lg:block" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-24 right-1/3 w-5 h-5 rounded bg-emerald-500/10 pointer-events-none hidden lg:block" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-12">
                            {/* ── Left Content ── */}
                            <div className="flex-1 max-w-2xl lg:max-w-none pt-4">
                                <div className="flex flex-wrap gap-2.5 mb-5">
                                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                                        className="inline-block text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] px-3.5 py-1.5 bg-emerald-500/[0.07] rounded-full">
                                        Gujarat's First CFS Hub
                                    </motion.span>
                                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
                                        className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] px-3.5 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                        Ethnotech Delivery Partner
                                    </motion.span>
                                </div>
                                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[2.8rem] lg:text-[3.6rem] font-extrabold text-slate-900 leading-[1.06] tracking-[-0.025em] mb-6">
                                    Lakshya 2047<br /><span className="text-emerald-600">Future Skills</span>
                                </motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
                                    className="text-[16px] text-slate-500 leading-[1.8] mb-6 max-w-xl">
                                    Established jointly with the National Skill Development Corporation (NSDC) and Ethnotech Academy as project partner. Bridging academic skilling with global vendor certifications at Parul University.
                                </motion.p>
                                
                                {/* ── Partner Logo Strip ── */}
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap items-center gap-6 py-4 px-5 bg-white/70 border border-slate-100 rounded-2xl max-w-xl mb-6 shadow-sm backdrop-blur-sm">
                                    <div className="flex items-center gap-2.5">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584360/ethnotech/assets/y23u3jp1twt4tpyzx2lg.png" alt="NSDC" className="h-8 object-contain" />
                                        <div className="h-6 w-[1px] bg-slate-200" />
                                        <div className="font-bold text-[11px] text-slate-700 leading-tight">NSDC<br/><span className="text-[9px] text-slate-400 font-medium">Co-Founder</span></div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png" alt="Ethnotech Academy" className="h-8 w-8 object-contain" />
                                        <div className="h-6 w-[1px] bg-slate-200" />
                                        <div className="font-bold text-[11px] text-slate-700 leading-tight">Ethnotech<br/><span className="text-[9px] text-[#004AAD] font-semibold">Project Partner</span></div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-[14px] font-extrabold text-blue-900 leading-none">PU</span>
                                        <div className="h-6 w-[1px] bg-slate-200" />
                                        <div className="font-bold text-[11px] text-slate-700 leading-tight">Parul Univ<br/><span className="text-[9px] text-slate-400 font-medium">CFS Host</span></div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}
                                    className="flex flex-wrap items-center gap-3 mt-4">
                                    <span className="text-[12px] font-semibold text-slate-400 mr-2 hidden sm:block">Ecosystem Partners:</span>
                                    {['NVIDIA', 'Apple', 'Cisco', 'ABB', 'AWS', 'AR / VR'].map((p, i) => (
                                        <PartnerPill key={i} name={p} size="md" />
                                    ))}
                                </motion.div>
                            </div>

                            {/* ── Right Collage (Completely distinct images loaded from Cloudinary) ── */}
                            <div className="flex-1 w-full hidden lg:flex items-center justify-center gap-4 relative">
                                {/* Column 1 */}
                                <div className="flex flex-col gap-4 mt-20">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="w-52 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576801/ethnotech/lakshya/mqgm0wi0nq8kdr30fn4p.jpg" alt="Lakshya Lab Entrance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="w-52 h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576835/ethnotech/lakshya/fah70ra4xwm3boxz2f9t.jpg" alt="Apple iOS Lab Layout" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-4 -mt-16 relative z-10">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white relative group">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576816/ethnotech/lakshya/dqlyzecehrgg9i9mj8e5.jpg" alt="Union Minister VIP Gallery Walkthrough" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                        className="w-64 h-52 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative group">
                                        <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576838/ethnotech/lakshya/vyqxw1vc1liicxpxvlgn.jpg" alt="Computer Lab Environment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Stats Strip ── */}
                <section className="bg-emerald-600">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { val: '15+', label: 'Specialised Labs' },
                                { val: '2 Floors', label: 'Functional Space' },
                                { val: '11 CFS', label: 'National CFS Centres' },
                                { val: '50,000+', label: 'Candidates Trained' },
                            ].map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="text-center md:border-r md:last:border-r-0 border-white/15">
                                    <p className="text-[2.4rem] font-extrabold text-white leading-none">{s.val}</p>
                                    <p className="text-emerald-100 text-[11px] font-bold mt-1.5 uppercase tracking-[0.12em]">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Key Features ── */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] mb-2">Functional skilling architecture</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Key Features of Lakshya 2047</h2>
                            <p className="text-slate-500 text-[14px] max-w-lg mb-14 leading-relaxed">
                                Bridging the gap between academics and industry through practical, certified, and ethics-driven training setups.
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
                                    className="group bg-slate-50 rounded-2xl border border-slate-100 p-7 flex items-start gap-5 hover:bg-white hover:border-emerald-500/20 hover:shadow-[0_8px_30px_rgba(16,185,129,0.09)] transition-all duration-300 cursor-default">
                                    <div className="flex-shrink-0 text-emerald-600">{f.icon}</div>
                                    <div>
                                        <h3 className="text-[16px] font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-200">{f.title}</h3>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PM Narendra Modi's Vision Section ── */}
                <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[140px]" />
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-8 space-y-6">
                                <span className="inline-block text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
                                    National Vision & Leadership
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                                    Viksit Bharat 2047 & Prime Minister Narendra Modi's Skilling Mission
                                </h2>
                                <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-[15px] text-slate-300 leading-relaxed font-medium">
                                    "{pmQuote}"
                                    <span className="block not-italic text-xs font-bold text-white uppercase tracking-wider mt-3">— {pmAuthor}</span>
                                </blockquote>
                                <p className="text-[13.5px] text-slate-400 leading-relaxed">
                                    {pmDesc} As Dr. Jitendra Singh (Union Minister) highlighted during the inaugural walkthrough: "The age of isolation is over... we are open to public-private partnership models because if we have to grow, we cannot move in isolation."
                                </p>
                            </div>
                            <div className="lg:col-span-4 flex justify-center w-full">
                                <div className="w-full max-w-md aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl relative bg-slate-950 flex items-center justify-center">
                                    <img src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781576797/ethnotech/lakshya/t23egr4tgxlov5pcxtd3.jpg" alt="CFS Inauguration Lamp Ceremony" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-950/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Leadership Quotes Slider (Parul Admin Perspective) ── */}
                <section className="py-20 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] mb-2">Leadership Opinions</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight leading-tight">Perspectives on Lakshya 2047</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {configQuotes.map((q, idx) => (
                                <div key={idx} className="bg-white border border-slate-150 p-6 md:p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-lg transition-all duration-300">
                                    <p className="text-[13.5px] text-slate-500 italic leading-relaxed">"{q.quote}"</p>
                                    <div className="mt-6 pt-4 border-t border-slate-50">
                                        <div className="font-extrabold text-slate-800 text-[14px]">{q.author}</div>
                                        <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{q.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Inside Our Labs (Media collage with absolutely unique images) ── */}
                <section className="py-20 lg:py-28" style={{ background: '#ffffff' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] mb-2">Our Infrastructure</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">Inside Lakshya 2047</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-12 leading-relaxed">
                                Premium photo frames and functional loop-playing preview videos showing actual laboratory units, robotics panels, and surgical demonstration simulation suites.
                            </p>
                        </FadeIn>

                        {/* Dynamic Gallery Grid — renders ALL items from admin config */}
                        {(() => {
                            // Build gallery items with proper global indices for lightbox
                            const galleryItems = configGallery.map((item, idx) => ({
                                ...item,
                                isVideo: item.type === 'video',
                                globalIdx: idx
                            }));

                            if (galleryItems.length === 0) return null;

                            // Layout pattern: Row sizes cycle through [2, 3, 2, 4] for visual variety
                            const rowPattern = [2, 3, 2, 4];
                            const rows = [];
                            let cursor = 0;
                            let patternIdx = 0;

                            while (cursor < galleryItems.length) {
                                const rowSize = rowPattern[patternIdx % rowPattern.length];
                                rows.push(galleryItems.slice(cursor, cursor + rowSize));
                                cursor += rowSize;
                                patternIdx++;
                            }

                            // Height classes per row pattern
                            const heightMap = { 2: 'h-72', 3: 'h-52', 4: 'h-44' };
                            // Grid columns per row pattern
                            const gridMap = {
                                1: 'grid-cols-1',
                                2: 'grid-cols-1 md:grid-cols-2',
                                3: 'grid-cols-1 md:grid-cols-3',
                                4: 'grid-cols-2 md:grid-cols-4'
                            };

                            return rows.map((row, rowIdx) => {
                                const rowSize = row.length;
                                const h = heightMap[rowSize] || 'h-52';
                                const gridCols = gridMap[rowSize] || 'grid-cols-1 md:grid-cols-3';
                                const delay = 0.05 + rowIdx * 0.05;

                                return (
                                    <FadeIn key={rowIdx} delay={delay}>
                                        <div className={`grid ${gridCols} gap-3 mb-3`}>
                                            {row.map((item, i) => (
                                                <motion.div
                                                    key={`${rowIdx}-${i}`}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, amount: 0.15 }}
                                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                                    whileHover={{ scale: rowSize <= 2 ? 1.015 : 1.03, transition: { duration: 0.2 } }}
                                                    className={`relative overflow-hidden rounded-2xl group cursor-pointer ${h} bg-slate-950`}
                                                    onClick={() => setLightbox({ startIndex: item.globalIdx })}
                                                >
                                                    {item.isVideo ? (
                                                        <video src={item.src} muted loop autoPlay playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-103 group-hover:opacity-100 transition-all duration-500" />
                                                    ) : (
                                                        <img src={getOptimizedImageUrl(item.src, { width: 500 })} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                                    {/* Hover zoom icon */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                                                            {item.isVideo ? <Play size={20} className="text-white" /> : <ZoomIn size={20} className="text-white" />}
                                                        </div>
                                                    </div>
                                                    {/* Type badge + caption */}
                                                    <div className="absolute bottom-0 left-0 px-4 py-3">
                                                        <span className="inline-block text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest px-2 py-0.5 bg-emerald-950/80 rounded mb-1.5 border border-emerald-500/20">
                                                            {item.isVideo ? 'Video Loop' : 'Photo Frame'}
                                                        </span>
                                                        <p className="text-white text-[13px] font-bold leading-tight">{item.caption}</p>
                                                        {item.sub && <p className="text-white/65 text-[11px] mt-0.5">{item.sub}</p>}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </FadeIn>
                                );
                            });
                        })()}
                    </div>
                </section>

                {/* ── Lab Cards (Detailed & Unique Images) ── */}
                <section id="labs" className="py-20 lg:py-28 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] mb-2">Our Facilities</p>
                            <h2 className="text-[2rem] font-extrabold text-slate-900 tracking-tight mb-3">NSDC Lab Ecosystem</h2>
                            <p className="text-slate-500 text-[14px] max-w-xl mb-14 leading-relaxed">
                                Exploring the globally certified laboratory cells co-developed with leading corporate vendors to deliver professional-level validations.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {labSections.map((lab, i) => (
                                <LabCard
                                    key={lab.id}
                                    lab={lab}
                                    globalImageOffset={i}
                                    onImageClick={(src) => handleMediaClick(src)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── NSDC Lab Ecosystem Section ── */}
                <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn>
                            <span className="inline-block text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-emerald-500/[0.07] rounded-full">
                                Lab Ecosystem
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                                NSDC Lab Ecosystem
                            </h2>
                            <p className="text-[16px] text-slate-600 leading-relaxed max-w-3xl mb-3">
                                The NSDC Lab Ecosystem houses ten laboratories aligned with global certification bodies and major industry technology vendors. Each lab is fitted with professional-grade equipment and supervised by faculty with domain experience.
                            </p>
                            <div className="mb-12">
                                <a 
                                    href={lakshyaConfig?.read_more_link || "/student/dashboard"} 
                                    className="inline-flex items-center gap-1.5 text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-[14px]"
                                >
                                    {lakshyaConfig?.read_more_label || "Read More: Lakshya 2047 Center for Future Skills"} <ChevronRight size={16} />
                                </a>
                            </div>
                        </FadeIn>

                        {/* 10 Labs Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {configEcosystemLabs.map((lab, i) => (
                                <motion.div
                                    key={lab.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                    className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)] hover:border-emerald-500/20 transition-all duration-300 group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <PartnerPill name={lab.partner} size="md" />
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-250">
                                            {lab.name}
                                        </h3>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">
                                            {lab.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DST Government Schemes Info Strip ── */}
                <section className="bg-slate-900 py-16 text-white border-b border-slate-950">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="inline-block text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] px-3 py-1 bg-emerald-500/10 rounded-full mb-3">
                                Department of Science and Technology (DST)
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Competency Schemes for Research & Innovation</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: 'ANRF', desc: 'Anusandhan National Research Foundation Apex Funding' },
                                { title: 'NIDHI', desc: 'National Initiative for Developing & Harnessing Innovation' },
                                { title: 'WISE-KIRAN', desc: 'Scientific incentives and research support for women' },
                                { title: 'INSPIRE-MANAK', desc: 'School & college level national innovation challenges' }
                            ].map((scheme, i) => (
                                <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                                    <h4 className="font-extrabold text-emerald-400 text-lg">{scheme.title}</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed mt-2">{scheme.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-emerald-600 py-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-white mb-4 tracking-tight">Get in touch with us today</h2>
                            <p className="text-emerald-100 text-[15px] mb-8 leading-relaxed">Ready to coordinate with our skilling coordinators? Take the first step.</p>
                            <motion.a href="mailto:info@ethnotech.in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 text-[15px] font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
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
                        items={lightbox.items || allGalleryItems}
                        startIndex={lightbox.startIndex}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
