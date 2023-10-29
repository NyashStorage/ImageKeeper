import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../models/user.model';

export class CreateUserRequest extends PickType(UserModel, [
  'email',
  'password',
]) {}
