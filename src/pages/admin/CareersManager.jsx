import { useState } from 'react';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { Plus, Trash2, Edit2, X, Briefcase, FileText, Download, Calendar, Mail, Phone, Users } from 'lucide-react';

export default function CareersManager() {
    const jobOpenings = useWebsiteStore((state) => state.jobOpenings);
    const addJobOpening = useWebsiteStore((state) => state.addJobOpening);
    const updateJobOpening = useWebsiteStore((state) => state.updateJobOpening);
    const deleteJobOpening = useWebsiteStore((state) => state.deleteJobOpening);
    const jobApplications = useWebsiteStore((state) => state.jobApplications || []);
    const deleteJobApplication = useWebsiteStore((state) => state.deleteJobApplication);

    const [activeTab, setActiveTab] = useState('openings'); // 'openings' or 'applications'

    // Form Modal states
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('Academics & Skilling');
    const [location, setLocation] = useState('Bengaluru (On-site)');
    const [type, setType] = useState('Full-time');
    const [experience, setExperience] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');

    const openModal = (id = null) => {
        if (id !== null) {
            const job = jobOpenings.find((j) => j.id === id);
            setEditId(id);
            setTitle(job.title);
            setDepartment(job.department);
            setLocation(job.location);
            setType(job.type);
            setExperience(job.experience);
            setDescription(job.description);
            setRequirements(job.requirements);
        } else {
            setEditId(null);
            setTitle('');
            setDepartment('Academics & Skilling');
            setLocation('Bengaluru (On-site)');
            setType('Full-time');
            setExperience('');
            setDescription('');
            setRequirements('');
        }
        setIsOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const jobData = { title, department, location, type, experience, description, requirements };

        if (editId !== null) {
            updateJobOpening(editId, jobData);
        } else {
            addJobOpening(jobData);
        }
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Careers & Recruiting</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Manage job postings and review job applications</p>
                </div>

                {/* Tab buttons */}
                <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-150/40">
                    <button
                        onClick={() => setActiveTab('openings')}
                        className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                            activeTab === 'openings' ? 'bg-white text-[#004AAD] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Job Openings ({jobOpenings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                            activeTab === 'applications' ? 'bg-white text-[#004AAD] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Applications ({jobApplications.length})
                    </button>
                </div>
            </div>

            {/* Render Job Openings */}
            {activeTab === 'openings' && (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[13px] font-bold rounded-xl hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                        >
                            <Plus size={16} />
                            Post a Job
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {jobOpenings.length === 0 ? (
                            <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl text-slate-400">
                                <Briefcase size={40} className="opacity-25 mx-auto mb-2" />
                                <p className="text-sm font-semibold">No active job openings posted.</p>
                            </div>
                        ) : (
                            jobOpenings.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6"
                                >
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2.5 py-0.5 bg-blue-50 text-[#004AAD] text-[10px] font-extrabold rounded-md uppercase">
                                                {job.department}
                                            </span>
                                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase">
                                                {job.type}
                                            </span>
                                            <span className="text-slate-400 text-xs font-semibold">{job.location} · {job.experience} exp</span>
                                        </div>
                                        <h3 className="text-[16px] font-extrabold text-slate-800 leading-snug">{job.title}</h3>
                                        <div className="text-[13px] text-slate-500 leading-relaxed max-w-2xl space-y-2">
                                            <p><strong className="text-slate-700">Role:</strong> {job.description}</p>
                                            <p><strong className="text-slate-700">Requirements:</strong> {job.requirements}</p>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col gap-2 shrink-0 justify-end">
                                        <button
                                            onClick={() => openModal(job.id)}
                                            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                                        >
                                            <Edit2 size={13} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm(`Are you sure you want to delete the job posting for "${job.title}"?`)) {
                                                    deleteJobOpening(job.id);
                                                }
                                            }}
                                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                                        >
                                            <Trash2 size={13} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Render Job Applications */}
            {activeTab === 'applications' && (
                <div className="grid grid-cols-1 gap-4">
                    {jobApplications.length === 0 ? (
                        <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl text-slate-400">
                            <Users size={40} className="opacity-25 mx-auto mb-2" />
                            <p className="text-sm font-semibold">No applications received yet.</p>
                        </div>
                    ) : (
                        jobApplications.map((app, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6"
                            >
                                <div className="space-y-4 flex-1">
                                    {/* Candidate header */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div>
                                            <h3 className="font-extrabold text-[15px] text-slate-800 leading-tight">{app.candidateName}</h3>
                                            <span className="text-[11px] text-[#004AAD] font-bold block mt-1 uppercase">Applying for: {app.jobTitle}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase tracking-wider">
                                            <Calendar size={12} />
                                            {new Date(app.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Candidate contact / details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
                                        <div className="flex items-center gap-2 font-medium">
                                            <Mail size={14} className="text-slate-400" />
                                            <a href={`mailto:${app.candidateEmail}`} className="hover:underline hover:text-[#004AAD]">{app.candidateEmail}</a>
                                        </div>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Phone size={14} className="text-slate-400" />
                                            <a href={`tel:${app.candidatePhone}`} className="hover:underline hover:text-[#004AAD]">{app.candidatePhone}</a>
                                        </div>
                                    </div>

                                    {/* Resume details */}
                                    {app.coverMessage && (
                                        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100/50">
                                            <p className="font-semibold text-slate-700 mb-1">Cover Note:</p>
                                            {app.coverMessage}
                                        </div>
                                    )}

                                    {app.resumeUrl && (
                                        <div className="flex items-center gap-3">
                                            <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                                            >
                                                <Download size={14} />
                                                View Candidate Resume / Portfolio
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="shrink-0 flex justify-end">
                                    <button
                                        onClick={() => {
                                            if (confirm(`Are you sure you want to remove ${app.candidateName}'s application?`)) {
                                                deleteJobApplication(index);
                                            }
                                        }}
                                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all cursor-pointer"
                                        title="Delete Application"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Job Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-extrabold text-[15px] text-slate-800">
                                {editId !== null ? 'Edit Job Posting' : 'Post a New Job Opportunity'}
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Job Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                                    placeholder="e.g. Technical Trainer - Python Full Stack"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Department</label>
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all font-medium"
                                    >
                                        <option value="Academics & Skilling">Academics & Skilling</option>
                                        <option value="Corporate Relations">Corporate Relations</option>
                                        <option value="Operations & IT">Operations & IT</option>
                                        <option value="Marketing & Design">Marketing & Design</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Job Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all font-medium"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. Bengaluru (On-site)"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Experience Needed</label>
                                    <input
                                        type="text"
                                        required
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="e.g. 2-5 years"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Role Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Describe key responsibilities..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Core Requirements</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="List key technical skills and qualification requirements..."
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
                                    className="px-5 py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white font-bold text-[13px] rounded-xl transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
