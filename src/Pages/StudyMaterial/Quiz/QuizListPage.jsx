import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const quizzes1 = [
    {
      id: "upsc_gs_2025_02",
      title: "UPSC Prelims 2025 - General Studies Set A",
      exam: "UPSC",
      duration: 7200,
      totalMarks: 10,
      tags: ["Polity", "Geography", "Economy", "Environment"],
    },
    {
      id: "ssc_cgl_2025_01",
      title: "SSC CGL 2025 Tier-1 Mock Test",
      exam: "SSC",
      duration: 3600,
      totalMarks: 100,
      tags: ["Quant", "Reasoning", "English"],
    },
    {
      id: "neet_biology_2025_01",
      title: "NEET 2025 Biology Practice Set",
      exam: "NEET",
      duration: 5400,
      totalMarks: 180,
      tags: ["Biology", "Zoology", "Botany"],
    },
    {
      id: "gate_cs_2025_01",
      title: "GATE 2025 Computer Science Mock 1",
      exam: "GATE",
      duration: 180,
      totalMarks: 100,
      tags: ["Algorithms", "DBMS", "OS"],
    },
  ];

  // Fetch quizzes from backend
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get("http://localhost:5000/api/quizzes"); // change URL as per backend
  //       setQuizzes(res.data);
  //       setError("");
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch quizzes");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuizzes();
  // }, []);

  // Filter by search
  const filteredQuizzes = quizzes1.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.exam.toLowerCase().includes(search.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    // <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Quizzes</h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 w-64  "
          />
          <button
            onClick={() => navigate("/studymaterial/add-quiz")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Quiz
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-500">Loading quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Quizzes */}
      {!loading && !error && filteredQuizzes.length === 0 && (
        <p className="text-gray-500">No quizzes found.</p>
      )}

      {!loading && !error && filteredQuizzes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {quiz.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Exam:</span> {quiz.exam}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Duration:</span>{" "}
                {quiz.duration / 60} min
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Total Marks:</span>{" "}
                {quiz.totalMarks}
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {quiz.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => (window.location.href = `/quiz/${quiz.id}`)}
                className="mt-4 w-full text-sm bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-md transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
