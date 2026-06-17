import React, { useState, useEffect } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { 
    Plus, Trash2, ArrowUp, ArrowDown, Save, 
    TrendingUp, Users, Briefcase, Award, X 
} from 'lucide-react';

const availableIcons = [
    { name: 'Award', icon: Award },
    { name: 'TrendingUp', icon: TrendingUp },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Users', icon: Users }
];

export default function PlacementsManager() {
    const placementsConfig = useWebsiteStore((state) => state.placementsConfig);
    const updatePlacementsConfig = useWebsiteStore((state) => state.updatePlacementsConfig);

    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [stats, setStats] = useState([]);
    
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

    // Modal state for Add/Edit Stat
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null); // null for new, or stat object
    const [modalValue, setModalValue] = useState('');
    const [modalLabel, setModalLabel] = useState('');
    const [modalIcon, setModalIcon] = useState('Award');

    useEffect(() => {
        if (placementsConfig) {
            setHeroTitle(placementsConfig.heroTitle || '');
            setHeroSubtitle(placementsConfig.heroSubtitle || '');
            setStats(placementsConfig.stats ? JSON.parse(JSON.stringify(placementsConfig.stats)) : []);
        }
    }, [placementsConfig]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus(null);
        try {
            await updatePlacementsConfig({
                heroTitle,
                heroSubtitle,
                stats
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 4000);
        } finally {
            setIsSaving(false);
        }
    };

    // Reordering stats
    const moveStat = (index, direction) => {
        const updated = [...stats];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= updated.length) return;
        
        // Swap items
        const temp = updated[index];
        updated[index] = updated[newIndex];
        updated[newIndex] = temp;
        setStats(updated);
    };

    // Deleting stat
    const handleDeleteStat = (id) => {
        if (window.confirm('Are you sure you want to delete this statistic?')) {
            setStats(stats.filter(item => item.id !== id));
        }
    };

    // Open Modal for Create or Edit
    const openModal = (stat = null) => {
        if (stat) {
            setEditingStat(stat);
            setModalValue(stat.value);
            setModalLabel(stat.label);
            setModalIcon(stat.icon || 'Award');
        } else {
            setEditingStat(null);
            setModalValue('');
            setModalLabel('');
            setModalIcon('Award');
        }
        setIsModalOpen(true);
    };

    // Handle modal form submit
    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (editingStat) {
            // Edit existing
            setStats(stats.map(item => 
                item.id === editingStat.id 
                    ? { ...item, value: modalValue, label: modalLabel, icon: modalIcon } 
                    : item
            ));
        } else {
            // Create new
            const newStat = {
                id: Date.now().toString(),
                value: modalValue,
                label: modalLabel,
                icon: modalIcon
            };
            setStats([...stats, newStat]);
        }
        setIsModalOpen(false);
    };

    const getIconComponent = (iconName) => {
        const found = availableIcons.find(item => item.name === iconName);
        return found ? found.icon : Award;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            
            {/* Header Title with quick notifications */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-lg font-extrabold text-slate-800">Configure Placements Content</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Manage the hero banner titles and dynamic animated counter statistics.</p>
                </div>
                {saveStatus === 'success' && (
                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-bold animate-fade-in">
                        Changes saved successfully!
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-bold animate-fade-in">
                        Failed to save settings. Check logs.
                    </div>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* 1. Hero Content Config */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                    <h3 className="font-extrabold text-[14px] text-slate-700 border-b border-slate-50 pb-3 uppercase tracking-wider">Hero Section Details</h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Hero Main Title</label>
                            <input 
                                type="text"
                                required
                                value={heroTitle}
                                onChange={(e) => setHeroTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-[14px] text-slate-800 font-semibold focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                                placeholder="e.g. Your Path to Career Success Starts Here"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Hero Subtitle / Description</label>
                            <textarea 
                                required
                                rows={3}
                                value={heroSubtitle}
                                onChange={(e) => setHeroSubtitle(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-[14px] text-slate-800 font-semibold focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 resize-none"
                                placeholder="Write a description summary explaining placements cells..."
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Stats Config List */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <h3 className="font-extrabold text-[14px] text-slate-700 uppercase tracking-wider">Placement Statistics Counters</h3>
                        <button
                            type="button"
                            onClick={() => openModal(null)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-[#004AAD] hover:bg-blue-100 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                        >
                            <Plus size={14} /> Add Stat Card
                        </button>
                    </div>

                    {stats.length === 0 ? (
                        <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-sm font-semibold text-slate-400">No statistics configured. Click 'Add Stat Card' to start.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.map((item, index) => {
                                const StatIcon = getIconComponent(item.icon);
                                return (
                                    <div key={item.id} className="p-5 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 group hover:bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#004AAD] border border-blue-100">
                                                <StatIcon size={20} />
                                            </div>
                                            <div>
                                                <div className="text-lg font-extrabold text-slate-900 leading-none">{item.value}</div>
                                                <div className="text-[12px] text-slate-400 font-semibold mt-1.5">{item.label}</div>
                                                <div className="inline-block mt-2 px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                                    Icon: {item.icon}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                disabled={index === 0}
                                                onClick={() => moveStat(index, 'up')}
                                                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-white transition-all cursor-pointer"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                disabled={index === stats.length - 1}
                                                onClick={() => moveStat(index, 'down')}
                                                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-white transition-all cursor-pointer"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openModal(item)}
                                                className="px-3 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteStat(item.id)}
                                                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-all cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Form Controls */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#004AAD] hover:bg-blue-700 text-white font-extrabold text-[13px] rounded-xl active:scale-98 hover:shadow-lg hover:shadow-blue-500/15 disabled:opacity-50 transition-all cursor-pointer"
                    >
                        <Save size={15} />
                        {isSaving ? 'Saving Changes...' : 'Save Configuration'}
                    </button>
                </div>
            </form>

            {/* Modal for Add/Edit Stat */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[14px] text-slate-800">
                                {editingStat ? 'Edit Statistic Card' : 'Add New Statistic'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
                            
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Stat Value (e.g. 95% or 24 LPA)</label>
                                <input
                                    type="text"
                                    required
                                    value={modalValue}
                                    onChange={(e) => setModalValue(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. 95% or 24 LPA"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Stat Label</label>
                                <input
                                    type="text"
                                    required
                                    value={modalLabel}
                                    onChange={(e) => setModalLabel(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Placement Rate"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Display Icon</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {availableIcons.map(item => {
                                        const SelectIcon = item.icon;
                                        const isSelected = modalIcon === item.name;
                                        return (
                                            <button
                                                key={item.name}
                                                type="button"
                                                onClick={() => setModalIcon(item.name)}
                                                className={`py-3 flex flex-col items-center justify-center gap-1.5 border rounded-xl transition-all cursor-pointer ${
                                                    isSelected 
                                                        ? 'bg-blue-50 border-blue-500 text-[#004AAD] font-extrabold shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                                }`}
                                            >
                                                <SelectIcon size={18} />
                                                <span className="text-[9px] tracking-wide">{item.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl transition-all hover:shadow-lg cursor-pointer"
                                >
                                    {editingStat ? 'Save Changes' : 'Create Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
