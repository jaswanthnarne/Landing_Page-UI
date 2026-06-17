import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useWebsiteStore } from '../../store/useWebsiteStore';

export default function Toast() {
    const toast = useWebsiteStore((state) => state.toast);
    const hideToast = useWebsiteStore((state) => state.hideToast);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                hideToast();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [toast, hideToast]);

    return (
        <AnimatePresence>
            {toast && (
                <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border backdrop-blur-md min-w-[280px] max-w-[400px] ${
                            toast.type === 'success'
                                ? 'bg-emerald-50/95 border-emerald-200/60 text-emerald-800'
                                : toast.type === 'error'
                                ? 'bg-rose-50/95 border-rose-200/60 text-rose-800'
                                : 'bg-blue-50/95 border-blue-200/60 text-blue-800'
                        }`}
                    >
                        {toast.type === 'success' && <CheckCircle size={18} className="text-emerald-500 shrink-0" />}
                        {toast.type === 'error' && <AlertTriangle size={18} className="text-rose-500 shrink-0" />}
                        {toast.type !== 'success' && toast.type !== 'error' && <Info size={18} className="text-blue-500 shrink-0" />}
                        
                        <div className="flex-1 text-[13px] font-extrabold tracking-tight">
                            {toast.message}
                        </div>

                        <button
                            type="button"
                            onClick={hideToast}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100/50 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
                        >
                            <X size={12} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
