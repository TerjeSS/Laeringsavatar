import { Router } from "express";

export function ArticlesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const news = await mongoDatabase
      .collection("news")
      .find({})
      .sort({ _id: -1 }) //Recently added data shows first on the article page
      .project({
        title: 1,
        date: 2,
        author: 3,
        poster: 4,
        topic: 5,
        articletext: 6,
      })
      .limit(20) //Listing out max 20 data from MongoDB
      .toArray();
    res.json(news);
  });

  router.post("/", async (req, res) => {
    const { title, date, author, poster, topic, articletext } = req.body;
    const result = await mongoDatabase.collection("news").insertOne({
      title,
      date,
      author,
      poster,
      topic,
      articletext,
    });
    console.log({ result });
    res.sendStatus(200);
  });

  return router;
}
