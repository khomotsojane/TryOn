import React from "react";
import { useParams } from "react-router-dom";
import Hero3D from "../components/Hero3D";
import type { ProductType } from "../types";

interface TryOnProps {
  products: ProductType[];
}

const TryOn: React.FC<TryOnProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === parseInt(productId || "", 10));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl mb-6">{product.name}</h1>
      <div className="w-full h-[600px] md:h-[800px]">
        <Hero3D modelPath={product.modelPath} />
      </div>
    </div>
  );
};

export default TryOn;