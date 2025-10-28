import React, { useState } from "react";
import { AiFillNotification, AiOutlineDelete } from "react-icons/ai";

const AddNewQuiz = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    exam: "",
    duration: "",
    totalMarks: "",
    tags: [],
    questions: [
      {
        id: "",
        type: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
        marks: "",
        topic: "",
        difficulty: "easy",
      },
    ],
  });

  // -------------------------------
  // Handle input changes
  // -------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // Handle tags
  // -------------------------------
  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const addTag = () => {
    const tag2add = prompt("Enter Tag value (1-20 characters)");
    const trimmedTag = tag2add.trim();
    if (trimmedTag && trimmedTag.length < 21) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag2add] }));
    } else {
      alert("Tag can have max 20 characters");
    }
  };

  const removeTag = (tag2remove) => {
    const remainingTags = formData.tags.filter((tag) => tag != tag2remove);

    setFormData((prev) => ({ ...prev, tags: remainingTags }));
  };

  // -------------------------------
  // Handle questions
  // -------------------------------
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const RemoveQuestion = (id) => {
    const popUpRes = confirm("Confirm to delete this question");
    console.log(popUpRes);

    if (popUpRes) {
      const remainingQuestions = formData.questions.filter((q) => q.id !== id);

      setFormData((prev) => ({
        ...prev,
        questions: remainingQuestions,
      }));
    }
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `upsc_q${prev.questions.length + 1}`,
          type: "multiple_choice",
          question: "",
          options: ["", "", "", ""],
          correctAnswerIndex: 0,
          marks: 2,
          topic: "",
          difficulty: "medium",
        },
      ],
    }));
  };

  // -------------------------------
  // Handle form submit
  // -------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final JSON:", formData);
    alert("Form submitted! Check console for output.");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        UPSC Exam Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Exam Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Exam Title"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            placeholder="Exam Type"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (in seconds)"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            placeholder="Total Marks"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
          {formData.tags.map((tag, index) => (
            // <input
            //   key={index}
            //   type="text"
            //   value={tag}
            //   onChange={(e) => handleTagChange(index, e.target.value)}
            //   placeholder="Tag"
            //   className="border p-2 rounded w-full mb-2"
            // />
            <div
              key={index}
              className="pr-2 pl-3 inline py-1 m-1 rounded-2xl bg-blue-600 text-white"
            >
              {tag}
              <span
                onClick={() => {
                  removeTag(tag);
                }}
                className="text-lg ml-1 p-1 text-gray-100 cursor-pointer"
              >
                ×
              </span>
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-1 cursor-pointer bg-green-600 text-white text-sm rounded-2xl"
          >
            + Add Tag
          </button>
        </div>

        {/* Questions */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Questions</h3>

          {formData.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border relative rounded-xl p-4 mb-4 bg-gray-50 shadow-sm"
            >
              <span
                onClick={() => {
                  RemoveQuestion(q.id);
                }}
                className="absolute cursor-pointer top-0 right-0 rounded-full p-2 bg-red-600 text-white "
              >
                <AiOutlineDelete />
              </span>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "question", e.target.value)
                }
                placeholder="Question Text"
                className="border p-2 rounded w-full mb-3"
              />

              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                    className="border p-2 rounded"
                  />
                ))}
              </div>

              <div className="flex gap-3 items-center mb-2">
                <label className="text-gray-600 text-sm">Correct Answer:</label>
                <select
                  value={q.correctAnswerIndex}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswerIndex",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded p-1"
                >
                  {q.options.map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      Option {idx + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={q.marks}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "marks", e.target.value)
                  }
                  placeholder="Marks"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={q.topic}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "topic", e.target.value)
                  }
                  placeholder="Topic"
                  className="border p-2 rounded"
                />
                <select
                  value={q.difficulty}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "difficulty", e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewQuiz;
