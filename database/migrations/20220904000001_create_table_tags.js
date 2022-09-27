/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.bigInteger("workspace_id").unsigned().notNullable();
    table.string("name", 100).notNullable();
    table.string("description", 250).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("owner_user_id", "idx_tags_owner_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("creator_user_id", "idx_tags_creator_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("workspace_id", "idx_tags_workspace_id")
      .references("id")
      .inTable("workspaces");
    table.unique(["owner_user_id", "workspace_id", "name"], {
      indexName: "uniq_tags_owner_user_id_workspace_id_name",
    });

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A user can have multiple tags.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
