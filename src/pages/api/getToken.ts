// /pages/api/getToken.js
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { agentId } = req.body;
  try {
    const resp = await fetch(
      `https://api.bland.ai/v1/agents/${agentId}/authorize`,
      {
        method: "POST",
        headers: { Authorization: process.env.NEXT_PUBLIC_BLAND_API_KEY ?? "" },
      }
    );
    const data = await resp.json();
    if (!data.token) throw new Error("No token received");
    res.status(200).json({ token: data.token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
