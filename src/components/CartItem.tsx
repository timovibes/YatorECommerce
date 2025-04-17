
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{name}</h3>
          <p className="ml-4">${price.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0 rounded-none" 
              onClick={() => updateQuantity(id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="px-3 py-1">{quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0 rounded-none" 
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-red-500" 
            onClick={() => removeItem(id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
