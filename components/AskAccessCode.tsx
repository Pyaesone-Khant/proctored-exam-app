import { cn } from "@/lib/utils";
import { usePlacementTestStore } from "@/states/zustand/placement-test";
import { TextInput } from "@mantine/core";
import { CalendarDaysIcon, ChartBar, Edit, Loader2 } from "lucide-react";
import React from "react";

export function AskAccessCode({
    onStartExam,
    onScheduleOralTest,
    onViewTestResult,
}: Readonly<{
    onStartExam: () => void;
    onScheduleOralTest: () => void;
    onViewTestResult: () => void;
}>) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { setAccessCode, error, setError, loading, setLoading } = usePlacementTestStore();

    const handleSubmit = (type: 'exam' | 'oralTest' | 'testResults') => {
        setLoading(true);
        setError(undefined);

        if (!inputRef.current) {
            setError("Please enter your access code.");
            setLoading(false);
            return;
        }

        const code = inputRef.current.value.trim();
        if (!code) {
            setError("Please enter your access code.");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            setAccessCode(code);
            switch (type) {
                case 'exam':
                    onStartExam();
                    break;
                case 'oralTest':
                    onScheduleOralTest();
                    break;
                case 'testResults':
                    onViewTestResult();
                    break;
            }
        }, 2000);
    };

    return (
        <section
            className="p-10 max-w-2xl mx-auto"
        >

            {
                loading && (
                    <div
                        className="flex flex-col gap-2 items-center justify-center fixed top-0 left-0 w-full h-full bg-white/80 z-[100]"
                    >
                        <Loader2
                            className="animate-spin text-primary"
                            size={48}
                        />
                        <p
                            className=" text-lg"
                        >
                            Verifying your access code, please wait...
                        </p>
                    </div>
                )
            }

            <article
                className="text-center"
            >
                <h2
                    className="text-4xl font-bold text-center mb-4 text-blue-900"
                >
                    Welcome to EDUSN Placement Test
                </h2>
                <p
                    className="text-lg px-6 text-gray-500"
                >
                    Enter your unique access code to begin. Your education level will be automatically determined based on your credentials.
                </p>
            </article>

            <div
                className="max-w-md w-full mx-auto my-14"
            >
                <TextInput
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your access code"
                    size="lg"
                    radius={8}
                    classNames={{
                        input: "!text-base shadow-md",
                        error: "!text-sm"
                    }}
                    error={error}
                />
            </div>

            <div
                className="flex flex-col gap-8"
            >
                <Option
                    title="Start Exam"
                    description="Begin your placement test English, Mathematics, and Science too assess your educational level."
                    icon={
                        <Edit
                            className="text-primary"
                        />
                    }
                    index={1}
                    onClick={() => handleSubmit('exam')}
                />

                <Option
                    title="View Oral Test Appointment"
                    description="Schedule or view your oral assessment appointment with our qualified instructors."
                    icon={
                        <CalendarDaysIcon
                            className="text-orange-500"
                        />
                    }
                    index={2}
                    onClick={() => handleSubmit('oralTest')}
                />

                <Option
                    title="View Results"
                    description="Access your comprehensive assessment results and performance analysis."
                    icon={
                        <ChartBar
                            className="text-green-500"
                        />
                    }
                    index={3}
                    onClick={() => handleSubmit('testResults')}
                />
            </div>

        </section>
    )
}

const Option = ({
    title,
    description,
    icon: Icon,
    index = 1,
    onClick,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index?: number;
    onClick?: () => void;
}) => {
    return (
        <div
            className={cn("p-6 rounded-md bg-white shadow-md relative hover:-translate-y-2.5 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out group border border-l-[6px] border-gray-100", {
                "border-l-primary": index === 1,
                "border-l-orange-500": index === 2,
                "border-l-green-500": index === 3,
            })}
            onClick={onClick}
        >
            <p
                className="w-13 z-[1] aspect-square rounded-full bg-primary text-white border-4 border-white flex items-center justify-center text-2xl font-bold absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 shadow-sm"
            >
                {index}
            </p>

            <div
                className="flex gap-4 items-center"
            >
                <div
                    className={cn("p-4 bg-blue-50 rounded-xl w-fit group-hover:scale-110 transition-all duration-300 ease-in-out", {
                        "bg-orange-50": index === 2,
                        "bg-green-50": index === 3,
                    })}
                >
                    {Icon}
                </div>

                <article
                    className="space-y-2"
                >
                    <h3
                        className="text-xl font-semibold"
                    >
                        {title}
                    </h3>
                    <p
                        className="text-gray-500"
                    >
                        {description}
                    </p>
                </article>
            </div>

        </div>
    )
}
