import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Classic", price: "$120", image: "/style1.png" },
  { id: 2, name: "Interview clothes", price: "$150", image: "/style2.png" },
  { id: 3, name: "Less than $400", price: "$80", image: "/style3.png" },
  { id: 4, name: "Business style", price: "$200", image: "/style4.png" },
];

const ForYou: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {
    if (!question) return;

    // Temporary AI response
    setAnswer(
      "Try a smart casual outfit: fitted blazer, neutral trousers, and minimalist sneakers. This look balances professionalism and comfort."
    );
  };

  return (
    <section className="px-10 py-20 bg-white">
      {/* AI Stylist Header */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          AI Personal Stylist
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Ask for outfit ideas tailored to your needs
        </p>

        {/* AI Input */}
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
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Ask
          </button>
        </div>

        {/* AI Answer */}
        {answer && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg max-w-xl">
            <p className="text-sm">{answer}</p>
          </div>
        )}
      </div>

      {/* Outfit Suggestions */}
      <p className="text-sm font-semibold mb-4">Example outfits</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-50 object-cover rounded mb-2"
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