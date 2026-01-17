import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Part2Categories } from './components/Part2Categories';
import { Part2TopicList } from './components/Part2TopicList';
import { Part2StoryDetail } from './components/Part2StoryDetail';
import { Part3Home } from './components/Part3Home';
import { Part3QuestionTypes } from './components/Part3QuestionTypes';
import { Part3Themes } from './components/Part3Themes';
import { Part3Classifications } from './components/Part3Classifications';
import { TopicList } from './components/TopicList';
import { TopicDetail } from './components/TopicDetail';
import { MockExam } from './components/MockExam';
import { StreakPage } from './components/StreakPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/part/2" element={<Part2Categories />} />
          <Route path="/part/2/:category" element={<Part2TopicList />} />
          <Route path="/part/2/:category/topic/:topicId" element={<Part2StoryDetail />} />
          <Route path="/part/3" element={<Part3Home />} />
          <Route path="/part/3/question-types" element={<Part3QuestionTypes />} />
          <Route path="/part/3/themes" element={<Part3Themes />} />
          <Route path="/part/3/classifications" element={<Part3Classifications />} />
          <Route path="/part/:partNumber" element={<TopicList />} />
          <Route path="/part/:partNumber/topic/:topicId" element={<TopicDetail />} />
          <Route path="/mock-exam" element={<MockExam />} />
          <Route path="/streak" element={<StreakPage />} />
        </Routes>
      </div>
    </Router>
  );
}