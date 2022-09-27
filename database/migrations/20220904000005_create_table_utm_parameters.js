/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("utm_parameters", function (table) {
    table.increments("id").primary();
    table.string("label", 10).unique().notNullable();
    table.string("key", 15).unique().notNullable();
    table.string("description", 250).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A lookup table only.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("utm_parameters");
};
