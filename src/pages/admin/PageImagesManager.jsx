import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { UploadCloud, Loader2, Image as ImageIcon, Check, Edit2, Globe } from 'lucide-react';

const PAGE_IMAGE_SLOTS = [
    // About Page
    { key: 'about-1', page: 'About Us', label: 'Column 1 - Top (Light Ceremony)', desc: 'Left column upper image on the About page hero section.' },
    { key: 'about-2', page: 'About Us', label: 'Column 1 - Bottom (Group Lighting)', desc: 'Left column lower image on the About page hero section.' },
    { key: 'about-3', page: 'About Us', label: 'Column 2 - Top (Keynote Speaker)', desc: 'Middle column upper centerpiece on the About page hero section.' },
    { key: 'about-4', page: 'About Us', label: 'Column 2 - Bottom (Handover Ceremony)', desc: 'Middle column lower centerpiece on the About page hero section.' },
    { key: 'about-5', page: 'About Us', label: 'Column 3 - Center (Panel Discussion)', desc: 'Right column centerpiece on the About page hero section.' },

    // Careers Page
    { key: 'careers-1', page: 'Careers', label: 'Column 1 - Top (Team Meeting)', desc: 'Left column upper image on the Careers page hero.' },
    { key: 'careers-2', page: 'Careers', label: 'Column 1 - Bottom (Innovation)', desc: 'Left column lower image on the Careers page hero.' },
    { key: 'careers-3', page: 'Careers', label: 'Column 2 - Top (Development)', desc: 'Right column upper centerpiece on the Careers page hero.' },
    { key: 'careers-4', page: 'Careers', label: 'Column 2 - Bottom (Creative Lab)', desc: 'Right column lower centerpiece on the Careers page hero.' },

    // Programmes Page
    { key: 'programmes-1', page: 'Programmes', label: 'Column 1 - Top (Learning Session)', desc: 'Left column upper image on the Programmes page hero.' },
    { key: 'programmes-2', page: 'Programmes', label: 'Column 1 - Bottom (Computing)', desc: 'Left column lower image on the Programmes page hero.' },
    { key: 'programmes-3', page: 'Programmes', label: 'Column 2 - Top (AR Training)', desc: 'Right column upper centerpiece on the Programmes page hero.' },
    { key: 'programmes-4', page: 'Programmes', label: 'Column 2 - Bottom (Intel Training)', desc: 'Right column lower centerpiece on the Programmes page hero.' },

    // CoE Page
    { key: 'coe-1', page: 'Centre of Excellence', label: 'Column 1 - Top (Apple Lab)', desc: 'Left column upper image on the CoE page hero.' },
    { key: 'coe-2', page: 'Centre of Excellence', label: 'Column 1 - Bottom (Festo Lab)', desc: 'Left column lower image on the CoE page hero.' },
    { key: 'coe-3', page: 'Centre of Excellence', label: 'Column 2 - Top (AR VR Lab)', desc: 'Right column upper centerpiece on the CoE page hero.' },
    { key: 'coe-4', page: 'Centre of Excellence', label: 'Column 2 - Bottom (Festo Hydraulics)', desc: 'Right column lower centerpiece on the CoE page hero.' },

    // Placements Page
    { key: 'placements-1', page: 'Placements', label: 'Column 1 - Top (Interview Prep)', desc: 'Left column upper image on the Placements page hero.' },
    { key: 'placements-2', page: 'Placements', label: 'Column 1 - Bottom (Skills Training)', desc: 'Left column lower image on the Placements page hero.' },
    { key: 'placements-3', page: 'Placements', label: 'Column 2 - Top (Corporate Connect)', desc: 'Right column upper centerpiece on the Placements page hero.' },
    { key: 'placements-4', page: 'Placements', label: 'Column 2 - Bottom (Placement Setup)', desc: 'Right column lower centerpiece on the Placements page hero.' },

    // Internship & Projects Page
    { key: 'internships-1', page: 'Internship & Projects', label: 'Column 1 - Top (Project Hardware)', desc: 'Left column upper image on the Internship & Projects hero.' },
    { key: 'internships-2', page: 'Internship & Projects', label: 'Column 1 - Bottom (Mentorship)', desc: 'Left column lower image on the Internship & Projects hero.' },
    { key: 'internships-3', page: 'Internship & Projects', label: 'Column 2 - Top (Live Projects)', desc: 'Right column upper centerpiece on the Internship & Projects hero.' },
    { key: 'internships-4', page: 'Internship & Projects', label: 'Column 2 - Bottom (AR/VR Development)', desc: 'Right column lower centerpiece on the Internship & Projects hero.' }
];

const PAGES = ['About Us', 'Careers', 'Programmes', 'Centre of Excellence', 'Placements', 'Internship & Projects'];

export default function PageImagesManager() {
    const pageImages = useWebsiteStore((state) => state.pageImages || {});
    const updatePageImage = useWebsiteStore((state) => state.updatePageImage);

    const [selectedPage, setSelectedPage] = useState('About Us');
    const [uploadingKey, setUploadingKey] = useState(null);
    const [editingKey, setEditingKey] = useState(null);
    const [manualUrl, setManualUrl] = useState('');

    const handleImageUpload = async (e, key) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingKey(key);
        try {
            const uploadedUrl = await uploadToCloudinary(file, 'page_images');
            updatePageImage(key, uploadedUrl);
        } catch (err) {
            alert(err.message || 'Image upload failed. Check Cloudinary settings.');
        } finally {
            setUploadingKey(null);
        }
    };

    const handleSaveManualUrl = (key) => {
        if (!manualUrl) {
            alert('Please specify a valid URL or path.');
            return;
        }
        updatePageImage(key, manualUrl);
        setEditingKey(null);
        setManualUrl('');
    };

    const filteredSlots = PAGE_IMAGE_SLOTS.filter(slot => slot.page === selectedPage);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div>
                <h2 className="text-[14.5px] font-extrabold text-slate-800">Page Images Manager</h2>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                    Manage dynamic collage images displayed on public pages
                </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                {PAGES.map((page) => (
                    <button
                        key={page}
                        onClick={() => {
                            setSelectedPage(page);
                            setEditingKey(null);
                            setManualUrl('');
                        }}
                        className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                            selectedPage === page
                                ? 'bg-[#004AAD] text-white shadow-md shadow-blue-500/10'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Images layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSlots.map((slot) => {
                    const currentUrl = pageImages[slot.key];
                    const isUploading = uploadingKey === slot.key;
                    const isEditing = editingKey === slot.key;

                    return (
                        <div
                            key={slot.key}
                            className="bg-white border border-slate-150/50 rounded-3xl p-6 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Image Preview Block */}
                            <div className="w-full md:w-40 h-44 bg-slate-50 border border-slate-200/40 rounded-2xl overflow-hidden flex items-center justify-center relative shrink-0 group">
                                {currentUrl ? (
                                    <>
                                        <img
                                            src={currentUrl}
                                            alt={slot.label}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/assets/placeholder-image.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <a
                                                href={currentUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors"
                                                title="Open Image"
                                            >
                                                <Globe size={16} />
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <ImageIcon className="text-slate-400" size={32} />
                                )}
                                {isUploading && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                        <Loader2 className="animate-spin text-white mb-2" size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Uploading...</span>
                                    </div>
                                )}
                            </div>

                            {/* Details and Actions Block */}
                            <div className="flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <span className="text-[10px] font-extrabold text-[#004AAD] uppercase tracking-wider block mb-1">
                                        Slot: {slot.key}
                                    </span>
                                    <h4 className="text-[13.5px] font-bold text-slate-800 leading-snug">
                                        {slot.label}
                                    </h4>
                                    <p className="text-[11.5px] text-slate-400 font-medium leading-relaxed mt-1">
                                        {slot.desc}
                                    </p>
                                </div>

                                {isEditing ? (
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={manualUrl}
                                                onChange={(e) => setManualUrl(e.target.value)}
                                                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-800 focus:border-[#004AAD] outline-none font-medium"
                                                placeholder="Enter URL or static path"
                                            />
                                            <button
                                                onClick={() => handleSaveManualUrl(slot.key)}
                                                className="px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold flex items-center justify-center cursor-pointer"
                                            >
                                                <Check size={14} />
                                            </button>
                                            <button
                                                onClick={() => setEditingKey(null)}
                                                className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[12px] font-bold flex items-center justify-center cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {/* Cloudinary upload button */}
                                        <div className="relative">
                                            <button
                                                disabled={isUploading}
                                                className="flex items-center gap-1.5 px-3 py-2 bg-[#004AAD] hover:bg-[#003a8c] disabled:bg-[#004AAD]/50 text-white text-[11px] font-bold rounded-xl hover:shadow active:scale-97 transition-all cursor-pointer"
                                            >
                                                <UploadCloud size={14} />
                                                Upload Image
                                            </button>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                disabled={isUploading}
                                                onChange={(e) => handleImageUpload(e, slot.key)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>

                                        {/* Direct URL edit button */}
                                        <button
                                            onClick={() => {
                                                setEditingKey(slot.key);
                                                setManualUrl(currentUrl || '');
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-xl active:scale-97 transition-all cursor-pointer"
                                        >
                                            <Edit2 size={12} />
                                            Edit URL
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
