export async function getRecommendedBooks() {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch recommended books");
  return res.json();
}