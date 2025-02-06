import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./services/api";

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname, origin } = request.nextUrl;

    const signInUrl = `${origin}/auth/signin`;
    const dashboardUrl = `${origin}/dashboard/home`;

    // Se o token não existir ou for inválido (undefined ou vazio), redireciona para o login
    if (!token || token === "undefined") { 
        return pathname.startsWith("/dashboard") 
            ? NextResponse.redirect(signInUrl) 
            : NextResponse.next();
    }

    try {
        const isValid = await validateToken(token); // Espera a resposta do validateToken
        if (!isValid) throw new Error("Token inválido");

        return pathname === "/auth/signin" 
            ? NextResponse.redirect(dashboardUrl) 
            : NextResponse.next();
    } catch {
        return NextResponse.redirect(signInUrl);
    }
}

export const config = {
    matcher: ["/auth/signin", "/dashboard/:path*"],
};
