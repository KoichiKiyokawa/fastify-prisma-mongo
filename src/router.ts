import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { AppController } from "./domains/app/app.controller"
import { UserController } from "./domains/user/user.controller"

export function setupRoute(router: FastifyInstance) {
  router.register(setup, { prefix: "api/v1" })
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", AppController.index)

  defineResources(router, "users", UserController)
}

function defineResources(
  router: FastifyInstance,
  pathname: string,
  controller: {
    index?: (...args: any) => Promise<unknown>
    show?: (...args: any) => Promise<unknown>
    create?: (...args: any) => Promise<unknown>
    update?: (...args: any) => Promise<unknown>
    destroy?: (...args: any) => Promise<unknown>
  }
) {
  if (controller.index) router.get(`/${pathname}`, controller.index)
  if (controller.show) router.get(`/${pathname}/:id`, controller.show)
  if (controller.create) router.post(`/${pathname}`, controller.create)
  if (controller.update) router.patch(`/${pathname}/:id`, controller.update)
  if (controller.destroy) router.patch(`/${pathname}/:id`, controller.destroy)
}
