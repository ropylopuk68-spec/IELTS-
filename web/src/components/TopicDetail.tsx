import { useParams } from 'react-router-dom';

export function TopicDetail() {
  const { topicId } = useParams();
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Topic Detail — {topicId}</h1>
      <p className="text-gray-700">Detailed view for topic {topicId}.</p>
    </div>
  );
}
