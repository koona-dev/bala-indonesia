import { AppDataSource } from "../../../core/database/config/db-config.js";

class CartController {
  #cartRepository = AppDataSource.getRepository("Cart");
  #cartItemsRepository = AppDataSource.getRepository("CartItems");

  getCarts = async (req, res) => {
    const carts = await this.#cartRepository.find({
      where: {
        id: req.query.cartId,
        createdAt: req.query.createdAt,
        user: { id: req.query.userId }, // works here
      },
      relations: ["user"],
      select: {
        user: {
          id: true, // only return the FK id
        },
      },
    });

    const cartsMapped = await Promise.all(
      carts.map(async (cart) => {
        const cartItems = await this.#cartItemsRepository.find({
          where: {
            id: req.query.cartItemId,
            quantity: req.query.quantity,
            price: req.query.price,
            status: req.query.status,
            createdAt: req.query.createdAt,
            product: { id: req.query.productId },
            carts: { id: cart.id },
          },
          relations: ["carts", "product"],
          select: {
            carts: {
              id: true, // only return the FK id
            },
            product: {
              id: true, // only return the FK id
            },
          },
        });

        return {
          ...cart,
          items: cartItems,
        };
      })
    );

    res.status(200).json(cartsMapped);
  };

  findOneCart = async (req, res) => {
    const cart = await this.#cartRepository.findOne({
      where: {
        id: req.params.cartId,
        createdAt: req.query.createdAt,
        user: { id: req.query.userId }, // works here
      },
      relations: ["user"],
      select: {
        user: {
          id: true, // only return the FK id
        },
      },
    });
    const cartItems = await this.#cartItemsRepository.find({
      where: {
        id: req.query.cartItemId,
        quantity: req.query.quantity,
        price: req.query.price,
        status: req.query.status,
        createdAt: req.query.createdAt,
        product: { id: req.query.productId },
        carts: { id: cart.id },
      },
      relations: ["carts", "product"],
      select: {
        carts: {
          id: true, // only return the FK id
        },
        product: {
          id: true, // only return the FK id
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ ...cart, items: cartItems });
  };

  createCart = async (req, res) => {
    try {
      const cartRecord = this.#cartRepository.create({
        user: { id: "e3a234f5-915a-4c66-94a8-bdb3a0f46964" },
      });
      const savedCartItems = await this.#cartRepository.save(cartRecord);

      res.status(200).json(savedCartItems);
    } catch (error) {
      res.status(500).json({ message: `Error saving cart ${error}` });
    }
  };

  addCartItems = async (req, res) => {
    const data = req.body;

    try {
      const cartRecord = await this.#cartRepository.findOne({
        relations: ["user"],
        select: {
          user: {
            id: true, // only return the FK id
          },
        },
        where: {
          user: { id: "e3a234f5-915a-4c66-94a8-bdb3a0f46964" },
        },
      });

      if (!cartRecord) {
        cartRecord = this.#cartRepository.create({
          user: { id: "e3a234f5-915a-4c66-94a8-bdb3a0f46964" },
        });
        cartRecord = await this.#cartRepository.save(cartRecord);
      }

      const cartItemsRecord = data.map((item) => {
        return this.#cartItemsRepository.create({
          quantity: item.quantity,
          price: item.quantity * item.price,
          carts: { id: cartRecord.id },
          product: { id: item.productId },
        });
      });
      const savedCartItems = await this.#cartItemsRepository.save(
        cartItemsRecord
      );

      res.status(200).json(savedCartItems);
    } catch (error) {
      res.status(500).json({ message: `Error saving cart ${error}` });
    }
  };

  updateCart = async (req, res) => {
    try {
      if (req.body.quantity === 0) {
        await this.#cartItemsRepository.delete(req.body.productId);
      }

      const cartItems = req.body.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.quantity * item.price,
          status: item.status,
        };
      });

      const updatedCart = await this.#cartItemsRepository.updateAll(cartItems);

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(404).json({ message: "Cart not found" });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const deletedCarts = await this.#cartRepository.delete(req.params.cartId);
      await this.#cartItemsRepository.delete(req.params.cartId);

      res.status(200).json(deletedCarts);
    } catch (error) {
      res.status(404).json({ message: "Cart not found" });
    }
  };
}

export default CartController;
