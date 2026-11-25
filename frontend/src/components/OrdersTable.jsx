import PropTypes from "prop-types";
import API from "../services/api";

function OrdersTable({ orders, refreshOrders }) {
  const handleStatusChange = async (
    orderId,
    status
  ) => {
    try {
      await API.put(
        `/orders/${orderId}/status`,
        {
          status
        }
      );

      refreshOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="table-container">
      <h2>All Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>

                <td>{order.phone}</td>

                <td>₹ {order.totalAmount}</td>

                <td>{order.status}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="RECEIVED">
                      RECEIVED
                    </option>

                    <option value="PROCESSING">
                      PROCESSING
                    </option>

                    <option value="READY">
                      READY
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      customerName: PropTypes.string,
      phone: PropTypes.string,
      status: PropTypes.string,
      totalAmount: PropTypes.number,
    })
  ).isRequired,
  refreshOrders: PropTypes.func.isRequired,
};

export default OrdersTable;