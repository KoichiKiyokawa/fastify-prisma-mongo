import { Type } from "@sinclair/typebox"

export const CommentDef = Type.Object({
  id: Type.String(),
  postId: Type.String(),
  text: Type.String(),
})
