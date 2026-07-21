"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

interface Area { x: number; y: number; width: number; height: number; }

interface Props {
  imageSrc: string;           // blob: or data: URL of the selected file
  onDone: (blob: Blob) => void;
  onSkip: () => void;         // use original without cropping
  onCancel: () => void;
}

const RATIOS = [
  { label: "1:1 Square",  value: 1 / 1 },
  { label: "4:5 Portrait",value: 4 / 5 },
  { label: "16:9 Wide",   value: 16 / 9 },
  { label: "Free",        value: 0 },
];

async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(new Error("Canvas empty")), "image/jpeg", 0.92));
}

export function CropModal({ imageSrc, onDone, onSkip, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [ratioIndex, setRatioIndex] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropping, setCropping] = useState(false);

  const selectedRatio = RATIOS[ratioIndex];

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleApply() {
    if (!croppedAreaPixels) return;
    setCropping(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
      onDone(blob);
    } catch {
      alert("Crop failed. Try again.");
    } finally {
      setCropping(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/70">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-gray-900 font-bold text-sm">Crop Image</h3>
            <p className="text-gray-500 text-xs mt-0.5">Adjust the crop area, then click Apply</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Aspect ratio selector */}
        <div className="flex gap-2 px-5 pt-4">
          {RATIOS.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setRatioIndex(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                ratioIndex === i
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Crop area */}
        <div className="relative mx-5 mt-4 rounded-xl overflow-hidden bg-black" style={{ height: 300 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={selectedRatio.value || undefined}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { borderRadius: 12 },
              cropAreaStyle: { borderColor: "#fbbf24", borderWidth: 2 },
            }}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-5 pt-3">
          <div className="flex items-center gap-3">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-amber-400 h-1"
            />
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-5">
          <button
            onClick={onSkip}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
          >
            Skip crop
          </button>
          <button
            onClick={handleApply}
            disabled={cropping}
            className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors"
          >
            {cropping ? "Applying…" : "Apply Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
