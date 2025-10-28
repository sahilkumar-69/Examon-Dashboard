import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //   Dummy Data
  const [courses] = useState([
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
      actualprice: "4999",
      previousprice: "12000",
      percent: "58",
      title: "GATE 2026 (CE) – Master Batch",
      insideCourses:
        "Full Technical Syllabus, Engineering Mathematics, Aptitude",
      description: "Comprehensive preparation with structured learning path.",
      perks: "RECORDED, PYQs, LIVE TESTS",
      Discount: "true",
      amount: "800",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      actualprice: "5999",
      previousprice: "13000",
      percent: "54",
      title: "GATE 2026 (ME) – Premium Batch",
      insideCourses: "Mechanical Syllabus, Practice Tests, Mock Exams",
      description: "Full syllabus coverage with mentoring support.",
      perks: "LIVE CLASSES, TEST SERIES, DOUBT SESSIONS",
      Discount: "true",
      amount: "1000",
    },
  ]);

  //  Filter based on search
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Courses</h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg "
          />
          <button
            onClick={() => {
              navigate("/courses/add");
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {/* <Plus size={18} /> */}+ Add Course
          </button>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-all"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {course.insideCourses}
              </p>
              <p className="text-gray-700 text-sm mb-3">{course.description}</p>

              <p className="text-xs text-gray-500 mb-2">
                <span className="font-semibold">Perks:</span> {course.perks}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold text-green-600">
                    ₹{course.actualprice}
                  </span>
                  <span className="line-through text-sm text-gray-400 ml-2">
                    ₹{course.previousprice}
                  </span>
                  <span className="ml-2 text-sm text-blue-600 font-semibold">
                    ({course.percent}% OFF)
                  </span>
                </div>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courses found.</p>
      )}
    </div>
  );
};

export default CourseList;
