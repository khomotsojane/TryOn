import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Start camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Upload photo
  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">

        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Virtual Try-On Room
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Experience clothing in a new way. Upload your photo or use your
            camera to preview outfits before buying.
          </p>
        </div>

        {/* TRY ON OPTIONS */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-20">

          {/* CAMERA TRY ON */}
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Use Camera
            </h2>

            <p className="text-gray-500 mb-4">
              Try outfits live using your device camera.
            </p>

            <button
              onClick={startCamera}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Start Camera
            </button>

            <video
              ref={videoRef}
              autoPlay
              className="mt-6 rounded-lg w-full"
            />
          </div>

          {/* UPLOAD PHOTO */}
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Upload Photo
            </h2>

            <p className="text-gray-500 mb-4">
              Upload a photo to see how outfits might look on you.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="mb-4"
            />

            {image && (
              <img
                src={image}
                alt="uploaded"
                className="rounded-lg w-full mt-4"
              />
            )}
          </div>

        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="max-w-6xl mx-auto mb-20">

          <h2 className="text-3xl font-bold mb-6">
            How Virtual Try-On Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                AI Body Detection
              </h3>

              <p className="text-gray-600 text-sm">
                AI detects body key points like shoulders, hips, and arms to
                understand your body position.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                3D Clothing Models
              </h3>

              <p className="text-gray-600 text-sm">
                Clothing is rendered in 3D using WebGL and Three.js so it can
                move and adjust realistically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                Smart Fit Simulation
              </h3>

              <p className="text-gray-600 text-sm">
                The system aligns clothing with your body to simulate how it
                might look before purchasing.
              </p>
            </div>

          </div>

        </div>

        {/* BENEFITS SECTION */}
        <div className="max-w-6xl mx-auto mb-20">

          <h2 className="text-3xl font-bold mb-6">
            Why Virtual Try-On Matters
          </h2>

          <ul className="grid md:grid-cols-2 gap-6 text-gray-600">

            <li className="bg-white p-6 rounded-xl shadow">
              Reduce online return rates
            </li>

            <li className="bg-white p-6 rounded-xl shadow">
              Improve shopping confidence
            </li>

            <li className="bg-white p-6 rounded-xl shadow">
              Save time trying multiple outfits
            </li>

            <li className="bg-white p-6 rounded-xl shadow">
              Discover styles that match your body
            </li>

          </ul>

        </div>

        {/* TIPS */}
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-4">
            Tips for Best Results
          </h2>

          <p className="text-gray-600">
            Use good lighting, stand facing the camera, and avoid heavy
            background clutter to improve the accuracy of virtual try-on
            results.
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default TryOn;