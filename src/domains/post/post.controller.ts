import { FastifyRequest } from "fastify"
import { prisma } from "../../modules/prisma"

export const PostController = {
  index() {
    return prisma.post.findMany()
  },
  show(req: FastifyRequest<{ Params: { id: string } }>) {
    return prisma.post.findUnique({ where: { id: req.params.id } })
  },
}
