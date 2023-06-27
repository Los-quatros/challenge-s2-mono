import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { LoginRequest } from "./authentication.request";
import { AuthenticationService } from "./authentication.service";
import { EventPattern } from "@nestjs/microservices";

@Controller("authentication")
export class AuthenticationController {
  public constructor(private readonly authenticationService: AuthenticationService) { }

  @EventPattern("login")
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    return this.authenticationService.login(loginRequest);
  }

  @EventPattern("validate-user")
  public validateUser(@Body(ValidationPipe) jwtToken: string) {
    return this.authenticationService.validateUser(jwtToken);
  }
  
}
