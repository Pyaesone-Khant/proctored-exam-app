import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
export function VideoPreview({
    stream,
    className = "",
}: {
    stream: MediaStream | null,
    className?: string,
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])
    return (
        <div
            className={cn("w-full mx-auto rounded-md shadow-xl aspect-[3/2] overflow-hidden border border-gray-200 bg-black/70", className)}
        >
            <video
                ref={videoRef}
                autoPlay
                className="w-full h-full object-cover"
            />
        </div>
    )
}