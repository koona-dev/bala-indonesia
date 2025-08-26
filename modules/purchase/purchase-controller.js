import { AppDataSource } from "../../common/database/config/db-config.js";

class PurchaseController {
  #purchaseRepository = AppDataSource.getRepository("Purchase");

  renderCreatePurchase = (req, res) => {
    res.render("shared/create-purchase");
  };

  renderCartItems = (req, res) => {
    res.render("sales/purchase/cart");
  };

  renderPurchase = async (req, res) => {
    res.render("admin/purchase/purchase-items", {
      purchase: await this.#purchaseRepository.find(),
    });
  };

  renderPurchaseDetails = (req, res) => {
    res.render("sales/purchase/purchase-details");
  };

  getPurchases = async (req, res) => {
    const purchase = await this.#purchaseRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(purchase);
  };

  findOnePurchase = async (req, res) => {
    const purchase = await this.#purchaseRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(purchase);
  };

  createPurchase = async (req, res) => {
    try {
      const productcreated = this.#purchaseRepository.create(req.body);
      const savedPurchase = await this.#purchaseRepository.save(productcreated);

      res.status(200).json(savedPurchase);
    } catch (error) {
      res.status(500).json({ message: `Error saving purchase ${error}` });
    }
  };

  updatePurchase = async (req, res) => {
    try {
      const updatedPurchase = await this.#purchaseRepository.update(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedPurchase);
    } catch (error) {
      res.status(404).json({ message: "Purchase not found" });
    }
  };

  deletePurchase = async (req, res) => {
    try {
      const deletedPurchase = await this.#purchaseRepository.delete(
        req.params.id
      );

      res.status(200).json(deletedPurchase);
    } catch (error) {
      res.status(404).json({ message: "Purchase not found" });
    }
  };
}

export default PurchaseController;
