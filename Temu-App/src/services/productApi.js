
const API_URL = "https://dummyjson.com/products";

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}?limit=100`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
