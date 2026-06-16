import { create } from 'zustand';
import axios from 'axios';

// Configure dynamic API base URL for hosting individually on Vercel
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://landing-page-be-beta.vercel.app');

export const useWebsiteStore = create((set, get) => ({
    // State
    isAdminLoggedIn: localStorage.getItem('isAdminLoggedIn') === 'true',
    heroSlides: [],
    deptCourses: [],
    coeLabs: [],
    placementPartners: [],
    educationalPartners: [],
    jobOpenings: [],
    contactEnquiries: [],
    jobApplications: [],
    pageImages: {},
    lakshyaConfig: null,
    galleryCategories: [],
    navbarItems: [],
    isStoreInitialized: false,

    // Initialize Store
    initStore: async () => {
        try {
            const [
                heroRes,
                coursesRes,
                labsRes,
                partnersRes,
                collegesRes,
                careersRes,
                imagesRes,
                lakshyaRes,
                galleryRes,
                navbarRes
            ] = await Promise.all([
                axios.get('/api/hero'),
                axios.get('/api/courses'),
                axios.get('/api/labs'),
                axios.get('/api/partners'),
                axios.get('/api/colleges'),
                axios.get('/api/careers'),
                axios.get('/api/images'),
                axios.get('/api/lakshya').catch(() => ({ data: null })),
                axios.get('/api/gallery').catch(() => ({ data: null })),
                axios.get('/api/navbar').catch(() => ({ data: null }))
            ]);

            set({
                heroSlides: heroRes.data || [],
                deptCourses: coursesRes.data || [],
                coeLabs: labsRes.data || [],
                placementPartners: partnersRes.data || [],
                educationalPartners: collegesRes.data || [],
                jobOpenings: careersRes.data || [],
                pageImages: imagesRes.data || {},
                lakshyaConfig: lakshyaRes.data,
                galleryCategories: galleryRes?.data?.categories || [],
                navbarItems: navbarRes?.data?.items || [],
                isStoreInitialized: true
            });

            // If admin is logged in, fetch enquiries and applications
            if (get().isAdminLoggedIn) {
                const [enquiriesRes, applicationsRes] = await Promise.all([
                    axios.get('/api/enquiries').catch(() => ({ data: [] })),
                    axios.get('/api/applications').catch(() => ({ data: [] }))
                ]);
                set({
                    contactEnquiries: enquiriesRes.data || [],
                    jobApplications: applicationsRes.data || []
                });
            }
        } catch (error) {
            console.error('Failed to initialize website store:', error);
        }
    },

    // Auth Actions
    loginAdmin: async (email, password) => {
        try {
            const res = await axios.post('/api/auth', { email, password });
            if (res.data && res.data.success) {
                localStorage.setItem('isAdminLoggedIn', 'true');
                set({ isAdminLoggedIn: true });
                // Load admin data
                const [enquiriesRes, applicationsRes] = await Promise.all([
                    axios.get('/api/enquiries').catch(() => ({ data: [] })),
                    axios.get('/api/applications').catch(() => ({ data: [] }))
                ]);
                set({
                    contactEnquiries: enquiriesRes.data || [],
                    jobApplications: applicationsRes.data || []
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    },
    logoutAdmin: () => {
        localStorage.removeItem('isAdminLoggedIn');
        set({
            isAdminLoggedIn: false,
            contactEnquiries: [],
            jobApplications: []
        });
    },

    // Page Images Actions
    updatePageImage: async (key, url) => {
        try {
            await axios.put('/api/images', { key, url });
            set((state) => ({
                pageImages: {
                    ...state.pageImages,
                    [key]: url
                }
            }));
        } catch (error) {
            console.error('Failed to update page image:', error);
        }
    },

    // Lakshya CoE Config Action
    updateLakshyaConfig: async (updatedConfig) => {
        try {
            await axios.put('/api/lakshya', updatedConfig);
            set({ lakshyaConfig: { ...get().lakshyaConfig, ...updatedConfig } });
        } catch (error) {
            console.error('Failed to update Lakshya config:', error);
            throw error;
        }
    },

    // Gallery Action
    updateGalleryCategories: async (categories) => {
        try {
            await axios.put('/api/gallery', { categories });
            set({ galleryCategories: categories });
        } catch (error) {
            console.error('Failed to update gallery categories:', error);
            throw error;
        }
    },

    // Navbar Action
    updateNavbarItems: async (items) => {
        try {
            await axios.put('/api/navbar', { items });
            set({ navbarItems: items });
        } catch (error) {
            console.error('Failed to update navbar items:', error);
            throw error;
        }
    },

    // Hero Slides Actions
    addHeroSlide: async (slide) => {
        try {
            const res = await axios.post('/api/hero', slide);
            set((state) => ({
                heroSlides: [...state.heroSlides, res.data]
            }));
        } catch (error) {
            console.error('Failed to add hero slide:', error);
        }
    },
    updateHeroSlide: async (index, updatedSlide) => {
        const slides = get().heroSlides;
        const slide = slides[index];
        if (!slide) return;
        try {
            if (slide._id) {
                await axios.put('/api/hero', { _id: slide._id, ...updatedSlide });
            }
            const newSlides = [...slides];
            newSlides[index] = { ...slide, ...updatedSlide };
            set({ heroSlides: newSlides });
        } catch (error) {
            console.error('Failed to update hero slide:', error);
        }
    },
    deleteHeroSlide: async (index) => {
        const slides = get().heroSlides;
        const slide = slides[index];
        if (!slide) return;
        try {
            if (slide._id) {
                await axios.delete(`/api/hero?id=${slide._id}`);
            }
            set({ heroSlides: slides.filter((_, i) => i !== index) });
        } catch (error) {
            console.error('Failed to delete hero slide:', error);
        }
    },

    // Departments and Courses Actions
    addDept: async (dept) => {
        try {
            const newDept = { ...dept, courses: [] };
            const res = await axios.post('/api/courses', newDept);
            set((state) => ({
                deptCourses: [...state.deptCourses, res.data]
            }));
        } catch (error) {
            console.error('Failed to add department:', error);
        }
    },
    updateDept: async (index, updatedDept) => {
        const depts = get().deptCourses;
        const dept = depts[index];
        if (!dept) return;
        try {
            if (dept._id) {
                await axios.put('/api/courses', { _id: dept._id, ...updatedDept });
            }
            const newDepts = [...depts];
            newDepts[index] = { ...dept, ...updatedDept };
            set({ deptCourses: newDepts });
        } catch (error) {
            console.error('Failed to update department:', error);
        }
    },
    deleteDept: async (index) => {
        const depts = get().deptCourses;
        const dept = depts[index];
        if (!dept) return;
        try {
            if (dept._id) {
                await axios.delete(`/api/courses?id=${dept._id}`);
            }
            set({ deptCourses: depts.filter((_, i) => i !== index) });
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    },
    addCourse: async (deptIndex, courseName) => {
        const depts = get().deptCourses;
        const dept = depts[deptIndex];
        if (!dept) return;
        try {
            const updatedCourses = [...dept.courses, courseName];
            if (dept._id) {
                await axios.put('/api/courses', { _id: dept._id, courses: updatedCourses });
            }
            const newDepts = [...depts];
            newDepts[deptIndex] = { ...dept, courses: updatedCourses };
            set({ deptCourses: newDepts });
        } catch (error) {
            console.error('Failed to add course:', error);
        }
    },
    deleteCourse: async (deptIndex, courseIndex) => {
        const depts = get().deptCourses;
        const dept = depts[deptIndex];
        if (!dept) return;
        try {
            const updatedCourses = dept.courses.filter((_, i) => i !== courseIndex);
            if (dept._id) {
                await axios.put('/api/courses', { _id: dept._id, courses: updatedCourses });
            }
            const newDepts = [...depts];
            newDepts[deptIndex] = { ...dept, courses: updatedCourses };
            set({ deptCourses: newDepts });
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    },

    // CoE Labs Actions
    addCoeLab: async (lab) => {
        try {
            const newLab = { ...lab, id: lab.id || Date.now().toString() };
            const res = await axios.post('/api/labs', newLab);
            set((state) => ({
                coeLabs: [...state.coeLabs, res.data]
            }));
        } catch (error) {
            console.error('Failed to add CoE lab:', error);
        }
    },
    updateCoeLab: async (id, updatedLab) => {
        const labs = get().coeLabs;
        const lab = labs.find((l) => l.id === id);
        if (!lab) return;
        try {
            if (lab._id) {
                await axios.put('/api/labs', { _id: lab._id, ...updatedLab });
            }
            set((state) => ({
                coeLabs: state.coeLabs.map((l) => l.id === id ? { ...l, ...updatedLab } : l)
            }));
        } catch (error) {
            console.error('Failed to update CoE lab:', error);
        }
    },
    deleteCoeLab: async (id) => {
        const labs = get().coeLabs;
        const lab = labs.find((l) => l.id === id);
        if (!lab) return;
        try {
            if (lab._id) {
                await axios.delete(`/api/labs?id=${lab._id}`);
            }
            set((state) => ({
                coeLabs: state.coeLabs.filter((l) => l.id !== id)
            }));
        } catch (error) {
            console.error('Failed to delete CoE lab:', error);
        }
    },

    // Placement Partners Actions
    addPlacementPartner: async (partner) => {
        try {
            const res = await axios.post('/api/partners', partner);
            set((state) => ({
                placementPartners: [...state.placementPartners, res.data]
            }));
        } catch (error) {
            console.error('Failed to add placement partner:', error);
        }
    },
    deletePlacementPartner: async (index) => {
        const partners = get().placementPartners;
        const partner = partners[index];
        if (!partner) return;
        try {
            if (partner._id) {
                await axios.delete(`/api/partners?id=${partner._id}`);
            }
            set((state) => ({
                placementPartners: state.placementPartners.filter((_, i) => i !== index)
            }));
        } catch (error) {
            console.error('Failed to delete placement partner:', error);
        }
    },

    // Educational Partners (Colleges) Actions
    addEducationalPartner: async (college) => {
        try {
            const res = await axios.post('/api/colleges', college);
            set((state) => ({
                educationalPartners: [...state.educationalPartners, res.data]
            }));
        } catch (error) {
            console.error('Failed to add educational partner:', error);
        }
    },
    deleteEducationalPartner: async (index) => {
        const colleges = get().educationalPartners;
        const college = colleges[index];
        if (!college) return;
        try {
            if (college._id) {
                await axios.delete(`/api/colleges?id=${college._id}`);
            }
            set((state) => ({
                educationalPartners: state.educationalPartners.filter((_, i) => i !== index)
            }));
        } catch (error) {
            console.error('Failed to delete educational partner:', error);
        }
    },

    // Job Openings Actions
    addJobOpening: async (job) => {
        try {
            const newJob = { ...job, id: job.id || Date.now().toString() };
            const res = await axios.post('/api/careers', newJob);
            set((state) => ({
                jobOpenings: [...state.jobOpenings, res.data]
            }));
        } catch (error) {
            console.error('Failed to add job opening:', error);
        }
    },
    updateJobOpening: async (id, updatedJob) => {
        const jobs = get().jobOpenings;
        const job = jobs.find((j) => j.id === id);
        if (!job) return;
        try {
            if (job._id) {
                await axios.put('/api/careers', { _id: job._id, ...updatedJob });
            }
            set((state) => ({
                jobOpenings: state.jobOpenings.map((j) => j.id === id ? { ...j, ...updatedJob } : j)
            }));
        } catch (error) {
            console.error('Failed to update job opening:', error);
        }
    },
    deleteJobOpening: async (id) => {
        const jobs = get().jobOpenings;
        const job = jobs.find((j) => j.id === id);
        if (!job) return;
        try {
            if (job._id) {
                await axios.delete(`/api/careers?id=${job._id}`);
            }
            set((state) => ({
                jobOpenings: state.jobOpenings.filter((j) => j.id !== id)
            }));
        } catch (error) {
            console.error('Failed to delete job opening:', error);
        }
    },

    // Enquiries Actions
    addContactEnquiry: async (enquiry) => {
        try {
            const res = await axios.post('/api/enquiries', enquiry);
            set((state) => ({
                contactEnquiries: [res.data, ...(state.contactEnquiries || [])]
            }));
        } catch (error) {
            console.error('Failed to add contact enquiry:', error);
        }
    },
    markEnquiryAsRead: async (index) => {
        const enquiries = get().contactEnquiries || [];
        const enquiry = enquiries[index];
        if (!enquiry) return;
        try {
            if (enquiry._id) {
                await axios.put('/api/enquiries', { id: enquiry._id, isRead: true });
            }
            const newEnquiries = [...enquiries];
            newEnquiries[index] = { ...enquiry, isRead: true };
            set({ contactEnquiries: newEnquiries });
        } catch (error) {
            console.error('Failed to mark enquiry as read:', error);
        }
    },
    deleteContactEnquiry: async (index) => {
        const enquiries = get().contactEnquiries || [];
        const enquiry = enquiries[index];
        if (!enquiry) return;
        try {
            if (enquiry._id) {
                await axios.delete(`/api/enquiries?id=${enquiry._id}`);
            }
            set({ contactEnquiries: enquiries.filter((_, i) => i !== index) });
        } catch (error) {
            console.error('Failed to delete contact enquiry:', error);
        }
    },

    // Job Applications Actions
    addJobApplication: async (app) => {
        try {
            const res = await axios.post('/api/applications', app);
            set((state) => ({
                jobApplications: [res.data, ...(state.jobApplications || [])]
            }));
        } catch (error) {
            console.error('Failed to add job application:', error);
        }
    },
    deleteJobApplication: async (index) => {
        const applications = get().jobApplications || [];
        const app = applications[index];
        if (!app) return;
        try {
            if (app._id) {
                await axios.delete(`/api/applications?id=${app._id}`);
            }
            set({ jobApplications: applications.filter((_, i) => i !== index) });
        } catch (error) {
            console.error('Failed to delete job application:', error);
        }
    }
}));
