import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import mongoose from "mongoose";
import { connectionSrt } from "./lib/db";
import { User } from "./lib/model/user";

export const { handlers, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          mongoose.connect(connectionSrt);
          const userexists = await User.findOne({ email });

          if (!userexists) {
            const res = await fetch("https://verba-zxie.vercel.app/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) return user;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
});
