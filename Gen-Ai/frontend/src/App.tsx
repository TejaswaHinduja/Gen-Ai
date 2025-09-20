  import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FakeNewsDetectorDashboard from './dashboard'; 
import LoginPage from './LoginPage'; 
import LogoutPage from './LogoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/dashboard" element={<FakeNewsDetectorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
