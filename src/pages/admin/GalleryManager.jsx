import { useState, useEffect } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { uploadToCloudinary } from '../../utils/cloudinary';
import {
    Plus, Edit2, Trash2, X, UploadCloud, Loader2,
    Image as ImageIcon, Check, Images, MoveUp, MoveDown, Save, FileImage
} from 'lucide-react';

const FALLBACK_CATEGORIES = [
    {
        id: 'cfs',
        label: 'Centre For Future Skills',
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584304/ethnotech/gallery/zt6lpirckmrgcmx2ly6a.jpg', label: 'Centre Inauguration', sub: 'NSDC Centre for Future Skills Launch — DYPATU' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584305/ethnotech/gallery/xzpiab9j4nsqc04kkklw.jpg', label: 'Inaugural Ceremony', sub: 'Centre for Future Skills, D Y Patil University' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584306/ethnotech/gallery/e3jzgilmufrbs2etaywn.jpg', label: 'Centre Unveiling', sub: 'DYPATU Campus — Official Ceremony' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584309/ethnotech/gallery/ab9apcyntgufvmlkhmdi.jpg', label: 'NSDC Recognition', sub: 'Award Ceremony — Centre for Future Skills' }
        ]
    },
    {
        id: 'labs',
        label: 'Labs & Infra',
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584234/ethnotech/coe/qd89a0ea0ki3x2agagsi.jpg', label: 'Apple iMac Lab', sub: 'Apple Centre of Excellence — 30+ Workstations' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584238/ethnotech/coe/k4gcz6xu4jloahmr16ts.jpg', label: 'AR/VR Innovation Lab', sub: 'Green Screen & Production Studio' }
        ]
    },
    {
        id: 'global',
        label: 'Beyond Boundaries: Global Citizens',
        items: [
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584325/ethnotech/gallery/lcchn6gz2a964pwgieeg.jpg', label: 'Global Citizens Summit', sub: 'Beyond Boundaries — International Conference' },
            { src: 'https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584327/ethnotech/gallery/jbyyuvuxyurwy80q9s5x.jpg', label: 'Cultural Exchange', sub: 'Cross-Cultural Collaboration Event' }
        ]
    }
];

export default function GalleryManager() {
    const galleryCategories = useWebsiteStore((state) => state.galleryCategories);
    const updateGalleryCategories = useWebsiteStore((state) => state.updateGalleryCategories);

    const [categoriesList, setCategoriesList] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Modal state for adding/editing gallery item
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItemIndex, setEditItemIndex] = useState(null);
    const [itemLabel, setItemLabel] = useState('');
    const [itemSub, setItemSub] = useState('');
    const [itemSrc, setItemSrc] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Modal state for adding category
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [newCatLabel, setNewCatLabel] = useState('');

    // Sync state when store config changes
    useEffect(() => {
        const loaded = galleryCategories && galleryCategories.length > 0 ? galleryCategories : FALLBACK_CATEGORIES;
        setCategoriesList(JSON.parse(JSON.stringify(loaded))); // Deep copy to prevent mutating store directly
        if (loaded.length > 0 && !activeTab) {
            setActiveTab(loaded[0].id);
        }
    }, [galleryCategories]);

    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            await updateGalleryCategories(categoriesList);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            alert('Failed to save gallery: ' + (err.message || 'Unknown error'));
        } finally {
            setIsSaving(false);
        }
    };

    const handleCategoryNameChange = (id, newName) => {
        setCategoriesList(prev => prev.map(cat => cat.id === id ? { ...cat, label: newName } : cat));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        const trimmed = newCatLabel.trim();
        if (!trimmed) return;

        const id = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('cat-' + Date.now());
        if (categoriesList.find(c => c.id === id)) {
            alert('A category with a similar name already exists.');
            return;
        }

        const newCat = {
            id,
            label: trimmed,
            items: []
        };

        setCategoriesList(prev => [...prev, newCat]);
        setActiveTab(id);
        setNewCatLabel('');
        setIsCatModalOpen(false);
    };

    const handleDeleteCategory = (id) => {
        const cat = categoriesList.find(c => c.id === id);
        if (!cat) return;

        if (!confirm(`Are you sure you want to delete the category "${cat.label}" and all its ${cat.items?.length || 0} images?`)) {
            return;
        }

        const updated = categoriesList.filter(c => c.id !== id);
        setCategoriesList(updated);
        if (updated.length > 0) {
            setActiveTab(updated[0].id);
        } else {
            setActiveTab('');
        }
    };

    const handleOpenItemModal = (index = null) => {
        const activeCat = categoriesList.find(c => c.id === activeTab);
        if (!activeCat) return;

        if (index !== null) {
            const item = activeCat.items[index];
            setEditItemIndex(index);
            setItemLabel(item.label || '');
            setItemSub(item.sub || '');
            setItemSrc(item.src || '');
        } else {
            setEditItemIndex(null);
            setItemLabel('');
            setItemSub('');
            setItemSrc('');
        }
        setIsModalOpen(true);
    };

    const handleSaveItem = (e) => {
        e.preventDefault();
        if (!itemSrc) {
            alert('Please select or upload an image.');
            return;
        }

        const newItem = {
            src: itemSrc,
            label: itemLabel,
            sub: itemSub
        };

        setCategoriesList(prev => prev.map(cat => {
            if (cat.id !== activeTab) return cat;

            let updatedItems = [...(cat.items || [])];
            if (editItemIndex !== null) {
                updatedItems[editItemIndex] = newItem;
            } else {
                updatedItems.push(newItem);
            }
            return { ...cat, items: updatedItems };
        }));

        setIsModalOpen(false);
    };

    const handleDeleteItem = (index) => {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;

        setCategoriesList(prev => prev.map(cat => {
            if (cat.id !== activeTab) return cat;
            return {
                ...cat,
                items: (cat.items || []).filter((_, i) => i !== index)
            };
        }));
    };

    const handleMoveItem = (index, direction) => {
        setCategoriesList(prev => prev.map(cat => {
            if (cat.id !== activeTab) return cat;

            const items = [...(cat.items || [])];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex >= items.length) return cat;

            // Swap items
            const temp = items[index];
            items[index] = items[targetIndex];
            items[targetIndex] = temp;

            return { ...cat, items };
        }));
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file, 'gallery');
            setItemSrc(url);
        } catch (err) {
            alert(err.message || 'Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const currentCategory = categoriesList.find(c => c.id === activeTab);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2">
                        <Images className="text-blue-500" size={18} />
                        Gallery Categories Manager
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                        Configure visual categories, custom headings, captions, and upload image files
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {saveSuccess && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-bold border border-emerald-100 animate-pulse">
                            <Check size={14} /> Saved Successfully
                        </span>
                    )}
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="animate-spin" size={14} /> Saving...
                            </>
                        ) : (
                            <>
                                <Save size={14} /> Save All Categories
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Body Layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Tabs Sidebar */}
                <nav className="w-full lg:w-64 flex flex-row lg:flex-col gap-1.5 bg-white p-3 rounded-2xl border border-slate-100 overflow-x-auto lg:overflow-x-visible">
                    {categoriesList.map((cat) => {
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl font-extrabold text-[13px] text-left transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal group ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
                                        : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <ImageIcon size={16} className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
                                    <span className="truncate max-w-[140px]">{cat.label}</span>
                                </div>
                                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {cat.items ? cat.items.length : 0}
                                </span>
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setIsCatModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 mt-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-500 text-[12px] font-bold rounded-xl transition-all border border-dashed border-slate-200 active:scale-97 cursor-pointer"
                    >
                        <Plus size={14} /> Add Category
                    </button>
                </nav>

                {/* Main Editing Area */}
                <div className="flex-1 w-full bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 min-h-[500px]">
                    {currentCategory ? (
                        <div className="space-y-6">
                            {/* Category Title Heading Config */}
                            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end justify-between">
                                <div className="flex-1 space-y-3">
                                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Category Heading Label</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentCategory.label}
                                        onChange={(e) => handleCategoryNameChange(currentCategory.id, e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-[14px] text-slate-800 font-extrabold focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all"
                                        placeholder="Category Heading Name..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCategory(currentCategory.id)}
                                    className="flex items-center gap-1.5 px-4 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-extrabold text-xs rounded-xl active:scale-98 transition-all cursor-pointer h-[42px]"
                                >
                                    <Trash2 size={14} /> Delete Category
                                </button>
                            </div>

                            {/* Items Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="font-extrabold text-[14px] text-slate-800">Gallery Items ({currentCategory.items ? currentCategory.items.length : 0})</h3>
                                    <p className="text-[10px] text-slate-400 font-medium">Manage images, captions, subtitles, and ordering within this category</p>
                                </div>
                                <button
                                    onClick={() => handleOpenItemModal()}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-extrabold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    <Plus size={14} /> Add Image Card
                                </button>
                            </div>

                            {/* Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {currentCategory.items && currentCategory.items.map((item, index) => (
                                    <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex flex-col group hover:border-blue-500/10 hover:shadow-md transition-all relative">
                                        {/* Image Display */}
                                        <div className="relative aspect-video bg-slate-900 overflow-hidden">
                                            <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-slate-950/20" />
                                            
                                            {/* Item Ordering Controls */}
                                            <div className="absolute bottom-2 left-2 flex gap-1">
                                                <button
                                                    onClick={() => handleMoveItem(index, 'up')}
                                                    disabled={index === 0}
                                                    className="w-6 h-6 bg-slate-950/60 hover:bg-slate-950 text-white rounded flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                                                    title="Move Up / Left"
                                                >
                                                    <MoveUp size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleMoveItem(index, 'down')}
                                                    disabled={index === currentCategory.items.length - 1}
                                                    className="w-6 h-6 bg-slate-950/60 hover:bg-slate-950 text-white rounded flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                                                    title="Move Down / Right"
                                                >
                                                    <MoveDown size={12} />
                                                </button>
                                            </div>

                                            {/* Action Controls */}
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenItemModal(index)}
                                                    className="w-7 h-7 bg-white text-slate-600 hover:text-blue-600 rounded-lg shadow-md hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                    title="Edit Card"
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(index)}
                                                    className="w-7 h-7 bg-white text-slate-600 hover:text-rose-600 rounded-lg shadow-md hover:scale-105 flex items-center justify-center transition-all cursor-pointer"
                                                    title="Delete Card"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Card Text Info */}
                                        <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                                            <div>
                                                <h4 className="font-extrabold text-[12.5px] text-slate-800 leading-snug line-clamp-1">{item.label || 'Untitled Caption'}</h4>
                                                <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed line-clamp-2">{item.sub || 'No subtitle provided.'}</p>
                                            </div>
                                            <span className="text-[8.5px] text-slate-300 font-bold block pt-2 truncate">{item.src}</span>
                                        </div>
                                    </div>
                                ))}
                                {(!currentCategory.items || currentCategory.items.length === 0) && (
                                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                                        <ImageIcon size={32} className="text-slate-300 mb-2" />
                                        <p className="text-[12px] font-bold">No images in this category</p>
                                        <button
                                            onClick={() => handleOpenItemModal()}
                                            className="mt-3 text-[11px] font-bold text-blue-600 hover:underline"
                                        >
                                            Add the first image
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                            <Images size={40} className="text-slate-300 mb-2" />
                            <p className="text-sm font-bold">Select a category sidebar tab to begin editing</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Add / Edit Item */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14px] text-slate-800">
                                {editItemIndex !== null ? 'Edit Gallery Card' : 'Add New Gallery Card'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveItem} className="p-6 space-y-4">
                            {/* File Upload Section */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Image File (Cloudinary)</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {itemSrc ? (
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                                            <img src={itemSrc} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-700 rounded-lg text-xs font-bold shadow cursor-pointer active:scale-95 transition-all">
                                                    <UploadCloud size={14} /> Change Image
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-50/50 ${isUploading ? 'opacity-50 border-slate-200' : 'border-slate-200/80 hover:border-blue-400'}`}>
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="animate-spin text-blue-500" size={24} />
                                                    <span className="text-[11px] text-slate-400 font-bold">Uploading file to Cloudinary...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <UploadCloud className="text-slate-400 group-hover:text-blue-500" size={26} />
                                                    <span className="text-[11px] text-slate-600 font-extrabold">Upload image file</span>
                                                    <span className="text-[9px] text-slate-400 font-medium">JPEG, PNG, WEBP up to 5MB</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                                                </>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Direct Image URL input */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Or Image URL</label>
                                <input
                                    type="text"
                                    value={itemSrc}
                                    onChange={(e) => setItemSrc(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="https://res.cloudinary.com/..."
                                />
                            </div>

                            {/* Caption Text */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Caption (Main Label)</label>
                                <input
                                    type="text"
                                    required
                                    value={itemLabel}
                                    onChange={(e) => setItemLabel(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Centre Inauguration"
                                />
                            </div>

                            {/* Subtitle Text */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Subtitle Description</label>
                                <textarea
                                    rows={2}
                                    value={itemSub}
                                    onChange={(e) => setItemSub(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                                    placeholder="e.g. NSDC Centre for Future Skills Launch — DYPATU"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                                >
                                    {editItemIndex !== null ? 'Save Changes' : 'Add Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal for Add Category */}
            {isCatModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14px] text-slate-800">Add New Category</h3>
                            <button
                                onClick={() => setIsCatModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCategory} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCatLabel}
                                    onChange={(e) => setNewCatLabel(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Special Events"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsCatModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
