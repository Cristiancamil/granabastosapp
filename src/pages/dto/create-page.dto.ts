import { IsBoolean, IsDate, IsString } from "class-validator";

export class CreatePageDto {

    @IsString()
    title: string;

    @IsString()
    url: string;

    @IsBoolean()
    status: boolean;

    @IsDate()
    createdAt: string;

    @IsString()
    userCreated: string
}
