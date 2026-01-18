import { Link } from 'react-router-dom';

export default function Part3Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Part 3 — Discussion Topics</h1>
      <p className="mb-6 text-gray-700">Overview of Part 3 topics and navigation links.</p>
      <ul className="space-y-2">
        <li>
          <Link className="text-indigo-600 hover:underline" to="/part/3/question-types">Question Types</Link>
        </li>
        <li>
          <Link className="text-indigo-600 hover:underline" to="/part/3/themes">Themes</Link>
        </li>
        <li>
          <Link className="text-indigo-600 hover:underline" to="/part/3/classifications">Classifications</Link>
        </li>
      </ul>
    </div>
  );
}
