import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";
import { User } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { SellersService } from "../sellers/sellers.service";
import { AccountSellerDto } from "./dto/account.seller.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private sellersService: SellersService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): any {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error deleting user",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createUser(user: CreateUserDto): Promise<any> {
    user.email = user.email.toLowerCase();

    const existingUser: User | null = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) {
      return {
        status: HttpStatus.CONFLICT,
        error: "Un utilisateur avec cet email existe déjà",
      };
    }

    try {
      const hashedPassword: string = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      await this.usersRepository.save({ ...user, roles: "user" });

      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Erreur lors de la création de l'utilisateur",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<any> {
    try {
      if (updatedUser.password) {
        const hashedPassword: string = await bcrypt.hash(
          updatedUser.password,
          10
        );
        updatedUser.password = hashedPassword;
      }
      await this.usersRepository.update(id, updatedUser);

      return "Utilisateur mis à jour avec succès";
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      };
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    email = email.toLowerCase();
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async requestPasswordReset(email: string): Promise<any> {
    const resetPasswordToken = uuidv4();
    email = email.toLowerCase();
    const user = await this.usersRepository.findOneBy({ email: email });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: "Utilisateur non trouvé",
      };
    }
    await this.usersRepository.update(user.id, {
      resetPasswordToken: resetPasswordToken,
    });
    return {
      message:
        "Un email de réinitialisation de mot de passe a été envoyé à l'adresse email associée à votre compte",
      token: resetPasswordToken,
      email: user.email,
    };
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<any> {
    const isTokenValid: boolean = await this.isResetTokenValid(resetToken);
    if (!isTokenValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: "Token invalide",
      };
    }

    const user = await this.usersRepository.findOneBy({
      resetPasswordToken: resetToken,
    });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: "Utilisateur non trouvé",
      };
    }

    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
    });

    return {
      message: "Mot de passe réinitialisé avec succès",
      email: user?.email,
    };
  }

  async isResetTokenValid(token: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      resetPasswordToken: token,
    });
    if (!user) {
      return false;
    }

    return true;
  }

  async seed() {
    const userPassword = await bcrypt.hash("password", 10);

    await this.usersRepository.delete({});

    await this.usersRepository.insert({
      email: "administrator@domain.com",
      firstName: "Administrator",
      lastName: "Administrator",
      password: userPassword,
      roles: "admin",
    });

    await this.usersRepository.insert({
      email: "user@domain.com",
      firstName: "John",
      lastName: "Doe",
      password: userPassword,
      roles: "user",
    });

    await this.usersRepository.insert({
      email: "seller@domain.com",
      firstName: "Seller",
      lastName: "Seller",
      password: userPassword,
      roles: "seller",
    });
  }

  async createSellerAccount(user: AccountSellerDto): Promise<any> {
    user.email = user.email.toLowerCase();
    try {
      const existingUser = await this.usersRepository.findOneBy({
        email: user.email,
      });

      if (existingUser) {
        return {
          status: HttpStatus.CONFLICT,
          error: "Un utilisateur avec cet email existe déjà",
        };
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const dataUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        roles: "seller",
      };
      const newUser = await this.usersRepository.save(dataUser);

      const dataSeller = {
        name: user.name,
        isActive: false,
        description: user.description,
        userId: newUser.id,
      };

      const seller = await this.sellersService.createSellerAccount(dataSeller);

      if (seller.error) {
        await this.usersRepository.delete(newUser.id);
        return seller;
      }

      const updateUser = { ...newUser, sellerId: seller.id };
      await this.usersRepository.update(newUser.id, updateUser);

      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Erreur lors de la création de l'utilisateur",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserBySellerId(sellerId: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ sellerId });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: "Utilisateur non trouvé",
      };
    }
    return user;
  }

  async getAdminEmail(): Promise<any> {
    const user = await this.usersRepository.findOneBy({ roles: "admin" });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: "Utilisateur non trouvé",
      };
    }
    return user.email;
  }
}
