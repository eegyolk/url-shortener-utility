/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("channels", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("name", 50).notNullable();
    table.string("platform", 50).notNullable();
    table.string("identifier", 50).notNullable();
    table.string("description", 250).defaultTo("");
    table.string("icon_url", 1000).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id", "idx_channels_user_id")
      .references("id")
      .inTable("users");
    table.unique(["user_id", "name", "platform", "identifier"], {
      indexName: "uniq_channels_user_id_name_platform_identifier",
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
  return knex.schema.dropTable("channels");
};
