import { Button, Text, Title } from "@mantine/core"
import { AlertCircleIcon, Pen } from "lucide-react"

export function OralTestRequirements({
    onStartExam,
}: {
    onStartExam: () => void
}) {
    return (
        <section
            className="p-10 !space-y-8"
        >
            <article
                className="text-center !space-y-2"
            >
                <Title
                    order={1}
                    className="text-primary"
                >
                    Complete Subjects First
                </Title>
                <Text>
                    You need to complete all subjects before scheduling an oral test.
                </Text>
            </article>

            <div
                className="flex items-start gap-3 p-4 rounded-md border-l-4 border-l-primary bg-blue-50"
            >
                <AlertCircleIcon
                    className="mt-0.5"
                />
                <article
                    className="!space-y-1 flex-1"
                >
                    <Title
                        order={3}
                        className="text-primary"
                    >
                        Oral Test Requirements
                    </Title>
                    <Text>
                        To schedule an oral test appointment, you must first complete all the required subjects in your placement test. This ensures that we have complete information to properly assess your skills.
                    </Text>
                </article>
            </div>

            <Button
                onClick={onStartExam}
                leftSection={
                    <Pen
                        fill="white"
                        size={16}
                    />
                }
                fullWidth
            >
                Start Exam
            </Button>
        </section>
    )
}
