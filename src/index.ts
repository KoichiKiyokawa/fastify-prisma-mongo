import "reflect-metadata"
import fastify from "fastify"
import mercurius from "mercurius"
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql"
import { prisma } from "./modules/prisma"
import { setupRoute } from "./router"
import { setupSwagger } from "./modules/swagger"

async function main() {
  const isProd = process.env.NODE_ENV === "production"
  const app = fastify({ logger: { prettyPrint: isProd } })

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

main()
