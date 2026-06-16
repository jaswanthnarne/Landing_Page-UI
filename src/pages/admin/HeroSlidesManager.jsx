import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, UploadCloud, Loader2, Image as ImageIcon } from 'lucide-react';

export default function HeroSlidesManager() {
    const heroSlides = useWebsiteStore((state) => state.heroSlides);
    const addHeroSlide = useWebsiteStore((state) => state.addHeroSlide);
    const updateHeroSlide = useWebsiteStore((state) => state.updateHeroSlide);
    const deleteHeroSlide = useWebsiteStore((state) => state.deleteHeroSlide);

    const [isOpen, setIsOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const openModal = (index = null) => {
        if (index !== null) {
            const slide = heroSlides[index];
            setEditIndex(index);
            setHeading(slide.heading);
            setDescription(slide.description);
            setImageUrl(slide.image);
        } else {
            setEditIndex(null);
            setHeading('');
            setDescription('');
            setImageUrl('');
        }
        setIsOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedUrl = await uploadToCloudinary(file, 'slides');
            setImageUrl(uploadedUrl);
        } catch (err) {
            alert(err.message || 'Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!imageUrl) {
            alert('Please upload a slide image first.');
            return;
        }

        const slideData = { heading, description, image: imageUrl };

        if (editIndex !== null) {
            updateHeroSlide(editIndex, slideData);
        } else {
            addHeroSlide(slideData);
        }
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Carousel Slides</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Configure front banner slides</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/10 active:scale-98 transition-all duration-200 cursor-pointer"
                >
                    <Plus size={16} />
                    Add New Slide
                </button>
            </div>

            {/* Grid of slides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                        {/* Slide Banner Preview */}
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                            <img
                                src={slide.image}
                                alt="Slide preview"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/20" />
                            <div className="absolute top-4 right-4 flex gap-1.5">
                                <button
                                    onClick={() => openModal(index)}
                                    className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 hover:text-[#004AAD] flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
                                    title="Edit Slide"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this slide?')) {
                                            deleteHeroSlide(index);
                                        }
                                    }}
                                    className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 hover:text-rose-600 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
                                    title="Delete Slide"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Slide Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-extrabold text-[14.5px] text-slate-800 line-clamp-2 leading-snug">
                                    {slide.heading}
                                </h3>
                                <p className="text-[12.5px] text-slate-500 leading-relaxed mt-2 line-clamp-3">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
                        >
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-extrabold text-[15px] text-slate-800">
                                    {editIndex !== null ? 'Edit Slide Details' : 'Add New Hero Slide'}
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                {/* Slide heading */}
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Slide Title / Heading</label>
                                    <input
                                        type="text"
                                        required
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. Collaborating for Educational Excellence"
                                    />
                                </div>

                                {/* Slide description */}
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Slide Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. Academy providing industry-ready skilling..."
                                    />
                                </div>

                                {/* Slide banner image upload */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide block">Slide Image Banner</label>
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <div className="col-span-2">
                                            <div className="relative border-2 border-dashed border-slate-200 hover:border-[#004AAD] rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                                <UploadCloud className="text-slate-400 mb-1" size={24} />
                                                <span className="text-[11px] font-bold text-slate-500">
                                                    {isUploading ? 'Uploading Image...' : 'Click to Upload Image'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    disabled={isUploading}
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="h-20 bg-slate-100 border border-slate-200/50 rounded-2xl overflow-hidden flex items-center justify-center relative">
                                            {isUploading ? (
                                                <Loader2 className="animate-spin text-[#004AAD]" size={20} />
                                            ) : imageUrl ? (
                                                <img src={imageUrl} alt="Upload preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-slate-400" size={20} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Manual Image URL Input (fallback) */}
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Or specify image URL</label>
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. /Images/slide1.jpg or Cloudinary URL"
                                    />
                                </div>

                                {/* Save Button */}
                                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] disabled:bg-blue-400 text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
