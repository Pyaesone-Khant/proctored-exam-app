"use client";

import { cn } from "@/lib/utils";
import { usePlacementTestStore } from "@/states/zustand/placement-test";
import { Badge, Box, Button, Text, Title } from "@mantine/core";
import { ArrowRight, CalendarCheck, ClipboardList, Clock, Home } from "lucide-react";
import { VideoRecorder } from "./VideoRecorder";


export function PlacementTestInstruction() {

    const accessCode = usePlacementTestStore((state) => state.accessCode);
    const clearAccessCode = usePlacementTestStore((state) => state.clearAccessCode);

    return (
        <section
            className="p-10 max-w-3xl mx-auto space-y-10"
        >
            <article
                className="flex items-center gap-2 justify-center"
            >
                <h2
                    className="text-2xl font-semibold"
                >
                    Welcome, {accessCode}!
                </h2>
                <Badge
                    size="lg"
                >
                    Primary
                </Badge>
            </article>

            <article
                className="text-center space-y-2"
            >
                <h2
                    className="text-3xl font-semibold text-primary"
                >
                    Let&apos;s Get Started
                </h2>
                <p
                    className="text-lg text-gray-500"
                >
                    Here&apos;s a quick guide to help you understand the placement test process
                </p>
            </article>

            <video
                className="w-full aspect-video border rounded-md shadow-md"
                controls
            />

            <VideoRecorder />

            {/* steps */}
            <Box
                className="!space-y-4"
            >
                <Instruction
                    icon={
                        <IconCircleBg
                            bgColor="bg-primary/10"
                        >
                            <ClipboardList
                                size={22}
                                className=" fill-primary stroke-white"
                            />
                        </IconCircleBg>
                    }
                    title="1. Complete Subject Tests"
                    description="Start with English, followed by Math and Science. Each test has multiple-choice questions."
                />
                <Instruction
                    icon={
                        <IconCircleBg
                            bgColor=" bg-green-100 "
                        >
                            <Clock
                                size={22}
                                className=" fill-green-500 stroke-white"
                            />
                        </IconCircleBg>
                    }
                    title="2. Time Management"
                    description="Each test is timed. Answer all questions before the timer runs out."
                />
                <Instruction
                    icon={
                        <IconCircleBg
                            bgColor=" bg-orange-100 "
                        >
                            <CalendarCheck
                                size={22}
                                className=" fill-orange-500 stroke-white"
                            />
                        </IconCircleBg>
                    }
                    title="3. Schedule Oral Test"
                    description="After completing all subject tests, schedule your oral assessment."
                />
            </Box>

            <Box
                className="flex items-center gap-4 justify-between"
            >
                <Button
                    variant="outline"
                    onClick={clearAccessCode}
                    c={"gray.7"}
                    className="!border-gray-700 max-md:!w-full"
                    leftSection={
                        <Home
                            size={16}
                        />
                    }
                >
                    Back to Home
                </Button>

                <Button
                    rightSection={
                        <ArrowRight
                            size={16}
                        />
                    }
                    className="max-md:!w-full"
                >
                    Continue to Test
                </Button>
            </Box>
        </section>
    )
}

type InstructionProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Instruction = (props: InstructionProps) => {

    const { icon, title, description } = props;

    return (
        <Box
            className="flex items-start gap-4 shadow p-4 rounded-md border border-gray-200 bg-white/70"
        >
            {icon}
            <article
                className="flex-1 !space-y-1"
            >
                <Title
                    order={5}
                    fw={600}
                    fz={18}
                >
                    {title}
                </Title>
                <Text
                    size="sm"
                    color="dimmed"
                >
                    {description}
                </Text>
            </article>
        </Box>
    )
}

const IconCircleBg = ({
    children,
    bgColor
}: {
    children: React.ReactNode;
    bgColor: string;
}) => {

    return (
        <Box
            className={cn("w-10 h-10 flex items-center justify-center rounded-full", bgColor)}
        >
            {children}
        </Box>
    )

}