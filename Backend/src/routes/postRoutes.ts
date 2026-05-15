import { Router } from "express";
import { db } from "../db/index.js";
import { posts } from "../db/schema.js";

const router = Router();

// Endpoint to create a new post
router.post("/", async (req, res) => {
  try {
    // 1. Extract the data from the frontend
    // Remember: A post needs text content AND the ID of the user who wrote it!
    const { content, userId } = req.body;

    // 2. YOUR TURN: Write the Drizzle query to insert the post into the database.
    // Make sure to use .returning() so we can send the new post back!
    const newPost = await db.insert(posts).values({
      content,
      userId
    }).returning

    // 3. Respond to the frontend
    // res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

export default router;