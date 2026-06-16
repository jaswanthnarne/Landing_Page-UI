import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { Plus, Trash2, Cpu, Radio, Zap, Settings, Building2, Monitor, Briefcase, Palette, HelpCircle, Edit } from 'lucide-react';

export default function CoursesManager() {
    const deptCourses = useWebsiteStore((state) => state.deptCourses);
    const addDept = useWebsiteStore((state) => state.addDept);
    const updateDept = useWebsiteStore((state) => state.updateDept);
    const deleteDept = useWebsiteStore((state) => state.deleteDept);
    const addCourse = useWebsiteStore((state) => state.addCourse);
    const deleteCourse = useWebsiteStore((state) => state.deleteCourse);

    const [activeDeptIndex, setActiveDeptIndex] = useState(0);
    const [newCourseName, setNewCourseName] = useState('');

    // Modal state for adding/editing department
    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [deptEditIndex, setDeptEditIndex] = useState(null);
    const [deptCode, setDeptCode] = useState('');
    const [deptFullName, setDeptFullName] = useState('');
    const [deptColor, setDeptColor] = useState('#004AAD');
    const [deptIcon, setDeptIcon] = useState('Cpu');

    const renderIcon = (iconName, size = 18) => {
        switch (iconName) {
            case 'Cpu': return <Cpu size={size} />;
            case 'Radio': return <Radio size={size} />;
            case 'Zap': return <Zap size={size} />;
            case 'Settings': return <Settings size={size} />;
            case 'Building2': return <Building2 size={size} />;
            case 'Monitor': return <Monitor size={size} />;
            case 'Briefcase': return <Briefcase size={size} />;
            case 'Palette': return <Palette size={size} />;
            default: return <HelpCircle size={size} />;
        }
    };

    const handleAddCourseSubmit = (e) => {
        e.preventDefault();
        if (!newCourseName.trim()) return;

        addCourse(activeDeptIndex, newCourseName.trim());
        setNewCourseName('');
    };

    const openDeptModal = (index = null) => {
        if (index !== null) {
            const dept = deptCourses[index];
            setDeptEditIndex(index);
            setDeptCode(dept.dept);
            setDeptFullName(dept.fullName);
            setDeptColor(dept.color);
            setDeptIcon(dept.iconName || 'Cpu');
        } else {
            setDeptEditIndex(null);
            setDeptCode('');
            setDeptFullName('');
            setDeptColor('#004AAD');
            setDeptIcon('Cpu');
        }
        setIsDeptModalOpen(true);
    };

    const handleSaveDept = (e) => {
        e.preventDefault();
        if (!deptCode || !deptFullName) return;

        const deptData = {
            dept: deptCode,
            fullName: deptFullName,
            color: deptColor,
            iconName: deptIcon
        };

        if (deptEditIndex !== null) {
            updateDept(deptEditIndex, deptData);
        } else {
            addDept(deptData);
            setActiveDeptIndex(deptCourses.length); // switch to newly created department
        }
        setIsDeptModalOpen(false);
    };

    const selectedDept = deptCourses[activeDeptIndex];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Departments & Courses</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Configure academic divisions and syllabus</p>
                </div>
                <button
                    onClick={() => openDeptModal()}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                    <Plus size={16} />
                    Add Department
                </button>
            </div>

            {/* Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column: Departments List */}
                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
                    <h3 className="font-extrabold text-[13.5px] text-slate-800 uppercase tracking-wide px-1">Departments</h3>
                    <div className="space-y-1">
                        {deptCourses.map((dept, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                                    activeDeptIndex === i
                                        ? 'bg-slate-50 border-slate-200/60 shadow-sm'
                                        : 'bg-transparent border-transparent hover:bg-slate-50/50'
                                }`}
                                onClick={() => setActiveDeptIndex(i)}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                        style={{ backgroundColor: dept.color }}
                                    >
                                        {renderIcon(dept.iconName)}
                                    </div>
                                    <div>
                                        <span className="font-extrabold text-[13.5px] text-slate-800 block leading-tight">{dept.dept}</span>
                                        <span className="text-[10px] text-slate-400 font-semibold block leading-none mt-1">{dept.courses.length} courses</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openDeptModal(i);
                                        }}
                                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                        title="Edit Department"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm(`Are you sure you want to delete the department "${dept.dept}" and all its courses?`)) {
                                                deleteDept(i);
                                                setActiveDeptIndex(0);
                                            }
                                        }}
                                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                                        title="Delete Department"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Active Department's Courses */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl lg:col-span-2 shadow-sm flex flex-col justify-between">
                    {selectedDept ? (
                        <div className="space-y-6">
                            {/* Department Info Header */}
                            <div className="pb-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                                        style={{ backgroundColor: selectedDept.color }}
                                    >
                                        {renderIcon(selectedDept.iconName, 22)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-extrabold text-[16px] text-slate-800">{selectedDept.dept}</h3>
                                            <span
                                                className="px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider text-white"
                                                style={{ backgroundColor: selectedDept.color }}
                                            >
                                                Active Division
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-slate-500 font-semibold mt-1">{selectedDept.fullName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Add Course Form */}
                            <form onSubmit={handleAddCourseSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    required
                                    value={newCourseName}
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Enter course name (e.g. Artificial Intelligence & Deep Learning)"
                                />
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-md active:scale-98 transition-all cursor-pointer shrink-0"
                                >
                                    Add Course
                                </button>
                            </form>

                            {/* Courses List */}
                            <div className="space-y-2">
                                <h4 className="font-extrabold text-[12px] text-slate-700 uppercase tracking-wider">Active Course Curriculum</h4>
                                {selectedDept.courses.length === 0 ? (
                                    <p className="text-[13px] text-slate-400 font-medium py-4 text-center">No courses added under this department yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedDept.courses.map((course, j) => (
                                            <div
                                                key={j}
                                                className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 hover:border-slate-200 rounded-xl transition-all group"
                                            >
                                                <span className="text-[13px] text-slate-700 font-semibold truncate pr-4">{course}</span>
                                                <button
                                                    onClick={() => deleteCourse(activeDeptIndex, j)}
                                                    className="w-7 h-7 rounded-lg bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center text-slate-400">
                            <BookOpen size={48} className="opacity-25 mx-auto mb-3" />
                            <p className="text-sm font-semibold">Select a department to view and manage its courses.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Department Modal */}
            {isDeptModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsDeptModalOpen(false)}
                    />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[15px] text-slate-800">
                                {deptEditIndex !== null ? 'Edit Department Details' : 'Add New Department'}
                            </h3>
                            <button
                                onClick={() => setIsDeptModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveDept} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Department Code / Acronym</label>
                                <input
                                    type="text"
                                    required
                                    value={deptCode}
                                    onChange={(e) => setDeptCode(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. CSE, EEE, ECE"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Department Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={deptFullName}
                                    onChange={(e) => setDeptFullName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. Computer Science & Engineering"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Color Theme</label>
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="color"
                                        value={deptColor}
                                        onChange={(e) => setDeptColor(e.target.value)}
                                        className="w-10 h-10 rounded-xl border-none outline-none cursor-pointer"
                                    />
                                    <span className="text-[13px] font-mono text-slate-500 font-semibold uppercase">{deptColor}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Icon Representation</label>
                                <select
                                    value={deptIcon}
                                    onChange={(e) => setDeptIcon(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all font-medium"
                                >
                                    <option value="Cpu">Microchip / Processor (Cpu)</option>
                                    <option value="Radio">Radio Towers (Radio)</option>
                                    <option value="Zap">Lightning Bold (Zap)</option>
                                    <option value="Settings">Gears (Settings)</option>
                                    <option value="Building2">Structures (Building2)</option>
                                    <option value="Monitor">Computer Screens (Monitor)</option>
                                    <option value="Briefcase">Bag / Office (Briefcase)</option>
                                    <option value="Palette">Color Brush (Palette)</option>
                                </select>
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsDeptModalOpen(false)}
                                    className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
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
