import { useState } from "react";
import axios from "axios";

const AddNewsForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔹 Submit form data to backend
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

      // ✅ Replace this URL with your actual backend endpoint
      const res = await axios.post("http://localhost:5000/api/news", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ News added successfully!");
        setFormData({ image: null, title: "", description: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add News / Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:cursor-pointer  text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter news title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 "
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add News"}
          </button>
        </form>

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

export default AddNewsForm;
