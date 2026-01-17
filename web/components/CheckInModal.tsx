export function CheckInModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Check In</h3>
        <p className="mb-4">Record your daily check-in here.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-1 bg-indigo-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
