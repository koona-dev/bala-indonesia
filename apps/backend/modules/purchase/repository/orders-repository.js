import { AppDataSource } from "../../../core/database/config/db-config.js";
import RajaOngkirService from "../../../services/raja-ongkir-service.js";

class OrdersRepository {
  #rajaOngkirService = new RajaOngkirService();
  #addressRepository = AppDataSource.getRepository("Address");
  #shippingRepository = AppDataSource.getRepository("Shipping");
  #ordersRepository = AppDataSource.getRepository("Order");

  getOrders = async (req, res) => {
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

  selectShipping = async (req, res) => {
    try {
      const origin = await this.#addressRepository.findOne({
        where: { user: { id: userId } }, // FK relasi
        relations: ["user"], // supaya join User
      });
      const destination = await this.#addressRepository.findOne({
        where: { user: { id: userId } }, // FK relasi
        relations: ["user"], // supaya join User
      });

      await this.#rajaOngkirService.calculateCost();

      const shippingRecord = {
        originId: origin.districtId,
        destinationId: destination.districtId,
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
      const deletedOrders = await this.#ordersRepository.delete(req.params.id);

      res.status(200).json(deletedOrders);
    } catch (error) {
      res.status(404).json({ message: "Orders not found" });
    }
  };
}

export default OrdersRepository;
