// import { segment } from "./modules/segment.mjs";
// import { addTransparency } from "./modules/transparency.mjs";
// import { addShader } from "./modules/wegbl-transparency.mjs";

// import "./modules/receiver.mjs";
// import "./modules/stats.mjs";

const videoElement = document.getElementById("input_video");
const canvasElement = document.getElementById("output_canvas");
console.log(canvasElement);
const canvasCtx = canvasElement.getContext("2d");

const webglCanvas = document.querySelector("canvas#transparent_green_webgl");

function onResults(results) {
  // Save the context's blank state
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Draw the raw frame
  canvasCtx.drawImage(
    results.segmentationMask,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = "source-out";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = "destination-atop";
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // Restore the context's blank state
  canvasCtx.restore();
}

const selfieSegmentation = new SelfieSegmentation({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
  },
});

selfieSegmentation.setOptions({
  modelSelection: 1,
});

selfieSegmentation.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await selfieSegmentation.send({ image: videoElement });
  },
  width: 640,
  height: 360,
});
camera.start();
