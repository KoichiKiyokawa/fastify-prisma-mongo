import fastify from "fastify"
import { setupRoute } from "./router"

const isProd = process.env.NODE_ENV === "production"
const app = fastify({ logger: { prettyPrint: isProd } })

setupRoute(app)

app.listen(process.env.PORT ?? 8080)
