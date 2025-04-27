import { useEffect, useRef } from "react";
export function VideoPreview({
    stream
}: {
    stream: MediaStream | null
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])
    return (
        <div
            className="w-full mx-auto rounded-md shadow-xl aspect-[3/2] overflow-hidden border border-gray-200 bg-black/70"
        >
            <video
                ref={videoRef}
                autoPlay
                className="w-full h-full object-cover"
            />
        </div>
    )
}