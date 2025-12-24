import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";
import Templates from "./pages/Templates";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/templates/:id" element={<Templates />} />
        <Route path="/portfolio/:slug" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
