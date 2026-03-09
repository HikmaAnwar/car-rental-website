import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // TODO: Connect this to your Go backend registration endpoint


        const backendRes = await fetch("http://localhost:8088/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await backendRes.json();
        console.log("data", data);
        return NextResponse.json(data, { status: backendRes.status });
    } catch (error) {
        console.error("error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
