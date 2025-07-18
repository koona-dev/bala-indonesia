import { AppDataSource } from "../../common/database/config/db-config.js";

class ProductsController {
  #productsRepository = AppDataSource.getRepository("Product");

  renderCreateProduct = (req, res) => {
    res.render("admin/products/create-product");
  };

  renderAdminProducts = async (req, res) => {
    res.render("shared/products", {
      products: await this.#productsRepository.find(),
    });
  };
  
  renderSalesProducts = async (req, res) => {
    res.render("sales/index", {
      products: await this.#productsRepository.find(),
    });
  };

  renderProductDetails = (req, res) => {
    res.render("shared/product-details");
  };

  getProducts = async (req, res) => {
    const products = await this.#productsRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(products);
  };

  findOneProduct = async (req, res) => {
    const product = await this.#productsRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  };

  createProduct = async (req, res) => {
    try {
      const productcreated = this.#productsRepository.create(req.body);
      const savedProducts = await this.#productsRepository.save(productcreated);

      res.status(200).json(savedProducts);
    } catch (error) {
      res.status(500).json({ message: `Error saving product ${error}` });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const updatedProduct = await this.#productsRepository.update(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await this.#productsRepository.delete(
        req.params.id
      );

      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  };
}

export default ProductsController;
