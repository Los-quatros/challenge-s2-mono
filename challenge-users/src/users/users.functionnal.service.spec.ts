import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { SellersModule } from '../sellers/sellers.module';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { UsersModule } from './users.module';
import { ImagesModule } from '../images/images.module';


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
        ImagesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host:  process.env.DB_HOST,
          port: 5432,
          username:  process.env.DB_USER,
          password: process.env.DB_PASSWORD,
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
 
});
