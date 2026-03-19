import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WomenHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
        <Navbar />
         <section className="relative h-screen w-full overflow-hidden">

      <video
        src="/video.mp4" 
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />


      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />


      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white max-w-4xl">

      
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          OWN YOUR PRESENCE
        </motion.h1>

     
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-gray-200"
        >
          Elevate your everyday style with bold, modern fits designed for confidence.
        </motion.p>

      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={() => navigate("/women")}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Shop Collection
          </button>

          <button
            onClick={() => navigate("/tryon")}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Virtual Try-On
          </button>
        </motion.div>
      </div>

     
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-10">

        <motion.img
          src="/red.png"
          className="w-32 rounded-xl shadow-lg hover:scale-105 transition"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.img
          src="/heels.png"
          className="w-32 rounded-xl shadow-lg hover:scale-105 transition"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
    <div className="px-10 py-20 grid md:grid-cols-3 gap-8">

        {[
          { title: "Casual", image: "/style1.png" },
          { title: "Formal", image: "/style2.png" },
          { title: "Professinal", image: "/style3.png" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <h2 className="text-white text-2xl font-bold">
                {item.title}
              </h2>
            </div>
          </div>
        ))}

      </div>
      <div className="px-10 pb-20 grid md:grid-cols-2 gap-8">

        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <img
            src="love.jpg"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />

          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">
              Built for Movement
            </h3>
            <p className="text-sm text-gray-200">
              Designed for everyday comfort and performance.
            </p>
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <img
            src="/abc.png"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />

          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">
              Timeless Style
            </h3>
            <p className="text-sm text-gray-200">
              Clean, minimal, and powerful looks.
            </p>
          </div>
        </div>

      </div>
    <Footer />
    </div>
   
  );
};

export default WomenHero;