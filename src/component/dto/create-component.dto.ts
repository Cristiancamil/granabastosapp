import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class ConfigurationType {
    @IsUrl()
    image_url: string;

    @IsString()
    alt_text: string;

    @IsUrl()
    link_url: string;
}

export class CreateComponentDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsNumber()
    order: number;

    @IsOptional()
    @Type(() => ConfigurationType)
    configuration?: ConfigurationType;

    @IsBoolean()
    status: boolean;
}
