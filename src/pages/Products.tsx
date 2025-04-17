
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { products, Product, getProductsByCategory } from "../data/products";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Determine which products to show based on category
  useEffect(() => {
    let productsToShow = category ? getProductsByCategory(category) : products;
    
    // Apply search filter
    if (searchTerm) {
      productsToShow = productsToShow.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price filter
    productsToShow = productsToShow.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(productsToShow);
  }, [category, searchTerm, priceRange]);

  // Get category title for display
  const getCategoryTitle = () => {
    if (!category) return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter panel - Mobile toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{getCategoryTitle()}</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filter panel */}
        <div className={`md:w-1/4 bg-white p-4 rounded-lg border border-gray-200 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <h2 className="text-xl font-semibold mb-4 hidden md:block">Filters</h2>
          
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              />
              <span>to</span>
              <Input
                type="number"
                min="0"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {["All", "Electronics", "Fashion", "Home"].map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    type="radio"
                    id={cat}
                    name="category"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    checked={
                      cat === "All" 
                        ? !category 
                        : category === cat.toLowerCase()
                    }
                    onChange={() => {
                      window.location.href = cat === "All" 
                        ? "/products" 
                        : `/products/${cat.toLowerCase()}`;
                    }}
                  />
                  <label htmlFor={cat} className="ml-2 text-gray-700">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 1000]);
            }}
            variant="outline" 
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
        
        {/* Product grid */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6 hidden md:block">{getCategoryTitle()}</h1>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
