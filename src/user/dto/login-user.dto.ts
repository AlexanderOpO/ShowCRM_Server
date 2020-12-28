import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { User } from '../schemas/user.schema';

type LoginUserDtoType = Pick<User, 'username' | 'password'>;

export default class implements LoginUserDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: LoginUserDtoType['username'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: LoginUserDtoType['password'];
}
