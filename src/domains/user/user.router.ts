import { Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { PostDef } from "../post/post.def"
import { CreateUserDTO } from "./dto/create-user"
import { UpdateUserDTO } from "./dto/update-user"
import { UserController } from "./user.controller"
import { UserDef } from "./user.def"

export function UserRouter(app: FastifyInstance) {
  app.register(setup, { prefix: "users/" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get(
    "",
    {
      schema: {
        summary: "ユーザ一覧",
        description:
          "ユーザ一覧を取得する。emailをqueryとして絞り込むこともできる。",
        tags: ["user"],
        querystring: { email: { type: "string" } },
        response: {
          200: {
            description: "user list",
            ...Type.Array(UserDef),
          },
        },
      },
    },
    UserController.index
  )
  router.get(
    ":id",
    {
      schema: {
        summary: "ユーザ詳細",
        description: "指定したユーザの詳細情報を取得する",
        tags: ["user"],
        params: { id: { type: "string" } },
        response: { 200: { description: "該当するユーザ", ...UserDef } },
      },
    },
    UserController.show
  )
  router.post(
    "",
    {
      schema: {
        summary: "ユーザ作成",
        description: "ユーザを作成する",
        tags: ["user"],
        body: CreateUserDTO,
        response: { 200: { description: "作成されたユーザ", ...UserDef } },
      },
    },
    UserController.create
  )
  router.patch(
    ":id",
    {
      schema: {
        summary: "ユーザ更新",
        description: "指定したユーザを更新する",
        params: Type.Object({ id: Type.String() }),
        tags: ["user"],
        body: UpdateUserDTO,
        response: { 200: { description: "更新後のユーザ", ...UserDef } },
      },
    },
    UserController.update
  )

  router.delete(
    ":id",
    {
      schema: {
        summary: "ユーザ削除",
        description: "指定したユーザを削除する",
        tags: ["user"],
        response: {
          200: {
            description: "削除したユーザのid",
            ...Type.Object({ id: Type.String() }),
          },
        },
      },
    },
    UserController.delete
  )

  router.get(
    ":id/posts",
    {
      schema: {
        summary: "ユーザの投稿一覧",
        description: "指定したユーザの投稿一覧を取得する",
        tags: ["user", "post"],
        params: Type.Object({ id: Type.String() }),
        response: {
          200: { description: "投稿一覧", ...Type.Array(PostDef) },
        },
      },
    },
    UserController.postIndex
  )
}
