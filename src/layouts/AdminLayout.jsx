import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useWebsiteStore } from '../store/useWebsiteStore';
import {
    LayoutDashboard, Images, BookOpen, Cpu,
    Award, GraduationCap, Briefcase, Mail, LogOut, Menu, X, ShieldAlert,
    Image as ImageIcon, Target
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const logoutAdmin = useWebsiteStore((state) => state.logoutAdmin);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/console/root/admin/login');
    };

    const navigationItems = [
        { name: 'Dashboard', href: '/console/root/admin', icon: LayoutDashboard },
        { name: 'Hero Slides', href: '/console/root/admin/hero', icon: Images },
        { name: 'Page Images', href: '/console/root/admin/images', icon: ImageIcon },
        { name: 'Gallery Categories', href: '/console/root/admin/gallery', icon: Images },
        { name: 'Navigation Bar', href: '/console/root/admin/navbar', icon: Menu },
        { name: 'Courses & Depts', href: '/console/root/admin/courses', icon: BookOpen },
        { name: 'CoE Labs', href: '/console/root/admin/labs', icon: Cpu },
        { name: 'Lakshya Labs', href: '/console/root/admin/lakshya', icon: Target },
        { name: 'Hiring Partners', href: '/console/root/admin/partners', icon: Award },
        { name: 'Colleges', href: '/console/root/admin/colleges', icon: GraduationCap },
        { name: 'Job Openings', href: '/console/root/admin/careers', icon: Briefcase },
        { name: 'Contact Enquiries', href: '/console/root/admin/enquiries', icon: Mail },
    ];

    const activeItem = navigationItems.find(item => item.href === location.pathname) || { name: 'Admin Console' };

    const navLinks = (className = "") => (
        <nav className={`space-y-1 ${className}`}>
            {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-[14px] font-bold rounded-xl transition-all duration-200 group ${
                            isActive
                                ? 'bg-[#004AAD] text-white shadow-lg shadow-blue-500/20'
                                : 'text-slate-500 hover:text-[#004AAD] hover:bg-slate-50'
                        }`}
                    >
                        <Icon size={18} className={`transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#004AAD]'
                        }`} />
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col flex-shrink-0 z-20">
                {/* Brand */}
                <div className="h-20 px-6 flex items-center border-b border-slate-100/80 gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004AAD] to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ShieldAlert size={18} className="text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-[15px] text-slate-800 tracking-tight leading-none block">Ethnotech</span>
                        <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">Admin Console</span>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    {navLinks()}
                </div>

                {/* Footer Account / Logout */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 shadow-sm mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-[#004AAD] text-xs">
                            EA
                        </div>
                        <div className="overflow-hidden">
                            <span className="text-[12px] font-bold text-slate-800 block truncate">Administrator</span>
                            <span className="text-[10px] text-slate-400 block truncate font-medium">admin@ethnotech.com</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-98 text-[13px] font-bold rounded-xl transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={15} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 z-40 transform transition-transform duration-300 lg:hidden flex flex-col ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004AAD] to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldAlert size={18} className="text-white" />
                        </div>
                        <div>
                            <span className="font-extrabold text-[15px] text-slate-800 tracking-tight block">Ethnotech</span>
                            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">Admin Panel</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    {navLinks()}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 shadow-sm mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-[#004AAD] text-xs">
                            EA
                        </div>
                        <div className="overflow-hidden">
                            <span className="text-[12px] font-bold text-slate-800 block truncate">Administrator</span>
                            <span className="text-[10px] text-slate-400 block truncate font-medium">admin@ethnotech.com</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-[13px] font-bold rounded-xl transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={15} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header Navbar */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-[16px] lg:text-[18px] font-extrabold text-slate-900 tracking-tight leading-none">
                                {activeItem.name}
                            </h1>
                            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block mt-1 hidden sm:block">
                                Console / root / admin / {activeItem.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-[12px] font-bold text-[#004AAD] bg-blue-50/70 hover:bg-blue-50 hover:shadow-sm rounded-xl transition-all active:scale-95"
                        >
                            View Website
                        </a>
                    </div>
                </header>

                {/* Dashboard Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
