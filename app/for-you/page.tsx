import ClientDashboardLayout from "@/components/Layout/ClientDashboardLayout";
import SearchInput from "@/components/UI/SearchInput";
import axios from "axios";
import { FadeInItem } from "../../components/UI/Animations";
import RecommendedBooks from "../../components/UI/RecommendedBooks";
import SuggestedBooks from "@/components/UI/SuggestedBooks";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  imageLink: string;
  audioLink: string;
  summary: string;
  type: string;
  totalRating: number;
}

export default async function ForYou() {
  // SERVER-SIDE FETCH
  let selectedBooks: Book[] = [];

  try {
    const res = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    selectedBooks = res.data;
    console.log(res.data);
  } catch (err) {
    console.error("Failed to fetch selected books", err);
  }

  return (
    <>
      <div className="flex justify-end m-1 ml-0 md:ml-52">
        <SearchInput />
      </div>
      <ClientDashboardLayout>
        <div className="md:ml-52 px-4 md:px-0">
          <section className="mb-8 md:ml-6">
            <h2 className="text-2xl font-bold mb-4">Selected just for you</h2>
            {selectedBooks.length === 0 ? (
              <p className="text-gray-600">No selected books found.</p>
            ) : (
              <div className="space-y-4 max-w-full md:max-w-[80%]">
                {selectedBooks.map((book) => (
                  <FadeInItem key={book.id}>
                    <Link href={`/books/${book.id}`}>
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 bg-[#FFF4E0] p-4 rounded-lg shadow">
                        {/* Subtitle */}
                        <div className="flex-1 text-gray-700">
                          <p className="text-sm md:text-base line-clamp-3">
                            {book.subTitle}
                          </p>
                        </div>
                        <span className="hidden md:block w-px h-28 bg-gray-300" />
                        <div className="flex-shrink-0 h-32 w-24 md:w-28">
                          <img
                            src={book.imageLink}
                            alt={book.title}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-2 md:gap-3 justify-center md:justify-start">
                          <h3 className="font-bold text-lg text-gray-700">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-700">{book.author}</p>
                          <div className="flex items-center gap-3 mt-2 cursor-pointer">
                            <div className="relative flex items-center justify-center w-10 h-10 bg-black rounded-full shrink-0">
                              <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <polygon points="5,3 19,12 5,21" />
                              </svg>
                            </div>
                            <div className="text-gray-700 font-semibold text-sm">
                              3 mins 23 sec
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeInItem>
                ))}
              </div>
            )}
          </section>
          <div className="space-y-8">
            <RecommendedBooks />
            <SuggestedBooks />
          </div>
        </div>
      </ClientDashboardLayout>
    </>
  );
}
