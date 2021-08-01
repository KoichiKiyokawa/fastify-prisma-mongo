import { Static, Type } from "@sinclair/typebox"

export const CreateUserDTO = Type.Object({
  name: Type.String(),
  email: Type.String({ format: "email" }),
})

export type TCreateUserDTO = Static<typeof CreateUserDTO>
