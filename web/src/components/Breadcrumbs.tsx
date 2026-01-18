import { Link, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';
import { part2PeopleTopics } from '../data/part2PeopleData';
import { part2PlaceTopics } from '../data/part2PlaceData';
import { part2EventTopics } from '../data/part2EventData';

const categoryLabels: Record<string, string> = {
  people: '人物类',
  place: '地点类',
  event: '事件/事物',
};

function findPart2TopicTitle(id: string | undefined): string | null {
  if (!id) return null;
  const lists = [part2PeopleTopics, part2PlaceTopics, part2EventTopics];
  for (const arr of lists) {
    const match = arr.find((t) => t.id === id);
    if (match) return match.title;
  }
  return null;
}

export default function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const pathname = location.pathname;

  // Split and ignore empty
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null; // no breadcrumbs on root index (optional)

  // Build accumulative paths
  const crumbs = parts.map((part, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/');
    return { part, to, idx };
  });

  // Map part to readable label
  const items = crumbs.map(({ part, to, idx }) => {
    // handle 'part' + number
    if (part === 'part') return { to, label: 'Part' };
    // part number => show Part N
    if (idx > 0 && parts[idx - 1] === 'part' && /^[0-9]+$/.test(part)) {
      return { to, label: `Part ${part}` };
    }
    if (part === 'topic') return { to, label: 'Topic' };
    // category mapping
    if (['people', 'place', 'event'].includes(part)) {
      return { to, label: categoryLabels[part] || part };
    }
    // try to resolve topic id (last segment possibly topicId)
    // if previous segment is 'topic', this part is topicId
    if (idx > 0 && parts[idx - 1] === 'topic') {
      const title = findPart2TopicTitle(part);
      return { to, label: title ? title : `Topic ${part}` };
    }
    // default: prettify hyphen-case
    return { to, label: part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) };
  });

  // Render clickable breadcrumb trail; last item is plain text
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-3">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link to="/" className="text-gray-600 hover:underline">首页</Link>
        </li>
        {items.map((it, i) => (
          <li key={it.to} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {i === items.length - 1 ? (
              <span className="font-medium text-gray-800">{it.label}</span>
            ) : (
              <Link to={it.to} className="text-gray-600 hover:underline">{it.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
