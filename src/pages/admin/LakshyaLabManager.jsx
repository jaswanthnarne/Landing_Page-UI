import { useState, useEffect } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import {
    Plus, Edit2, Trash2, X, UploadCloud, Loader2,
    Image as ImageIcon, Video as VideoIcon, Target, Quote, Cpu, Clapperboard, Check, Boxes
} from 'lucide-react';

const DEFAULT_PM_QUOTE = "Amrit Kaal represents a unique 25-year window of opportunity (2022-2047) where the skill, dedication, and innovation of our youth will drive India's transition into a developed nation (Viksit Bharat). Empowering our students with future-ready skills is the ultimate key to global technological leadership.";
const DEFAULT_PM_AUTHOR = "Shri Narendra Modi, Prime Minister of India";
const DEFAULT_PM_DESC = "In alignment with this prime ministerial roadmap, Lakshya 2047 was built to prepare skilled youth in emerging technological areas (Robotics, Cloud, Drone tech, IoT, Chip design) during the Amrit Kaal window.";

const DEFAULT_LABS = [
    { id: 'nvidia', partner: 'NSDC & Ethnotech', name: 'Aero Vision Drone Lab', tag: 'Drone Technology & Flight Dynamics', desc: 'Advanced training setup for quadcopter design, flight controllers, autonomous pathing, and agricultural spraying drone technologies.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586068/ethnotech/lakshya_images/okvtxirv0qjmzvxlt2ql.jpg' },
    { id: 'apple', partner: 'Apple', name: 'Apple iOS Developer Academy', tag: 'Swift Ecosystem & iOS Architectures', desc: 'Equipped with state-of-the-art blue iMac stations and macOS development environments for hands-on iOS app prototyping and Swift coding.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586053/ethnotech/lakshya_images/uxddcyffyu4qqk6j9sb3.jpg' },
    { id: 'abb', partner: 'ABB', name: 'ABB Industrial Automation Lab', tag: 'Industry 4.0 & Robotic Arms', desc: 'Features an IRB 1090 Education robotic arm inside a protective glass cage, enabling student scripting of automated pick-and-place lines.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586051/ethnotech/lakshya_images/r1ll3go6bw49ho7qdq7y.jpg' },
    { id: 'cisco', partner: 'NSDC & Ethnotech', name: 'Major Machine Zone (Idea Lab)', tag: 'Precision Fabrication & Laser Engraving', desc: 'Equipped with high-performance SIL laser engraving and cutting machinery for rapid wood, acrylic, and plastic sheet prototyping.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586057/ethnotech/lakshya_images/w4c41wyyez8ow8t2rmrq.jpg' },
    { id: 'arvr', partner: 'NSDC & Ethnotech', name: 'Microsoft Lab', tag: 'Enterprise Software & Cloud Development', desc: 'Spacious training hall with dedicated computing setups and an interactive smart board focused on cloud infrastructure, DevOps, and communication.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586063/ethnotech/lakshya_images/jhwcnp7xmqbcmz6f3mw1.jpg' },
    { id: 'sensor', partner: 'NSDC & Ethnotech', name: 'AR / VR Spatial Computing Studio', tag: 'Immersive Production & Green Screen', desc: 'Equipped with green screen backdrop walls, cameras, professional softbox lighting, VR headsets, and an interactive driving simulator cockpit.', image: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586064/ethnotech/lakshya_images/g54tjr9wimtj9jjgme1u.jpg' }
];

const DEFAULT_QUOTES = [
    { quote: "The launch of the first Centre for Future Skills in Gujarat is an important step as we move towards building a Viksit Bharat. With this, the model is now active across 11 institutions and have already trained over 50,000+ candidates.", author: "Mr. Nitin Kapoor", title: "Vice President, National Skill Development Corporation (NSDC)" },
    { quote: "CFS has been very effective in bringing elite global certification programs to the doorstep of colleges at the most affordable cost. We are committed to bridging the gap between academics and industry by creating globally skilled, innovation-driven professionals.", author: "Dr. Kiran Rajanna", title: "CEO, Ethnotech Academy" },
    { quote: "Lakshya 2047 is not only contemporary but also very futuristic. The age of isolation is over, and you cannot leave everything to the government... we are open to the private sector because we realise that if we have to move on, we cannot move in isolation.", author: "Dr. Jitendra Singh", title: "Union Minister of State (I/C), Science & Technology and Earth Sciences" },
    { quote: "It is another step in creating a future-ready ecosystem, which combines innovations and ethics.", author: "Dr. Devanshu Patel", title: "President, Parul University" }
];

const DEFAULT_GALLERY = [
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

const DEFAULT_ECOSYSTEM_LABS = [
    { id: 'apple', partner: 'Apple', name: 'Apple Lab', desc: 'The Apple Lab at Parul University trains students across the iOS application development lifecycle: Swift programming, SwiftUI for UI development, backend logic, App Store submission, and UI/UX design. The lab also supports development for watchOS, tvOS, macOS, and visionOS. The B.Tech track that feeds this lab is the B.Tech in Computer Science Engineering. During the inauguration, a Computer Science student presented an iOS application recognised among Apple\'s top 350 apps in India.' },
    { id: 'arvr', partner: 'AR / VR', name: 'AR/VR Lab', desc: 'The AR/VR Lab is fitted with Apple Vision Pro and Meta Quest headsets supporting direct hand and finger tracking. Application domains taught span surgical training, architectural visualisation, flight simulation, industrial maintenance, and product prototyping. Dr Jitendra Singh donned a Vision Pro headset and explored a photorealistic 3D rendering of a car during the inauguration walkthrough.' },
    { id: 'abb', partner: 'ABB', name: 'ABB Industrial Automation Lab', desc: 'The lab is fitted with operational ABB robotic systems, including an articulated robotic arm capable of fluid path-traced motion and adaptive task replication. The B.Tech in Robotics and Automation and B.Tech in Mechatronics feed students into this lab. Curriculum covers robot programming, path planning, end-effector selection, vision system integration, and multi-robot cell design.' },
    { id: 'nvidia', partner: 'NVIDIA', name: 'NVIDIA Lab', desc: 'The NVIDIA Lab houses GPU-accelerated workstations for artificial intelligence and graphics processing unit computation. Students train neural networks, work on computer vision and natural language processing models, and experiment with reinforcement learning and generative AI architectures. The aligned programme is the B.Tech in Artificial Intelligence and Machine Learning.' },
    { id: 'cisco', partner: 'Cisco', name: 'Cisco Lab', desc: 'The Cisco Lab covers networking and cybersecurity. Students configure routing and switching hardware, implement firewalls, intrusion detection, and VPN configurations. CCNA and CCNP certification preparation runs through this lab. Relevant to India\'s expanding cybersecurity industry and the global shortage of certified network engineers.' },
    { id: 'aws', partner: 'AWS', name: 'AWS Lab', desc: 'The AWS Lab covers compute, storage, databases, networking, security, machine learning, and DevOps services on Amazon Web Services. Students build and deploy cloud applications, architect for scalability, and develop infrastructure-as-code skills. AWS certification preparation is integrated.' },
    { id: 'vlsi', partner: 'VLSI', name: 'VLSI Lab', desc: 'The VLSI Lab teaches integrated circuit design using electronic design automation tools, IC layout, simulation, semiconductor device physics, and fabrication-process understanding. Aligned with the India Semiconductor Mission. The B.Tech track is the B.Tech in Electronics with VLSI Design specialisation.' },
    { id: 'ansys', partner: 'ANSYS', name: 'ANSYS Lab', desc: 'The ANSYS Lab at Parul University delivers training in engineering simulation, finite element analysis (FEA), computational fluid dynamics (CFD), and multiphysics modelling using the ANSYS suite. Career relevance covers automotive, aerospace, oil and gas, manufacturing, and electronics product development. The lab adds depth to the engineering programmes by teaching the simulation tooling that industry uses for design validation before physical prototyping.' },
    { id: 'adobe', partner: 'Adobe', name: 'Adobe Lab', desc: 'The Adobe Lab at Parul University focuses on creative design, digital media production, and visual communication using the Adobe Creative Cloud suite including Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, and XD. The lab serves students across Design, Architecture, Fine Arts, Mass Communication, and any engineering or computer science student building product interfaces. UI/UX design and digital media skills are increasingly central to product engineering careers.' },
    { id: 'autodesk', partner: 'Autodesk', name: 'Autodesk Lab', desc: 'The Autodesk Lab is the digital design studio of Lakshya 2047, running AutoCAD, Fusion 360, Revit, and Inventor at professional standard. The curriculum runs the complete design workflow from engineering drawings to parametric 3D models, technical documentation, and CAM preparation.' }
];

export default function LakshyaLabManager() {
    const lakshyaConfig = useWebsiteStore((state) => state.lakshyaConfig);
    const updateLakshyaConfig = useWebsiteStore((state) => state.updateLakshyaConfig);

    const [activeTab, setActiveTab] = useState('pm-vision');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Modi Vision Local State
    const [pmQuote, setPmQuote] = useState('');
    const [pmAuthor, setPmAuthor] = useState('');
    const [pmDesc, setPmDesc] = useState('');
    const [readMoreLink, setReadMoreLink] = useState('');
    const [readMoreLabel, setReadMoreLabel] = useState('');

    // Quotes Local State
    const [quotes, setQuotes] = useState([]);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [editQuoteIndex, setEditQuoteIndex] = useState(null);
    const [quoteText, setQuoteText] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');
    const [quoteTitle, setQuoteTitle] = useState('');

    // Labs Local State
    const [labs, setLabs] = useState([]);
    const [isLabModalOpen, setIsLabModalOpen] = useState(false);
    const [editLabId, setEditLabId] = useState(null);
    const [labName, setLabName] = useState('');
    const [labPartner, setLabPartner] = useState('');
    const [labTag, setLabTag] = useState('');
    const [labDesc, setLabDesc] = useState('');
    const [labImage, setLabImage] = useState('');
    const [isLabUploading, setIsLabUploading] = useState(false);

    // Ecosystem Labs Local State
    const [ecosystemLabs, setEcosystemLabs] = useState([]);
    const [isEcoModalOpen, setIsEcoModalOpen] = useState(false);
    const [editEcoId, setEditEcoId] = useState(null);
    const [ecoName, setEcoName] = useState('');
    const [ecoPartner, setEcoPartner] = useState('');
    const [ecoDesc, setEcoDesc] = useState('');

    // Gallery Local State
    const [gallery, setGallery] = useState([]);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [editGalleryIndex, setEditGalleryIndex] = useState(null);
    const [galleryType, setGalleryType] = useState('image');
    const [gallerySrc, setGallerySrc] = useState('');
    const [galleryCaption, setGalleryCaption] = useState('');
    const [gallerySub, setGallerySub] = useState('');
    const [isGalleryUploading, setIsGalleryUploading] = useState(false);

    // Bind state when config is available
    useEffect(() => {
        const config = lakshyaConfig || {};
        setPmQuote(config.pm_quote || DEFAULT_PM_QUOTE);
        setPmAuthor(config.pm_author || DEFAULT_PM_AUTHOR);
        setPmDesc(config.pm_desc || DEFAULT_PM_DESC);
        setQuotes(config.quotes || DEFAULT_QUOTES);
        setLabs(config.labs || DEFAULT_LABS);
        setGallery(config.gallery || DEFAULT_GALLERY);
        setEcosystemLabs(config.ecosystem_labs || DEFAULT_ECOSYSTEM_LABS);
        setReadMoreLink(config.read_more_link || '/student/dashboard');
        setReadMoreLabel(config.read_more_label || 'Read More: Lakshya 2047 Center for Future Skills');
    }, [lakshyaConfig]);

    const handleSaveConfig = async (e) => {
        if (e) e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        const updatedConfig = {
            pm_quote: pmQuote,
            pm_author: pmAuthor,
            pm_desc: pmDesc,
            quotes: quotes,
            labs: labs,
            gallery: gallery,
            ecosystem_labs: ecosystemLabs,
            read_more_link: readMoreLink,
            read_more_label: readMoreLabel
        };

        try {
            await updateLakshyaConfig(updatedConfig);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            alert('Failed to save config: ' + (err?.response?.data?.error || err.message || 'Unknown error'));
        } finally {
            setIsSaving(false);
        }
    };

    // Upload Handlers
    const handleFileUpload = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === 'lab') {
            setIsLabUploading(true);
            try {
                const url = await uploadToCloudinary(file, 'labs');
                setLabImage(url);
            } catch (err) {
                alert(err.message || 'Image upload failed.');
            } finally {
                setIsLabUploading(false);
            }
        } else if (type === 'gallery') {
            setIsGalleryUploading(true);
            try {
                const folder = galleryType === 'video' ? 'videos' : 'gallery';
                const url = await uploadToCloudinary(file, folder);
                setGallerySrc(url);
            } catch (err) {
                alert(err.message || 'File upload failed.');
            } finally {
                setIsGalleryUploading(false);
            }
        }
    };

    // Quote Modal Handlers
    const openQuoteModal = (index = null) => {
        if (index !== null) {
            const q = quotes[index];
            setEditQuoteIndex(index);
            setQuoteText(q.quote);
            setQuoteAuthor(q.author);
            setQuoteTitle(q.title);
        } else {
            setEditQuoteIndex(null);
            setQuoteText('');
            setQuoteAuthor('');
            setQuoteTitle('');
        }
        setIsQuoteModalOpen(true);
    };

    const handleSaveQuote = (e) => {
        e.preventDefault();
        const newQuote = { quote: quoteText, author: quoteAuthor, title: quoteTitle };
        let updated = [...quotes];
        if (editQuoteIndex !== null) {
            updated[editQuoteIndex] = newQuote;
        } else {
            updated.push(newQuote);
        }
        setQuotes(updated);
        setIsQuoteModalOpen(false);
    };

    const handleDeleteQuote = (index) => {
        if (confirm('Delete this opinion card?')) {
            setQuotes(quotes.filter((_, i) => i !== index));
        }
    };

    // Lab Modal Handlers
    const openLabModal = (id = null) => {
        if (id !== null) {
            const l = labs.find(item => item.id === id);
            setEditLabId(id);
            setLabName(l.name);
            setLabPartner(l.partner);
            setLabTag(l.tag);
            setLabDesc(l.desc);
            setLabImage(l.image);
        } else {
            setEditLabId(null);
            setLabName('');
            setLabPartner('');
            setLabTag('');
            setLabDesc('');
            setLabImage('');
        }
        setIsLabModalOpen(true);
    };

    const handleSaveLab = (e) => {
        e.preventDefault();
        const labData = {
            id: editLabId || 'lab_' + Date.now(),
            name: labName,
            partner: labPartner,
            tag: labTag,
            desc: labDesc,
            image: labImage || 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781586068/ethnotech/lakshya_images/okvtxirv0qjmzvxlt2ql.jpg'
        };

        let updated = [...labs];
        if (editLabId !== null) {
            updated = updated.map(item => item.id === editLabId ? labData : item);
        } else {
            updated.push(labData);
        }
        setLabs(updated);
        setIsLabModalOpen(false);
    };

    const handleDeleteLab = (id) => {
        if (confirm('Delete this laboratory slot?')) {
            setLabs(labs.filter(item => item.id !== id));
        }
    };

    // Ecosystem Lab Modal Handlers
    const openEcoModal = (id = null) => {
        if (id !== null) {
            const e = ecosystemLabs.find(item => item.id === id);
            setEditEcoId(id);
            setEcoName(e.name);
            setEcoPartner(e.partner);
            setEcoDesc(e.desc);
        } else {
            setEditEcoId(null);
            setEcoName('');
            setEcoPartner('');
            setEcoDesc('');
        }
        setIsEcoModalOpen(true);
    };

    const handleSaveEco = (e) => {
        e.preventDefault();
        const ecoData = {
            id: editEcoId || 'eco_' + Date.now(),
            name: ecoName,
            partner: ecoPartner,
            desc: ecoDesc
        };

        let updated = [...ecosystemLabs];
        if (editEcoId !== null) {
            updated = updated.map(item => item.id === editEcoId ? ecoData : item);
        } else {
            updated.push(ecoData);
        }
        setEcosystemLabs(updated);
        setIsEcoModalOpen(false);
    };

    const handleDeleteEco = (id) => {
        if (confirm('Delete this ecosystem lab card?')) {
            setEcosystemLabs(ecosystemLabs.filter(item => item.id !== id));
        }
    };

    // Gallery Modal Handlers
    const openGalleryModal = (index = null) => {
        if (index !== null) {
            const item = gallery[index];
            setEditGalleryIndex(index);
            setGalleryType(item.type);
            setGallerySrc(item.src);
            setGalleryCaption(item.caption);
            setGallerySub(item.sub || '');
        } else {
            setEditGalleryIndex(null);
            setGalleryType('image');
            setGallerySrc('');
            setGalleryCaption('');
            setGallerySub('');
        }
        setIsGalleryModalOpen(true);
    };

    const handleSaveGallery = (e) => {
        e.preventDefault();
        const galleryData = {
            type: galleryType,
            src: gallerySrc,
            caption: galleryCaption,
            sub: gallerySub
        };

        let updated = [...gallery];
        if (editGalleryIndex !== null) {
            updated[editGalleryIndex] = galleryData;
        } else {
            updated.push(galleryData);
        }
        setGallery(updated);
        setIsGalleryModalOpen(false);
    };

    const handleDeleteGallery = (index) => {
        if (confirm('Delete this media asset from the gallery?')) {
            setGallery(gallery.filter((_, i) => i !== index));
        }
    };

    const tabs = [
        { id: 'pm-vision', name: 'Modi Vision (PM Quote)', icon: Quote },
        { id: 'quotes', name: 'Leadership Quotes', icon: Target },
        { id: 'labs', name: 'Vendor Labs', icon: Cpu },
        { id: 'ecosystem', name: 'Ecosystem Labs', icon: Boxes },
        { id: 'gallery', name: 'Media Gallery', icon: Clapperboard },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2">
                        <Target className="text-emerald-500" size={18} />
                        Lakshya 2047 Configuration
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                        Dynamic content editor for Gujarat's first Centre for Future Skills at Parul University
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {saveSuccess && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-bold border border-emerald-100 animate-pulse">
                            <Check size={14} /> Saved Successfully
                        </span>
                    )}
                    <button
                        onClick={handleSaveConfig}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="animate-spin" size={14} /> Saving...
                            </>
                        ) : (
                            'Save All Changes'
                        )}
                    </button>
                </div>
            </div>

            {/* Tab navigation & panels layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Tab buttons sidebar */}
                <nav className="w-full lg:w-64 flex flex-row lg:flex-col gap-1.5 bg-white p-3 rounded-2xl border border-slate-100 overflow-x-auto lg:overflow-x-visible">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-[13px] text-left transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal group ${
                                    isActive
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/15'
                                        : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                                }`}
                            >
                                <Icon size={16} className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>

                {/* Main panel container */}
                <div className="flex-1 w-full bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 min-h-[500px]">
                    {/* Panel 1: PM Vision */}
                    {activeTab === 'pm-vision' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-extrabold text-[14px] text-slate-800">Modi Skilling Vision Card</h3>
                                <p className="text-[11px] text-slate-400 font-medium">Configure Prime Minister Narendra Modi's quote and card context</p>
                            </div>
                            <form onSubmit={handleSaveConfig} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">PM Modi Quote text</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={pmQuote}
                                        onChange={(e) => setPmQuote(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                                        placeholder="Enter prime minister speech quote..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Author name</label>
                                    <input
                                        type="text"
                                        required
                                        value={pmAuthor}
                                        onChange={(e) => setPmAuthor(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="Shri Narendra Modi, Prime Minister..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Scheme description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={pmDesc}
                                        onChange={(e) => setPmDesc(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                                        placeholder="Describe the alignment of Lakshya 2047 with Viksit Bharat..."
                                    />
                                </div>

                                <div className="border-t border-slate-100 pt-4 mt-4 space-y-4">
                                    <h4 className="font-extrabold text-[12px] text-slate-700 uppercase tracking-wider">Ecosystem Lab CTA (Read More Link)</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">CTA Link URL</label>
                                            <input
                                                type="text"
                                                required
                                                value={readMoreLink}
                                                onChange={(e) => setReadMoreLink(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                                placeholder="/student/dashboard"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">CTA Link Label</label>
                                            <input
                                                type="text"
                                                required
                                                value={readMoreLabel}
                                                onChange={(e) => setReadMoreLabel(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                                placeholder="Read More: Lakshya 2047 Center for Future Skills"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Panel 2: Leadership Quotes */}
                    {activeTab === 'quotes' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-[14px] text-slate-800">Perspectives and Endorsements</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">Manage corporate and government leadership review quotes</p>
                                </div>
                                <button
                                    onClick={() => openQuoteModal()}
                                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    <Plus size={14} /> Add Quote Card
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quotes.map((q, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/10 transition-colors relative group">
                                        <div className="absolute top-4 right-4 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openQuoteModal(idx)}
                                                className="p-1.5 bg-white text-slate-500 hover:text-emerald-600 rounded-md border border-slate-200/50 shadow-sm hover:scale-105 transition-all cursor-pointer"
                                                title="Edit"
                                            >
                                                <Edit2 size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuote(idx)}
                                                className="p-1.5 bg-white text-slate-500 hover:text-rose-600 rounded-md border border-slate-200/50 shadow-sm hover:scale-105 transition-all cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                        <div className="pr-12 text-slate-600 italic text-[12.5px] leading-relaxed">
                                            "{q.quote}"
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-200/50">
                                            <div className="font-extrabold text-slate-800 text-[13px]">{q.author}</div>
                                            <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{q.title}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Panel 3: Vendor Labs */}
                    {activeTab === 'labs' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-[14px] text-slate-800">NSDC Core Labs</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">Configure corporate partnership laboratory modules (with images)</p>
                                </div>
                                <button
                                    onClick={() => openLabModal()}
                                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    <Plus size={14} /> Add Lab Block
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {labs.map((l) => (
                                    <div key={l.id} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/10 transition-colors">
                                        <div className="h-32 bg-slate-200 relative overflow-hidden">
                                            <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-slate-950/10" />
                                            <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 text-[9px] font-extrabold text-slate-800 rounded-md shadow-sm">
                                                {l.partner}
                                            </span>
                                            <div className="absolute top-3 right-3 flex gap-1">
                                                <button
                                                    onClick={() => openLabModal(l.id)}
                                                    className="w-7 h-7 bg-white text-slate-600 hover:text-emerald-600 rounded-lg shadow-sm hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLab(l.id)}
                                                    className="w-7 h-7 bg-white text-slate-600 hover:text-rose-600 rounded-lg shadow-sm hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">{l.tag}</span>
                                                <h4 className="font-extrabold text-[13.5px] text-slate-800 leading-snug mt-0.5">{l.name}</h4>
                                                <p className="text-[12px] text-slate-500 leading-relaxed mt-2 line-clamp-3">{l.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Panel 4: Ecosystem Labs */}
                    {activeTab === 'ecosystem' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-[14px] text-slate-800">NSDC Lab Ecosystem (10 Labs)</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">Manage the detailed 10-lab ecosystem cards shown on the public Lakshya page</p>
                                </div>
                                <button
                                    onClick={() => openEcoModal()}
                                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    <Plus size={14} /> Add Ecosystem Lab
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ecosystemLabs.map((eco) => (
                                    <div key={eco.id} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/10 transition-colors relative group">
                                        <div className="absolute top-4 right-4 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEcoModal(eco.id)}
                                                className="p-1.5 bg-white text-slate-500 hover:text-emerald-600 rounded-md border border-slate-200/50 shadow-sm hover:scale-105 transition-all cursor-pointer"
                                                title="Edit"
                                            >
                                                <Edit2 size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEco(eco.id)}
                                                className="p-1.5 bg-white text-slate-500 hover:text-rose-600 rounded-md border border-slate-200/50 shadow-sm hover:scale-105 transition-all cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-emerald-50 text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider rounded-md border border-emerald-100">
                                                    {eco.partner}
                                                </span>
                                            </div>
                                            <h4 className="font-extrabold text-[14px] text-slate-800 leading-snug pr-16">{eco.name}</h4>
                                            <p className="text-[12px] text-slate-500 leading-relaxed mt-2 line-clamp-4">{eco.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Panel 5: Media Gallery */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-[14px] text-slate-800">Collage & Video Library</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">Manage photographic and looping MP4 video assets</p>
                                </div>
                                <button
                                    onClick={() => openGalleryModal()}
                                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    <Plus size={14} /> Add Media Asset
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {gallery.map((item, index) => (
                                    <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden group hover:border-emerald-500/10 transition-colors flex flex-col justify-between">
                                        <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                                            {item.type === 'video' ? (
                                                <>
                                                    <video src={item.src} muted loop playsInline className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <VideoIcon size={20} className="text-white/80" />
                                                    </div>
                                                </>
                                            ) : (
                                                <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                                            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-950/80 text-[8px] font-extrabold text-emerald-400 uppercase tracking-widest rounded border border-emerald-500/20">
                                                {item.type}
                                            </span>
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openGalleryModal(index)}
                                                    className="w-6.5 h-6.5 bg-white text-slate-600 hover:text-emerald-600 rounded shadow hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                >
                                                    <Edit2 size={11} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGallery(index)}
                                                    className="w-6.5 h-6.5 bg-white text-slate-600 hover:text-rose-600 rounded shadow hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                >
                                                    <Trash2 size={11} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h5 className="font-bold text-[11.5px] text-slate-800 leading-tight truncate" title={item.caption}>{item.caption}</h5>
                                            <p className="text-[10px] text-slate-400 leading-none mt-1 truncate" title={item.sub}>{item.sub || 'No description'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal 1: Leadership Quotes Modal */}
            {isQuoteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsQuoteModalOpen(false)} />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14.5px] text-slate-800">
                                {editQuoteIndex !== null ? 'Edit Quote Card' : 'Add Quote Card'}
                            </h3>
                            <button onClick={() => setIsQuoteModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveQuote} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Quote review text</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={quoteText}
                                    onChange={(e) => setQuoteText(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Enter quote message details..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Author name</label>
                                    <input
                                        type="text"
                                        required
                                        value={quoteAuthor}
                                        onChange={(e) => setQuoteAuthor(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="e.g. Dr. Kiran Rajanna"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Title/Position</label>
                                    <input
                                        type="text"
                                        required
                                        value={quoteTitle}
                                        onChange={(e) => setQuoteTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. CEO, Ethnotech Academy"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsQuoteModalOpen(false)}
                                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg cursor-pointer"
                                >
                                    Save Card
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 2: Specialized Labs Modal */}
            {isLabModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsLabModalOpen(false)} />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14.5px] text-slate-800">
                                {editLabId !== null ? 'Edit Lab Specifications' : 'Add New Lab Card'}
                            </h3>
                            <button onClick={() => setIsLabModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveLab} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Vendor Partner</label>
                                    <input
                                        type="text"
                                        required
                                        value={labPartner}
                                        onChange={(e) => setLabPartner(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="e.g. Apple, NVIDIA, ABB"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Domain/Tag</label>
                                    <input
                                        type="text"
                                        required
                                        value={labTag}
                                        onChange={(e) => setLabTag(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. Mobile App Dev"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Lab Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={labName}
                                    onChange={(e) => setLabName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Apple iOS Developer Academy"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Specifications Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={labDesc}
                                    onChange={(e) => setLabDesc(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. Equipped with cutting-edge Apple iMacs..."
                                />
                            </div>

                            {/* Image upload block */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">Lab Cover Photo</label>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="col-span-2">
                                        <div className="relative border-2 border-dashed border-slate-250 hover:border-emerald-500 rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                            <UploadCloud className="text-slate-400 mb-0.5" size={20} />
                                            <span className="text-[10px] font-bold text-slate-500">
                                                {isLabUploading ? 'Uploading...' : 'Click to Upload Image'}
                                            </span>
                                            <input
                                                type="file"
                                                disabled={isLabUploading}
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'lab')}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-16 bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
                                        {isLabUploading ? (
                                            <Loader2 className="animate-spin text-emerald-600" size={16} />
                                        ) : labImage ? (
                                            <img src={labImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-slate-400" size={18} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Or paste image URL</label>
                                <input
                                    type="text"
                                    value={labImage}
                                    onChange={(e) => setLabImage(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-mono text-xs font-semibold"
                                    placeholder="https://res.cloudinary.com/..."
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsLabModalOpen(false)}
                                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLabUploading}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg cursor-pointer"
                                >
                                    Save Lab
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 3: Ecosystem Labs Modal */}
            {isEcoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEcoModalOpen(false)} />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14.5px] text-slate-800">
                                {editEcoId !== null ? 'Edit Ecosystem Lab' : 'Add Ecosystem Lab'}
                            </h3>
                            <button onClick={() => setIsEcoModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEco} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Partner / Vendor</label>
                                    <input
                                        type="text"
                                        required
                                        value={ecoPartner}
                                        onChange={(e) => setEcoPartner(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="e.g. Apple, NVIDIA, Cisco"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Lab Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={ecoName}
                                        onChange={(e) => setEcoName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="e.g. NVIDIA Lab"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Detailed Description</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={ecoDesc}
                                    onChange={(e) => setEcoDesc(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                                    placeholder="Enter a detailed multi-sentence description of this ecosystem lab, its curriculum, equipment, and career relevance..."
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEcoModalOpen(false)}
                                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg cursor-pointer"
                                >
                                    Save Lab
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 4: Gallery Media Modal */}
            {isGalleryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsGalleryModalOpen(false)} />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14.5px] text-slate-800">
                                {editGalleryIndex !== null ? 'Edit Media Asset' : 'Add Media Asset'}
                            </h3>
                            <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveGallery} className="p-6 space-y-4">
                            {/* Type toggle */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Media Type</label>
                                <div className="flex gap-2 mt-1">
                                    {['image', 'video'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setGalleryType(t)}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                                                galleryType === t
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                                            }`}
                                        >
                                            {t === 'image' ? <ImageIcon size={14} /> : <VideoIcon size={14} />}
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Caption title</label>
                                <input
                                    type="text"
                                    required
                                    value={galleryCaption}
                                    onChange={(e) => setGalleryCaption(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Lab Ribbon Cutting Ceremony"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Subcaption description</label>
                                <input
                                    type="text"
                                    value={gallerySub}
                                    onChange={(e) => setGallerySub(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. Union Minister reviewing iMac systems"
                                />
                            </div>

                            {/* Media upload block */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">Upload File</label>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="col-span-2">
                                        <div className="relative border-2 border-dashed border-slate-250 hover:border-emerald-500 rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                            <UploadCloud className="text-slate-400 mb-0.5" size={20} />
                                            <span className="text-[10px] font-bold text-slate-500">
                                                {isGalleryUploading ? 'Uploading...' : `Click to Upload ${galleryType === 'video' ? 'Video' : 'Image'}`}
                                            </span>
                                            <input
                                                type="file"
                                                disabled={isGalleryUploading}
                                                accept={galleryType === 'video' ? 'video/mp4' : 'image/*'}
                                                onChange={(e) => handleFileUpload(e, 'gallery')}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-16 bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
                                        {isGalleryUploading ? (
                                            <Loader2 className="animate-spin text-emerald-600" size={16} />
                                        ) : gallerySrc ? (
                                            galleryType === 'video' ? (
                                                <VideoIcon className="text-slate-400" size={18} />
                                            ) : (
                                                <img src={gallerySrc} alt="Preview" className="w-full h-full object-cover" />
                                            )
                                        ) : (
                                            <ImageIcon className="text-slate-400" size={18} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Or input source URL / Path</label>
                                <input
                                    type="text"
                                    required
                                    value={gallerySrc}
                                    onChange={(e) => setGallerySrc(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-mono text-xs font-semibold"
                                    placeholder={galleryType === 'video' ? 'e.g. https://res.cloudinary.com/.../video.mp4' : 'e.g. https://res.cloudinary.com/.../image.jpg'}
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsGalleryModalOpen(false)}
                                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isGalleryUploading}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg cursor-pointer"
                                >
                                    Save Asset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
