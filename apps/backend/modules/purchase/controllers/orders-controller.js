import { AppDataSource } from "../../../core/database/config/db-config.js";
import RajaOngkirService from "../../../services/raja-ongkir-service.js";
import CartStatus from "../consts/cart-status.js";
import ShippingStatus from "../consts/shipping-status.js";

class OrdersController {
  #addressRepository = AppDataSource.getRepository("Address");
  #rajaOngkirService = new RajaOngkirService();
  #shippingRepository = AppDataSource.getRepository("Shipping");
  #ordersRepository = AppDataSource.getRepository("Order");

  getOrders = async (req, res) => {
    const orders = await this.#ordersRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(orders);
  };

  findOneOrder = async (req, res) => {
    const orders = await this.#ordersRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  };

  selectShipping = async (req, res) => {
    try {
      const shippingRecord = await this.#rajaOngkirService.calculateCost({
        originId: req.body.originId,
        destinationId: req.body.destinationId,
        weight: req.body.weight,
        courierCode: req.body.courierCode,
      });
      res.status(200).json(shippingRecord);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  createShipping = async (req, res) => {
    try {
      // const origin = await this.#addressRepository.findOne({
      //   where: {id: req.body.originId },
      // });
      // const destination = await this.#addressRepository.findOne({
      //   where: { user: { id: req.user.id } }, // FK relasi
      //   relations: ["user"], // supaya join User
      // });

      const shippingRecord = {
        originId: req.body.originId,
        destinationId: req.body.destinationId,
        weight: req.body.weight,
        courierCode: req.body.courierCode,
        courierName: req.body.courierName,
        service: req.body.service,
        description: req.body.description,
        cost: req.body.cost,
        etd: req.body.etd,
      };

      const savedShipping = await this.#shippingRepository.save(shippingRecord);

      res.status(200).json(savedShipping);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  createPayment = async (req, res) => {
    try {
      // const origin = await this.#addressRepository.findOne({
      //   where: {id: req.body.originId },
      // });
      // const destination = await this.#addressRepository.findOne({
      //   where: { user: { id: req.user.id } }, // FK relasi
      //   relations: ["user"], // supaya join User
      // });

      const shippingRecord = {
        originId: req.body.originId,
        destinationId: req.body.destinationId,
        weight: req.body.weight,
        courierCode: req.body.courierCode,
        courierName: req.body.courierName,
        service: req.body.service,
        description: req.body.description,
        cost: req.body.cost,
        etd: req.body.etd,
      };

      const savedShipping = await this.#shippingRepository.save(shippingRecord);

      res.status(200).json(savedShipping);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  createOrder = async (req, res) => {
    try {
      const cart = await cartRepo.findOneBy({
        user: { id: req.user.id },
        status: CartStatus.ACTIVE,
      });
      const shipping = await shippingRepo.findOneBy({
        user: { id: req.user.id },
        status: ShippingStatus.PENDING,
      });

      const newOrder = orderRepo.create({
        totalPrice: req.body.totalPrice,
        user: { id: req.user.id },
        cart,
        shipping,
      });
      const savedOrders = await this.#ordersRepository.save(newOrder);

      res.status(200).json(savedOrders);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  updateAddress = async (req, res) => {
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

  updateOrder = async (req, res) => {
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

  deleteOrder = async (req, res) => {
    try {
      const deletedOrders = await this.#ordersRepository.delete(req.params.id);

      res.status(200).json(deletedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };
}

export default OrdersController;
