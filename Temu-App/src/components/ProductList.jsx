
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";

function ProductList({ search, selectedCategory, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const category = product.category.toLowerCase();

    let matchesCategory = false;

    if (selectedCategory === "All") {
      matchesCategory = true;
    } else if (selectedCategory === "Beauty") {
      matchesCategory = category === "beauty";
    } else if (selectedCategory === "Fashion") {
      matchesCategory =
        category.includes("shirt") ||
        category.includes("dress") ||
        category.includes("shoe");
    } else if (selectedCategory === "Furniture") {
      matchesCategory = category === "furniture";
    } else if (selectedCategory === "Groceries") {
      matchesCategory = category === "groceries";
    } else if (selectedCategory === "Shoes") {
      matchesCategory = category.includes("shoe");
    }

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div>
      <h2>Our Products</h2>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProduct(product);
              }
            }}
          >
            <img src={product.thumbnail} alt={product.title} />

            <div className="hover-details">
              <p>{product.description}</p>
              <span>Click to see full details</span>
            </div>

            <h3>{product.title}</h3>

            <p>${product.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {selectedProduct && (
        <div
          className="details-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="details-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-details"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
            />

            <h2>{selectedProduct.title}</h2>

            <p>{selectedProduct.description}</p>

            <h3>${selectedProduct.price}</h3>

            <p>⭐ Rating: {selectedProduct.rating} / 5</p>

            <button onClick={() => addToCart(selectedProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
