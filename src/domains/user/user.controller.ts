import { User } from "@prisma/client"
import { FastifyRequest } from "fastify"
import { prisma } from "../../modules/prisma"

export const UserController = {
  async index() {
    return prisma.user.findMany()
  },
  async create(req: FastifyRequest<{ Body: Omit<User, "id"> }>) {
    return prisma.user.create({ data: req.body })
  },
}
