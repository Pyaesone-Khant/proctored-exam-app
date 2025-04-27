'use client';

import { AskAccessCode } from "@/components/AskAccessCode";
import { usePlacementTestStore } from "@/states/zustand/placement-test";
import dynamic from "next/dynamic";

const PlacementTestInstruction = dynamic(
    () => import("@/components/PlacementTestInstruction").then((mod) => mod.PlacementTestInstruction),
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
        </>
    )
}