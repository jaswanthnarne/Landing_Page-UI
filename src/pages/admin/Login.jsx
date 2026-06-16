import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWebsiteStore } from '../../store/useWebsiteStore';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginAdmin = useWebsiteStore((state) => state.loginAdmin);
    const isAdminLoggedIn = useWebsiteStore((state) => state.isAdminLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdminLoggedIn) {
            navigate('/console/root/admin', { replace: true });
        }
    }, [isAdminLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Simulate a small delay for premium visual feedback
        await new Promise((resolve) => setTimeout(resolve, 800));

        const success = loginAdmin(email, password);
        setIsSubmitting(false);

        if (success) {
            navigate('/console/root/admin', { replace: true });
        } else {
            setError('Invalid administrator email or password.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background shapes */}
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-indigo-100/30 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-xl p-8 lg:p-10 relative z-10"
            >
                {/* Brand Logo Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#004AAD] to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                        <ShieldCheck size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">Console Root Login</h1>
                    <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider mt-2">Ethnotech Administrator</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-center leading-normal"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Mail size={16} />
                            </span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[14px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Lock size={16} />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[14px] text-slate-800 focus:border-[#004AAD] focus:ring-[3px] focus:ring-blue-100/50 outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#004AAD] hover:bg-[#003a8c] disabled:bg-blue-400 text-white font-bold text-[14px] rounded-xl hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer mt-6"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
                        {!isSubmitting && <ArrowRight size={16} />}
                    </button>
                </form>

                {/* Back to Public Home */}
                <div className="text-center mt-8 pt-6 border-t border-slate-100">
                    <a
                        href="/"
                        className="text-[12px] font-bold text-[#004AAD] hover:underline"
                    >
                        ← Back to Public Website
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
