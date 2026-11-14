
import {
  LayoutGrid,
  Sparkles,
  Shirt,
  Armchair,
  ShoppingBasket,
  Footprints,
} from "lucide-react";

function Categories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: "All", icon: LayoutGrid },
    { name: "Beauty", icon: Sparkles },
    { name: "Fashion", icon: Shirt },
    { name: "Furniture", icon: Armchair },
    { name: "Groceries", icon: ShoppingBasket },
    { name: "Shoes", icon: Footprints },
  ];

  return (
    <section className="categories-section" id="categories">
      <div className="categories-list">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className={`category-item ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <Icon size={17} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;
