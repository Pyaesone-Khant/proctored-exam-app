import { cn } from "@/lib/utils";
import { useTestStore } from "@/states/zustand/test";
import { Box, Group, Radio, RadioGroup, Stack, Text } from "@mantine/core";

export function Question(props: Question) {

    const { id, question, options, passage } = props;

    const selectAnswer = useTestStore(state => state.selectAnswer);
    const userAnswers = useTestStore(state => state.userAnswers);

    return (
        <Box
            className="!space-y-2"
        >
            {
                passage && (
                    <Box
                        p={12}
                        bg={"blue.0"}
                        className="border-l-4 border-primary rounded-sm"
                    >
                        <Text>
                            {passage}
                        </Text>
                    </Box>
                )
            }

            <Text
                fz={18}
                fw={600}
            >
                {question}
            </Text>

            <RadioGroup
                onChange={(value => selectAnswer(id, value))}
            >
                <Stack>
                    {
                        options.map((option) => (
                            <Radio.Card
                                key={option}
                                value={option}
                                classNames={{
                                    card: cn("hover:!border-primary hover:!bg-primary/10 data-[checked=true]:!border-primary data-[checked=true]:!bg-primary/10"),
                                }}
                                checked={userAnswers[id] === option}
                            >
                                <Group
                                    className="p-2"
                                >
                                    <Radio.Indicator />
                                    <Text>
                                        {option}
                                    </Text>
                                </Group>
                            </Radio.Card>
                        ))
                    }
                </Stack>
            </RadioGroup>
        </Box>
    )
}
