import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { Plus, Edit2, Trash2, X, UploadCloud, Loader2, Image as ImageIcon } from 'lucide-react';

export default function CoeLabsManager() {
    const coeLabs = useWebsiteStore((state) => state.coeLabs);
    const addCoeLab = useWebsiteStore((state) => state.addCoeLab);
    const updateCoeLab = useWebsiteStore((state) => state.updateCoeLab);
    const deleteCoeLab = useWebsiteStore((state) => state.deleteCoeLab);

    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [partner, setPartner] = useState('');
    const [desc, setDesc] = useState('');
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('#004AAD');
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const openModal = (id = null) => {
        if (id !== null) {
            const lab = coeLabs.find((l) => l.id === id);
            setEditId(id);
            setName(lab.name);
            setPartner(lab.partner);
            setDesc(lab.desc);
            setTag(lab.tag);
            setColor(lab.color || '#004AAD');
            setImageUrl(lab.image);
        } else {
            setEditId(null);
            setName('');
            setPartner('');
            setDesc('');
            setTag('');
            setColor('#004AAD');
            setImageUrl('');
        }
        setIsOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedUrl = await uploadToCloudinary(file, 'labs');
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
            alert('Please upload a cover image first.');
            return;
        }

        const labData = { name, partner, desc, tag, color, image: imageUrl };

        if (editId !== null) {
            updateCoeLab(editId, labData);
        } else {
            addCoeLab(labData);
        }
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Future Skill Labs (CoE)</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Configure Centres of Excellence laboratories</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                    <Plus size={16} />
                    Add New CoE Lab
                </button>
            </div>

            {/* Labs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coeLabs.map((lab) => (
                    <div
                        key={lab.id}
                        className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                        {/* Cover Image */}
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                            <img
                                src={lab.image}
                                alt={lab.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/10" />
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                                    {lab.partner}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-1.5">
                                <button
                                    onClick={() => openModal(lab.id)}
                                    className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 hover:text-[#004AAD] flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
                                    title="Edit Lab"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Are you sure you want to delete the lab "${lab.name}"?`)) {
                                            deleteCoeLab(lab.id);
                                        }
                                    }}
                                    className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 hover:text-rose-600 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
                                    title="Delete Lab"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between" style={{ borderLeft: `4px solid ${lab.color || '#004AAD'}` }}>
                            <div className="space-y-2">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-[#004AAD] rounded-md">
                                    {lab.tag}
                                </span>
                                <h3 className="font-extrabold text-[14.5px] text-slate-800 leading-snug group-hover:text-[#004AAD] transition-colors">
                                    {lab.name}
                                </h3>
                                <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-3">
                                    {lab.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[15px] text-slate-800">
                                {editId !== null ? 'Edit Laboratory Details' : 'Add New CoE Laboratory'}
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Lab Partner</label>
                                    <input
                                        type="text"
                                        required
                                        value={partner}
                                        onChange={(e) => setPartner(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="e.g. Apple, Intel, IBM"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Lab Tag/Domain</label>
                                    <input
                                        type="text"
                                        required
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. iOS App Dev"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Lab Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Apple Centre of Excellence"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Description Details</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Brief specifications of systems, iMacs, and topics trained..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Border Accent Color</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-9 h-9 rounded-xl border-none cursor-pointer outline-none"
                                        />
                                        <span className="text-xs font-mono font-bold text-slate-500 uppercase">{color}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Lab Image Banner Image upload */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide block">Lab Cover Image</label>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="col-span-2">
                                        <div className="relative border-2 border-dashed border-slate-200 hover:border-[#004AAD] rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                            <UploadCloud className="text-slate-400 mb-0.5" size={20} />
                                            <span className="text-[10px] font-bold text-slate-500">
                                                {isUploading ? 'Uploading...' : 'Click to Upload Image'}
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
                                    <div className="h-16 bg-slate-100 border border-slate-200/50 rounded-2xl overflow-hidden flex items-center justify-center relative">
                                        {isUploading ? (
                                            <Loader2 className="animate-spin text-[#004AAD]" size={16} />
                                        ) : imageUrl ? (
                                            <img src={imageUrl} alt="Lab preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-slate-400" size={16} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Manual URL entry */}
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Or specify image URL</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. /coe/Apple.jpg or Cloudinary URL"
                                />
                            </div>

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
                                    className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
