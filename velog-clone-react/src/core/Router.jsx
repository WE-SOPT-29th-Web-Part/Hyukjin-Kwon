import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import WritePage from 'pages/WritePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/series" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
