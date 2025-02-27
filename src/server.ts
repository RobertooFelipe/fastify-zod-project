import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import routes from "./routes";
import "dotenv/config";
import redisDbConnect from "./config/redis";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(routes);

app
  .listen({
    port: parseInt(process.env.PORT || "4002", 10),
    host: "0.0.0.0",
  })
  .then(async () => {
    // await redisDbConnect();
    console.log(`➡️  HTTP server running on ${process.env.PORT || 4002}`);
  });
