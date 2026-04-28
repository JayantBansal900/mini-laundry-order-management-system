import { useState } from "react";
import API from "../services/api";

function CreateOrderForm({ refreshDashboard }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    garmentType: "Shirt",
    quantity: 1
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/orders", {
        customerName: formData.customerName,
        phone: formData.phone,
        garments: [
          {
            type: formData.garmentType,
            quantity: Number(formData.quantity)
          }
        ]
      });

      alert("Order Created Successfully");

      setFormData({
        customerName: "",
        phone: "",
        garmentType: "Shirt",
        quantity: 1
      });

      refreshDashboard();
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to create order. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Create New Order</h2>
          <p>Register a new laundry request in the system</p>
        </div>

        <div className="form-group">
          <label className="label">Customer Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="e.g. Rahul Sharma"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="e.g. 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Garment Type</label>
          <select
            name="garmentType"
            value={formData.garmentType}
            onChange={handleChange}
          >
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Saree">Saree</option>
            <option value="Jacket">Jacket</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Order..." : "Confirm & Create Order"}
        </button>
      </form>
    </div>
  );
}

export default CreateOrderForm;