
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // If someone tries to access this page directly without placing an order
  useEffect(() => {
    if (items.length > 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const today = new Date();
  const estimatedDelivery = new Date(today.setDate(today.getDate() + 5));

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 text-center">
        <div className="mb-8">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
          <p className="text-lg text-gray-600">
            We've received your order and will begin processing it right away.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-left">
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Shipping Method</p>
              <p className="font-medium">Standard Shipping</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-1">
              A confirmation email has been sent to your email address.
            </p>
            <p className="text-sm text-gray-500">
              You can check the status of your order by clicking on the link in the email.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
