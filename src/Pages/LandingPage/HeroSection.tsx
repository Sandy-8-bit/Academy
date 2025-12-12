import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Checked Background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#1e3a8a_1px,transparent_1px),linear-gradient(#1e3a8a_1px,transparent_1px)] bg-size-[70px_70px] opacity-10 pointer-events-none"></div>

      <div className="relative mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="flex-1 flex flex-col gap-6 items-start"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Become an AI-Powered{" "}
            <span className="bg-blue-900 shadow-[4px_0_10px_rgba(0,0,0,0.60)]  pb-2 text-white px-2 ">
              Engineer
            </span>
          </motion.h1>

          {/* Small paragraph */}
          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Master AI, automation, and modern engineering tools through
            practical, real-world learning.
          </motion.p>

          {/* Features - Stagger Animation */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {[
              "Industry-guided curriculum",
              "Hands-on real projects",
              "AI tools integrated training",
              "Personal mentor support",
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border-2 border-blue-900"
              >
                <span className="text-blue-900 text-2xl font-bold">✓</span>
                <p className="text-gray-900 text-sm md:text-base font-semibold">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE VIDEO */}
        <motion.div
          className="flex-1 flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-xl md:max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg border border-blue-900">
            <video
              src="https://dmifstorage.blob.core.windows.net/course-1-videos/DMIF_Video.mp4?se=2026-01-04T15%3A19%3A48Z&sp=r&sv=2025-11-05&sr=b&sig=wkn783TsyO2bOLVnzvJFB79AJH2S8XKEXYg%2BjuZJ5aM%3D"
              className="w-full h-full object-cover"
              controls
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
