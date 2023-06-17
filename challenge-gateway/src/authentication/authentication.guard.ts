import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "../users/users.service";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError } from "jsonwebtoken";


@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private readonly usersService: UsersService,
    private reflector: Reflector
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorizationHeader = request.get("Authorization");

    if (!authorizationHeader) {
      throw new BadRequestException("Authorization header is missing");
    }

    const [authorizationType, token] = authorizationHeader.split(" ");

    if (authorizationType !== "Bearer") {
      throw new BadRequestException("Authorization type should be Bearer");
    }

    if (!token) {
      throw new BadRequestException("Token is missing");
    }

    try {
      const role = this.reflector.get<string | undefined>("role", context.getHandler());
      const user = await (await this.usersService.validateUser(token)).toPromise();

      if (!user) {
        throw new BadRequestException("Invalid user");
      }

      if (role && user.roles !== role && user.roles !== "admin") {

        throw new BadRequestException("Invalid role");
      }

      return true;

    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException("Invalid token");
      }

      throw error;
    }
  }
}
