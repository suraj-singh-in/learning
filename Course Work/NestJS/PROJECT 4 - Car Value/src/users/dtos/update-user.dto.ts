import { IsEmail, IsString, IsOptional } from 'class-validator';

export class updatedUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
