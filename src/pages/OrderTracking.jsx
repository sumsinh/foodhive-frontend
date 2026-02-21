import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../api/orders";

const steps = ["Placed", "Preparing", "On the way", "Delivered"];

function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🛑 HARD STOP if id is missing
    if (!id || id === "undefined") {
      navigate("/orders");
      return;
    }

    let intervalId;

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error("ORDER FETCH ERROR:", err);

        // ❌ stop polling if backend says not found
        if (err.response?.status === 404) {
          setError("Order not found");
          clearInterval(intervalId);
        } else {
          setError("Failed to load order tracking");
        }
      }
    };

    fetchOrder();
    intervalId = setInterval(fetchOrder, 3000);

    return () => clearInterval(intervalId);
  }, [id, navigate]);

  // ❌ error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  // ⏳ loading state
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading tracking…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold">
          Order #{order.id}
        </h1>

        {/* STATUS TIMELINE */}
        <div className="bg-white rounded-xl p-6">
          {steps.map((step, i) => {
            const active = steps.indexOf(order.status) >= i;
            return (
              <div key={step} className="flex items-center mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    active ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="ml-4 text-sm">{step}</span>
              </div>
            );
          })}
        </div>

        {/* MAP */}
        <div className="h-[350px] rounded-xl overflow-hidden border">
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://maps.google.com/maps?q=28.6139,77.209&z=14&output=embed"
          />
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
