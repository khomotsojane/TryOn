import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const TryOn: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<any>(null);
  const [recommendedSize, setRecommendedSize] = useState("");
  const [clothing, setClothing] = useState<string | null>(null);

  // CAMERA
  const startCamera = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

  };

  // UPLOAD IMAGE
  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files) return;

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setImage(url);

    const img = new Image();
    img.src = url;

    img.onload = () => analyzeBody(img);

  };

  // AI BODY DETECTION
  const analyzeBody = async (img: HTMLImageElement) => {

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate: "GPU"
      },
      runningMode: "IMAGE",
      numPoses: 1
    });

    const result = poseLandmarker.detect(img);

    if (!result.landmarks || !result.landmarks[0]) return;

    const landmarks = result.landmarks[0];

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];

    // MEASUREMENTS
    const shoulderWidth =
      Math.abs(leftShoulder.x - rightShoulder.x) * img.width;

    const hipWidth =
      Math.abs(leftHip.x - rightHip.x) * img.width;

    const legLength =
      Math.abs(leftHip.y - leftKnee.y) * img.height;

    const waist = hipWidth * 0.9;

    setMeasurements({
      shoulders: shoulderWidth.toFixed(1),
      waist: waist.toFixed(1),
      hips: hipWidth.toFixed(1),
      legs: legLength.toFixed(1)
    });

    if (shoulderWidth < 120) setRecommendedSize("S");
    else if (shoulderWidth < 160) setRecommendedSize("M");
    else setRecommendedSize("L");

    // DRAW SKELETON
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 3;

    const drawLine = (a: any, b: any) => {

      ctx.beginPath();

      ctx.moveTo(a.x * img.width, a.y * img.height);
      ctx.lineTo(b.x * img.width, b.y * img.height);

      ctx.stroke();

    };

    drawLine(landmarks[11], landmarks[12]); // shoulders
    drawLine(landmarks[11], landmarks[23]); // torso
    drawLine(landmarks[12], landmarks[24]);
    drawLine(landmarks[23], landmarks[24]); // hips
    drawLine(landmarks[23], landmarks[25]); // leg

    poseLandmarker.close();

  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">

          <h1 className="text-4xl md:text-5xl font-bold">
            Virtual Try-On Room
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Upload your photo or use your camera to preview outfits
            and receive AI body measurements before buying clothes.
          </p>

        </div>

        {/* TRY OPTIONS */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-20">

          {/* CAMERA */}
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Use Camera
            </h2>

            <button
              onClick={startCamera}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Start Camera
            </button>

            <video
              ref={videoRef}
              autoPlay
              className="mt-6 rounded-lg w-full"
            />

          </div>

          {/* UPLOAD */}
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Upload Photo
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
            />

            {image && (

              <div className="relative mt-4">

                <img
                  src={image}
                  alt="uploaded"
                  className="rounded-lg w-full"
                />

                {/* Skeleton Canvas */}
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />

                {/* Clothing Overlay */}
                {clothing && (
                  <img
                    src={clothing}
                    alt="clothing"
                    className="absolute top-[30%] left-[35%] w-[30%] pointer-events-none"
                  />
                )}

              </div>

            )}

          </div>

        </div>

        {/* CLOTHING OPTIONS */}
        <div className="max-w-6xl mx-auto mb-20">

          <h2 className="text-3xl font-bold mb-6">
            Try Outfit
          </h2>

          <div className="flex gap-6">

            <button
              onClick={() => setClothing("/clothes/blazer.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Try Blazer
            </button>

            <button
              onClick={() => setClothing("/clothes/jacket.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Try Jacket
            </button>

            <button
              onClick={() => setClothing("/clothes/dress.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Try Dress
            </button>

          </div>

        </div>

        {/* AI RESULTS */}
        {measurements && (

          <div className="max-w-4xl mx-auto mb-20 bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              AI Body Analysis
            </h2>

            <ul className="grid grid-cols-2 gap-4 text-gray-700">

              <li>Shoulders: {measurements.shoulders}px</li>
              <li>Waist: {measurements.waist}px</li>
              <li>Hips: {measurements.hips}px</li>
              <li>Leg Length: {measurements.legs}px</li>

            </ul>

            <div className="mt-6 p-4 bg-green-100 rounded-lg">

              <p className="font-semibold">
                Recommended Size: {recommendedSize}
              </p>

            </div>

          </div>

        )}

        {/* EDUCATIONAL */}
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-6">
            How Virtual Try-On Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-semibold mb-2">
                AI Body Detection
              </h3>

              <p className="text-gray-600 text-sm">
                AI detects body landmarks using computer vision
                to understand body structure.
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-semibold mb-2">
                Skeleton Tracking
              </h3>

              <p className="text-gray-600 text-sm">
                A virtual skeleton is drawn over the body to
                estimate proportions and alignment.
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-semibold mb-2">
                Outfit Simulation
              </h3>

              <p className="text-gray-600 text-sm">
                Clothing images are aligned with shoulders and
                hips to simulate how outfits might look.
              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default TryOn;