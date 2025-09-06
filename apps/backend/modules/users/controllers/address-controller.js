import { AppDataSource } from "../../../core/database/config/db-config.js";
import RajaOngkirService from "../../../services/raja-ongkir-service.js";

class AddressController {
  #rajaOngkirService = new RajaOngkirService();
  #addressRepository = AppDataSource.getRepository("Address");

  getAddress = async (req, res) => {
    const addresss = await this.#addressRepository.find({
      where: req.query,
      relations: ["user"],
      select: {
        user: {
          id: true, // only return the FK id
        },
      },
    });

    res.status(200).json(addresss);
  };

  findOneAddress = async (req, res) => {
    const address = await this.#addressRepository.findOne({
      where: { id: req.params.addressId, ...req.query },
      relations: ["user"],
      select: {
        user: {
          id: true, // only return the FK id
        },
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(product);
  };

  getProvince = async (req, res) => {
    const province = await this.#rajaOngkirService.getProvince();
    res.status(200).json(province);
  };

  getCity = async (req, res) => {
    const city = await this.#rajaOngkirService.getCity(req.params.provinceId);
    res.status(200).json(city);
  };

  getDistrict = async (req, res) => {
    const district = await this.#rajaOngkirService.getDistrict(
      req.params.cityId
    );
    res.status(200).json(district);
  };

  getSubDistrict = async (req, res) => {
    const district = await this.#rajaOngkirService.getSubDistrict(
      req.params.districtId
    );
    res.status(200).json(district);
  };

  createAddress = async (req, res) => {
    try {
      const addressCreated = this.#addressRepository.create({
        ...req.body,
        user: { id: req.body.userId },
      });
      const savedAddress = await this.#addressRepository.save(addressCreated);

      res.status(200).json(savedAddress);
    } catch (error) {
      res.status(500).json({ message: `Error create address ${error}` });
    }
  };

  updateAddress = async (req, res) => {
    const addressId = req.params.addressId;
    const addressData = req.body;

    try {
      const updatedAddress = await this.#addressRepository.update(
        addressId,
        addressData
      );

      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(404).json({ message: `Error update address ${error}` });
    }
  };

  deleteAddress = async (req, res) => {
    const addressId = req.params.addressId;

    try {
      const deletedAddress = await this.#addressRepository.delete(addressId);

      res.status(200).json(deletedAddress);
    } catch (error) {
      res.status(404).json({ message: `Error delete address ${error}` });
    }
  };
}

export default AddressController;
