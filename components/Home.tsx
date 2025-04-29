"use client";

import { placementTestMachine } from "@/states/machines/test.machine";
import { useMachine } from "@xstate/react";
import { AskAccessCode } from "./AskAccessCode";
import { OralTestRequirements } from "./OralTestRequirements";
import { PlacementTestInstruction } from "./PlacementTestInstruction";
import { PlacementTestSubjects } from "./PlacementTestSubjects";
import { TestResult } from "./TestResult";

export function Home() {

    const [state, send] = useMachine(placementTestMachine);

    const onboarding = state.matches("onboarding");
    const exam = state.matches("exam");
    const oralTest = state.matches("oralTest");
    const testResult = state.matches("testResult");
    const testOverview = state.matches("testOverview");

    console.log(state.value)

    return (
        <>
            {
                onboarding && (
                    <AskAccessCode
                        onStartExam={() => send({ type: "START_EXAM" })}
                        onScheduleOralTest={() => send({ type: "SCHEDULE_ORAL_TEST" })}
                        onViewTestResult={() => send({ type: "VIEW_TEST_RESULT" })}
                    />
                )
            }

            {
                exam && (
                    <PlacementTestInstruction
                        onStartExam={() => send({ type: "START" })}
                        onBack={() => send({ type: "BACK" })}
                    />
                )
            }

            {
                oralTest && (
                    <OralTestRequirements
                        onStartExam={() => send({ type: "START_EXAM" })}
                    />
                )
            }

            {
                testResult && (
                    <TestResult
                        onStartExam={() => send({ type: "START_EXAM" })}
                        onBackHome={() => send({ type: "BACK" })}
                    />
                )
            }

            {
                testOverview && (
                    <PlacementTestSubjects
                        onStartExam={() => send({ type: "START" })}
                        onBack={() => send({ type: "BACK" })}
                    />
                )
            }
        </>
    )
}
