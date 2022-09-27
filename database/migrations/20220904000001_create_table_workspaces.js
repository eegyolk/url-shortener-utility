/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("workspaces", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.string("name", 100).notNullable();
    table
      .enum("space_character", [
        "Blank Space",
        "Nothing",
        "Plus",
        "Hypen",
        "Underscore",
      ])
      .defaultTo("Blank Space")
      .comment("This will replace space character in the parameter values");
    table.string("description", 250).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("owner_user_id").references("id").inTable("users");
    table.foreign("creator_user_id").references("id").inTable("users");
    table.unique(["owner_user_id", "name"]);

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A user can have multiple workspace.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("workspaces");
};
