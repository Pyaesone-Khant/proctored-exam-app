"use client";

import { cn } from "@/lib/utils";
import { Badge, Box, Button, Group, Radio, Text } from "@mantine/core";
import dayjs from "dayjs";
import { BookOpenText } from "lucide-react";
import { useState } from "react";

const DATE_FORMAT = 'DD-MM-YYYY';

export function ScheduleOralTest() {

    const [appointmentData, setAppointmentData] = useState<string | null>(null);

    const parsedData = appointmentData && JSON.parse(appointmentData);

    return (
        <section
            className="space-y-10"
        >
            <article
                className="space-y-2 text-center"
            >
                <h2
                    className="text-3xl font-semibold text-primary"
                >
                    Schedule Oral Test
                </h2>
                <p
                    className="text-lg text-gray-500"
                >
                    Here&apos;s a quick guide to help you understand the placement test process
                </p>
            </article>

            <Box
                className="bg-blue-100 p-4 flex gap-4 "
            >
                <BookOpenText
                    size={20}
                    className="mt-1"
                />
                <article
                    className="flex-1 space-y-1"
                >
                    <h3
                        className="text-lg font-semibold"
                    >
                        About the Oral Test
                    </h3>
                    <p>
                        The oral test evaluates speaking  and listening skills through simple conversation and picture descriptions. Its takes approximately 15 minutes and si conducted with a teacher via video call.
                    </p>
                </article>
            </Box>

            <Box
                className="space-y-4 p-10 pt-0"
            >
                <h2
                    className="text-xl font-medium"
                >
                    Select Date and Time:
                </h2>

                <Box
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                >
                    <OralTestAvailableTimeSlot
                        date={dayjs().add(2, 'days')}
                        times={[
                            "09:00 AM",
                            "10:00 AM",
                            "11:00 AM",
                            "02:00 PM",
                        ]}
                        value={appointmentData}
                        onChange={(payload) => setAppointmentData(payload)}
                    />
                    <OralTestAvailableTimeSlot
                        date={dayjs().add(3, 'days')}
                        times={[
                            "09:00 AM",
                            "10:00 AM",
                            "11:00 AM",
                            "02:00 PM",
                        ]}
                        value={appointmentData}
                        onChange={(payload) => setAppointmentData(payload)}
                    />
                </Box>

                {
                    parsedData && (
                        <Box
                            className="space-y-1 p-4 border rounded-md bg-red-50"
                        >
                            <article
                                className="text-red-500 flex items-center justify-between"
                            >
                                <Text
                                    fz={14}
                                    fw={500}
                                >
                                    Selected time slot
                                </Text>
                                <Badge
                                    size="lg"
                                    variant="light"
                                    color="red"
                                    classNames={{
                                        label: "font-medium",
                                    }}
                                    radius={4}
                                >
                                    15 mins
                                </Badge>
                            </article>
                            <Text
                                fw={500}
                                fz={18}
                            >
                                {dayjs(parsedData?.date).format("dddd, MMM DD, YYYY")} at {parsedData?.time}
                            </Text>
                        </Box>
                    )
                }

                <Button
                    fullWidth
                    color="gray.9"
                    size="lg"
                    classNames={{
                        label: "text-base font-medium"
                    }}
                    onClick={() => alert("Scheduled Oral Test")}
                >
                    Schedule Oral Test
                </Button>
            </Box>
        </section>
    )
}

const OralTestAvailableTimeSlot = ({
    date,
    times,
    value,
    onChange,
}: {
    date: string | dayjs.Dayjs;
    times: string[];
    value: string | null,
    onChange: (value: string) => void;
}) => {

    const parsedValue = value && JSON.parse(value);
    const formattedDate = standardDateFormatter(date);
    const isSameDate = standardDateFormatter(parsedValue?.date) === formattedDate;

    return (
        <Box
            className={cn("border rounded-md p-4 !space-y-2", {
                "border-primary bg-primary/10": isSameDate
            })}
        >
            <article>
                <Text
                    fz={14}
                    c={"gray.6"}
                    mb={4}
                >
                    Date
                </Text>
                <Text
                    fz={16}
                    fw={500}
                    c={"gray.9"}
                >
                    {dayjs(date).format("dddd, MMM DD, YYYY")}
                </Text>
            </article>
            <Radio.Group
                value={value}
                onChange={onChange}
            >
                <Group
                    gap={12}
                >
                    {
                        times.map((it, index) => {

                            const radioValue = JSON.stringify({
                                date,
                                time: it
                            });
                            const isSelected = isSameDate && parsedValue?.time === it;

                            return (
                                <Radio.Card
                                    key={it + index.toString()}
                                    value={radioValue}
                                    classNames={{
                                        card: cn("!p-2 !px-4 !w-fit border !border-gray-300 hover:!border-primary hover:!bg-primary/10", {
                                            "!bg-primary !border-primary hover:!bg-primary": isSameDate && parsedValue?.time === it
                                        }),
                                    }}
                                >
                                    <Text
                                        fz={14}
                                        c={isSelected ? "gray.1" : "gray.9"}
                                    >
                                        {it}
                                    </Text>
                                </Radio.Card>
                            )
                        })
                    }
                </Group>
            </Radio.Group>
        </Box>
    )
}

const standardDateFormatter = (date: string | dayjs.Dayjs) => {
    return dayjs(date).format(DATE_FORMAT)
}