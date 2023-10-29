import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../models/user.model';

export class FindUserResponse extends PickType(UserModel, ['id']) {}

export class FindMeResponse extends PickType(UserModel, ['id', 'email']) {}
