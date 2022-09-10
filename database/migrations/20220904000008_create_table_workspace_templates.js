/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("workspace_templates", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("workspace_id").unsigned().notNullable();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.bigInteger("utm_parameter_template_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("workspace_id", "idx_workspace_templates_workspace_id")
      .references("id")
      .inTable("workspaces");
    table
      .foreign("owner_user_id", "idx_workspace_templates_owner_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("creator_user_id", "idx_workspace_templates_creator_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign(
        "utm_parameter_template_id",
        "idx_workspace_templates_utm_parameter_template_id"
      )
      .references("id")
      .inTable("utm_parameter_templates");
    table.unique(["workspace_id", "utm_parameter_template_id"], {
      indexName:
        "uniq_workspace_templates_workspace_id_utm_parameter_template_id",
    });

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A workspace can have muliple templates.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("workspace_templates");
};
