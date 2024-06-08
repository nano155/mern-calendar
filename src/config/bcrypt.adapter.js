import { compareSync, genSaltSync, hashSync } from "bcrypt";

export class BcryptAdapter {
  static hash(password) {
    const salt = genSaltSync();

    return hashSync(password, salt);
  }

  static compare(password, hash) {
    return compareSync(password, hash);
  }
}
