import "reflect-metadata"
import fastify from "fastify"
import mercurius from "mercurius"
import cookie from "fastify-cookie"
import session from "@fastify/session"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql"
import { prisma } from "./modules/prisma"
import { setupRoute } from "./router"
import { setupSwagger } from "./modules/swagger"

async function main() {
  dotenv.config()
  const isProd = process.env.NODE_ENV === "production"
  console.log(process.env)
  const app = fastify({ logger: { prettyPrint: !isProd } })

  app.register(cookie)
  app.register(session, {
    secret: "ehgaoignanowngonaognlewigoheaoigoojj",
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
  app.register(mercurius, {
    schema: await buildSchema({
      resolvers,
    }),
    graphiql: true,
    context: () => ({ prisma }),
  })

  await setupSwagger(app)
  setupRoute(app)

  app.listen(process.env.PORT ?? 8080)
}

main().catch(console.error)
