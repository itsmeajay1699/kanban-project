import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/user";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await User.findOne({ email: credentials?.email });

        if (user && user.password === credentials?.password) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.uid as
        | {
            name?: string | null | undefined;
            email?: string | null | undefined;
            image?: string | null | undefined;
          }
        | undefined;

      return session;
    },
  },
};
