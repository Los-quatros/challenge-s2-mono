import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { SellersModule } from '../sellers/sellers.module';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { UsersModule } from './users.module';


describe('UsersService (functional)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let createdUser : User


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SellersModule,
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'users-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'users-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
 
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // await usersRepository.clear(); 
  });

  describe('CreateUser', () => {
    it('should create a user', async () => {

      const userDto = { email: 'test@user.fr', password: 'veryStrongPassword15', firstName: 'john', lastName: 'doe' };
      const hashed = await bcrypt.hash(userDto.password, 10);
      const updatedUserDto = {
        ...userDto,
        password: hashed
      };
      
      createdUser = await usersService.createUser(updatedUserDto);

      expect(updatedUserDto).toBeDefined();
    });

  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await usersService.findAll();

      expect(users).toBeDefined();
     
    });
  });

  describe('findOne', () => {
    it('should return the created user', async () => {
      const user = await usersService.findOne(createdUser['id']);

      expect(user).toBeDefined();
     
    });
  });

 
});
