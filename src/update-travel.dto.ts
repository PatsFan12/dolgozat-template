import { IsInt, IsNumber, IsString, MinLength } from "class-validator";

export class UpdateTravelDto{
    destination?: string;
    description?: string;
    imgUrl?: string;
    price?: number;
    discount?: number;
}