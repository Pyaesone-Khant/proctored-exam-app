"use client";

import { usePlacementTestStore } from "@/states/zustand/placement-test";
import { Box, Button, Text, Title } from "@mantine/core";
import { ArrowLeft, ArrowRight, BookOpenText, Microscope, SquareSigma } from "lucide-react";

export function PlacementTestSubjects() {

    const clearAccessCode = usePlacementTestStore((state) => state.clearAccessCode);

    return (
        <section
            className="p-10 max-w-3xl mx-auto !space-y-10"
        >
            <article
                className="!space-y-2 text-center"
            >
                <Title
                    order={1}
                >
                    Place Test Subjects
                </Title>
                <Text
                    color="gray.8"
                    fz={18}
                >
                    Complete all subject tests before proceeding to the oral assessment
                </Text>
            </article>

            <Box
                className="space-y-4"
            >
                <Subject
                    name="English"
                    description="Reading comprehension, Grammar, Vocabulary"
                    icon={
                        <BookOpenText />
                    }
                />
                <Subject
                    name="Mathematics"
                    description="Numbers, shapes, and basic operations"
                    icon={
                        <SquareSigma />
                    }
                />
                <Subject
                    name="Science"
                    description="Basic science concepts"
                    icon={
                        <Microscope />
                    }
                />
            </Box>

            <Text>
                All subject tests must be completed before proceeding to the oral assessment.
            </Text>

            <Box
                className="flex items-center gap-4 justify-between"
            >
                <Button
                    variant="outline"
                    onClick={clearAccessCode}
                    c={"gray.7"}
                    className="!border-gray-700 max-md:!w-full"
                    leftSection={
                        <ArrowLeft
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
                    Proceed to Oral Test (3/3 remaining)
                </Button>
            </Box>
        </section>
    )
}

const Subject = ({
    name,
    description,
    icon,
}: {
    name: string;
    description: string;
    icon: React.ReactNode;
}) => {
    return (
        <Box
            className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow"
        >
            <Box
                className="flex items-center justify-center w-12 aspect-square rounded-full bg-blue-100"
            >
                {icon}
            </Box>
            <article
                className="!space-y-1 flex-1"
            >
                <Title
                    order={4}
                >
                    {name}
                </Title>
                <Text
                    fz={"sm"}
                    color="gray.6"
                >
                    {description}
                </Text>
            </article>
            <Button>
                Start Test
            </Button>
        </Box>
    )
}