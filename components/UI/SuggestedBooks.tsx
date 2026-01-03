import { getSuggestedBooks } from "../../app/library/getSuggestedBooks";
import SuggestedBooksClient from "./SuggestedBooks.client";

export default async function SuggestedBooks() {
  const books = await getSuggestedBooks();
  return <SuggestedBooksClient books={books} />;
}