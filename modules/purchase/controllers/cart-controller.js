import { AppDataSource } from "../../../common/database/config/db-config.js";

class CartController {
  #cartRepository = AppDataSource.getRepository("Cart");

  renderCartItems = (req, res) => {
    res.render("sales/purchase/cart");
  };

  getCarts = async (req, res) => {
    const carts = await this.#cartRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(carts);
  };

  addCart = async (req, res) => {
    const data = req.body;
    const carts = {
      userId: req.user.id,
      productId: data.productId,
      quantity: data.quantity,
      price: data.quantity * data.price,
    };

    try {
      const productAddToCart = this.#cartRepository.create(carts);
      const savedCart = await this.#cartRepository.save(productAddToCart);

      res.status(200).json(savedCart);
    } catch (error) {
      res.status(500).json({ message: `Error saving cart ${error}` });
    }
  };

  updateCart = async (req, res) => {
    try {
      if (req.body.quantity === 0) {
        await this.#cartRepository.delete(req.body.productId);
      }

      const updatedCart = await this.#cartRepository.update(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(404).json({ message: "Cart not found" });
    }
  };
}

export default CartController;
