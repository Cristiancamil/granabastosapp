import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdatePageDto extends OmitType(CreatePageDto, ['createdAt', 'userCreated']) {
    @IsDate()
    updateAt: Date;

    @IsString()
    userCreated: string
}
