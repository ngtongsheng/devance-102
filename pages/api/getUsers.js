import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log("process.env", process.env)
  const users = await req.db.collection("users").find({}).toArray();
  res.json(users);
});

export default handler;
