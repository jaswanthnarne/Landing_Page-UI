import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'Programs',
        dropdown: [
            { label: 'Programmes', href: '/programmes' },
            { label: 'Centre of Excellence', href: '/centre-of-excellence' },
            { label: 'Lakshya 2047 (Future Skills)', href: '/lakshya-2047' },
            { label: 'Internship & Projects', href: '/internship-and-projects' },
            { label: 'Placements', href: '/placements' },
        ],
    },
    {
        label: 'Partners',
        dropdown: [
            { label: 'Educational Partners', href: '/about#educational-partners' },
            { label: 'Technology & Corporate Partners', href: '/about#corporate-partners' },
            { label: 'Recruitment Partners', href: '/placements#recruitment-partners' },
        ],
    },
    {
        label: 'Company',
        dropdown: [
            { label: 'About Us', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Careers', href: '/careers' },
        ],
    },
    { label: 'Contact', href: '/contact' },
];

const DropdownMenu = ({ items, isDarkText }) => (
    <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden z-50">
        {items.map((item, i) => (
            <a key={i} href={item.href}
                className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-slate-600 hover:bg-blue-50/60 hover:text-[#004AAD] transition-colors group border-b border-slate-50 last:border-b-0">
                {item.label}
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
        ))}
    </motion.div>
);

const PublicNavbar = ({ isDarkTheme = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenu, setMobileMenu] = useState(false);
    const [navScrolled, setNavScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const closeTimer = useRef(null);

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // On sub-pages, always use dark text
    const isHomePage = location.pathname === '/';
    const isDarkText = navScrolled || !isDarkTheme || !isHomePage;

    const handleEnter = (label) => {
        clearTimeout(closeTimer.current);
        setOpenDropdown(label);
    };
    const handleLeave = () => {
        closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
    };

    const redirectToPortal = () => {
        window.open('https://ethops.jaswanthnarne.online/', '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isDarkText
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3 group">
                    <motion.img
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png"
                        alt="Ethnotech"
                        className={`h-10 w-10 ${(!isDarkText) ? 'brightness-0 invert' : ''}`}
                    />
                    <div className="leading-tight">
                        <span className={`text-lg font-bold tracking-tight block transition-colors ${isDarkText ? 'text-slate-900' : 'text-white'}`}>Ethnotech</span>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${isDarkText ? 'text-[#004AAD]' : 'text-blue-300'}`}>Academy</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) =>
                        item.dropdown ? (
                            <div key={item.label} className="relative"
                                onMouseEnter={() => handleEnter(item.label)}
                                onMouseLeave={handleLeave}>
                                <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDarkText
                                        ? 'text-slate-500 hover:text-[#004AAD] hover:bg-blue-50/50'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}>
                                    {item.label}
                                    <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openDropdown === item.label && (
                                        <DropdownMenu items={item.dropdown} isDarkText={isDarkText} />
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <a key={item.label} href={item.href}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${isDarkText
                                        ? 'text-slate-500 hover:text-[#004AAD] hover:bg-blue-50/50'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}>
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#004AAD] rounded-full group-hover:w-1/2 transition-all duration-300" />
                            </a>
                        )
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Primary Portal Access Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={redirectToPortal}
                        className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition-all border ${isDarkText
                                ? 'border-[#004AAD] text-[#004AAD] hover:bg-blue-50/30 shadow-sm'
                                : 'border-white/40 text-white hover:bg-white/10'
                            }`}
                    >
                        Student Portal
                    </motion.button>

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isDarkText
                                ? 'text-slate-600 hover:bg-slate-100'
                                : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 space-y-1">
                            {navItems.map((item) =>
                                item.dropdown ? (
                                    <div key={item.label}>
                                        <button
                                            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 rounded-lg hover:bg-blue-50 hover:text-[#004AAD] transition-colors">
                                            {item.label}
                                            <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {mobileExpanded === item.label && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                    <div className="pl-4 pb-1 space-y-1">
                                                        {item.dropdown.map((sub, i) => (
                                                            <a key={i} href={sub.href}
                                                                onClick={() => setMobileMenu(false)}
                                                                className="block px-4 py-2.5 text-[13px] font-medium text-slate-500 rounded-lg hover:bg-blue-50/70 hover:text-[#004AAD] transition-colors">
                                                                {sub.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <a key={item.label} href={item.href}
                                        onClick={() => setMobileMenu(false)}
                                        className="block px-4 py-3 text-sm font-semibold text-slate-700 rounded-lg hover:bg-blue-50 hover:text-[#004AAD] transition-colors">
                                        {item.label}
                                    </a>
                                )
                            )}
                            
                            <button
                                onClick={() => { setMobileMenu(false); redirectToPortal(); }}
                                className="w-full mt-3 px-4 py-3 bg-[#004AAD] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2">
                                Student Portal
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default PublicNavbar;
