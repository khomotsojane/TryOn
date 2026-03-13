import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

const TryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [clothing, setClothing] = useState<string | null>(null);

  const [measurements, setMeasurements] = useState<any>(null);
  const [recommendedSize, setRecommendedSize] = useState("");

  const [stageSize, setStageSize] = useState({
    width: 500,
    height: 600,
  });

  const [clothesPosition, setClothesPosition] = useState({
    x: 200,
    y: 200,
    width: 150,
    height: 200,
  });

  const clothingRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  const [clothingImg, setClothingImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (clothing) {
      const img = new window.Image();
      img.src = clothing;
      img.onload = () => setClothingImg(img);
    }
  }, [clothing]);

  // CAMERA START
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
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

    img.onload = () => {
      analyzeBody(img);
      segmentBody(img);
    };
  };

  // BODY SEGMENTATION
  const segmentBody = async (img: HTMLImageElement) => {
    const net = await bodyPix.load();

    const segmentation = await net.segmentPerson(img);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mask = bodyPix.toMask(segmentation);

    bodyPix.drawMask(canvas, img, mask, 0.7, 5);
  };

  // AI POSE DETECTION
  const analyzeBody = async (img: HTMLImageElement) => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate: "GPU",
      },
      runningMode: "IMAGE",
      numPoses: 1,
    });

    const result = poseLandmarker.detect(img);

    if (!result.landmarks || !result.landmarks[0]) return;

    const landmarks = result.landmarks[0];

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];

    const shoulderWidth =
      Math.abs(leftShoulder.x - rightShoulder.x) * img.width;

    const hipWidth = Math.abs(leftHip.x - rightHip.x) * img.width;

    const legLength = Math.abs(leftHip.y - leftKnee.y) * img.height;

    const waist = hipWidth * 0.9;

    setMeasurements({
      shoulders: shoulderWidth.toFixed(1),
      waist: waist.toFixed(1),
      hips: hipWidth.toFixed(1),
      legs: legLength.toFixed(1),
    });

    // AUTO POSITION CLOTHING
    setClothesPosition({
      x: leftShoulder.x * img.width,
      y: leftShoulder.y * img.height,
      width: shoulderWidth,
      height: hipWidth * 1.8,
    });

    if (shoulderWidth < 120) setRecommendedSize("S");
    else if (shoulderWidth < 160) setRecommendedSize("M");
    else setRecommendedSize("L");

    poseLandmarker.close();
  };

  // DRAG CLOTHING
  const handleDragEnd = (e: any) => {
    setClothesPosition({
      ...clothesPosition,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">

        <h1 className="text-4xl font-bold text-center mb-12">
          AI Virtual Dressing Room
        </h1>

        {/* UPLOAD */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Upload Photo</h2>

            <input type="file" accept="image/*" onChange={uploadPhoto} />

            {image && (
              <div className="relative mt-6">

                <img
                  src={image}
                  alt="user"
                  className="w-full rounded-lg"
                />

                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />

              </div>
            )}
          </div>

          {/* CAMERA */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Use Camera</h2>

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
        </div>

        {/* CLOTHING STAGE */}
        {image && (
          <div className="max-w-4xl mx-auto mt-20">

            <h2 className="text-2xl font-bold mb-6">Adjust Clothing</h2>

            <Stage width={stageSize.width} height={stageSize.height}>

              <Layer>

                {clothingImg && (
                  <KonvaImage
                    image={clothingImg}
                    x={clothesPosition.x}
                    y={clothesPosition.y}
                    width={clothesPosition.width}
                    height={clothesPosition.height}
                    draggable
                    ref={clothingRef}
                    onDragEnd={handleDragEnd}
                  />
                )}

                <Transformer ref={transformerRef} />

              </Layer>

            </Stage>
          </div>
        )}

        {/* CLOTHING OPTIONS */}
        <div className="max-w-4xl mx-auto mt-20">

          <h2 className="text-2xl font-bold mb-6">Try Outfit</h2>

          <div className="flex gap-6">

            <button
              onClick={() => setClothing("/clothes/blazer.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Blazer
            </button>

            <button
              onClick={() => setClothing("/clothes/jacket.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Jacket
            </button>

            <button
              onClick={() => setClothing("/clothes/dress.png")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Dress
            </button>

          </div>
        </div>

        {/* RESULTS */}
        {measurements && (
          <div className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              AI Body Measurements
            </h2>

            <ul className="grid grid-cols-2 gap-4">

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

      </div>

      <Footer />
    </>
  );
};

export default TryOn;
