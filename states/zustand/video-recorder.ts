
import { create } from 'zustand';

interface VideoRecorderState {
    recording: boolean;
    setRecording: (recording: boolean) => void;

    isCameraAlreadyEnabled: boolean;
    setIsCameraEnabled: (isCameraEnabled: boolean) => void;
}

export const useVideoRecorderStore = create<VideoRecorderState>((set) => ({
    recording: false,
    setRecording: (recording) => set({ recording }),

    isCameraAlreadyEnabled: localStorage.getItem("isCameraAlreadyEnabled") === "true" || false,
    setIsCameraEnabled: (isCameraAlreadyEnabled) => set({ isCameraAlreadyEnabled }),
}))