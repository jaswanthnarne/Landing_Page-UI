import { Link } from 'react-router-dom';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import {
    Images, BookOpen, Cpu, Award,
    GraduationCap, Briefcase, Mail, CheckSquare, Clock, ArrowRight
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

export default function Dashboard() {
    const heroSlides = useWebsiteStore((state) => state.heroSlides);
    const deptCourses = useWebsiteStore((state) => state.deptCourses);
    const coeLabs = useWebsiteStore((state) => state.coeLabs);
    const placementPartners = useWebsiteStore((state) => state.placementPartners);
    const educationalPartners = useWebsiteStore((state) => state.educationalPartners);
    const jobOpenings = useWebsiteStore((state) => state.jobOpenings);
    const contactEnquiries = useWebsiteStore((state) => state.contactEnquiries);
    const jobApplications = useWebsiteStore((state) => state.jobApplications);

    const unreadEnquiries = contactEnquiries.filter(e => !e.isRead).length;

    // Build chart data: number of courses per department
    const chartData = deptCourses.map(dept => ({
        name: dept.dept,
        courses: dept.courses.length,
        color: dept.color
    }));

    // Counts for stats grid
    const stats = [
        { name: 'Hero Slides', value: heroSlides.length, icon: Images, color: 'text-blue-600', bg: 'bg-blue-50', link: '/console/root/admin/hero' },
        { name: 'Departments', value: deptCourses.length, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/console/root/admin/courses' },
        { name: 'Future Skill Labs', value: coeLabs.length, icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50', link: '/console/root/admin/labs' },
        { name: 'Hiring Partners', value: placementPartners.length, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/console/root/admin/partners' },
        { name: 'Educational Colleges', value: educationalPartners.length, icon: GraduationCap, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/console/root/admin/colleges' },
        { name: 'Active Careers', value: jobOpenings.length, icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50', link: '/console/root/admin/careers' },
        { name: 'Unread Enquiries', value: unreadEnquiries, icon: Mail, color: unreadEnquiries > 0 ? 'text-rose-600' : 'text-slate-500', bg: unreadEnquiries > 0 ? 'bg-rose-50' : 'bg-slate-100', link: '/console/root/admin/enquiries' },
        { name: 'Job Applications', value: jobApplications.length, icon: CheckSquare, color: 'text-sky-600', bg: 'bg-sky-50', link: '/console/root/admin/enquiries' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={i}
                            to={stat.link}
                            className="bg-white border border-slate-100 p-5 rounded-2xl hover:shadow-md hover:border-slate-200/80 transition-all duration-300 group flex items-start justify-between cursor-pointer"
                        >
                            <div>
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wide block">{stat.name}</span>
                                <span className="text-[28px] font-extrabold text-slate-800 leading-none mt-2 block">{stat.value}</span>
                            </div>
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <Icon size={18} className="transition-transform group-hover:scale-110" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Dashboard Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Recharts Analytics Panel */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl lg:col-span-2 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-[14.5px] font-extrabold text-slate-800">Courses Distribution</h3>
                        <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Number of active syllabus courses by department</p>
                    </div>
                    <div className="h-64 mt-6 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" fontSize={11} fontWeight={600} stroke="#94a3b8" tickLine={false} />
                                <YAxis fontSize={11} fontWeight={600} stroke="#94a3b8" tickLine={false} />
                                <Tooltip
                                    contentStyle={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="courses" radius={[6, 6, 0, 0]} fill="#004AAD">
                                    {chartData.map((entry, index) => (
                                        <Area key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Unread Messages Panel */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-[14.5px] font-extrabold text-slate-800">Recent Enquiries</h3>
                            {unreadEnquiries > 0 && (
                                <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-extrabold rounded-md uppercase">
                                    {unreadEnquiries} New
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Messages from contact form</p>
                    </div>

                    <div className="flex-1 overflow-y-auto mt-6 space-y-4 max-h-[200px] pr-1">
                        {contactEnquiries.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-6 text-slate-400">
                                <Mail size={24} className="opacity-45 mb-2" />
                                <p className="text-xs font-semibold">No message enquiries yet.</p>
                            </div>
                        ) : (
                            contactEnquiries.slice(0, 4).map((enq, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-xl border transition-all text-left ${
                                        enq.isRead
                                            ? 'bg-slate-50/50 border-slate-100 text-slate-600'
                                            : 'bg-blue-50/20 border-blue-100/50 text-slate-800 font-medium'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[12px] font-bold truncate max-w-[120px]">{enq.name}</span>
                                        <span className="text-[9px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                                            <Clock size={10} />
                                            {new Date(enq.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[11.5px] line-clamp-2 leading-relaxed text-slate-500">{enq.message}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {contactEnquiries.length > 0 && (
                        <Link
                            to="/console/root/admin/enquiries"
                            className="w-full flex items-center justify-center gap-2 mt-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-[12px] font-bold text-slate-600 rounded-xl transition-all"
                        >
                            View All Messages
                            <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
