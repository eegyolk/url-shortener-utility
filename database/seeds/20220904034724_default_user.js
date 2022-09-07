/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const bcrypt = require("bcryptjs");

  const createPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  };

  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      full_name: "Default User",
      email_address: "default.user@email.com",
      password: createPassword("123456"),
    },
  ]);
};
