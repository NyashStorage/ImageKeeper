import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { ErrorResponse } from '../app/dao/responses/error.response';
import { castToEntity } from '../utils/helpers/type.helpers';
import {
  FindMeResponse,
  FindUserResponse,
} from './dao/responses/find-user.response';
import { JwtPayloadDto } from '../app/dao/jwt-payload.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Gets information about current user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindMeResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'An account with such credentials was not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async findMe(
    @CurrentUser() { userId }: JwtPayloadDto,
  ): Promise<FindMeResponse> {
    return castToEntity(
      this.usersService.find({ id: userId }, {}, true),
      FindMeResponse,
    );
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Gets information about user by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'An account with such credentials was not found',
    type: ErrorResponse,
  })
  async findByEmail(@Param('email') email: string): Promise<FindUserResponse> {
    return castToEntity(
      this.usersService.find({ email }, {}, true),
      FindUserResponse,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets information about user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'An account with such credentials was not found',
    type: ErrorResponse,
  })
  async find(@Param('id') id: string): Promise<FindUserResponse> {
    return castToEntity(
      this.usersService.find({ id }, {}, true),
      FindUserResponse,
    );
  }
}
