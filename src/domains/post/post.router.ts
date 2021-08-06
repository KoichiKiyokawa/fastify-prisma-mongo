import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { PostController } from "./post.controller"
import { Type } from "@sinclair/typebox"
import { UserDef } from "../user/user.def"

export function PostRouter(app: FastifyInstance) {
  app.register(setup, { prefix: "posts" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get(
    "/",
    {
      schema: {
        summary: "投稿一覧",
        description: "投稿一覧を取得する",
        tags: ["post"],
        response: {
          200: { description: "投稿一覧", ...Type.Array(UserDef) },
        },
      },
    },
    PostController.index
  )
  router.get(":id", PostController.show)
}
