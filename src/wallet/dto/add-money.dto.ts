import { IsNotEmpty, IsNumber } from "class-validator";

export class AddMoneyDto {
    
    @IsNumber()
    @IsNotEmpty()
    amount: number;
  
    description: string;
  
    reference: string;
}