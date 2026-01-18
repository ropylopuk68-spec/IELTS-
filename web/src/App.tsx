import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './router';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
