import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { GetToken } from 'src/utils/decorators/get-token.decorator';
import AddShopDto from './dto/add-shop.dto';
import CreateUserDto from './dto/create-user.dto';
import loginUserDto from './dto/login-user.dto';
import LoginUserDto from './dto/login-user.dto';
import RemoveShopDto from './dto/remove-shop.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('add_shop')
  @UseGuards(AuthGuard)
  addShop(@GetToken() token: string, @Body() addShopDto: AddShopDto) {
    return this.userService.addShop(token, addShopDto.shop_id);
  }

  @Post('remove_shop')
  @UseGuards(AuthGuard)
  removeShop(@GetToken() token: string, @Body() removeShopDto: RemoveShopDto) {
    return this.userService.removeShop(token, removeShopDto.shop_id);
  }

  @Get('shops')
  @UseGuards(AuthGuard)
  getShops(@GetToken() token: string) {
    return this.userService.getShopList(token);
  }
}
