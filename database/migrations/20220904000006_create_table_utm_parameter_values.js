/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("utm_parameter_values", function (table) {
    table.bigIncrements("id").primary();
    table.integer("utm_parameter_id").unsigned().notNullable();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.string("value", 250).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    table
      .foreign("utm_parameter_id")
      .references("id")
      .inTable("utm_parameters");
    table.foreign("owner_user_id").references("id").inTable("users");
    table.foreign("creator_user_id").references("id").inTable("users");
    table.unique(["utm_parameter_id", "owner_user_id", "value"]);

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A user can have multiple value for a single utm_parameter.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("utm_parameter_values");
};
