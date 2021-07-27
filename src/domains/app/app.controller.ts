import { FastifyRequest } from "fastify"

export const AppController = {
  async index(_req: FastifyRequest) {
    return "ok"
  },
}
