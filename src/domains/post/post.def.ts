import { Type } from "@sinclair/typebox"

export const PostDef = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
})
