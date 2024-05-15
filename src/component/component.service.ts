import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm';
import { ComponentCreate } from './interface/component.interface';

@Injectable()
export class ComponentService {

  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>
  ){}

  async create(createComponentDto: CreateComponentDto) {
    try {

      console.log("Holaaaaaaaaaaaaaaaaaaaaaaaa");
      
      const { configuration, ...rest } = createComponentDto;
      const newComponent = this.componentRepository.create({
        ...rest,
        configuration: configuration as any,
        userCreated: "CLOPEZ",
        userUpdated: "CLOPEZ"
      });
      
      const savedComponent = await this.componentRepository.save(newComponent);
      return savedComponent;      

    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException(`Something terrible happen!!`);
    }
  }

  async findAll(): Promise<Component[]> {
    const components = await this.componentRepository.find()
    return components;
  }

  findOne(id: number) {
    return `This action returns a #${id} component`;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
