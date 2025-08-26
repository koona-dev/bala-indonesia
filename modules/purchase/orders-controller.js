import { AppDataSource } from "../../common/database/config/db-config.js";

class OrdersController {
  #ordersRepository = AppDataSource.getRepository("Orders");

  renderCreateOrders = (req, res) => {
    res.render("shared/create-orders");
  };

  renderCartItems = (req, res) => {
    res.render("sales/purchase/cart");
  };

  renderOrders = async (req, res) => {
    res.render("admin/purchase/orders-items", {
      orders: await this.#ordersRepository.find(),
    });
  };

  renderOrdersDetails = (req, res) => {
    res.render("sales/purchase/orders-details");
  };

  getOrderss = async (req, res) => {
    const orders = await this.#ordersRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(orders);
  };

  findOneOrders = async (req, res) => {
    const orders = await this.#ordersRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  };

  createOrders = async (req, res) => {
    try {
      const productcreated = this.#ordersRepository.create(req.body);
      const savedOrders = await this.#ordersRepository.save(productcreated);

      res.status(200).json(savedOrders);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  updateOrders = async (req, res) => {
    try {
      const updatedOrders = await this.#ordersRepository.update(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };

  deleteOrders = async (req, res) => {
    try {
      const deletedOrders = await this.#ordersRepository.delete(
        req.params.id
      );

      res.status(200).json(deletedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };
}

export default OrdersController;
