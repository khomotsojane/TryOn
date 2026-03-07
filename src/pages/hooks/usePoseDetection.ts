import { useEffect, useState } from "react";

export default function usePoseDetection() {
  const [pose, setPose] = useState<any>(null);

  useEffect(() => {
    // later we will add MediaPipe here
    console.log("Pose detection started");

    return () => {
      console.log("Pose detection stopped");
    };
  }, []);

  return pose;
}