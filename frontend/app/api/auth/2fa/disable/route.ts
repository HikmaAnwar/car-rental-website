import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        } else {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const backendRes = await fetch("http://localhost:8088/api/2fa/disable", {
            method: "POST",
            headers: headers
        });

        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
