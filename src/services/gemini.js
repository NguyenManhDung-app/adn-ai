export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 👉 Nếu Gemini lỗi → trả luôn cho frontend
    if (!response.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
}
