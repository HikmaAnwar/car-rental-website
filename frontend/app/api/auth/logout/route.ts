import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // You may need to pass the authentication token in the headers for logout
        const authHeader = request.headers.get("Authorization");
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const backendRes = await fetch("http://localhost:8088/api/logout", {
            method: "POST",
            headers: headers
        });

        // Handle no content response typical in logouts
        if (backendRes.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
