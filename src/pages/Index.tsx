
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, getProductsByCategory } from "../data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("electronics");
  const categoryProducts = getProductsByCategory(selectedCategory);

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "home", name: "Home Goods" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl mb-12">
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Premium Products for <span className="text-purple-600">Every Lifestyle</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover our curated collection of high-quality products designed to enhance your everyday experience.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" asChild className="text-purple-600 border-purple-600 hover:bg-purple-50">
                <Link to="/products">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Shopping Experience" 
              className="rounded-lg shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
            <Link to="/products" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id 
                ? "bg-purple-600 hover:bg-purple-700" 
                : "text-gray-700 hover:text-purple-600 hover:border-purple-600"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
            <Link to={`/products/${selectedCategory}`}>View All {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
