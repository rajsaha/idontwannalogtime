import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    plaintextPassword: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hash);
  }
}
