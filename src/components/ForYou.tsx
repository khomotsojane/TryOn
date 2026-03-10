import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ForYou: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [recommended, setRecommended] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const outfitsRef = useRef<HTMLDivElement>(null);

  // Fetch clothing products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const clothing = data.filter(
        (p: Product) =>
          p.category === "men's clothing" ||
          p.category === "women's clothing"
      );

      setProducts(clothing);
    };

    fetchProducts();
  }, []);

  const askAI = () => {
    if (!question) return;

    setThinking(true);
    setAnswer("");

    setTimeout(() => {
      const q = question.toLowerCase();

      if (q.includes("interview")) {
        setAnswer(
          "For a job interview, choose structured outfits like blazers or minimal formal wear."
        );

        setRecommended(products.slice(0, 2).map((p) => p.id));
      } else if (q.includes("business")) {
        setAnswer(
          "Business outfits look best with neutral tones and tailored clothing."
        );

        setRecommended(products.slice(1, 3).map((p) => p.id));
      } else {
        setAnswer(
          "Smart casual outfits balance comfort and style. A clean shirt with fitted pants works well."
        );

        setRecommended(products.slice(2, 4).map((p) => p.id));
      }

      setThinking(false);

      // Auto scroll
      outfitsRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }, 1200);
  };

  return (
    <section className="px-10 py-20 bg-white">

      {/* AI STYLIST */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          AI Personal Stylist
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Ask for outfit ideas tailored to your needs
        </p>

        <div className="flex mt-4 gap-2 max-w-xl">
          <input
            type="text"
            placeholder="Example: What should I wear to a job interview?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={askAI}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            Ask
          </button>
        </div>

        {/* AI thinking */}
        {thinking && (
          <p className="mt-4 text-gray-500 animate-pulse">
            AI is thinking...
          </p>
        )}

        {/* AI response */}
        {answer && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg max-w-xl">
            <p className="text-sm">{answer}</p>
          </div>
        )}
      </div>

      {/* OUTFITS */}
      <p className="text-sm font-semibold mb-4">
        Recommended outfits
      </p>

      <div
        ref={outfitsRef}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg cursor-pointer transition
            ${
              recommended.includes(product.id)
                ? "ring-4 ring-black scale-105"
                : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded mb-2"
            />

            <h3 className="text-sm font-semibold">
              {product.title}
            </h3>

            <p className="text-xs text-gray-700">
              ${product.price}
            </p>
          </div>
        ))}
      </div>

      {/* PRODUCT POPUP */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[450px] relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-72 object-contain rounded mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">
              {selectedProduct.title}
            </h2>

            <p className="text-gray-700 mb-6">
              ${selectedProduct.price}
            </p>

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

export default ForYou;