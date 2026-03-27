import members from "../members.json" with { type: "json" };
import { type Request, type Response } from "express";

export default async function next(req: Request, res: Response) {
  const randomIndex = Math.floor(Math.random() * members.length);
  return res.redirect(302, members[randomIndex].url);
}
