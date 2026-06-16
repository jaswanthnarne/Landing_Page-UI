import { useWebsiteStore } from '../../store/useWebsiteStore';
import { Mail, Trash2, Calendar, Phone, Clock, MailOpen, AlertCircle } from 'lucide-react';

export default function EnquiriesManager() {
    const contactEnquiries = useWebsiteStore((state) => state.contactEnquiries || []);
    const markEnquiryAsRead = useWebsiteStore((state) => state.markEnquiryAsRead);
    const deleteContactEnquiry = useWebsiteStore((state) => state.deleteContactEnquiry);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[14.5px] font-extrabold text-slate-800">Contact Enquiries</h2>
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Review contact form submissions and messages</p>
                </div>
            </div>

            {/* List of Enquiries */}
            <div className="space-y-4">
                {contactEnquiries.length === 0 ? (
                    <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl text-slate-400">
                        <AlertCircle size={40} className="opacity-25 mx-auto mb-2" />
                        <p className="text-sm font-semibold">No message enquiries received yet.</p>
                    </div>
                ) : (
                    contactEnquiries.map((enq, index) => (
                        <div
                            key={index}
                            className={`bg-white border p-6 rounded-3xl shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6 ${
                                enq.isRead ? 'border-slate-100 opacity-85' : 'border-blue-200 ring-2 ring-blue-50/50'
                            }`}
                        >
                            <div className="space-y-3 flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-extrabold text-[15px] text-slate-800 leading-tight">
                                            {enq.name}
                                        </h3>
                                        {!enq.isRead && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-[#004AAD] text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                                                New Message
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase tracking-wider">
                                        <Clock size={12} />
                                        {new Date(enq.date).toLocaleString()}
                                    </span>
                                </div>

                                {/* Contact info rows */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
                                    <div className="flex items-center gap-2 font-medium">
                                        <Mail size={14} className="text-slate-400" />
                                        <a href={`mailto:${enq.email}`} className="hover:underline hover:text-[#004AAD]">{enq.email}</a>
                                    </div>
                                    {enq.phone && (
                                        <div className="flex items-center gap-2 font-medium">
                                            <Phone size={14} className="text-slate-400" />
                                            <a href={`tel:${enq.phone}`} className="hover:underline hover:text-[#004AAD]">{enq.phone}</a>
                                        </div>
                                    )}
                                </div>

                                {/* Message text content */}
                                <div className="p-4 bg-slate-50 border border-slate-100/50 rounded-2xl text-[13px] text-slate-700 leading-relaxed font-medium">
                                    {enq.message}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 justify-end shrink-0 pt-1">
                                {!enq.isRead && (
                                    <button
                                        onClick={() => markEnquiryAsRead(index)}
                                        className="flex items-center justify-center gap-1.5 px-3.5 py-2 border border-blue-200 bg-blue-50/20 text-[#004AAD] hover:bg-blue-50 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                                    >
                                        <MailOpen size={13} />
                                        Mark Read
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this enquiry?')) {
                                            deleteContactEnquiry(index);
                                        }
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
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
    );
}
