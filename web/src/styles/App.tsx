import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Part2Categories } from '../pages/Part2Categories';
import { Part2TopicList } from '../pages/Part2TopicList';
import { Part2StoryDetail } from '../pages/Part2StoryDetail';
import { Part3Home } from '../pages/Part3Home';
import { Part3QuestionTypes } from '../pages/Part3QuestionTypes';
import { Part3Themes } from '../pages/Part3Themes';
import { Part3Classifications } from '../pages/Part3Classifications';
import { TopicList } from '../pages/TopicList';
import { TopicDetail } from '../pages/TopicDetail';
import { MockExam } from '../pages/MockExam';
import { StreakPage } from '../pages/StreakPage';
import RootLayout from '../layout/RootLayout';
import RequireAuth from '../layout/RequireAuth';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AuthProvider } from '../context/AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/part/2" element={<Part2Categories />} />
            <Route path="/part/2/:category" element={<Part2TopicList />} />
            <Route path="/part/2/:category/topic/:topicId" element={<Part2StoryDetail />} />
            <Route path="/part/3" element={<Part3Home />} />
            <Route path="/part/3/question-types" element={<Part3QuestionTypes />} />
            <Route path="/part/3/themes" element={<Part3Themes />} />
            <Route path="/part/3/classifications" element={<Part3Classifications />} />
            <Route path="/part/:partNumber" element={<TopicList />} />
            <Route path="/part/:partNumber/topic/:topicId" element={<TopicDetail />} />
            <Route element={<RequireAuth />}>
              <Route path="/mock-exam" element={<MockExam />} />
              <Route path="/streak" element={<StreakPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
