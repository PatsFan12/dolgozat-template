import { IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTravelDto{

    @IsString()
    @IsNotEmpty()
    destination: string;
    @IsString()
    @MinLength(30)
    description: string;
    @IsString()
    imgUrl: string;
    @IsInt()
    price: number;
}