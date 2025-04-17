
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProductById, Product, getProductsByCategory } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ProductCard";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(parseInt(id));
      setProduct(foundProduct || null);
      
      // Load related products if we found the current product
      if (foundProduct) {
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add the item to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      });
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products" className="flex items-center text-gray-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to products
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-purple-600 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Category</h2>
              <Link 
                to={`/products/${product.category}`} 
                className="inline-block bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm capitalize text-gray-800"
              >
                {product.category}
              </Link>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Quantity</h2>
              <div className="flex items-center">
                <Button 
                  type="button" 
                  variant="outline"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="h-10 w-10 rounded-r-none"
                >
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-14 border-y border-gray-200 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="h-10 w-10 rounded-l-none"
                >
                  +
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full mb-4 bg-purple-600 hover:bg-purple-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            
            <div className="text-sm text-gray-600">
              <p className="mb-1">• Free shipping on orders over $50</p>
              <p className="mb-1">• 30-day return policy</p>
              <p>• Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
