import React from "react";
import type { ProductType } from "../types";
import { useNavigate } from "react-router-dom";

interface ForYouProps {
  products: ProductType[];
  setSelectedProduct: (product: ProductType) => void;
}

const ForYou: React.FC<ForYouProps> = ({ products, setSelectedProduct }) => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">For You</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onMouseEnter={() => setSelectedProduct(product)}
            onClick={() => navigate(`/tryon/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold">{product.name}</h3>
            <p className="text-xs text-gray-700">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForYou;