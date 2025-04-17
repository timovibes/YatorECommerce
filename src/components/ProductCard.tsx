
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-lg font-bold text-purple-600 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="ghost" 
            className="flex items-center text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
