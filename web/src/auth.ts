import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { MikroOrmAdapter } from "@auth/mikro-orm-adapter"

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Google],
    adapter: MikroOrmAdapter({
        dbName: process.env.DB_NAME,
        type: "postgresql",
        debug: true
    })
    // callbacks: {
    //     authorized: async ({auth}) => {
    //         return !!auth
    //     }
        
    // }
})