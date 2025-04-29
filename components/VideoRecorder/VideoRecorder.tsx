"use client";

import { Badge, Box, Button, Modal, Text, Title } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { AlertTriangle, CheckCircle2, Video } from "lucide-react";
import React, { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { VideoPreview } from "./VideoPreview";

export function VideoRecorder() {

    const [showModal, setShowModal] = React.useState(false);
    const [isRequesting, setIsRequesting] = React.useState(false);
    const [cameraError, setCameraError] = React.useState<string | null>(null);
    const [permissionStatus, setPermissionStatus] = React.useState<'prompt' | 'granted' | 'denied'>('prompt');
    const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useSessionStorage({
        key: "camera-permission",
        defaultValue: false,
        getInitialValueInEffect: true,
    })

    console.log(isCameraPermissionAllowed)

    useEffect(() => {
        setShowModal(true);
        setCameraError(null);
        if (isRequesting) {
            const checkCameraPermission = async () => {
                try {
                    const status = await navigator.permissions.query({ name: "camera" });
                    setPermissionStatus(status.state as 'prompt' | 'granted' | 'denied');

                    status.onchange = () => {
                        setPermissionStatus(status.state as 'prompt' | 'granted' | 'denied');
                    }
                } catch (error: any) {
                    console.error("Error checking camera permission:", error);
                    setCameraError("Unable to check camera permission. Please try again.");
                }
            }

            if (typeof navigator !== undefined && navigator.permissions) {
                checkCameraPermission();
            } else {
                setPermissionStatus('denied');
            }

        }
    }, [isRequesting]);

    const requestCameraPermission = async () => {
        setIsRequesting(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user"
                },
            });
            stream.getTracks().forEach(track => track.stop());
        } catch (error: any) {
            console.log(error);
            setCameraError("Unable to access camera. Please check your camera settings.");
        } finally {
            setIsRequesting(false);
        }
    }

    const { status, startRecording, stopRecording, previewStream } = useReactMediaRecorder({
        video: true,
        onStop: (blobUrl: string) => {
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = "recording.mp4";
            a.click();
            URL.revokeObjectURL(blobUrl);
        }
    });

    return (
        <>
            <Modal
                opened={showModal}
                onClose={() => { }}
                withCloseButton={false}
                centered
                title="Camera Permission Required"
                classNames={{
                    title: "text-white !text-lg !font-semibold",
                    header: "!bg-blue-900",
                    body: "!py-4 !space-y-6 !bg-white",
                    root: "",
                    content: "!rounded-xl !w-[600px]"
                }}
                size={"560px"}
            >
                <Text
                    c={"gray.7"}
                >
                    This test <Text
                        fw={500}
                        fz="inherit"
                        component="span"
                    >
                        requires
                    </Text> access to your camera to ensure test integrity. You cannot proceed without granting camera access.
                </Text>

                <Box
                    className="flex items-center gap-4 rounded-md border border-gray-200"
                    bg={'gray.0'}
                    p={16}
                >
                    <Box
                        className="w-12 h-12 aspect-square flex items-center justify-center rounded-full"
                        bg={"blue.0"}
                    >
                        <Video
                            fill="navy"
                            stroke="navy"
                        />
                    </Box>
                    <article
                        className="flex-1"
                    >
                        <Text
                            c={"gray.9"}
                            fw={500}
                        >
                            Camera Access
                        </Text>
                        <Text
                            c={"gray.5"}
                            fz={14}
                        >
                            To verify your identity during the test
                        </Text>
                    </article>
                    <Badge
                        variant="light"
                        size="lg"
                        radius={4}
                        fw={500}
                        color={
                            (isRequesting || permissionStatus === 'prompt') ? "yellow" :
                                permissionStatus === 'granted' ? "green" :
                                    permissionStatus === 'denied' ? "red" : "gray"
                        }
                    >
                        {
                            isRequesting ? "Requesting..." :
                                permissionStatus === 'prompt' ? "Pending" :
                                    permissionStatus === 'granted' ? "Granted" :
                                        permissionStatus === 'denied' ? "Denied" : "Unknown"
                        }
                    </Badge>
                </Box>

                <Box
                    p={16}
                    className="flex items-start gap-2 border-l-4 border-l-yellow-400 rounded-xl"
                    bg={'orange.0'}
                >
                    <AlertTriangle
                        size={24}
                        color="orange"
                        fill="orange"
                        stroke="white"
                    />
                    <Text
                        fz={14}
                        className="flex-1 !text-red-800"
                    >
                        Camera access is mandatory for taking this test. Your privacy is important to us. Camera feed is only used for assessment purposes and will be deleted after grading.
                    </Text>
                </Box>

                {
                    permissionStatus === 'denied' && (
                        <Text
                            c={"red.9"}
                            bg={"red.0"}
                            p={16}
                            fz={14}
                            className="flex items-center gap-2 rounded"
                        >
                            Camera permission denied! Please check your browser settings and allow camera access.
                        </Text>
                    )
                }

                <div
                    className="pt-4 border-t border-gray-200 flex justify-end gap-2"
                >
                    {
                        permissionStatus === "granted" && (
                            <Text
                                c={"green.7"}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle2
                                    fill="green"
                                    stroke="white"
                                />
                                Camera permission granted!
                            </Text>
                        )
                    }
                    {
                        permissionStatus === 'granted' ? (
                            <Button
                                onClick={() => {
                                    setIsCameraPermissionAllowed(true);
                                    setShowModal(false);
                                    startRecording();
                                }}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={requestCameraPermission}
                                disabled={isRequesting}
                                loading={isRequesting}
                            >
                                Allow Camera Access
                            </Button>
                        )
                    }
                </div>
            </Modal>

            <div
                className="space-y-6"
            >
                <article
                    className="space-y-4 text-center"
                >
                    <Title
                        fw={600}
                        order={4}
                    >
                        Camera Preview
                    </Title>
                    <Text
                        c={"gray.6"}
                    >
                        Make sure your camera is properly positioned and your face is clearly visible.
                    </Text>
                </article>



                <div
                    className="relative rounded-xl overflow-hidden"
                >
                    <VideoPreview
                        stream={previewStream}
                    />

                    <Text
                        className="absolute bottom-0 left-0 flex items-center gap-2 justify-center !p-2 w-full"
                        fz={14}
                        bg={"blue.5"}
                        c={"white"}
                    >
                        <Video
                            fill="white"
                            size={20}
                            className=" animate-pulse delay-700 "
                        />
                        Camera monitoring is required throughout the test
                    </Text>
                </div>

                {/* <Button
                    onClick={stopRecording}
                    disabled={status === "stopped"}
                >
                    Stop Recording
                </Button> */}
            </div>
        </>
    )
}