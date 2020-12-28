import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { User } from '../schemas/user.schema';

type CreateUserDtoType = Pick<User, 'username' | 'password'>;

export default class implements CreateUserDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: CreateUserDtoType['username'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: CreateUserDtoType['password'];
}
