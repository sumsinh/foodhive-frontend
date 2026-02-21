import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee = cart.length > 0 ? 29 : 0;
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + taxes;

  return (
    <div className="min-h-screen bg-gray-50 pt-4">

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: ITEMS */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      ₹ {item.price} × {item.qty}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-semibold">
                      ₹ {item.price * item.qty}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: BILL */}
            <div className="bg-white rounded-2xl p-6 h-fit">
              <h3 className="font-semibold mb-4">Bill Details</h3>

              <div className="flex justify-between text-sm mb-2">
                <span>Item Total</span>
                <span>₹ {itemTotal}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Delivery Fee</span>
                <span>₹ {deliveryFee}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>Taxes & Charges</span>
                <span>₹ {taxes}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
                <span>To Pay</span>
                <span>₹ {grandTotal}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-3 border border-red-500 text-red-500 py-2 rounded-xl font-semibold hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
