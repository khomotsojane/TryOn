export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Formal wear",
    price: "$120",
    image: "/abg.png",
  },
  {
    id: 2,
    name: "Blazer",
    price: "$150",
    image: "/abc.png",
  },
  {
    id: 3,
    name: "Women formal",
    price: "$230",
    image: "/bgc.png",
  },
  {
    id: 4,
    name: "Modest",
    price: "$200",
    image: "/bgb.png",
  },
];