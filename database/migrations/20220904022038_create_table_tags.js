/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("name", 50).notNullable();
    table.string("description", 250).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id", "idx_tags_user_id")
      .references("id")
      .inTable("users");
    table.unique(["user_id", "name"], {
      indexName: "uniq_tags_user_id_name",
    });

    table.engine("MyISAM");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
