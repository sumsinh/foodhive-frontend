import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartBar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return null;

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl flex justify-between items-center z-50">
      <div>
        <p className="font-semibold text-sm">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </p>
        <p className="text-lg font-bold">₹ {totalPrice}</p>
      </div>

      <button
        onClick={() => navigate("/cart")}
        className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold hover:bg-green-50"
      >
        View Cart
      </button>
    </div>
  );
}

export default CartBar;
