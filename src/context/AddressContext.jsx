import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

function normalizeAddresses(list) {
  return list.map((addr) => ({
    id: addr.id || Date.now() + Math.random(),
    label: addr.label,
    details: addr.details,
  }));
}

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved ? normalizeAddresses(JSON.parse(saved)) : [];
  });

  const [selectedAddress, setSelectedAddress] = useState(() => {
    const saved = localStorage.getItem("selectedAddress");
    return saved
      ? { ...JSON.parse(saved), id: JSON.parse(saved).id || Date.now() }
      : null;
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(selectedAddress)
      );
    }
  }, [selectedAddress]);

  function addAddress(newAddress) {
    const addressWithId = {
      ...newAddress,
      id: newAddress.id || Date.now(),
    };

    setAddresses((prev) => {
      const exists = prev.some(
        (a) =>
          a.label === addressWithId.label &&
          a.details === addressWithId.details
      );
      if (exists) return prev;
      return [...prev, addressWithId];
    });

    setSelectedAddress(addressWithId);
  }

  function selectAddress(address) {
    setSelectedAddress(address);
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        addAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
