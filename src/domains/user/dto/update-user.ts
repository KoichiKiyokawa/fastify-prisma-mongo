import { Type } from "@sinclair/typebox"

export const UpdateUserDTO = Type.Optional(
  Type.Object({
    name: Type.String(),
    email: Type.String({ format: "email" }),
  })
)
