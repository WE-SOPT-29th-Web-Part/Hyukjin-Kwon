import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import WritePage from 'pages/WritePage';
import ArticlePage from 'pages/ArticlePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/series" />
        </Route>
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<WritePage mode="edit" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
