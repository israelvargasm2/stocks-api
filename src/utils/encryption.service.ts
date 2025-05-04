import { compareSync, hashSync } from "bcrypt";

const SALT_ROUNDS = 10;

export class EncryptionService {
    static encryptPassword(password: string) {
        return hashSync(password, SALT_ROUNDS);
    }

    static decryptPassword(password: string, encryptedPassword: string) {
        return compareSync(password, encryptedPassword);
    }
}
