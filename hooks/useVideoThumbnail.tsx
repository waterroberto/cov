import { useEffect, useState } from "react";

export default function useVideoThumbnail(videoSrc: string) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    // video.crossOrigin = "anonymous"; ← remove this for local files
    video.src = videoSrc;
    video.currentTime = 1.5;

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/jpeg", 0.8));
    });

    video.load();
  }, [videoSrc]);

  return thumbnail;
}