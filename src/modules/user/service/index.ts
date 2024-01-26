import { In } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { User } from "../entity";
import sgMail from "@sendgrid/mail";
import { WELCOME_ADMIN_NP, WELCOME_ADMIN_SL } from "./template-email";

export class UserService {
  static findUserByID = async (id: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { id } });
  };

  static findAllUsers = async (): Promise<User[]> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.find({
      relations: {
        region: { parent: { parent: { parent: { parent: true } } } },
      },
    });
  };

  static findAllAdmins = async (): Promise<User[]> => {
    const userRepository = dataSource.getRepository(User);

    return await userRepository.find({
      relations: {
        region: { parent: { parent: { parent: { parent: true } } } },
      },
    });
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = dataSource.getRepository(User);

    return userRepository.findOne({
      where: { email },
      relations: { region: { parent: { parent: { parent: true } } } },
    });
  };

  static updateAdmin = async (
    user_id: User["id"],
    newUser: Partial<User>
  ): Promise<void> => {
    const userRepository = dataSource.getRepository(User);

    const { name, email, role, region_id } = newUser;

    await userRepository.update(user_id as string, {
      name,
      email,
      role,
      region_id: role === "admin" ? null : region_id,
    });
  };

  static signUpAdmin = async (newUser: Partial<User>): Promise<User> => {
    const userRepository = dataSource.getRepository(User);

    await this.sendAdminWelcome(newUser);

    return await userRepository.save(
      userRepository.create({
        ...newUser,
        region_id: newUser.role === "admin" ? undefined : newUser.region_id,
      })
    );
  };

  static removeAdmin = async (id: User["id"]): Promise<void> => {
    const userRepository = dataSource.getRepository(User);
    await userRepository.delete({ id });
    return;
  };

  private static sendAdminWelcome = async (user: User) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

      const msg = {
        to: user.email,
        from: "noreply@quanti.ca",
        subject: `${process.env.APP_NAME} - ${
          process.env.COUNTRY === "np" ? "एक-पटकको पासकोड" : "one-time passcode"
        }`,
        text: (process.env.COUNTRY === "np"
          ? WELCOME_ADMIN_NP
          : WELCOME_ADMIN_SL
        )
          .replace("#{userName}", user?.name || "")
          .replace("#{appName}", process.env.APP_NAME || "Coach Digital")
          .replace("#{appName}", process.env.APP_NAME || "Coach Digital")
          .replace("#{email}", user?.email || "")
          .replace(
            "#{url}",
            `https://coachdigital.org/${process.env.COUNTRY}/admin/`
          ),
      };

      await sgMail.send(msg);
    } catch (err) {
      console.log(err);
    }
  };
}
