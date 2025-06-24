import AppDataSource from "../../common/database/config/db-config.js";
import { encryptPassword } from "../../common/helpers/encrypt.js";

class UsersController {
  #usersRepository = AppDataSource.getRepository("User");

  async getUsers(req, res) {
    const users = await this.#usersRepository.find();
    res.status(200).json(users);
  }

  async getUserByEmail(req, res) {
    const email = req.params.email;
    const user = await this.#usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  async createUser(req, res) {
    const hashedPassword = encryptPassword(req.body.password);

    try {
      const usercreated = usersRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      const savedUsers = await this.#usersRepository.save(usercreated);

      res.status(200).json(savedUsers);
    } catch (error) {
      res.status(500).json({ message: "Error saving user" });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await this.#usersRepository.update(userId, userData);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const deletedUser = this.#usersRepository.delete(userId);

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }
}

export default UsersController;
