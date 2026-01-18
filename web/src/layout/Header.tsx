import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-gray-800">IELTS Speaking</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-gray-700 hover:text-indigo-600" to="/part/2">Part 2</Link>
          <Link className="text-gray-700 hover:text-indigo-600" to="/part/3">Part 3</Link>
          <Link className="text-gray-700 hover:text-indigo-600" to="/mock-exam">Mock Exam</Link>
          <Link className="text-gray-700 hover:text-indigo-600" to="/streak">Streak</Link>
          <span className="mx-2 text-gray-300">|</span>
          {user ? (
            <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-900">退出 ({user.username})</button>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">登录</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
