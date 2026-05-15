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

    const result = await db.insert(posts).values({
      content,
      userId
    }).returning()

    // 3. Respond to the frontend
    const newPost = result[0];
    
    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

export default router;