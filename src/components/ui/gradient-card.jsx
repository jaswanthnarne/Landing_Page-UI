// components/ui/gradient-card.jsx

import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Define variants for the card's overall style using cva
const cardVariants = cva(
  "group relative flex flex-col justify-between h-full w-full overflow-hidden rounded-[1.75rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-[#004AAD]/20 hover:shadow-[0_20px_50px_rgba(0,74,173,0.05)] transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const GradientCard = React.forwardRef(
  ({ className, badgeText, title, description, ctaText, ctaHref, icon: Icon, ...props }, ref) => {
    
    // Animation variants for framer-motion
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { y: -3 },
    };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div
          className={cn(cardVariants(), className, "p-6 sm:p-7")}
          {...props}
        >
          {/* Card Content Split Layout */}
          <div className="z-10 flex flex-row items-center justify-between gap-6 h-full w-full relative">
            
            {/* Left Side (Content) */}
            <div className="flex-1 flex flex-col justify-between h-full min-w-0">
              {/* Badge */}
              {badgeText && (
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#004AAD]/[0.05] border border-[#004AAD]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#004AAD] shadow-[0_2px_8px_rgba(0,74,173,0.02)] w-fit transition-colors group-hover:bg-[#004AAD]/[0.08] group-hover:border-[#004AAD]/15">
                  {badgeText}
                </div>
              )}

              {/* Title and Description */}
              <div className="flex-grow">
                <h3 className="text-[1.1rem] font-bold text-slate-800 mb-1.5 leading-snug group-hover:text-[#004AAD] transition-colors duration-300">{title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{description}</p>
              </div>
              
              {/* Call to Action Link */}
              <a
                href={ctaHref}
                className="group/btn mt-5 inline-flex items-center gap-1 text-[13px] font-bold text-[#004AAD] hover:text-[#003a8c] transition-colors w-fit"
              >
                {ctaText}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </a>
            </div>

            {/* Right Side (Icon Container) */}
            {Icon && (
              <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100/60 border border-slate-200/30 group-hover:bg-[#004AAD]/[0.05] group-hover:border-[#004AAD]/20 group-hover:text-[#004AAD] text-slate-500 shrink-0 transition-all duration-300">
                <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" strokeWidth={1.8} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
