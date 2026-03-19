import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import MenHero from "./pages/MenPage";
import WomenHero from "./pages/WomenPage";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/tryon/:productId" element={<TryOn />} />
         <Route path="/" element={<div>Home</div>} />
        <Route path="/men" element={<MenHero />} />
        <Route path="/women" element={<WomenHero />} />
        <Route path="/new" element={<div>New Arrivals</div>} />
        <Route path="/sale" element={<div>Sale Items</div>} />
        <Route path="/search" element={<div>Search</div>} />
        <Route path="/cart" element={<div>Cart</div>} />
        <Route path="/profile" element={<div>Profile</div>} />

      </Routes>
    </Router>
  );
}

export default App;