const { argon2i } = require("argon2-ffi");
// const argon2d = require('argon2-ffi').argon2d; if you'd like to use argon2d
const crypto = require("crypto");
const util = require("util");

const getRandomBytes = util.promisify(crypto.randomBytes);

async function main() {
  const password = "password1"; // Can also be a Buffer

  // hashage
  const salt = await getRandomBytes(32);
  const hashedPassword = await argon2i.hash(password, salt);

  // verification du hashage
  const password2 = Buffer.from("password1");
  const isCorrect = await argon2i.verify(hashedPassword, password2);

  console.log(hashedPassword);
  console.log(isCorrect ? "Correct password!" : "Incorrect password");
}

main();
