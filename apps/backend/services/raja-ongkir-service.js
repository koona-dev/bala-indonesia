import axios from "axios";

class RajaOngkirService {
  getProvince = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://rajaongkir.komerce.id/api/v1/destination/province",
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getCity = async (provinceId) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rajaongkir.komerce.id/api/v1/destination/city/${provinceId}`,
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getDistrict = async (cityId) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rajaongkir.komerce.id/api/v1/destination/district/${cityId}`,
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getSubDistrict = async (districtId) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rajaongkir.komerce.id/api/v1/destination/sub-district/${districtId}`,
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  calculateCost = async (originId, destinationId, weight, courierCode) => {
    try {
      let formData = new URLSearchParams();
      formData.append("origin", originId);
      formData.append("destination", destinationId);
      formData.append("weight", weight);
      formData.append("courier", courierCode);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost",
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData.toString(),
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default RajaOngkirService;
