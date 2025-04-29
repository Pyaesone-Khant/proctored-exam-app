import { usePlacementTestStore } from "@/states/zustand/placement-test";
import { Button, Text, Title } from "@mantine/core";
import { ArrowLeft, ArrowRight, ChartBar } from "lucide-react";

export function TestResult({
    onStartExam,
    onBackHome,
}: Readonly<{
    onStartExam: () => void;
    onBackHome: () => void;
}>) {

    const clearAccessCode = usePlacementTestStore(state => state.clearAccessCode)

    return (
        <section
            className="space-y-6 p-10"
        >
            <article
                className="text-center !space-y-2"
            >
                <Title
                    order={1}
                    className=" text-primary"
                >
                    No Results Available
                </Title>
                <Text
                    fz={18}
                    c={"gray.6"}
                >
                    You haven&apos;t completed any tests yet.
                </Text>
            </article>

            <article
                className="space-y-2 text-center"
            >
                <ChartBar
                    size={120}
                    className="mx-auto"
                />
                <Text
                    fz={18}
                    c={"gray.6"}
                >
                    Complete at least one subject test to view your results.
                </Text>
            </article>

            <div
                className="flex max-md:flex-col gap-2 justify-between items-center mt-4"
            >
                <Button
                    variant="outline"
                    leftSection={
                        <ArrowLeft />
                    }
                    classNames={{
                        root: "max-md:!w-full",
                    }}
                    onClick={() => {
                        clearAccessCode()
                        onBackHome()
                    }}
                >
                    Back to Home
                </Button>
                <Button
                    rightSection={
                        <ArrowRight />
                    }
                    classNames={{
                        root: "max-md:!w-full",
                    }}
                    onClick={onStartExam}
                >
                    Start Exam
                </Button>
            </div>
        </section>
    )
}
