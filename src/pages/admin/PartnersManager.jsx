import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { Plus, Trash2, X, UploadCloud, Loader2, Image as ImageIcon } from 'lucide-react';

export default function PartnersManager() {
    const placementPartners = useWebsiteStore((state) => state.placementPartners);
    const addPlacementPartner = useWebsiteStore((state) => state.addPlacementPartner);
    const deletePlacementPartner = useWebsiteStore((state) => state.deletePlacementPartner);

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedUrl = await uploadToCloudinary(file, 'partners');
            setLogoUrl(uploadedUrl);
        } catch (err) {
            alert(err.message || 'Logo upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddPartner = (e) => {
        e.preventDefault();
        if (!logoUrl) {
            alert('Please upload a company logo first.');
            return;
        }

        addPlacementPartner({ name, logo: logoUrl });
        setName('');
        setLogoUrl('');
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Hiring Partners</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Configure marquee recruiters and corporate logos</p>
                </div>
                <button
                    onClick={() => {
                        setName('');
                        setLogoUrl('');
                        setIsOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                    <Plus size={16} />
                    Add Hiring Partner
                </button>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {placementPartners.map((partner, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-150/50 hover:border-slate-200 rounded-3xl p-5 flex flex-col items-center justify-between h-40 shadow-sm hover:shadow-md transition-all relative group cursor-default text-center overflow-hidden"
                    >
                        {/* Delete float button */}
                        <button
                            onClick={() => {
                                if (confirm(`Are you sure you want to delete "${partner.name}"?`)) {
                                    deletePlacementPartner(index);
                                }
                            }}
                            className="absolute top-2 right-2 w-7 h-7 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Partner"
                        >
                            <Trash2 size={13} />
                        </button>

                        <div className="flex-1 flex items-center justify-center w-full p-2">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-[60px] max-w-full object-contain mix-blend-multiply"
                            />
                        </div>
                        <div className="w-full border-t border-slate-50 pt-2 mt-2">
                            <span className="text-[12px] font-bold text-slate-700 block truncate">
                                {partner.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Dialog */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[15px] text-slate-800">Add New Hiring Partner</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddPartner} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Company / Partner Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. NVIDIA Corporation"
                                />
                            </div>

                            {/* Cloudinary upload for company logo */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide block">Company Logo Image</label>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="col-span-2">
                                        <div className="relative border-2 border-dashed border-slate-200 hover:border-[#004AAD] rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50/50 transition-colors">
                                            <UploadCloud className="text-slate-400 mb-0.5" size={20} />
                                            <span className="text-[10px] font-bold text-slate-500">
                                                {isUploading ? 'Uploading Logo...' : 'Click to Upload Logo'}
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
                                        ) : logoUrl ? (
                                            <img src={logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-slate-400" size={16} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Manual URL input */}
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Or specify logo URL</label>
                                <input
                                    type="text"
                                    value={logoUrl}
                                    onChange={(e) => setLogoUrl(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. /Partners/Nvidia.png or Cloudinary URL"
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
