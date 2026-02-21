import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_BASE = "http://127.0.0.1:8000/api";

function Menu() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE}/menu/foods/?restaurant=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load menu");
        return res.json();
      })
      .then(setItems)
      .catch((err) => {
        console.error(err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Menu</h1>

        {loading && <p className="text-gray-500">Loading menu…</p>}

        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 flex justify-between gap-6 border hover:shadow-md transition"
            >
              {/* LEFT */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      item.is_veg ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {item.is_veg ? "Veg" : "Non-Veg"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="mt-1 text-gray-700 font-medium">
                  ₹ {item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 px-5 py-2 border border-green-600 text-green-600 rounded-lg font-semibold text-sm hover:bg-green-50"
                >
                  ADD
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                <img
                  src={item.image_url || "https://via.placeholder.com/140"}
                  alt={item.name}
                  className="h-28 w-28 object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <p className="text-gray-500 mt-16 text-center">
            No items found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Menu;
