import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { SellersService } from 'src/sellers/sellers.service';
import { AccountSellerDto } from './dto/account.seller.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private sellersService: SellersService,

  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): any {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    try {
      await this.usersRepository.delete(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error deleting user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async createUser(user: CreateUserDto): Promise<any> {

    const existingUser = await this.usersRepository.findOneBy({ email: user.email });
    if (existingUser) {
      return {
        status: HttpStatus.CONFLICT,
        error: 'Un utilisateur avec cet email existe déjà',
      }
    }
    
   try {

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    
    await this.usersRepository.save({...user, roles: "user"});

    return user;

   } catch (error) {

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erreur lors de la création de l\'utilisateur',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<any> {
    try {
      await this.usersRepository.update(id, updatedUser);

      return "Utilisateur mis à jour avec succès";

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error updating user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async requestPasswordReset(userId: string): Promise<any> {

    const resetPasswordToken = uuidv4();
    await this.usersRepository.update(userId, { resetPasswordToken });

    const user = await this.usersRepository.findOneBy({ id: userId });

    if(!user){
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'Utilisateur non trouvé',
      }
    }
    const resetLink = `https://localhost:3000/reset-password?token=${resetPasswordToken}`;
    const emailContent = `Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`;
    // this.mailService.sendEmail(user.email, 'Réinitialisation de mot de passe', emailContent);
    return "Un email de réinitialisation de mot de passe a été envoyé à l'adresse email associée à votre compte";
  }

  async resetPassword(userId: string, resetToken: string, newPassword: string): Promise<any> {
    // Vérifier si le token de réinitialisation de mot de passe est valide pour l'utilisateur
    const isTokenValid = await this.isResetTokenValid(userId, resetToken);

    if (!isTokenValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Token invalide',
      }
    }

    await this.usersRepository.update(userId, {
      password: await bcrypt.hash(newPassword, 10),
      resetPasswordToken: null,
    });

    return "Mot de passe réinitialisé avec succès";

  }

  async isResetTokenValid(id: string, token: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user || user.resetPasswordToken !== token) {
      return false;
    }
    
    return true;
  }

  async seed() {
    const userPassword = await bcrypt.hash('password', 10);

    await this.usersRepository.delete({});

    await this.usersRepository.insert({
      email: "administrator@domain.com",
      firstName: "Administrator",
      lastName: "Administrator",
      password: userPassword,
      roles: "admin"
  });

    await this.usersRepository.insert({
      email: "user@domain.com",
      firstName: "John",
      lastName: "Doe",
      password: userPassword,
      roles: "user"
  });

    await this.usersRepository.insert({
      email: "seller@domain.com",
      firstName: "Seller",
      lastName: "Seller",
      password: userPassword,
      roles: "seller"
  });
  
}

async createSellerAccount(user: AccountSellerDto): Promise<any> {
  try {
    const existingUser = await this.usersRepository.findOneBy({ email: user.email });

    if (existingUser) {
      return {
        status: HttpStatus.CONFLICT,
        error: 'Un utilisateur avec cet email existe déjà',
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const dataUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      roles: "seller"
    }
    const newUser = await this.usersRepository.save(dataUser);

    const dataSeller = {
      name: user.name,
      isActive : false,
      description: user.description,
      userId: newUser.id
    }
    const seller = await this.sellersService.createSellerAccount(dataSeller);
    const updateUser = { ...newUser, sellerId: seller.id };
    await this.usersRepository.update(newUser.id, updateUser);

    return user;
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erreur lors de la création de l\'utilisateur',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}
