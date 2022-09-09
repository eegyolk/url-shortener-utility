/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.bigIncrements("id").primary();
    table.string("full_name", 100).defaultTo("");
    table
      .string("email_address", 100)
      .unique({ indexName: "uniq_users_email_address" })
      .notNullable();
    table.string("password", 100).notNullable();
    table.enum("sso_provider", ["Google", "Facebook", "Twitter"]).nullable();
    table.string("image_url", 1000).defaultTo("");
    table.string("country", 100).defaultTo("");
    table.string("verification_token", 1000).defaultTo("");
    table.string("verification_md5", 32).index().defaultTo("");
    table.string("remember_token", 1000).defaultTo("");
    table.string("reset_token", 1000).defaultTo("");
    table.string("reset_md5", 32).index().defaultTo("");
    table.timestamp("verified_at").nullable();
    table.timestamp("logged_in_at").nullable();
    table.timestamp("reset_at").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
