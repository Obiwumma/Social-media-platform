import  express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({status: "ok", message: "Social media app is live"})
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});