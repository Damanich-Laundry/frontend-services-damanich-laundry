"use client"

import { Button, Image } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mx-auto mt-25 md:mt-17">
            <div>
                <Image
                alt=""
                src="./assets/not-found.png"
                width={400}
                />
            </div>
            <div className="text-center space-y-4">
                <h1 className="font-bold text-4xl">Sorry! Page Not Found.</h1>
                <p>The page you are looking for does not exist.</p>
                <Button as={Link} href="/">
                    Go to Home
                </Button>
            </div>
        </div>
    )
}
