import { FastifyInstance } from "fastify"

export async function setupSwagger(app: FastifyInstance) {
  if (process.env.NODE_ENV === "production") return

  const fastifySwagger = await import("fastify-swagger")
  app.register(fastifySwagger.default, {
    swagger: {
      info: {
        title: "mongo fastify",
        version: "1.0.0",
      },
    },
    exposeRoute: true,
  })

  app.ready((err) => {
    if (err != null) return console.error(err)
    console.log(app.swagger())
  })
}
