import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginRequest } from "./authentication.request";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SellersService } from "src/sellers/sellers.service";

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sellersService: SellersService
  ) {}

  public async login(loginRequest: LoginRequest) {
    const user = await this.usersService.getUserByEmail(loginRequest.email);

    if (!user) {
      return {
        error: "Email ou mot de passe incorrect",
        status: 400,
      };
    }

    const isValidPassword = await compare(loginRequest.password, user.password);

    if (!isValidPassword) {
      return {
        error: "Email ou mot de passe incorrect",
        status: 400,
      };
    }

    if (user.roles === "seller") {
      const isSellerAvailable =
        await this.sellersService.checkIfSellerIsAvailable(user.id);
      if (!isSellerAvailable) {
        return {
          error: "Votre compte vendeur n'est pas encore activé",
          status: 403,
        };
      }
    }

    const payload = {
      id: user.id,
      role: user.roles,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  public async validateUser(jwtToken: string) {
    const { id } = this.jwtService.verify(jwtToken);

    const user = await this.usersService.getUserById(id);

    if (!user) {
      return {
        error: "Invalid user",
        status: 400,
      };
    }

    return user;
  }
}
