import { Type } from "@sinclair/typebox"
import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { CommentDef } from "./comment.def"

export const CommentRouter = (router: FastifyInstance) => {
  router.register(setup, { prefix: "comment/" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get(
    "",
    {
      schema: {
        summary: "コメント一覧",
        description: "コメント一覧を取得する",
        tags: ["comment"],
        response: { 200: Type.Array(CommentDef) },
      },
    },
    () => {}
  )

  router.get(
    ":id",
    {
      schema: {
        summary: "コメント詳細",
        description: "指定したコメントを取得する",
        tags: ["comment"],
        response: { 200: CommentDef },
      },
    },
    () => {}
  )

  router.post(
    "",
    {
      schema: {
        summary: "コメント作成",
        description: "コメントを作成する",
        tags: ["comment"],
        response: { 200: { description: "作成したコメント", ...CommentDef } },
      },
    },
    () => {}
  )

  router.patch(
    ":id",
    {
      schema: {
        summary: "コメント更新",
        description: "コメントを更新する",
        tags: ["comment"],
        response: { 200: { description: "更新後のコメント", ...CommentDef } },
      },
    },
    () => {}
  )

  router.delete(
    ":id",
    {
      schema: {
        summary: "コメント削除",
        description: "コメントを削除する",
        tags: ["comment"],
        response: {
          200: {
            description: "削除したコメントのid",
            ...Type.Object({
              id: Type.String(),
            }),
          },
        },
      },
    },
    () => {}
  )
}
