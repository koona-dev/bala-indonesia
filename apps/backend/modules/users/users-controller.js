import { AppDataSource } from "../../core/database/config/db-config.js";
import { encryptPassword } from "@bala/shared-api/helpers/encrypt.js";
import RajaOngkirService from "../../services/raja-ongkir-service.js";

class UsersController {
  #rajaOngkirService = new RajaOngkirService();
  #usersRepository = AppDataSource.getRepository("User");
  #addressRepository = AppDataSource.getRepository("Address");

  getUsers = async (req, res) => {
    const users = await this.#usersRepository.find({
      where: { ...req.params, ...req.query },
    });

    return users;
  };

  findOneUser = async (req, res) => {
    const user = await this.#usersRepository.findOne({
      where: { ...req.params, ...req.query },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return user;
  };

  getProvince = async (req, res) => {
    try {
      const province = await this.#rajaOngkirService.getProvince();

      res.status(200).json(province);
    } catch (error) {
      res.status(500).json({ message: `Error get province ${error}` });
    }
  };

  getCity = async (req, res) => {
    try {
      const city = await this.#rajaOngkirService.getCity(req.body.provinceId);

      res.status(200).json(city);
    } catch (error) {
      res.status(500).json({ message: `Error get city ${error}` });
    }
  };

  getDistrict = async (req, res) => {
    try {
      const district = await this.#rajaOngkirService.getDistrict(
        req.body.cityId
      );

      res.status(200).json(district);
    } catch (error) {
      res.status(500).json({ message: `Error get district ${error}` });
    }
  };

  getSubDistrict = async (req, res) => {
    try {
      const district = await this.#rajaOngkirService.getSubDistrict(
        req.body.districtId
      );

      res.status(200).json(district);
    } catch (error) {
      res.status(500).json({ message: `Error get sub district ${error}` });
    }
  };

  createUser = async (req, res) => {
    const hashedPassword = encryptPassword(req.body.password);

    try {
      const userCreated = this.#usersRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      const savedUsers = await this.#usersRepository.save(userCreated);

      const addressCreated = this.#addressRepository.create({
        ...req.body,
        user: savedUsers[0],
      });
      const savedAddress = await this.#addressRepository.save(addressCreated);

      res.status(200).json({ user: savedUsers[0], address: savedAddress[0] });
    } catch (error) {
      res.status(500).json({ message: `Error create user ${error}` });
    }
  };

  updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await this.#usersRepository.update(userId, userData);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: `Error update user ${error}` });
    }
  };

  deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
      const deletedUser = await this.#usersRepository.delete(userId);

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(404).json({ message: `Error delete user ${error}` });
    }
  };
}

export default UsersController;
