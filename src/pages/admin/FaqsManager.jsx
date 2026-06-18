import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { Plus, Trash2, Edit3, Save, X, ChevronDown, ChevronUp, HelpCircle, GripVertical } from 'lucide-react';

const FAQ_CATEGORIES = ['General', 'Courses', 'Certifications', 'Placements', 'Labs', 'Admissions', 'Internships', 'Careers'];

export default function FaqsManager() {
    const faqs = useWebsiteStore((state) => state.faqs) || [];
    const addFaq = useWebsiteStore((state) => state.addFaq);
    const updateFaq = useWebsiteStore((state) => state.updateFaq);
    const deleteFaq = useWebsiteStore((state) => state.deleteFaq);

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' });
    const [editData, setEditData] = useState({ question: '', answer: '', category: 'General' });
    const [expandedId, setExpandedId] = useState(null);
    const [filterCategory, setFilterCategory] = useState('All');

    const filteredFaqs = filterCategory === 'All'
        ? faqs
        : faqs.filter(f => f.category === filterCategory);

    const categories = ['All', ...new Set(faqs.map(f => f.category).filter(Boolean))];

    const handleAdd = async () => {
        if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
        await addFaq({
            question: newFaq.question.trim(),
            answer: newFaq.answer.trim(),
            category: newFaq.category,
            order: faqs.length
        });
        setNewFaq({ question: '', answer: '', category: 'General' });
        setIsAdding(false);
    };

    const handleEdit = (faq) => {
        setEditingId(faq._id);
        setEditData({
            question: faq.question,
            answer: faq.answer,
            category: faq.category || 'General'
        });
    };

    const handleSaveEdit = async (id) => {
        if (!editData.question.trim() || !editData.answer.trim()) return;
        await updateFaq(id, {
            question: editData.question.trim(),
            answer: editData.answer.trim(),
            category: editData.category
        });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            await deleteFaq(id);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[18px] font-extrabold text-slate-800">FAQ Manager</h2>
                    <p className="text-[12px] text-slate-400 font-semibold mt-1">
                        Manage frequently asked questions displayed on the public FAQ page. {faqs.length} total entries.
                    </p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.97] ${
                        isAdding
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-[#004AAD] text-white hover:bg-[#003a8c]'
                    }`}
                >
                    {isAdding ? <X size={15} /> : <Plus size={15} />}
                    {isAdding ? 'Cancel' : 'Add FAQ'}
                </button>
            </div>

            {/* Add New FAQ Form */}
            {isAdding && (
                <div className="bg-white border border-[#004AAD]/20 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[14px] font-bold text-slate-800 mb-4">New FAQ Entry</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Question
                            </label>
                            <input
                                type="text"
                                value={newFaq.question}
                                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                placeholder="Enter the question..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Answer
                            </label>
                            <textarea
                                value={newFaq.answer}
                                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                placeholder="Enter the detailed answer..."
                                rows={4}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Category
                            </label>
                            <select
                                value={newFaq.category}
                                onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                            >
                                {FAQ_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-5 py-2 text-[12px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                                className="px-5 py-2 text-[12px] font-bold text-white bg-[#004AAD] hover:bg-[#003a8c] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-sm"
                            >
                                <span className="flex items-center gap-1.5">
                                    <Save size={13} /> Save FAQ
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                            filterCategory === cat
                                ? 'bg-[#004AAD] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat} {cat !== 'All' && `(${faqs.filter(f => f.category === cat).length})`}
                    </button>
                ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-2">
                {filteredFaqs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                        <HelpCircle size={36} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-[13px] font-bold text-slate-500">No FAQs found</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                            {filterCategory !== 'All' ? 'No entries in this category.' : 'Click "Add FAQ" to create your first entry.'}
                        </p>
                    </div>
                ) : (
                    filteredFaqs.map((faq) => {
                        const id = faq._id;
                        const isEditing = editingId === id;
                        const isExpanded = expandedId === id;

                        return (
                            <div
                                key={id}
                                className={`bg-white rounded-2xl border transition-all duration-200 ${
                                    isEditing ? 'border-[#004AAD]/30 shadow-md' : 'border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                {isEditing ? (
                                    /* Edit Mode */
                                    <div className="p-5 space-y-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                Question
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.question}
                                                onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-800 focus:border-[#004AAD] outline-none font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                Answer
                                            </label>
                                            <textarea
                                                value={editData.answer}
                                                onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                                                rows={4}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-800 focus:border-[#004AAD] outline-none font-medium resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                Category
                                            </label>
                                            <select
                                                value={editData.category}
                                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-800 focus:border-[#004AAD] outline-none font-medium"
                                            >
                                                {FAQ_CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-1">
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="px-4 py-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleSaveEdit(id)}
                                                className="px-4 py-1.5 text-[11px] font-bold text-white bg-[#004AAD] hover:bg-[#003a8c] rounded-lg transition-all cursor-pointer"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* View Mode */
                                    <div>
                                        <div className="flex items-start gap-3 p-5">
                                            <GripVertical size={16} className="text-slate-300 flex-shrink-0 mt-1 hidden sm:block" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#004AAD] rounded">
                                                        {faq.category || 'General'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => setExpandedId(isExpanded ? null : id)}
                                                    className="text-left w-full cursor-pointer"
                                                >
                                                    <p className="text-[14px] font-bold text-slate-800 leading-snug hover:text-[#004AAD] transition-colors">
                                                        {faq.question}
                                                    </p>
                                                </button>
                                                {isExpanded && (
                                                    <p className="text-[12px] text-slate-500 leading-relaxed mt-3 whitespace-pre-line border-t border-slate-100 pt-3">
                                                        {faq.answer}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => setExpandedId(isExpanded ? null : id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
                                                    title={isExpanded ? 'Collapse' : 'Expand'}
                                                >
                                                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(faq)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#004AAD] transition-all cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit3 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
