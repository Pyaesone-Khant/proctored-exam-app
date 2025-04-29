import { create } from "zustand";

type TestState = {
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: Record<number, string>;
    score: number;
    testCompleted: boolean;

    getCurrentQuestion: () => Question;

    selectAnswer: (questionId: number, answer: string) => void;

    nextQuestion: () => void;
    prevQuestion: () => void;

    submitTest: () => void;
}

export const useTestStore = create<TestState>((set, get) => ({
    questions: [
        {
            id: 1,
            question: "What is the capital of France?",
            answer: "Paris",
            options: ["Madrid", "Paris", "Amsterdarm", "Bangkok"],
        },
        {
            id: 2,
            question: "What is the capital of Myanmar?",
            answer: "Nay Pyi Daw",
            options: ["Mandalay", "Yangon", "Nay Pyi Daw", "Sagaing"],
        },
        {
            id: 3,
            question: "What is the capital of Thailand?",
            answer: "Bangkok",
            options: ["Mandalay", "Beijing", "Abudarbi", "Bangkok"],
        },
    ],
    currentQuestionIndex: 0,
    userAnswers: {},
    score: 0,
    testCompleted: false,

    getCurrentQuestion: () => {
        const { questions, currentQuestionIndex } = get();

        return questions[currentQuestionIndex];
    },

    selectAnswer: (questionId: number, answer: string) => {
        set((state) => ({
            userAnswers: {
                ...state.userAnswers,
                [questionId]: answer,
            },
        }))
    },

    nextQuestion: () => {
        set((state) => {
            const { currentQuestionIndex, questions } = state;
            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex < questions.length) {
                return { currentQuestionIndex: nextIndex };
            } else {
                return { testCompleted: true };
            }
        });
    },

    prevQuestion: () => {
        set((state) => {
            const { currentQuestionIndex } = state;
            const prevIndex = currentQuestionIndex - 1;

            if (prevIndex >= 0) {
                return { currentQuestionIndex: prevIndex };
            } else {
                return { currentQuestionIndex: 0 };
            }
        });
    },

    submitTest: () => {
        const { questions, userAnswers } = get();

        let correctScore = 0;

        questions.forEach((q) => {
            if (userAnswers[q.id] === q.answer) {
                correctScore++;
            }
        })

        console.log(correctScore)

        set({
            score: correctScore,
            testCompleted: true,
        })
    }
}))