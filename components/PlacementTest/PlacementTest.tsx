import { Badge, Title } from "@mantine/core";

const questions: Question[] = [
    {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
        options: ["Madrid", "Paris", "Amsterdarm", "Bangkok"],
    },
    {
        id: 2,
        question: "What is the capital of Myanmar?",
        answer: "Nay Pyi Daw",
        options: ["Mandalay", "Yangon", "Nay Pyi Daw", "Sagaing"],
    }
]

export function PlacementTest() {

    return (
        <section>
            <article
                className="flex items-center justify-between py-2 border-b"
            >
                <Title>
                    English Test
                </Title>
                <Badge
                    radius={4}
                    fw={500}
                    variant="light"
                    color="orange"
                >
                    1:00
                </Badge>
            </article>

            
        </section>
    )
}
