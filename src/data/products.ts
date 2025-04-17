
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 199.99,
    description: "Stay connected with our Smart Watch Pro. Track fitness, receive notifications, and more with this stylish wearable.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    description: "Add style to your workspace with this sleek minimalist desk lamp. Features adjustable brightness and color temperature.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    featured: false
  },
  {
    id: 4,
    name: "Leather Weekender Bag",
    price: 159.99,
    description: "Perfect for short trips, this genuine leather weekender bag offers style and functionality with multiple compartments.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fashion",
    featured: true
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Super soft organic cotton t-shirt. Sustainably made and perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fashion",
    featured: false
  },
  {
    id: 6,
    name: "Ceramic Pour-Over Coffee Set",
    price: 69.99,
    description: "Elevate your coffee experience with this elegant ceramic pour-over set. Includes dripper and carafe.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    featured: true
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    description: "Sleek wireless charging pad compatible with all Qi-enabled devices. Fast charging technology.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false
  },
  {
    id: 8,
    name: "Handcrafted Wooden Cutting Board",
    price: 79.99,
    description: "Beautiful hardwood cutting board, perfect for serving charcuterie or prepping ingredients.",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    featured: false
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
}
