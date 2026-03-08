import { motion } from "framer-motion";
import HeroModel from "./HeroModel";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover opacity-30"
      >
        <source src="/fashion.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 items-center h-full px-12">

        {/* LEFT TEXT */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold mb-6"
          >
            Try Fashion <br /> Before You Buy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-8 text-gray-300"
          >
            AI powered virtual try-on experience for modern shopping.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-white text-black px-8 py-3 font-semibold"
          >
            Shop Now
          </motion.button>
        </div>

        {/* RIGHT 3D MODEL */}
        <div className="h-[500px]">
          <HeroModel />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        ↓
      </div>
    </section>
  );
}