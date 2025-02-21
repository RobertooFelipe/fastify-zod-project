import { UserController } from "../controllers/user.controller";
import {
  createUserResponseSchema,
  createUserSchema,
  updateUserResponseSchema,
  updateUserSchema,
} from "../dto/user.dto";
import { FastifyTypedInstance } from "../types/fastify.type";
import { z } from "zod";

export async function userRouter(app: FastifyTypedInstance) {
  app.get("/", async () => {
    return { hello: "world" };
  });

  app.get(
    "/users",
    {
      schema: {
        description: "List users",
        tags: ["users"],
        response: updateUserResponseSchema,
      },
    },
    UserController.listUsers
  );

  app.post(
    "/create-user",
    {
      schema: {
        description: "Crea te new user",
        tags: ["users"],
        body: createUserSchema,
        response: createUserResponseSchema,
      },
    },
    UserController.createUser
  );

  app.put(
    "/user/:id",
    {
      schema: {
        description: "Update user by ID",
        tags: ["users"],
        params: z.object({ id: z.string().min(1) }),
        body: updateUserSchema,
        response: updateUserResponseSchema,
      },
    },
    UserController.updateUser
  );
}
