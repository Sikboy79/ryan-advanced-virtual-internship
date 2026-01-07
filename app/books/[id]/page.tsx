import BookPageClient from "./BookPageClient";
export const runtime = "nodejs";


async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from getBook");
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("getBook did not return JSON");
  }

  return data;
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await getBook(id);

  return (
    <BookPageClient book={book} />
  );
}
