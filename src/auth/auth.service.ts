import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { UserResponse } from './interfaces/user.interface';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}


  async create(createUserDto: CreateUserDto): Promise<UserResponse>{

    try {

      const { password, ...userData} = createUserDto;      

      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync( password, 10 ),
        ...userData
      });
      
      await this.userRepository.save(newUser)

      const { password:_, ...user } = newUser;

      return user;

    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`);
      }
      throw new InternalServerErrorException(`Something terrible happen!!`);
    }
    
  }
  
  async register( registerUserDto: RegisterUserDto): Promise<LoginResponse> {

      const user = await this.create( registerUserDto );
      console.log(user);
      
      return {
        user: user,
        token: this.getJwtToken({ id: user.id })
      }
  }

  async login( loginDto: LoginDto ): Promise<LoginResponse> {
    try {
      const { email, password } = loginDto;
      
      const user = await this.userRepository.findOneBy({email})

      if (!user) {
        throw new UnauthorizedException('Email incorret');
      }

      if (!bcryptjs.compareSync(password, user.password)) {
        throw new UnauthorizedException('Password incorret');
      }

      const { password:_, ...rest } = user;

      return {
        user: rest,
        token: this.getJwtToken({ id: user.id }),
      }
    } catch (error) {
      
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users
  }

  async findOneById( id: number) {
    const user = await this.userRepository.findOneBy({ id })
    const { password, ...rest } = user;

    return rest;
  }

  findOne(id: number) {
    return `This action returns a auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token
  }
}
