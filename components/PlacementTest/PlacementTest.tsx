import { useTestStore } from "@/states/zustand/test";
import { Badge, Text, Title } from "@mantine/core";
import { Question } from "../common/Question";
import { TestControl } from "./TestControl";

export function PlacementTest() {

    const questions = useTestStore(state => state.questions);
    const currentQuestionIndex = useTestStore(state => state.currentQuestionIndex);
    const currentQuestion = useTestStore(state => state.getCurrentQuestion());

    return (
        <section
            className="space-y-6 p-10"
        >
            <article
                className="flex items-center justify-between py-2 border-b"
            >
                <Title
                    order={1}
                    className="text-primary"
                >
                    English Test
                </Title>
                <Badge
                    radius={4}
                    fw={500}
                    variant="light"
                    color="orange"
                    size="xl"
                >
                    1:00
                </Badge>
            </article>

            <article>
                <Text>
                    Question {currentQuestionIndex + 1} of {questions.length}
                </Text>
            </article>
            <Question
                {...currentQuestion}
            />
            <TestControl />
        </section>
    )
}
