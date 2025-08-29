class PurchasesController {
  renderPurchaseList = async (req, res) => {
    res.render("admin/purchase/orders-items");
  };

  renderPurchaseDetails = (req, res) => {
    res.render("sales/purchase/orders-details");
  };

  renderCreatePurchase = (req, res) => {
    res.render("shared/create-orders");
  };

  renderUpdatePurchase = (req, res) => {
    res.render("admin/products/create-product");
  };
}

export default PurchasesController;
