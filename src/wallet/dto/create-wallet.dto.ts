import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/core/entities/user.entity";

export class CreateWalletDto {
    @IsString()
    @IsNotEmpty()
    walletAccountNo: string;
  
    @IsNotEmpty()
    user: User;
  }