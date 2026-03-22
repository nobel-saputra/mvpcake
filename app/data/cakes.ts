import { Cake } from "@/app/types";

export const cakes: Cake[] = [
  {
    id: "red-velvet",
    name: "Red Velvet Cake",
    description: "Kue lembut berwarna merah dengan cream cheese frosting yang creamy dan lezat.",
    price: 185000,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&h=400&fit=crop",
  },
  {
    id: "chocolate-truffle",
    name: "Chocolate Truffle Cake",
    description: "Kue coklat premium berlapis ganache coklat hitam yang meleleh di mulut.",
    price: 210000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
  },
  {
    id: "strawberry-shortcake",
    name: "Strawberry Shortcake",
    description: "Sponge cake ringan dengan whipped cream segar dan potongan strawberry asli.",
    price: 175000,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
  },
  {
    id: "tiramisu",
    name: "Tiramisu Cake",
    description: "Kue klasik Italia dengan lapisan mascarpone, kopi, dan taburan cocoa.",
    price: 195000,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
  },
  {
    id: "cheese-cake",
    name: "New York Cheesecake",
    description: "Cheesecake klasik ala New York yang padat, creamy, dan kaya rasa keju.",
    price: 200000,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
  },
  {
    id: "matcha-roll",
    name: "Matcha Roll Cake",
    description: "Roll cake hijau matcha Jepang dengan filling cream yang lembut dan harum.",
    price: 155000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
  },
];

export function getCakeById(id: string): Cake | undefined {
  return cakes.find((cake) => cake.id === id);
}
