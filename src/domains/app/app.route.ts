import { FastifyInstance } from "fastify";

export function AppRoute(router: FastifyInstance) {
  UserRoute(router)
}