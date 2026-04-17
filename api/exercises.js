export default async function handler(req, res) {
  const { muscle, difficulty } = req.query;

  const API_KEY = process.env.NINJA_API_KEY;

  let url = "https://api.api-ninjas.com/v1/exercises?";
  if (muscle) url += `muscle=${muscle}`;
  if (difficulty) url += `&difficulty=${difficulty}`;

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
