class ProductsController {
  renderProducts = async (req, res) => {
    res.render("shared/products");
  };

  renderProductDetails = (req, res) => {
    res.render("shared/product-details");
  };
}

export default ProductsController;
