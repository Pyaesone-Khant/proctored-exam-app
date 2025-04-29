'use client';

import { AskAccessCode } from "@/components/AskAccessCode";
import { ScheduleOralTest } from "@/components/ScheduleOralTest";
import { usePlacementTestStore } from "@/states/zustand/placement-test";
import dynamic from "next/dynamic";

const PlacementTestInstruction = dynamic(
    () => import("@/components/PlacementTestInstruction").then((mod) => mod.PlacementTestInstruction),
    { ssr: false }
)

const PlacementTestSubjects = dynamic(
    () => import("@/components/PlacementTestSubjects").then((mod) => mod.PlacementTestSubjects),
    { ssr: false }
)

export default function Page() {

    const accessCode = usePlacementTestStore((state) => state.accessCode);

    return (
        <>
            {
                !accessCode && (
                    <AskAccessCode />
                )
            }

            {
                accessCode && (
                    <PlacementTestInstruction />
                )
            }

            <PlacementTestSubjects />
            <ScheduleOralTest />
        </>
    )
}