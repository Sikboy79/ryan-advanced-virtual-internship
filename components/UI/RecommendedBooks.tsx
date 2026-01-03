import { getRecommendedBooks } from "../../app/library/getRecommendedBooks";
import RecommendedBooksClient from "./RecommendedBooks.client";

export default async function RecommendedBooks() {
  const books = await getRecommendedBooks();
  return <RecommendedBooksClient books={books} />;
}
