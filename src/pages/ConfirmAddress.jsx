import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orders";
import { makePayment } from "../api/payments"; // ✅ FIX

function ConfirmAddress() {
  const navigate = useNavigate();
  const { selectedAddress } = useAddress();
  const { cart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = cart.length > 0 ? 29 : 0;
  const taxes = Math.round(itemTotal * 0.05);
  const totalPayable = itemTotal + deliveryFee + taxes;

  // ================= COD FLOW =================
  async function placeOrderCOD() {
    const payload = {
      items: cart.map((i) => ({
        food_id: i.food_id || i.id,
        quantity: i.qty,
      })),
      total_price: totalPayable,
      address: selectedAddress,
      payment_method: "COD",
    };

    const order = await placeOrder(payload);
    const orderId = order.id || order.order_id;

    clearCart();

    navigate("/order-confirmed", {
      state: { orderId },
    });
  }

  // ================= UPI / CARD FLOW =================
  async function startOnlinePayment() {
  const payload = {
    items: cart.map((i) => ({
      food_id: i.food_id || i.id,
      quantity: i.qty,
    })),
    total_price: totalPayable,
    address: selectedAddress,
    payment_method: paymentMethod.toUpperCase(),
  };

  const order = await placeOrder(payload);
  const orderId = order.id || order.order_id;

  const data = await makePayment(orderId, paymentMethod);

  if (!data?.payment_session_id) {
    throw new Error("Cashfree session not created");
  }

  window.Cashfree.checkout({
    paymentSessionId: data.payment_session_id,
    redirectTarget: "_self",
  });
}


  // ================= MAIN HANDLER =================
  async function confirmAndPay() {
    if (!selectedAddress?.details) {
      alert("Please select a delivery address");
      navigate("/checkout");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      if (paymentMethod === "cod") {
        await placeOrderCOD();
      } else {
        await startOnlinePayment(); // ✅ FIX
      }
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl">
        <h1 className="text-xl font-bold mb-4">Confirm Order</h1>

        <div className="border p-4 rounded mb-4">
          <p className="font-semibold">{selectedAddress?.label}</p>
          <p className="text-sm text-gray-600">
            {selectedAddress?.details}
          </p>
        </div>

        <p className="font-semibold mb-2">Payment Method</p>

        <label className="block mb-2">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />{" "}
          Cash on Delivery
        </label>

        <label className="block mb-2">
          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />{" "}
          UPI
        </label>

        <label className="block mb-4">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />{" "}
          Card
        </label>

        <div className="border-t pt-4 mb-4">
          <p>Total Payable: ₹{totalPayable}</p>
        </div>

        <button
          disabled={loading}
          onClick={confirmAndPay}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmAddress;
