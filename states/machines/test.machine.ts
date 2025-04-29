import { createMachine } from "xstate";

export const initialContext = {
    loading: false,
    error: null,
}

export const placementTestMachine = createMachine({
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
                START: "testOverview",
                BACK: "onboarding",
            }
        },

        testOverview: {
            on: {
                BACK: "onboarding",
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
})