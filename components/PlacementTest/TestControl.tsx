import { useTestStore } from "@/states/zustand/test";
import { Button } from "@mantine/core";

export function TestControl({
    onSubmit,
}: Readonly<{
    onSubmit: () => void;
}>) {

    const currentQuestionIndex = useTestStore(state => state.currentQuestionIndex);
    const questions = useTestStore(state => state.questions);
    const nextQuestion = useTestStore(state => state.nextQuestion);
    const prevQuestion = useTestStore(state => state.prevQuestion);
    const submitTest = useTestStore(state => state.submitTest);
    const userAnswers = useTestStore(state => state.userAnswers);
    const getCurrentQuestion = useTestStore(state => state.getCurrentQuestion);

    const handleNext = () => {
        if (userAnswers[getCurrentQuestion()?.id]) {
            nextQuestion();
        } else {
            alert("Please select an answer before proceeding to the next question.");
        }
    }

    return (
        <div
            className="flex gap-2 justify-between items-center mt-4"
        >
            <Button
                onClick={prevQuestion}
                variant="outline"
                disabled={currentQuestionIndex === 0}
            >
                Previous
            </Button>

            {
                currentQuestionIndex < questions.length - 1 ? (
                    <Button
                        className="outline"
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        className="outline"
                        onClick={() => {
                            submitTest();
                            onSubmit();
                        }}
                    >
                        Submit
                    </Button>
                )
            }
        </div>
    )
}
