
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">
                Cart ({items.length} {items.length === 1 ? "item" : "items"})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 bg-white p-6">
              {items.map((item) => (
                <CartItem 
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="ghost" onClick={clearCart} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Clear Cart
              </Button>
              <Button variant="ghost" asChild className="text-gray-600">
                <Link to="/products" className="flex items-center">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white sticky top-20">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">
                    {total >= 50 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      "$5.00"
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${(total * 0.08).toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-bold text-lg">
                    ${(
                      total + 
                      (total >= 50 ? 0 : 5) + 
                      (total * 0.08)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>We accept all major credit cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
