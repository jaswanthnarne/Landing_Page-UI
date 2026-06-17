import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import PublicLayout from '../../layouts/PublicLayout';
import SEO from '../../components/common/SEO';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { 
    MapPin, Phone, Mail, Send, User, MessageSquare, CheckCircle2
} from 'lucide-react';

// Animation Component
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;
    
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function Contact() {
    const addContactEnquiry = useWebsiteStore((state) => state.addContactEnquiry);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate a small transition for aesthetic value
        await new Promise((resolve) => setTimeout(resolve, 600));

        addContactEnquiry({ name, email, phone, message });
        
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <PublicLayout>
            <SEO 
                title="Contact Us" 
                description="Get in touch with Ethnotech Academy. Reach out for student admissions, corporate partnerships, center locations, or support inquiries."
                keywords="contact ethnotech, admission helpline, corporate relations, office address bangalore"
                path="/contact"
            />
            <div className="bg-white">
                
                {/* ══════════ HERO SECTION ══════════ */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden" 
                    style={{ background: 'linear-gradient(155deg, #f0f5ff 0%, #ffffff 55%, #eef3ff 100%)' }}>
                    
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-[#004AAD]/10 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full bg-[#004AAD]/[0.03]" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-40 right-1/4 w-12 h-12 rounded-xl border border-[#004AAD]/20" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <FadeIn>
                                <span className="inline-block text-[11px] font-bold text-[#004AAD] uppercase tracking-[0.2em] mb-4 px-3 py-1.5 bg-[#004AAD]/[0.07] rounded-full">
                                    Contact Us
                                </span>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold text-slate-900 leading-[1.05] tracking-[-0.02em] mb-6">
                                    Opportunities Begin with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-blue-400">Conversation.</span>
                                </h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-[17px] md:text-[19px] text-slate-500 leading-relaxed font-normal">
                                    Connect with Us for Inquiries, Collaborations, and Support. Whether you are looking to upskill, partner with us, or simply say hello, our team is ready to help.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ══════════ CONTACT SECTION (GRID) ══════════ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                            
                            {/* Left Side: Contact Cards */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Head Office */}
                                <FadeIn delay={0.3} direction="up">
                                    <div className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-100 hover:shadow-lg hover:shadow-[#004AAD]/5 hover:border-[#004AAD]/20 transition-all duration-300 group flex flex-col">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-150/40 flex items-center justify-center text-[#004AAD] mb-6 group-hover:scale-105 group-hover:bg-[#004AAD] group-hover:text-white transition-all duration-300 shrink-0">
                                            <MapPin size={20} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-3">Head Office</h3>
                                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                                            1/19, SK Arena Building, 1st Floor,<br />
                                            BDA Link Rd, Channasandra Banashankari, 5th Stage,<br />
                                            Rajarajeshwari Nagar, Bengaluru, Karnataka 560098
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Email */}
                                <FadeIn delay={0.4} direction="up">
                                    <div className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-100 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 group flex flex-col">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-150/40 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                                            <Mail size={20} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-3">Email Us</h3>
                                        <div className="space-y-2 text-[14px]">
                                            <a href="mailto:contactus@ethnotech.in" className="block font-medium text-slate-500 hover:text-emerald-600 transition-colors">contactus@ethnotech.in</a>
                                            <a href="mailto:director@ethnotech.in" className="block font-medium text-slate-500 hover:text-emerald-600 transition-colors">director@ethnotech.in</a>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Phone */}
                                <FadeIn delay={0.5} direction="up">
                                    <div className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-100 hover:shadow-lg hover:shadow-amber-500/5 hover:border-amber-500/20 transition-all duration-300 group flex flex-col">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-150/40 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shrink-0">
                                            <Phone size={20} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-3">Call Us</h3>
                                        <a href="tel:+919108771222" className="block text-[14px] font-medium text-slate-500 hover:text-amber-500 transition-colors">
                                            +91-9108771222
                                        </a>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Right Side: Message Form */}
                            <div className="lg:col-span-3">
                                <FadeIn delay={0.3} direction="up" className="h-full">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-10 shadow-lg shadow-slate-100/50">
                                        <h2 className="text-[20px] font-extrabold text-slate-800 tracking-tight mb-2">Send us a Message</h2>
                                        <p className="text-slate-500 text-[13px] mb-8 leading-relaxed">
                                            Fill out this form and our academic coordinators will get back to you within 24 hours.
                                        </p>

                                        <AnimatePresence mode="wait">
                                            {isSuccess ? (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="py-12 text-center space-y-4"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                                        <CheckCircle2 size={36} />
                                                    </div>
                                                    <h3 className="text-[18px] font-extrabold text-slate-800">Message Submitted!</h3>
                                                    <p className="text-[13px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                                                        Your message has been sent successfully. We will be in touch with you shortly.
                                                    </p>
                                                    <button
                                                        onClick={() => setIsSuccess(false)}
                                                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold rounded-xl transition-colors mt-4"
                                                    >
                                                        Send Another Message
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Your Name</label>
                                                        <input 
                                                            type="text" 
                                                            required
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                                            placeholder="e.g. Jaswanth Narne" 
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                                                            <input 
                                                                type="email" 
                                                                required
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                                                placeholder="name@email.com" 
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Phone Number</label>
                                                            <input 
                                                                type="tel" 
                                                                required
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                                                placeholder="e.g. +91 9876543210" 
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Message / Inquiry Details</label>
                                                        <textarea 
                                                            required
                                                            rows={4}
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                                            placeholder="Type your message here..." 
                                                        />
                                                    </div>

                                                    <button 
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#004AAD] hover:bg-[#003a8c] disabled:bg-blue-400 text-white font-bold text-[14px] rounded-xl hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer mt-6"
                                                    >
                                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                                        <Send size={15} />
                                                    </button>
                                                </form>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FadeIn>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ══════════ MAPS SECTION ══════════ */}
                <section className="bg-white pb-24">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <FadeIn delay={0.2} direction="up">
                            <div className="h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center bg-slate-50">
                                <iframe 
                                    title="Ethnotech Academy Location"
                                    src={`https://maps.google.com/maps?q=Ethnotech%20Academy,%20Channasandra,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    aria-hidden="false" 
                                    tabIndex="0"
                                    className="grayscale-[20%] contrast-[95%] opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                                ></iframe>
                            </div>
                        </FadeIn>
                    </div>
                </section>
                
            </div>
        </PublicLayout>
    );
}
