import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import type { ProductType } from "./types";

const products: ProductType[] = [
  {
    id: 1,
    name: "Classic Hoodie",
    price: "$120",
    image: "/products/hoodie.png",
    modelPath: "/models/shirt.glb",
  },
  {
    id: 2,
    name: "Leather Jacket",
    price: "$150",
    image: "/products/jacket.png",
    modelPath: "/models/jacket.glb",
  },
  {
    id: 3,
    name: "Casual T-Shirt",
    price: "$80",
    image: "/products/tshirt.png",
    modelPath: "/models/tshirt.glb",
  },
  {
    id: 4,
    name: "Urban Sneakers",
    price: "$200",
    image: "/products/sneakers.png",
    modelPath: "/models/sneakers.glb",
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          }
        />
        <Route path="/tryon/:productId" element={<TryOn products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;