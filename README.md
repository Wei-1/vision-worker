# Vision-Worker

Minimum setup for FaceLandmark and HolisticLandmark Web Worker for Mediapipe's new Framework.

### FaceLandmark - 2024-05

Facelandmarker works right out of the box with the new framework, including `GPU Web Worker` and the `outputFaceBlendshapes` feature.

### HolisticLandmark - 2026-07

Holisticlandmarker doesn't come with full features in 2024 and 2025. It only had `CPU Web Worker` or `GPU Main Thread`, which blocked the users from utilizing GPU in Web worker. https://github.com/google-ai-edge/mediapipe/issues/2506

Google fix some implementation 2026-05, and the `GPU Web Worker` is finally available since then. However, by 2026-07, `outputFaceBlendshapes` feature is still not available in the holistic `GPU Web Worker`. Which decrease the benefit for the framework transition.

