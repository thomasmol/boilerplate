import { issuer } from "@openauthjs/openauth"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
import { subjects } from "./subjects"
import { db, users } from "@boilerplate/db"
import { eq } from "drizzle-orm"

async function getOrCreateUser(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  if (!user) {
    const newUser = await db.insert(users).values({ email }).returning()
    return newUser[0].id
  }
  return user.id
}

const auth = issuer({
  subjects,
  storage: MemoryStorage({
    persist: "./persist.json",
  }),
  providers: {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },
  async allow() {
    return true
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        id: await getOrCreateUser(value.email),
      })
    }
    throw new Error("Invalid provider")
  },
})
export default {
  port: 3001,
  fetch: auth.fetch,
}
