import { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/restaurants";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const FILTERS = ["All", "Pizza", "Burger", "Veg"];

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const navigate = useNavigate();
  const { query } = useSearch();

  useEffect(() => {
    fetchRestaurants()
      .then(setRestaurants)
      .catch(() => setError("Could not load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
    const q = query.toLowerCase();

    const matchesSearch =
      r.name?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q) ||
      r.city?.toLowerCase().includes(q);

    const matchesFilter =
      activeFilter === "All" ||
      r.category?.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* FILTERS */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeFilter === f
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-gray-500 text-sm">Loading restaurants…</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* RESTAURANTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRestaurants.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={r.image_url || "https://via.placeholder.com/400x200"}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* RATING */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-green-700">
                  ⭐ {r.rating ?? 4.0}
                </div>
              </div>

              {/* INFO */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {r.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {r.city} • {r.area}
                </p>

                {r.category && (
                  <p className="mt-3 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {r.category}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && !loading && (
          <p className="text-gray-500 mt-16 text-center">
            No restaurants found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
