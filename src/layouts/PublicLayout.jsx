import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PublicNavbar from '../components/common/PublicNavbar';
import PublicFooter from '../components/common/PublicFooter';

const PublicLayout = ({ children, isDarkHero = false }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            
            // Timeout allows React/DOM rendering (and Framer Motion page entries) to finalize
            const scrollToAnchor = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };

            // Attempt scroll immediately and after a short timeout to handle page layout stabilization
            scrollToAnchor();
            const timer = setTimeout(scrollToAnchor, 350);
            return () => clearTimeout(timer);
        } else {
            // Scroll to top if there is no hash anchor on navigation
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [location.pathname, location.hash]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <PublicNavbar isDarkTheme={isDarkHero} />
            <main className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
