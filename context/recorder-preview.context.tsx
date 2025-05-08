"use client";

import { createContext, useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type RecorderPreviewContextType = {
    previewStream: MediaStream | null;
    status: string;
    startRecording: () => void;
    stopRecording: () => void;
}

const RecorderPreviewContext = createContext<RecorderPreviewContextType>({
    previewStream: null,
    status: "idle",
    startRecording: () => { },
    stopRecording: () => { },
});

export const RecorderPreviewProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const { previewStream, startRecording, status, stopRecording } = useReactMediaRecorder({
        video: true,
        onStop: (blobUrl) => {
            console.log(blobUrl)
        }
    });

    const data = {
        previewStream,
        status,
        startRecording,
        stopRecording,
    }

    return (
        <RecorderPreviewContext.Provider
            value={data}
        >
            {children}
        </RecorderPreviewContext.Provider>
    )
}

export const useRecorderPreviewContext = () => useContext(RecorderPreviewContext)