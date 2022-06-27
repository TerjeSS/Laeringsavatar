import express from "express";
import * as path from "path";
import { ArticlesApi } from "./articlesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { LoginApi } from "./loginApi.js";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
const wsServer = new WebSocketServer({ noServer: true });
const sockets = [];
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use(
    "/api/articles",
    ArticlesApi(
      mongoClient.db(process.env.MONGODB_DATABASE || "newspage_by_marcus")
    )
  );
});

app.use("/api/login", LoginApi());
app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

wsServer.on("connect", (socket) => {
  sockets.push(socket);
  setTimeout(() => {
    socket.send(
      JSON.stringify({
        headline: "Koronaviruset",
        message: "Helse nord kaller tilbake ansatte fra sommerferie",
      })
    );
  }, 1000);
  setTimeout(() => {
    socket.send(
      JSON.stringify({
        headline: "Norsk politikk",
        message:
          "Hundrevis av fedre mistet hele eller deler av fedrekvoten. Nå blir loven endret.",
      })
    );
  }, 3000);
  setTimeout(() => {
    socket.send(
      JSON.stringify({
        headline: "Kultur",
        message:
          "Kunstsamler Petter Olsen solgte torsdag kveld to kjente Munch-malerier",
      })
    );
  }, 2000);
  socket.on("message", (data) => {
    const { headline, message } = JSON.parse(data);
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ headline, message }));
    }
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connect", socket, req);
    });
  });
});
