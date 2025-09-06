import { AppDataSource } from "../../../core/database/config/db-config.js";
import { encryptPassword } from "@bala/shared-api/helpers/encrypt.js";

class UsersController {
  #usersRepository = AppDataSource.getRepository("User");
  #cartRepository = AppDataSource.getRepository("Cart");

  getUsers = async (req, res) => {
    const users = await this.#usersRepository.find({
      where: req.query,
    });

    res.status(200).json(users);
  };

  findOneUser = async (req, res) => {
    const user = await this.#usersRepository.findOne({
      where: { id: req.params.userId, ...req.query },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(product);
  };

  createUser = async (req, res) => {
    const hashedPassword = encryptPassword(req.body.password);

    try {
      const userCreated = this.#usersRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      const savedUsers = await this.#usersRepository.save(userCreated);

      const cartCreated = this.#cartRepository.create({
        user: { id: savedUsers.id },
      });
      await this.#cartRepository.save(cartCreated);

      res.status(200).json(savedUsers);
    } catch (error) {
      res.status(500).json({ message: `Error create user ${error}` });
    }
  };

  updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;

    try {
      const updatedUser = await this.#usersRepository.update(userId, userData);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: `Error update user ${error}` });
    }
  };

  deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await this.#usersRepository.delete(userId);

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(404).json({ message: `Error delete user ${error}` });
    }
  };
}

export default UsersController;
