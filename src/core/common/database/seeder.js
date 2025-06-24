import AppDataSource from "../../common/database/config/db-config.js";
import UserRole from "../../modules/users/consts/user-role.js";
import { encryptPassword } from "../helpers/encrypt.js";

const seeder = async () => {
  try {
    const usersRepository = AppDataSource.getRepository("User");
    const adminRole = await usersRepository.findOne({ name: "admin" });

    if (adminRole) {
      return;
    }

    const hashedPassword = encryptPassword("adminBala123#");

    const user = {
      name: "admin",
      email: "admin@bala.com",
      password: hashedPassword,
      phone: "+6285179669575",
      role: UserRole.ADMIN,
      address: "Bali, Indonesia",
    };

    const usercreated = usersRepository.create(user);

    const savedUsers = await usersRepository.save(usercreated);

    console.log("Post has been saved: ", savedUsers);
    console.log("Now lets load all posts: ");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seeder;
