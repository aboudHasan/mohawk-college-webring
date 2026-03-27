import members from "../members.json" with { type: "json" };
import { type Request, type Response } from "express";

export default async function next(req: Request, res: Response) {
  const { from } = req.query;

  if (!from) {
    return res.status(400).json({ message: "Missing query paramater 'from'" });
  }

  if (typeof from !== "string") {
    return res.status(400).json({
      message: "Query parameter 'from' must be a single string",
    });
  }
  const filteredQuery = from.toLowerCase().replace(/\/$/, "");

  const currentIndex = members.findIndex(
    (member) => member.url.toLowerCase().replace(/\/$/, "") === filteredQuery,
  );

  if (currentIndex === -1) {
    return res
      .status(400)
      .json({ message: "Couldn't find member in the registry" });
  }

  if (currentIndex === members.length - 1) {
    return res.redirect(302, members[0].url);
  }

  return res.redirect(302, members[currentIndex + 1].url);
}
