import { RedisClientType, createClient } from "redis";

let redisDb: RedisClientType;

const redisDbConnect = async (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      redisDb = createClient({
        url: "redis://redis-service:6379",
      });
      redisDb.on("connect", () =>
        console.log("\x1b[32m%s\x1b[0m", "[Redis] Client connected")
      );
      redisDb.on("ready", () => {
        console.log("\x1b[32m%s\x1b[0m", "[Redis] Client ready");
        resolve(true);
      });
      redisDb.on("reconnecting", () =>
        console.log("\x1b[33m%s\x1b[0m", "[Redis] Client reconnecting")
      );
      redisDb.on("error", (err) => {
        console.log("\x1b[31m%s\x1b[0m", "[Redis] Client Error", err);
        reject(null);
      });
      redisDb.on("end", (err) =>
        console.log("\x1b[31m%s\x1b[0m", "[Redis] Client End", err)
      );
      redisDb.connect();
    } catch (error) {
      console.log("\x1b[31m%s\x1b[0m", "[Redis] Client Error", error);
      reject(null);
    }
  });

export default redisDbConnect;
