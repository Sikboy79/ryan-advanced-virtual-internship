import ClientDashboardLayout from "@/components/Layout/ClientDashboardLayout";
import AudioPlayButton from "@/components/UI/AudioPlayButton";
import SearchInput from "@/components/UI/SearchInput";
import axios from "axios";

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
    <ClientDashboardLayout>
      <div className="flex justify-end mb-6">
        <SearchInput />
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Selected just for you</h2>
        {selectedBooks.length === 0 ? (
          <p className="text-gray-600">No selected books found.</p>
        ) : (
          <div className="space-y-4">
            {selectedBooks.map((book) => (
              <div
                key={book.id}
                className="flex gap-4 bg-[#FFF4E0] p-4 m-1 rounded-lg shadow max-w-[70%]"
                style={{ marginLeft: 0 }}
              >
                <div className="flex-1 text-gray-700">
                  <p className="text-base">{book.subTitle}</p>
                </div>
                <span className="w-px h-32 bg-gray-300 self-center" />
                <div className="flex-shrink-0 h-28">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className=" h-32 m-3 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 flex flex-col m-3 gap-3">
                  <h3 className="font-bold text-lg text-gray-700">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-700">{book.author}</p>
                  {book.audioLink && (
                    <AudioPlayButton
                      src={book.audioLink}
                      duration="3 mins 23 secs"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </ClientDashboardLayout>
  );
}
