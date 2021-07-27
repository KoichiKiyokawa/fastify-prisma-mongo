import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { AppController } from "./domains/app/app.controller"

export function setupRoute(router: FastifyInstance) {
  router.register(setup, { prefix: "api/v1" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", AppController.index)
}
