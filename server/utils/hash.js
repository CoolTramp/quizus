import bcrypt from "bcrypt";
import chalk from "chalk";

const createHash = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password.trim(), bcrypt.genSaltSync(10), (err, hash) => {
      if (err) {
        reject(err);
      } else {
        console.log(chalk.bgYellow("password was hashed"), "\n", "hash:", hash);
        resolve(hash);
      }
    });
  });
};

const compareHashes = async (password, userHashed) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, userHashed, (error, result) => {
      if (error) {
        console.error(chalk.red("error from comparing passwords:"), error);
      } else {
        console.log(
          result
            ? chalk.blue("the user password is correct")
            : chalk.red("the user password is not correct")
        );
        resolve(result);
      }
    });
  });
};

export { createHash, compareHashes };
