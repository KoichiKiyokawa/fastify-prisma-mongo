import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { PostController } from "./post.controller"

export function PostRouter(app: FastifyInstance) {
  app.register(setup, { prefix: "posts" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", PostController.index)
  router.get(":id", PostController.show)
}
