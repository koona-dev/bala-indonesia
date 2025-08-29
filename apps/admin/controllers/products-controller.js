class ProductsController {
  renderProductList = async (req, res) => {
    res.render("shared/products");
  };

  renderProductDetails = (req, res) => {
    res.render("shared/product-details");
  };

  renderCreateProduct = (req, res) => {
    res.render("admin/products/create-product");
  };

  renderUpdateProduct = (req, res) => {
    res.render("admin/products/create-product");
  };
}

export default ProductsController;
