export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Deshpande",
    location: "Ghodbunder Road, Thane",
    quote:
      "The Belgian chocolate cake vanished in minutes at my daughter's birthday. Easily the best I've had in Thane — it tasted homemade in the most luxurious way.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Rohan Kulkarni",
    location: "Naupada, Thane",
    quote:
      "Ordered brownies on a whim through WhatsApp and the whole thing was effortless. Fudgy, rich, and beautifully packed. NS BAKES is now our office default.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sneha Iyer",
    location: "Majiwada, Thane",
    quote:
      "The pistachio & rose cake is a work of art. You can taste the quality of the ingredients in every single bite, and the presentation was flawless.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Aditya Joshi",
    location: "Vartak Nagar, Thane",
    quote:
      "I'm picky about cupcakes and these are the real deal — light sponge, not too sweet, and that buttercream swirl is unreal. Delivery across Thane was right on time.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Meera Nair",
    location: "Kolshet Road, Thane",
    quote:
      "From the first message to the last crumb, the experience felt premium. The macaron box made the perfect gift and looked stunning. Will absolutely reorder.",
    rating: 5,
  },
];
