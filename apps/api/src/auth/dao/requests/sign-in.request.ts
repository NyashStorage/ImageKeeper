import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../../users/models/user.model';

export class SignInRequest extends PickType(UserModel, ['email', 'password']) {}
