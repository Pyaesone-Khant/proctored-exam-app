import { EDUSNLogo } from "@/components/common/icons"
import React from "react"

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main
            className=" bg-gray-100 min-h-screen flex flex-col w-full "
        >
            <header
                className=" sticky top-0 z-50 bg-white shadow-md"
            >
                <nav
                    className="p-4 px-10"
                >
                    <h1>
                        <EDUSNLogo
                            width={150}
                            height={50}
                        />
                    </h1>
                </nav>
            </header>
            <section
                className="flex-1 p-8 max-sm:p-4"
            >
                <div
                    className="max-w-6xl mx-auto rounded-md border-t-4 border-indigo-950 bg-white shadow-md"
                >
                    {children}
                </div>
            </section>
        </main>
    )
}
