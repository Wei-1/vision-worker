self.importScripts("vision_bundle.js");

let faceLandmarker = null;
let holisticLandmarker = null;
let defaultFLMConfig = {
    baseOptions: {
        modelAssetPath: "face_landmarker.task",
        delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: "IMAGE",
    numFaces: 1
};
let defaultHLMConfig = {
    baseOptions: {
        modelAssetPath: "holistic_landmarker.task",
        delegate: "GPU"
    },
    outputFaceBlendshapes: false,
    runningMode: "IMAGE"
};
async function initFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, defaultFLMConfig);
}
async function initHolisticLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
    );
    holisticLandmarker = await HolisticLandmarker.createFromOptions(filesetResolver, defaultHLMConfig);
}

onmessage = async e => {
    if(e.data == null || e.data["model"] == null || e.data["frame"] == null) {
        return;
    }
    if(e.data["model"] == "face"){
        if(faceLandmarker == null){
            await initFaceLandmarker();
        }
        if(faceLandmarker !== null){
            let results = await faceLandmarker.detect(e.data["frame"]);
            postMessage(results);
        }
    }
    if(e.data["model"] == "holistic"){
        if(holisticLandmarker == null){
            await initHolisticLandmarker();
        }
        if(holisticLandmarker !== null){
            let results = await holisticLandmarker.detect(e.data["frame"]);
            postMessage(results);
        }
    }
}
