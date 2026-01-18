import { useParams, Link } from 'react-router-dom';

export default function TopicList() {
  const { partNumber } = useParams();
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Topics — Part {partNumber}</h1>
      <p className="text-gray-700 mb-4">List of topics for the selected part.</p>
      <ul>
        <li>
          <Link className="text-indigo-600 hover:underline" to={`/part/${partNumber}/topic/1`}>Topic 1</Link>
        </li>
      </ul>
    </div>
  );
}
