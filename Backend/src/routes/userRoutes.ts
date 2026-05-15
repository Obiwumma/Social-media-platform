import { Router } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    // 1. We extract the data sent by the frontend
    const { username, email } = req.body;

    const result = await db.insert(users).values({
      username,
      email
    }).returning()

    const newUser = result[0]

    // 3. Respond to the frontend (Replace 'newUser' with whatever you name your result)
    console.log('New User Created:', newUser); 
    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
})

// Get all users
router.get("/", async (req, res) => {
  try {
    // YOUR TURN: Write the Drizzle query to fetch all users
    const allUsers = await db.select().from(users)
    
    // Send them back to the frontend
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router