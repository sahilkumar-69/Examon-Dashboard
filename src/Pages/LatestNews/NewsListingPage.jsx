import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //  Fetch news from backend
  const fetchNews = async () => {
    try {
      setLoading(true);
      // Replace this with your actual backend endpoint
      const res = await axios.get("http://localhost:5000/api/news");
      setNewsList(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchNews();
  }, []);

  //  Dummy fallback data (for now)
  const dummyNews = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600",
      title: "JE 2025 Exam postponed notification released",
      description:
        "The SSC JE 2025 exam has been postponed due to administrative reasons.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
      title: "UPSC 2025 Admit Card Released",
      description:
        "UPSC has officially released the admit cards for the 2025 Prelims examination.",
    },
  ];

  // Use backend data if available, else dummy
  const displayNews = newsList.length ? newsList : dummyNews;

  //  Filter based on search term
  const filteredNews = displayNews.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">All News</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg "
          />
          <button
            onClick={() => navigate("/news/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {/* <Plus size={18} /> */}+ Add News
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-600 mt-6">Loading news...</p>
      )}

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {!loading && filteredNews.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No news found.</p>
      )}
    </div>
  );
};

export default NewsList;
