import { User } from "@prisma/client"
import { FastifyRequest } from "fastify"
import { prisma } from "../../modules/prisma"
import createError from "http-errors"

export const UserController = {
  async index(req: FastifyRequest<{ Querystring: { email?: string } }>) {
    if (req.query.email)
      return prisma.user.findFirst({ where: { email: req.query.email } })

    return prisma.user.findMany()
  },
  async show(req: FastifyRequest<{ Params: { id: string } }>) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (user == null) throw new createError.NotFound()

    return user
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
  async delete(req: FastifyRequest<{ Params: { id: string } }>) {
    return prisma.user.delete({ where: { id: req.params.id } })
  },

  async postIndex(req: FastifyRequest<{ Params: { id: string } }>) {
    return prisma.post.findMany({ where: { userId: req.params.id } })
  },
}
