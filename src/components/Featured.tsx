import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products, type Product } from "../data/products";

const Featured: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-10">Featured Clothing</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />

            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[450px] relative">

            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-72 object-cover rounded mb-4"
            />

            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-6">{selectedProduct.price}</p>

            <button
              onClick={() => navigate(`/tryon/${selectedProduct.id}`)}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Try On
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Featured;