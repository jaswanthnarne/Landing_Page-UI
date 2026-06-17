import { useState, useEffect } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import {
    Plus, Edit2, Trash2, X, Loader2, Check,
    MoveUp, MoveDown, Save, Link2, ChevronDown, ListPlus, LayoutGrid
} from 'lucide-react';

const STATIC_PAGE_OPTIONS = [
    { label: 'Home Page', value: '/' },
    { label: 'About Us', value: '/about' },
    { label: 'Programmes', value: '/programmes' },
    { label: 'Centre of Excellence', value: '/centre-of-excellence' },
    { label: 'Lakshya 2047 (Future Skills)', value: '/lakshya-2047' },
    { label: 'Gallery', value: '/gallery' },
    { label: 'Careers', value: '/careers' },
    { label: 'Placements', value: '/placements' },
    { label: 'Internships & Projects', value: '/internship-and-projects' },
    { label: 'Contact Us', value: '/contact' },
    { label: 'Educational Partners Section', value: '/about#educational-partners' },
    { label: 'Corporate Partners Section', value: '/about#corporate-partners' },
    { label: 'Recruitment Partners Section', value: '/placements#recruitment-partners' }
];

const DEFAULT_NAVBAR_ITEMS = [
    { label: 'Home', href: '/' },
    {
        label: 'Programs',
        dropdown: [
            { label: 'Programmes', href: '/programmes' },
            { label: 'Centre of Excellence', href: '/centre-of-excellence' },
            { label: 'Lakshya 2047 (Future Skills)', href: '/lakshya-2047' }
        ]
    },
    {
        label: 'Placements',
        dropdown: [
            { label: 'Placements Page', href: '/placements' },
            { label: 'Internship & Projects', href: '/internship-and-projects' },
            { label: 'Educational Partners', href: '/about#educational-partners' },
            { label: 'Hiring Partners', href: '/about#corporate-partners' }
        ]
    },
    { label: 'Careers', href: '/careers' },
    {
        label: 'Company',
        dropdown: [
            { label: 'About Us', href: '/about' },
            { label: 'Gallery', href: '/gallery' }
        ]
    },
    { label: 'Contact', href: '/contact' }
];

export default function NavigationManager() {
    const navbarItems = useWebsiteStore((state) => state.navbarItems);
    const updateNavbarItems = useWebsiteStore((state) => state.updateNavbarItems);
    const blogs = useWebsiteStore((state) => state.blogs) || [];

    // Combine static routes with dynamic blog post endpoints
    const pageOptions = [
        ...STATIC_PAGE_OPTIONS,
        ...blogs.map((blog) => ({
            label: `Blog: ${blog.title}`,
            value: `/blog/${blog.slug}`
        })),
        { label: 'Custom Path / URL...', value: 'custom' }
    ];

    const [itemsList, setItemsList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Modal state for Heading Item (Top Level)
    const [isHeadModalOpen, setIsHeadModalOpen] = useState(false);
    const [editHeadIndex, setEditHeadIndex] = useState(null);
    const [headLabel, setHeadLabel] = useState('');
    const [headType, setHeadType] = useState('link'); // 'link' or 'dropdown'
    const [headHref, setHeadHref] = useState('/');
    const [headCustomHref, setHeadCustomHref] = useState('');

    // Modal state for Dropdown Child Item
    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [parentHeadIndex, setParentHeadIndex] = useState(null);
    const [editChildIndex, setEditChildIndex] = useState(null);
    const [childLabel, setChildLabel] = useState('');
    const [childHref, setChildHref] = useState('/');
    const [childCustomHref, setChildCustomHref] = useState('');

    // Sync state when store config changes
    useEffect(() => {
        const loaded = navbarItems && navbarItems.length > 0 ? navbarItems : DEFAULT_NAVBAR_ITEMS;
        setItemsList(JSON.parse(JSON.stringify(loaded))); // Deep copy
    }, [navbarItems]);

    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            await updateNavbarItems(itemsList);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            alert('Failed to save navigation config: ' + (err.message || 'Unknown error'));
        } finally {
            setIsSaving(false);
        }
    };

    // Reorder Top Level Items
    const handleMoveHead = (index, direction) => {
        const items = [...itemsList];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= items.length) return;

        const temp = items[index];
        items[index] = items[targetIndex];
        items[targetIndex] = temp;
        setItemsList(items);
    };

    // Reorder Dropdown Child Items
    const handleMoveChild = (parentIdx, index, direction) => {
        const items = [...itemsList];
        const children = [...(items[parentIdx].dropdown || [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= children.length) return;

        const temp = children[index];
        children[index] = children[targetIndex];
        children[targetIndex] = temp;

        items[parentIdx].dropdown = children;
        setItemsList(items);
    };

    // Delete Top Level Item
    const handleDeleteHead = (index) => {
        const item = itemsList[index];
        if (!confirm(`Are you sure you want to delete the heading "${item.label}"?`)) return;
        setItemsList(prev => prev.filter((_, i) => i !== index));
    };

    // Delete Child Item
    const handleDeleteChild = (parentIdx, index) => {
        const child = itemsList[parentIdx].dropdown[index];
        if (!confirm(`Are you sure you want to remove the link "${child.label}"?`)) return;
        setItemsList(prev => prev.map((item, i) => {
            if (i !== parentIdx) return item;
            return {
                ...item,
                dropdown: (item.dropdown || []).filter((_, cIdx) => cIdx !== index)
            };
        }));
    };

    // Heading modal actions
    const openHeadModal = (index = null) => {
        if (index !== null) {
            const item = itemsList[index];
            setEditHeadIndex(index);
            setHeadLabel(item.label || '');
            if (item.dropdown) {
                setHeadType('dropdown');
                setHeadHref('/');
                setHeadCustomHref('');
            } else {
                setHeadType('link');
                const isPredefined = pageOptions.some(o => o.value === item.href && o.value !== 'custom');
                if (isPredefined) {
                    setHeadHref(item.href);
                    setHeadCustomHref('');
                } else {
                    setHeadHref('custom');
                    setHeadCustomHref(item.href || '');
                }
            }
        } else {
            setEditHeadIndex(null);
            setHeadLabel('');
            setHeadType('link');
            setHeadHref('/');
            setHeadCustomHref('');
        }
        setIsHeadModalOpen(true);
    };

    const handleSaveHead = (e) => {
        e.preventDefault();
        const trimmedLabel = headLabel.trim();
        if (!trimmedLabel) return;

        let newItem = { label: trimmedLabel };
        if (headType === 'dropdown') {
            const original = editHeadIndex !== null ? itemsList[editHeadIndex] : null;
            newItem.dropdown = original?.dropdown || [];
        } else {
            newItem.href = headHref === 'custom' ? headCustomHref : headHref;
        }

        let updated = [...itemsList];
        if (editHeadIndex !== null) {
            updated[editHeadIndex] = newItem;
        } else {
            updated.push(newItem);
        }
        setItemsList(updated);
        setIsHeadModalOpen(false);
    };

    // Child modal actions
    const openChildModal = (parentIdx, childIdx = null) => {
        setParentHeadIndex(parentIdx);
        if (childIdx !== null) {
            const child = itemsList[parentIdx].dropdown[childIdx];
            setEditChildIndex(childIdx);
            setChildLabel(child.label || '');
            const isPredefined = pageOptions.some(o => o.value === child.href && o.value !== 'custom');
            if (isPredefined) {
                setChildHref(child.href);
                setChildCustomHref('');
            } else {
                setChildHref('custom');
                setChildCustomHref(child.href || '');
            }
        } else {
            setEditChildIndex(null);
            setChildLabel('');
            setChildHref('/');
            setChildCustomHref('');
        }
        setIsChildModalOpen(true);
    };

    const handleSaveChild = (e) => {
        e.preventDefault();
        const trimmedLabel = childLabel.trim();
        if (!trimmedLabel) return;

        const newChild = {
            label: trimmedLabel,
            href: childHref === 'custom' ? childCustomHref : childHref
        };

        setItemsList(prev => prev.map((item, i) => {
            if (i !== parentHeadIndex) return item;
            let list = [...(item.dropdown || [])];
            if (editChildIndex !== null) {
                list[editChildIndex] = newChild;
            } else {
                list.push(newChild);
            }
            return { ...item, dropdown: list };
        }));

        setIsChildModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2">
                        <LayoutGrid className="text-blue-500" size={18} />
                        Navigation Bar Builder
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                        Configure top-level navbar slots, menu headings, dropdown item mappings, and custom URLs
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
                                <Save size={14} /> Save Navigation Structure
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor workspace */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-150">
                    <div>
                        <h3 className="font-extrabold text-[14px] text-slate-800">Navbar Menu Items ({itemsList.length})</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Add, reorder, edit, or remove headings and sub-menu links</p>
                    </div>
                    <button
                        onClick={() => openHeadModal()}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-extrabold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                    >
                        <Plus size={14} /> Add Menu Item
                    </button>
                </div>

                {/* List of top level items */}
                <div className="space-y-4">
                    {itemsList.map((item, idx) => {
                        const isDropdown = !!item.dropdown;
                        return (
                            <div key={idx} className={`border rounded-2xl p-5 ${isDropdown ? 'border-slate-200/80 bg-slate-50/40 shadow-sm' : 'border-slate-100 bg-white'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-slate-100">
                                    {/* Slot Label & Info */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDropdown ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {isDropdown ? <ChevronDown size={16} /> : <Link2 size={16} />}
                                        </div>
                                        <div>
                                            <span className="font-extrabold text-[13.5px] text-slate-800">{item.label}</span>
                                            <span className="text-[9.5px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">
                                                {isDropdown ? `Dropdown Menu (with ${item.dropdown.length} items)` : `Direct Link ── ${item.href}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleMoveHead(idx, 'up')}
                                            disabled={idx === 0}
                                            className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                                            title="Move Item Up"
                                        >
                                            <MoveUp size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveHead(idx, 'down')}
                                            disabled={idx === itemsList.length - 1}
                                            className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                                            title="Move Item Down"
                                        >
                                            <MoveDown size={12} />
                                        </button>
                                        <button
                                            onClick={() => openHeadModal(idx)}
                                            className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer shadow-sm font-semibold"
                                            title="Edit Title / Link"
                                        >
                                            <Edit2 size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHead(idx)}
                                            className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer shadow-sm"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Child links if dropdown */}
                                {isDropdown && (
                                    <div className="mt-4 pl-4 sm:pl-10 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Submenu Link List</span>
                                            <button
                                                onClick={() => openChildModal(idx)}
                                                className="flex items-center gap-1 text-[10.5px] font-bold text-blue-600 hover:text-blue-700 bg-white border border-slate-200/60 px-2.5 py-1 rounded-lg active:scale-97 cursor-pointer shadow-sm"
                                            >
                                                <Plus size={10} /> Add Sub Link
                                            </button>
                                        </div>

                                        <div className="space-y-1.5 max-w-2xl">
                                            {item.dropdown.map((child, cIdx) => (
                                                <div key={cIdx} className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 group/child hover:border-blue-500/10 shadow-sm">
                                                    <div className="flex items-center gap-2 max-w-[70%]">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                        <span className="font-semibold text-[12.5px] text-slate-700 truncate">{child.label}</span>
                                                        <span className="text-[10px] text-slate-400 font-medium truncate">({child.href})</span>
                                                    </div>

                                                    {/* Child Reordering & Action buttons */}
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleMoveChild(idx, cIdx, 'up')}
                                                            disabled={cIdx === 0}
                                                            className="w-6 h-6 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                                                        >
                                                            <MoveUp size={10} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoveChild(idx, cIdx, 'down')}
                                                            disabled={cIdx === item.dropdown.length - 1}
                                                            className="w-6 h-6 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                                                        >
                                                            <MoveDown size={10} />
                                                        </button>
                                                        <button
                                                            onClick={() => openChildModal(idx, cIdx)}
                                                            className="w-6 h-6 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded flex items-center justify-center transition-all cursor-pointer"
                                                        >
                                                            <Edit2 size={10} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteChild(idx, cIdx)}
                                                            className="w-6 h-6 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded flex items-center justify-center transition-all cursor-pointer"
                                                        >
                                                            <Trash2 size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {item.dropdown.length === 0 && (
                                                <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 font-bold bg-white">
                                                    No sub-menu links. Click 'Add Sub Link' above to populate.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {itemsList.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
                            <ListPlus size={40} className="text-slate-300 mb-2" />
                            <p className="text-sm font-bold">No items in the menu list. Add one to begin.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Add / Edit Main Heading */}
            {isHeadModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14px] text-slate-800">
                                {editHeadIndex !== null ? 'Edit Menu Item' : 'Add Top Level Menu Item'}
                            </h3>
                            <button
                                onClick={() => setIsHeadModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveHead} className="p-6 space-y-4">
                            {/* Label */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Menu Heading Label</label>
                                <input
                                    type="text"
                                    required
                                    value={headLabel}
                                    onChange={(e) => setHeadLabel(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Products, About Us, Home..."
                                />
                            </div>

                            {/* Menu Type Selector */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Menu Action Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer text-xs font-bold transition-all ${headType === 'link' ? 'border-blue-500 bg-blue-50/30 text-blue-700 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                        <input type="radio" name="headType" value="link" checked={headType === 'link'} onChange={() => setHeadType('link')} className="hidden" />
                                        Direct Page Link
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer text-xs font-bold transition-all ${headType === 'dropdown' ? 'border-blue-500 bg-blue-50/30 text-blue-700 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                        <input type="radio" name="headType" value="dropdown" checked={headType === 'dropdown'} onChange={() => setHeadType('dropdown')} className="hidden" />
                                        Dropdown List
                                    </label>
                                </div>
                            </div>

                            {/* Link Path Select (Only if Type = Link) */}
                            {headType === 'link' && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Link Destination Page</label>
                                        <select
                                            value={headHref}
                                            onChange={(e) => setHeadHref(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 font-semibold focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all cursor-pointer"
                                        >
                                            {pageOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {headHref === 'custom' && (
                                        <div className="space-y-1 animate-fade-in">
                                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Custom Path or URL</label>
                                            <input
                                                type="text"
                                                required
                                                value={headCustomHref}
                                                onChange={(e) => setHeadCustomHref(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                                placeholder="/my-custom-subpage or https://..."
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Footer actions */}
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsHeadModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                                >
                                    {editHeadIndex !== null ? 'Save Changes' : 'Create Heading'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Add / Edit Sub Child link */}
            {isChildModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14px] text-slate-800">
                                {editChildIndex !== null ? 'Edit Dropdown Sub-Link' : 'Add New Sub-Link'}
                            </h3>
                            <button
                                onClick={() => setIsChildModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveChild} className="p-6 space-y-4">
                            {/* Label */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Link Label Name</label>
                                <input
                                    type="text"
                                    required
                                    value={childLabel}
                                    onChange={(e) => setChildLabel(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Virtual Reality Lab, About CoE..."
                                />
                            </div>

                            {/* Link Path Select */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Link Destination Page</label>
                                    <select
                                        value={childHref}
                                        onChange={(e) => setChildHref(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 font-semibold focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all cursor-pointer"
                                    >
                                        {pageOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {childHref === 'custom' && (
                                    <div className="space-y-1 animate-fade-in">
                                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Custom Path or URL</label>
                                        <input
                                            type="text"
                                            required
                                            value={childCustomHref}
                                            onChange={(e) => setChildCustomHref(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                            placeholder="/my-custom-subpage or https://..."
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Footer actions */}
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsChildModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold rounded-xl active:scale-98 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl active:scale-98 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                                >
                                    {editChildIndex !== null ? 'Save Changes' : 'Add Link'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
