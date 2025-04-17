
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          ShopEase
        </Link>

        <nav className="hidden md:flex space-x-8 text-gray-700">
          <Link to="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-purple-600 transition-colors">
            All Products
          </Link>
          <Link to="/products/electronics" className="hover:text-purple-600 transition-colors">
            Electronics
          </Link>
          <Link to="/products/fashion" className="hover:text-purple-600 transition-colors">
            Fashion
          </Link>
          <Link to="/products/home" className="hover:text-purple-600 transition-colors">
            Home Goods
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-purple-100">
              <ShoppingCart className="h-5 w-5 text-purple-600" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
