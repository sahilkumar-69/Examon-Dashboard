// App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import { SidebarProvider, useSidebar } from "./Component/Navbar/SidebarContext";

// Pages
import Dashboard from "./Pages/Dashboard";
import Commission from "./Pages/Commission";

import Analytics from "./Pages/Analytics";

// Latest news
import AddNewsForm from "./Pages/LatestNews/AddNews";
import NewsList from "./Pages/LatestNews/NewsListingPage";

// Product Moderation

import PendingApprovals from "./Pages/Product Moderation/PendingApprovals";

// User Management
import Customer from "./Pages/UserManagement/Customers";
import Retailer from "./Pages/UserManagement/Retailers";

// Authentication
import Login from "./Pages/Login";
import ProtectedRoute from "./Component/Auth/ProtectRoute";

// Quiz
import AddNewQuiz from "./Pages/StudyMaterial/Quiz/AddQuiz";
import QuizListPage from "./Pages/StudyMaterial/Quiz/QuizListPage";

// Courses
import CourseFormPage from "./Pages/Courses/AddCourse";
import CourseList from "./Pages/Courses/ListAllCourses";

// Achivements
import Achivements from "./Pages/Achivements";

function AppContent() {
  const { collapsed } = useSidebar();

  return (
    <div className="flex w-full">
      <Navbar />
      {/* Dynamic margin left based on collapse */}
      <main
        className={`transition-all duration-300 w-full min-h-screen bg-gray-50 ${
          collapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Routes>
          <Route path="/login" index element={<Login />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="/users" element={<Customer />} />

                  <Route
                    path="/studymaterial/quiz"
                    element={<QuizListPage />}
                  />

                  <Route
                    path="/studymaterial/add-quiz"
                    element={<AddNewQuiz />}
                  />

                  <Route
                    path="/studymaterial/pyq"
                    element={<PendingApprovals />}
                  />

                  <Route path="/studymaterial/notes" element={<Retailer />} />

                  <Route path="/courses" element={<CourseList />} />
                  <Route path="/courses/add" element={<CourseFormPage />} />

                  <Route path="/achivements" element={<Achivements />} />

                  <Route path="/testimonials" element={<Analytics />} />

                  <Route path="/news" element={<NewsList />} />
                  <Route path="/news/add" element={<AddNewsForm />} />

                  {/* <Route
                    path="/approvals/retailers"
                    element={<RetailerApprovals />}
                  /> */}

                  <Route path="/settings/commission" element={<Commission />} />

                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </Router>
  );
}

export default App;
