import { Type } from "@sinclair/typebox"

export const UpdateUserDTO = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: "email" })),
})
