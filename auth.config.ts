// Edge-compatible auth config — no Node.js modules, no Prisma.
// Used by middleware.ts (Edge Runtime) and spread into auth.ts (Node.js).
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" as const },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin/login";

      // Logged-in user hitting the login page → send to dashboard
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      // Unauthenticated user on any other /admin page → NextAuth redirects to signIn
      if (!isLoggedIn) return false;

      return true;
    },
  },
  providers: [], // Credentials provider added in auth.ts (Node.js only)
} satisfies NextAuthConfig;
