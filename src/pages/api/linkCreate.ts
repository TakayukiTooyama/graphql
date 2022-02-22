import { links } from "@/data/links";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const link = await prisma.link.createMany({
          data: links,
        });
        res.status(200);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error create user" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
