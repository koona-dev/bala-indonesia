import { AppDataSource } from "../../common/database/config/db-config.js";
import { encryptPassword } from "../../common/helpers/encrypt.js";

class UsersController {
  #usersRepository = AppDataSource.getRepository("User");

  getUsers = async (req, res) => {
    const users = await this.#usersRepository.find({
      where: { ...req.params, ...req.query },
    });
    res.status(200).json(users);
  };

  findOneUser = async (req, res) => {
    const user = await this.#usersRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  };

  createUser = async (req, res) => {
    const hashedPassword = encryptPassword(req.body.password);

    try {
      const usercreated = this.#usersRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      const savedUsers = await this.#usersRepository.save(usercreated);

      res.status(200).json(savedUsers);
    } catch (error) {
      res.status(500).json({ message: `Error saving user ${error}` });
    }
  };

  updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await this.#usersRepository.update(userId, userData);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  };

  deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
      const deletedUser = await this.#usersRepository.delete(userId);

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  };
}

export default UsersController;
