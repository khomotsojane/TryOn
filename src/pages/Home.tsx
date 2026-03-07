import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero3D";
import Featured from "../components/Featured";
import ForYou from "../components/ForYou";
import Footer from "../components/Footer";

import type { ProductType } from "../types";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  return (
    <>
      <Navbar />

      <Hero selectedProduct={selectedProduct} />

      <Featured setSelectedProduct={setSelectedProduct} />

      <ForYou setSelectedProduct={setSelectedProduct} />

      <Footer />
    </>
  );
};

export default Home;