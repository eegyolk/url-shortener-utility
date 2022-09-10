/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("utm_parameter_templates", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.string("name", 100).notNullable();
    table.string("utm_source", 250).notNullable();
    table.string("utm_medium", 250).notNullable();
    table.string("utm_campaign", 250).notNullable();
    table.string("utm_term", 250).defaultTo("");
    table.string("utm_content", 250).defaultTo("");
    table.string("description", 250).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    table
      .foreign("owner_user_id", "idx_utm_parameter_templates_owner_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("creator_user_id", "idx_utm_parameter_templates_creator_user_id")
      .references("id")
      .inTable("users");
    table.unique(["owner_user_id", "name"], {
      indexName: "uniq_utm_parameter_templates_owner_user_id_name",
    });

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A user can have multiple utm_parameter templates.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("utm_parameter_templates");
};
