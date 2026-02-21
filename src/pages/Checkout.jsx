import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";

function Checkout() {
  const navigate = useNavigate();
  const { addresses, addAddress, selectAddress } = useAddress();

  const [form, setForm] = useState({
    label: "Home",
    house: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 fill form only when user clicks button
  function fillFromSavedAddress(addr) {
    const parts = addr.details.split(",");

    setForm({
      label: addr.label || "Home",
      house: parts[0]?.trim() || "",
      area: parts[1]?.trim() || "",
      city: parts[2]?.split("-")[0]?.trim() || "",
      pincode: parts[2]?.split("-")[1]?.trim() || "",
      landmark: parts[3]?.trim() || "",
    });

    // ✅ select the address
    selectAddress(addr);
  }

  function continueHandler() {
    const { house, area, city, pincode } = form;

    if (!house || !area || !city || !pincode) {
      alert("Please fill delivery address");
      return;
    }

    const details = `${house}, ${area}, ${city} - ${pincode}${
      form.landmark ? ", " + form.landmark : ""
    }`;

    const newAddress = {
      id: Date.now(), // ✅ stable id
      label: form.label,
      details,
    };

    // ✅ save + select
    addAddress(newAddress);
    selectAddress(newAddress);

    navigate("/confirm-address");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl">
        <h1 className="text-xl font-bold mb-6">Delivery Address</h1>

        {/* ✅ Saved addresses */}
        {addresses.length > 0 && (
          <div className="mb-6 space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border rounded-xl p-4 bg-gray-50"
              >
                <p className="font-semibold">{addr.label}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {addr.details}
                </p>

                <button
                  onClick={() => fillFromSavedAddress(addr)}
                  className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-semibold"
                >
                  Use this address
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Address form */}
        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="house"
          placeholder="House *"
          value={form.house}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="area"
          placeholder="Area *"
          value={form.area}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="pincode"
          placeholder="Pincode *"
          value={form.pincode}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-6"
        />

        <button
          onClick={continueHandler}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
