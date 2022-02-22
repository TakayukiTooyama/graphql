import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await prisma.user.create({
          data: {
            email: `taka@gmail.com`,
            role: "USER",
          },
        });
        res.status(200);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error user create" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
