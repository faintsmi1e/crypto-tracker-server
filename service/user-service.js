import UserModel from "../models/user-model";
import bcrypt from 'bcrypt';
import uuid from 'uuid'
import MailService from "./mail-service";
class UserServise {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email});
    if (candidate) {
      throw new Error(`User ${email} exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({email, hashPassword, activationLink});
    await MailService.sendActivationMail(email, activationLink);

  }
}

export default new UserServise();