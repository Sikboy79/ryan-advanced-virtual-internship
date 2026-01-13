import BookPageClient from "./BookPageClient";
import { getBook } from "@/app/library/getBook";
export const runtime = "nodejs";


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
