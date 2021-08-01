import "reflect-metadata"
import fastify from "fastify"
// import { setupRoute } from "./router"
import mercurius from "mercurius"
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql"
import { prisma } from "./modules/prisma"

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

  // setupRoute(app)

  app.listen(process.env.PORT ?? 8080)
}

main()
