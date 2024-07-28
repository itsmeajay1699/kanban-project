import NextAuth from "next-auth";

import { authOptions } from "@/utils/next_auth_option";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
