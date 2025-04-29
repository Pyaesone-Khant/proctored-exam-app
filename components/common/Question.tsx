import { Box, Stack, Text } from "@mantine/core";

export function Question(props: Question) {

    const { question, options, passage } = props;

    return (
        <Box>
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

            <Stack>
                {
                    options.map((option, index) => (
                        <Box
                            key={index}
                            p={12}
                            bg={"blue.0"}
                            className="border-l-4 border-primary rounded-sm"
                        >
                            <Text>
                                {option}
                            </Text>
                        </Box>
                    ))
                }
            </Stack>
        </Box>
    )
}
