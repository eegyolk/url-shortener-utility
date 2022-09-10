/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const bcrypt = require("bcryptjs");

  const createPassword = password => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  };

  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      full_name: "Default User1",
      email_address: "default.user1@email.com",
      password: createPassword("123456"),
      country: "Philippines",
      verified_at: knex.fn.now(),
    },
    {
      full_name: "Default User2",
      email_address: "default.user2@email.com",
      password: createPassword("123456"),
      country: "Philippines",
      verified_at: knex.fn.now(),
    },
    {
      full_name: "Default User3",
      email_address: "default.user3@email.com",
      password: createPassword("123456"),
      country: "Philippines",
      verified_at: knex.fn.now(),
    },
  ]);
};
