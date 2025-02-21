import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserDTO } from "../dto/user.dto";

export const UserController = {
  listUsers: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      res.status(201).send({
        message: "User created successfully",
        data: [],
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  createUser: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { name, email } = req.body as CreateUserDTO;

      res.status(201).send({
        message: "User created successfully",
        data: { name, email },
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateUser: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { name } = req.body as CreateUserDTO;

      res.status(201).send({
        message: "User updated successfully",
        data: { name },
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
