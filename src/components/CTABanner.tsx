import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTABanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-red opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_30%,hsl(0_0%_0%/0.4))]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          START YOUR TRANSFORMATION TODAY
        </h2>
        <p className="font-body text-white/80 text-lg mb-10">
          Book a free trial session at any of our 6 branches across Kolkata. No commitment required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body focus:outline-none focus:border-white/50 backdrop-blur-sm"
          />
          <button className="px-8 py-3.5 bg-background text-foreground font-heading text-sm uppercase tracking-wider rounded hover:bg-secondary transition-colors whitespace-nowrap">
            Book Free Trial
          </button>
        </div>

        <p className="font-body text-white/50 text-xs mt-4">
          Or call us at +91 98765 43210 • WhatsApp available
        </p>
      </motion.div>
    </section>
  );
};

export default CTABanner;
