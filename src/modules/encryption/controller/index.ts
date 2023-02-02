import crypto from "crypto";

export default class Encryption {
  static encrypt = (
    value: crypto.BinaryLike,
    salt: crypto.BinaryLike
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(value, salt, 1000, 64, "sha512", (err, derivedKey) => {
        if (err) return reject(err);
        const hash = derivedKey.toString("hex");
        resolve(hash);
      });
    });
  };
}
