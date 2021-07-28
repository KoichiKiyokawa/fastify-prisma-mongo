import { User } from "@prisma/client"
import { FastifyRequest } from "fastify"
import { prisma } from "../../modules/prisma"

export const UserController = {
  async index(req: FastifyRequest<{ Querystring: { email?: string } }>) {
    if (req.query.email)
      return prisma.user.findFirst({ where: { email: req.query.email } })

    return prisma.user.findMany()
  },
  async show(req: FastifyRequest<{ Params: { id: string } }>) {
    return prisma.user.findUnique({ where: { id: req.params.id } })
  },
  async create(req: FastifyRequest<{ Body: Omit<User, "id"> }>) {
    return prisma.user.create({ data: req.body })
  },
  async update(
    req: FastifyRequest<{
      Body: Partial<Omit<User, "id">>
      Params: { id: string }
    }>
  ) {
    return prisma.user.update({ where: { id: req.params.id }, data: req.body })
  },
  async findByEmail() {
    return "ok"
  },
}
