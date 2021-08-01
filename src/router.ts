import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { AppController } from "./domains/app/app.controller"
import { UserRouter } from "./domains/user/user.router"
import { PostRouter } from "./domains/post/post.router"

export function setupRoute(router: FastifyInstance) {
  router.register(setup, { prefix: "api/v1" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", AppController.index)
  UserRouter(router)
  PostRouter(router)
}
