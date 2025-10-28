import { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit, MdSave } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Achivements = () => {
  const [formData, setFormData] = useState({
    activeUsers: "",
    courses: "",
    passingRate: "",
    customerSatisfication: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [Editable, setEditable] = useState(false);

  //   Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append("image", formData.image);
      data.append("title", formData.title);
      data.append("description", formData.description);

      //  Replace this URL with your actual backend endpoint
      const res = await axios.post("http://localhost:5000/api/news", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("News added successfully!");
        setFormData({ image: null, title: "", description: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white  relative shadow-lg rounded-xl p-8 w-full max-w-4xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Current Status
        </h2>
        <div className="flex gap-2 absolute top-3 right-3 ">
          {!Editable ? (
            <MdEdit
              onClick={() => {
                setEditable(true);
              }}
              className="cursor-pointer p-2 rounded-full hover:bg-gray-300 hover:text-red-700"
              size={37}
            />
          ) : (
            <div className="flex gap-2">
              <RxCross2
                onClick={() => {
                  setEditable(false);
                }}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-300 hover:text-red-700"
                size={37}
              />
              <MdSave
                onClick={handleSubmit}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-300 hover:text-green-700"
                size={37}
              />
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center"
        >
          {/* Active Users */}
          <div className="flex flex-col items-center w-full">
            <label className="text-center text-base font-medium text-gray-700 mb-2">
              Active Users (in M)
            </label>
            <input
              type="number"
              name="activeUsers"
              value={formData.activeUsers}
              disabled={!Editable}
              placeholder="Active Users"
              onChange={handleChange}
              className="w-24 h-24 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Customer Satisfaction */}
          <div className="flex flex-col items-center w-full">
            <label className="text-center text-base font-medium text-gray-700 mb-2">
              Customer Satisfaction (%)
            </label>
            <input
              type="number"
              name="customerSatisfication"
              value={formData.customerSatisfication}
              disabled={!Editable}
              placeholder="Satisfaction"
              onChange={handleChange}
              className="w-24 h-24 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Courses */}
          <div className="flex flex-col items-center w-full">
            <label className="text-center text-base font-medium text-gray-700 mb-2">
              Courses
            </label>
            <input
              type="number"
              name="courses"
              value={formData.courses}
              disabled={!Editable}
              placeholder="Courses"
              onChange={handleChange}
              className="w-24 h-24 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Passing Rate */}
          <div className="flex flex-col items-center w-full">
            <label className="text-center text-base font-medium text-gray-700 mb-2">
              Passing Rate (%)
            </label>
            <input
              type="number"
              name="passingRate"
              value={formData.passingRate}
              disabled={!Editable}
              placeholder="Passing Rate"
              onChange={handleChange}
              className="w-24 h-24 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </form>

        {/* Edit Button */}
        {/* <button 
          type="submit"
          onClick={() => setEditable(true)}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          { loading ? "Updating..." : "Edit Values"}
        </button> */}

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Achivements;
