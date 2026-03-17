import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "communities.json");

export default function handler(req, res) {

  const fileData = fs.readFileSync(filePath);
  const communities = JSON.parse(fileData);

  if (req.method === "GET") {
    res.status(200).json(communities);
  }

  if (req.method === "POST") {
    const newCommunity = req.body;

    communities.push(newCommunity);

    fs.writeFileSync(filePath, JSON.stringify(communities, null, 2));

    res.status(200).json({
      message: "Сообщество создано",
      community: newCommunity
    });
  }
}