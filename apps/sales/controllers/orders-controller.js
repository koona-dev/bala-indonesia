class OrdersController {
  renderCartItems = async (req, res) => {
    res.render("admin/purchase/orders-items");
  };

  renderOrders = async (req, res) => {
    res.render("admin/purchase/orders-items");
  };

  renderOrderDetails = (req, res) => {
    res.render("sales/purchase/orders-details");
  };

  renderCreateOrder = (req, res) => {
    res.render("shared/create-orders");
  };

  renderUpdateOrders = (req, res) => {
    res.render("admin/products/create-product");
  };
}

export default OrdersController;
