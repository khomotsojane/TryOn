import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TryOn from "./pages/TryOn";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/tryon/:productId" element={<TryOn />} />

      </Routes>
    </Router>
  );
}

export default App;