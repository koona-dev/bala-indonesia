import { AppDataSource } from "../../../core/database/config/db-config.js";
import RajaOngkirService from "../../../services/raja-ongkir-service.js";
import UserRole from "../../users/consts/user-role.js";
import CartStatus from "../consts/cart-status.js";

class OrdersController {
  #rajaOngkirService = new RajaOngkirService();
  #usersRepository = AppDataSource.getRepository("User");
  #addressRepository = AppDataSource.getRepository("Address");
  #cartItemsRepository = AppDataSource.getRepository("CartItems");
  #paymentRepository = AppDataSource.getRepository("Shipping");
  #ordersRepository = AppDataSource.getRepository("Order");

  getOrders = async (req, res) => {
    const orders = await this.#ordersRepository.find({
      // select: {
      //   user: {
      //     id: true, // only return the FK id
      //   },
      //   carts: {
      //     id: true, // only return the FK id
      //   },
      //   shipping: {
      //     id: true, // only return the FK id
      //   },
      // },
      where: {
        ...req.query,
        id: req.query.orderId,
        user: { id: req.query.id },
        carts: { id: req.query.cartId },
        shipping: { id: req.query.shippingId },
      },
      relations: ["user", "carts", "shipping"],
    });
    res.status(200).json(orders);
  };

  findOneOrder = async (req, res) => {
    const order = await this.#ordersRepository.findOne({
      // select: {
      //   user: {
      //     id: true, // only return the FK id
      //   },
      //   carts: {
      //     id: true, // only return the FK id
      //   },
      //   shipping: {
      //     id: true, // only return the FK id
      //   },
      // },
      where: {
        ...req.query,
        id: req.params.orderId,
        user: { id: req.query.id },
        carts: { id: req.query.cartId },
        shipping: { id: req.query.shippingId },
      },
      relations: ["user", "carts", "shipping"],
    });

    if (!order) {
      res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(order);
  };

  calculateShippingCost = async (req, res) => {
    try {
      const admin = await this.#usersRepository.findOne({
        where: { role: UserRole.ADMIN },
      });
      const origin = await this.#addressRepository.findOne({
        where: { user: { id: admin.id } }, // FK relasi
        relations: ["user"], // supaya join User
      });
      const destination = await this.#addressRepository.findOne({
        where: { user: { id: req.body.userId } }, // FK relasi
        relations: ["user"], // supaya join User
      });

      const shippingRecord = await this.#rajaOngkirService.calculateCost(
        origin.districtId,
        destination.districtId,
        req.body.weight,
        req.body.courierCode
      );

      res.status(200).json(shippingRecord);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error calculate shipping cost ${error}` });
    }
  };

  createShipping = async (req, res) => {
    try {
      const shippingRecord = this.#paymentRepository.create({
        originId: req.body.originId,
        destinationId: req.body.destinationId,
        weight: req.body.weight,
        courierCode: req.body.courierCode,
        courierName: req.body.courierName,
        service: req.body.service,
        description: req.body.description,
        cost: req.body.cost,
        etd: req.body.etd,
      });
      const savedShipping = await this.#paymentRepository.save(shippingRecord);

      res.status(200).json(savedShipping);
    } catch (error) {
      res.status(500).json({ message: `Error saving shipping ${error}` });
    }
  };

  createPayment = async (req, res) => {
    try {
      const paymentData = {
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

      const paymentRecord = this.#paymentRepository.create(paymentData);
      const savedPayment = await this.#paymentRepository.save(paymentRecord);

      res.status(200).json(savedPayment);
    } catch (error) {
      res.status(500).json({ message: `Error saving payment ${error}` });
    }
  };

  createOrder = async (req, res) => {
    try {
      const cartItems = await this.#cartItemsRepository.find({
        where: { carts: { id: req.body.cartsId } },
        relations: ["carts"],
        select: {
          carts: {
            id: true,
          },
        },
      });

      const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price;
      }, 0);

      const newOrder = this.#ordersRepository.create({
        totalPrice: totalPrice,
        user: { id: req.body.userId },
        carts: { id: req.body.cartId },
        shipping: { id: req.body.shippingId },
        // payment: { id: req.body.paymentId },
      });

      const savedOrders = await this.#ordersRepository.save(newOrder);
      
      const updatedCarts = await this.#cartItemsRepository.update(
        { carts: { id: req.body.cartId } },
        { status: CartStatus.CHECKEDOUT }
      );

      console.log(updatedCarts);

      res.status(200).json(savedOrders);
    } catch (error) {
      res.status(500).json({ message: `Error saving orders ${error}` });
    }
  };

  updateOrder = async (req, res) => {
    try {
      const updatedOrders = await this.#ordersRepository.update(
        req.params.orderId,
        req.body.data
      );
      res.status(200).json(updatedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };

  deleteOrder = async (req, res) => {
    try {
      const deletedOrders = await this.#ordersRepository.delete(
        req.params.orderId
      );
      res.status(200).json(deletedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };
}

export default OrdersController;
