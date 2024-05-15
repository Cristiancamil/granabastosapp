import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentDto } from './create-component.dto';
import { IsDateString, IsString } from 'class-validator';

export class UpdateComponentDto extends PartialType(CreateComponentDto) {
    @IsDateString()
    createdAt: Date;

    @IsString()
    userCreated: string;

}