import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const Featured: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        
        const clothing = data.filter(
          (item: Product) =>
            item.category === "men's clothing" ||
            item.category === "women's clothing"
        );

        setProducts(clothing);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-10">Featured Clothing</h2>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain mb-4 rounded"
            />

            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>

      
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
              alt={selectedProduct.title}
              className="w-full h-72 object-contain rounded mb-4"
            />

            <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>

            <p className="text-gray-700 mb-3">
              ${selectedProduct.price}
            </p>

            <p className="text-sm text-gray-500 mb-6">
              {selectedProduct.description}
            </p>

           <button
  onClick={() =>
    navigate(`/tryon/${selectedProduct.id}`, {
      state: { clothingImage: selectedProduct.image }
    })
  }
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