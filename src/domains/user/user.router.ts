import { Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { CreateUserDTO } from "./dto/create-user"
import { UserController } from "./user.controller"

export function UserRouter(app: FastifyInstance) {
  app.register(setup, { prefix: "users" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get(
    "/",
    {
      schema: {
        summary: "ユーザ一覧",
        description:
          "ユーザ一覧を取得する。emailをqueryとして絞り込むこともできる。",
        querystring: { email: { type: "string" } },
        response: {
          200: {
            description: "user list",
            type: "object",
          },
        },
      },
    },
    UserController.index
  )
  router.get("/:id", UserController.show)
  router.post("/", { schema: { body: CreateUserDTO } }, UserController.create)
  router.patch("/:id", UserController.update)
  // router.patch("/:id", UserController.destroy)
}
