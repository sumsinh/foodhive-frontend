import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/orders";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  function statusStyle(status) {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }
    if (status === "On the way") {
      return "bg-orange-100 text-orange-700";
    }
    if (status === "Preparing") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-gray-100 text-gray-700";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">You have no orders yet.</p>
        )}

        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div
              key={o.id}
              onClick={() => navigate(`/orders/${o.id}`)}
              className="bg-white rounded-2xl p-5 flex justify-between items-center border hover:shadow-md transition cursor-pointer"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold text-gray-900">
                  Order #{o.id}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyle(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-lg font-semibold">
                  ₹ {o.total_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
