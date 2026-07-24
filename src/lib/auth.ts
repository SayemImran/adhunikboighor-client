import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("adhunikboighor_db");
export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword:{
        enabled:true,
    },
    user:{
        additionalFields:{
            role:{
                type:"string",
                defaultValue:"buyer",
                required:false,
                input:false,
            }
        }
    },
    plugins: [
    jwt({
      jwt: {
        expirationTime: "15m",
        definePayload: ({ user }) => ({
          role: (user as { role?: string }).role,
        }),
      },
    }),
  ],
})