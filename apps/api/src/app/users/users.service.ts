import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import CreateUserDto from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>
  ) {}

  public async getByEmail(email: string) {
    const user = await this.usersModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  public async getById(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  public async create(userData: CreateUserDto) {
    try {
      const newUser = new this.usersModel(userData);
      return await newUser.save();
    } catch (err) {
      throw new HttpException(
        `User creation failed: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
