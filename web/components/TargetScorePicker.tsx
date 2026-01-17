export function TargetScorePicker({ onConfirm, onCancel }: { onConfirm: (score: number) => void; onCancel: () => void }) {
  const handleConfirm = () => onConfirm(7.0);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Pick Target Score</h3>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-3 py-1">Cancel</button>
          <button onClick={handleConfirm} className="px-3 py-1 bg-indigo-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}
