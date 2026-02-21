import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate("/orders");
      return;
    }

    const timer = setTimeout(() => {
      navigate(`/orders/${orderId}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600">
        Order Confirmed 🎉
      </h1>
      <p className="mt-2 text-gray-600">
        Redirecting to live tracking…
      </p>
    </div>
  );
}

export default OrderConfirmed;
