import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { rateLimit } from "@/app/lib/rate-limit";
import { headers } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).toLowerCase();
        const xff = (await headers()).get("x-forwarded-for");
        const ip = xff ? xff.split(",")[0]!.trim() : "unknown";

        // Rate-limit by IP+email so a single attacker can't brute-force one
        // account, and a single compromised IP can't brute-force many.
        const ipLimit = rateLimit(`login-ip:${ip}`, 20, 900);
        const emailLimit = rateLimit(`login-email:${email}`, 5, 900);
        if (!ipLimit.success || !emailLimit.success) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          String(credentials.password),
          user.passwordHash
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "",
          role: user.role,
        };
      },
    }),
  ],
});
