import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register(username, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white/70 backdrop-blur rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">注册</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input className="w-full px-3 py-2 border rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input type="password" className="w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">注册</button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          已有账号？<Link className="text-indigo-600" to="/login">登录</Link>
        </p>
      </div>
    </div>
  );
}
