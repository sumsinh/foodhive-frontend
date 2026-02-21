import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { placeOrder } from "../api/orders";

function PaymentSuccess() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { address } = useAddress();

  useEffect(() => {
    async function finalizeOrder() {
      const payload = {
        items: cart.map((i) => ({
          food_id: i.food_id || i.id,
          quantity: i.qty,
        })),
        total_price: cart.reduce((s, i) => s + i.price * i.qty, 0),
        payment_method: "ONLINE",
        address,
      };

      const order = await placeOrder(payload);
      clearCart();
      navigate(`/orders/${order.id}`);
    }

    finalizeOrder();
  }, []);

  return <div>Processing payment...</div>;
}

export default PaymentSuccess;
