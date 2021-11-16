import UserModel from '../models/user-model.js';
import TokenModel from '../models/token-model.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import MailService from './mail-service.js';
import TokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';
import TransactionService from './transaction-service.js';
class UserServise {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User ${email} exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // id, email., isActivated
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      transactions:[]
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('wrong activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Wrong password`);
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    const transactions = await TransactionService.getAll(userDto.id);
    console.log(transactions);
    return {
      ...tokens,
      user: userDto,
      transactions: transactions,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user); // id, email., isActivated
    const tokens = TokenService.generateTokens({ ...userDto });
    const transactions = await TransactionService.getAll(userDto.id);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      transactions: transactions,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}


export default new UserServise();
