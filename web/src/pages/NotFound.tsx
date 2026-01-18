import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 — 页面未找到</h1>
        <p className="text-gray-600 mb-6">抱歉，我们找不到你请求的页面。</p>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md">返回首页</Link>
      </div>
    </div>
  );
}
