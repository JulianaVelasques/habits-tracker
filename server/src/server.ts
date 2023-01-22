import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoute } from "./routes";

const app = Fastify();

//integrar o cors
app.register(cors);

app.register(appRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
