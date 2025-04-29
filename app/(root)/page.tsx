'use client';

import { PlacementTest } from "@/components/PlacementTest/PlacementTest";
import { ScheduleOralTest } from "@/components/ScheduleOralTest";
import dynamic from "next/dynamic";

const Home = dynamic(
    () => import("@/components/Home").then((mod) => mod.Home),
    { ssr: false }
)

export default function Page() {

    return (
        <>
            <Home />
            <PlacementTest />
            <ScheduleOralTest />
        </>
    )
}