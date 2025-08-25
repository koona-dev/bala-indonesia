import axios from "axios";

class ShippingService {
  searchDestination = async (searchLocation) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rajaongkir.komerce.id/api/v1/destination/domestic-destination?search=${searchLocation}&limit=999&offset=999`,
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      };

      const response = await axios.request(config);
      return JSON.parse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  calculateCost = async (originId, destinationId, weight, courierCode) => {
    try {
      let data = JSON.stringify({
        origin: originId,
        destination: destinationId,
        weight: weight,
        courier: courierCode,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost",
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await axios.request(config);
      return JSON.parse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export default ShippingService;
