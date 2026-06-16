import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Careers from './pages/public/Careers';
import Gallery from './pages/public/Gallery';
import InternshipAndProjects from './pages/public/InternshipAndProjects';
import Placements from './pages/public/Placements';
import CentreOfExcellence from './pages/public/CentreOfExcellence';
import Programmes from './pages/public/Programmes';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import LandingPage from './pages/LandingPage';
import LakshyaLab from './pages/public/LakshyaLab';

// Admin Console Components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import HeroSlidesManager from './pages/admin/HeroSlidesManager';
import CoursesManager from './pages/admin/CoursesManager';
import CoeLabsManager from './pages/admin/CoeLabsManager';
import PartnersManager from './pages/admin/PartnersManager';
import CollegesManager from './pages/admin/CollegesManager';
import CareersManager from './pages/admin/CareersManager';
import EnquiriesManager from './pages/admin/EnquiriesManager';
import PageImagesManager from './pages/admin/PageImagesManager';
import LakshyaLabManager from './pages/admin/LakshyaLabManager';
import GalleryManager from './pages/admin/GalleryManager';
import { useEffect } from 'react';
import { useWebsiteStore } from './store/useWebsiteStore';

function App() {
    const initStore = useWebsiteStore((state) => state.initStore);

    useEffect(() => {
        initStore();
    }, [initStore]);

    return (
        <Router>
            <Routes>
                {/* Landing Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/internship-and-projects" element={<InternshipAndProjects />} />
                <Route path="/placements" element={<Placements />} />
                <Route path="/centre-for-future-skills" element={<Navigate to="/lakshya-2047" replace />} />
                <Route path="/centre-of-excellence" element={<CentreOfExcellence />} />
                <Route path="/lakshya-2047" element={<LakshyaLab />} />
                <Route path="/programmes" element={<Programmes />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Console Routing */}
                <Route path="/console/root/admin/login" element={<Login />} />
                
                <Route path="/console/root/admin" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/hero" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <HeroSlidesManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/courses" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <CoursesManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/labs" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <CoeLabsManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/partners" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <PartnersManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/colleges" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <CollegesManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/careers" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <CareersManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/enquiries" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <EnquiriesManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/images" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <PageImagesManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/lakshya" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <LakshyaLabManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/console/root/admin/gallery" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <GalleryManager />
                        </AdminLayout>
                    </ProtectedRoute>
                } />

                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

