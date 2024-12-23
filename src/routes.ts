import { randomUUID } from "node:crypto";
import { FastifyTypedInstance } from "./types";
import z from "zod";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
  app.get("/", async () => {
    return { hello: "world" };
  });

  app.get(
    "/users",
    {
      schema: {
        description: "List users",
        tags: ["users"],
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
              })
            )
            .describe("List of users"),
        },
      },
    },
    async () => {
      return users;
    }
  );

  app.post(
    "/users",
    {
      schema: {
        description: "Create new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
            })
            .describe("User created successfully in server side!"),
        },
      },
    },
    async (req, rep) => {
      const { name, email } = req.body;

      users.push({ id: randomUUID(), name, email });

      return rep.status(201).send({ message: "User created successfully" });
    }
  );
}
