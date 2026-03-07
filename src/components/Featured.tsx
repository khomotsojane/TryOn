import React from "react";
import type { ProductType } from "../types";
import { useNavigate } from "react-router-dom";

interface FeaturedProps {
  products: ProductType[];
  setSelectedProduct: (product: ProductType) => void;
}

const Featured: React.FC<FeaturedProps> = ({ products, setSelectedProduct }) => {
  const navigate = useNavigate();

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-10">Featured Clothing</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onMouseEnter={() => setSelectedProduct(product)} // update Hero 3D
            onClick={() => navigate(`/tryon/${product.id}`)} // navigate to try-on
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;