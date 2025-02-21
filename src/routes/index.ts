import { FastifyTypedInstance } from "../types/fastify.type";
import { userRouter } from "./user.route";

export default async function routes(fastify: FastifyTypedInstance) {
  fastify.register(userRouter, { prefix: "/user" });
}
