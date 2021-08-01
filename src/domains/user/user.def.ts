import { Type } from "@sinclair/typebox"

export const UserDef = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  email: Type.String({ format: "email" }),
})
