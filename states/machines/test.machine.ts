import { assign, setup } from "xstate";

export const initialContext = {
    loading: false,
    error: null,
    currentSubject: null,
    englishScore: null,
    mathScore: null,
    scienceScore: null,
}

export const placementTestMachine = setup({
    types: {} as {
        context: {
            loading: boolean;
            error: string | null;
            currentSubject: 'english' | 'maths' | 'science' | null;
            englishScore: number | null;
            mathScore: number | null;
            scienceScore: number | null;
        }
    },
    guards: {
        isEnglishTestTaken: ({ context }) => context.englishScore !== null,

        isMathTestTaken: ({ context }) => context.mathScore !== null,

        isScienceTestTaken: ({ context }) => context.scienceScore !== null,
    }
}).createMachine(
    {
        id: "placementTest",
        context: initialContext,
        initial: "onboarding",

        states: {
            onboarding: {
                on: {
                    START_EXAM: "exam",
                    SCHEDULE_ORAL_TEST: "oralTest",
                    VIEW_TEST_RESULT: "testResult",
                }
            },

            exam: {
                on: {
                    START: {
                        target: "testOverview",
                        actions: assign({
                            loading: false,
                            error: null,
                            currentSubject: "english"
                        })
                    },
                    BACK: "onboarding",
                }
            },

            testOverview: {
                on: {
                    BACK: "onboarding",
                    START_ENGLISH_TEST: {
                        target: "englishTest",
                        actions: assign({
                            currentSubject: "english",
                        })
                    },
                    START_MATH_TEST: {
                        target: "mathsTest",
                        actions: assign({
                            currentSubject: "maths",
                        })
                    },
                    START_SCIENCE_TEST: {
                        target: "scienceTest",
                        actions: assign({
                            currentSubject: "science",
                        })
                    },
                }
            },

            englishTest: {
                on: {
                    SUBMIT: {
                        target: "testOverview",
                        actions: assign({
                            currentSubject: null,
                            englishScore: () => 10,
                        }),
                        guard: "isEnglishTestTaken",
                    },
                }
            },

            mathsTest: {
                on: {
                    SUBMIT: {
                        target: "testOverview",
                        actions: assign({
                            currentSubject: null,
                            mathScore: () => 10,
                        }),
                        guard: "isMathTestTaken",
                    },
                }
            },

            scienceTest: {
                on: {
                    SUBMIT: {
                        target: "testOverview",
                        actions: assign({
                            currentSubject: null,
                            scienceScore: () => 10,
                        }),
                        guard: "isScienceTestTaken",
                    },
                }
            },

            oralTest: {
                on: {
                    START_EXAM: "exam",
                    BACK: "onboarding",
                }
            },

            testResult: {
                on: {
                    START_EXAM: "exam",
                    BACK: "onboarding",
                }
            },
        }
    },
)