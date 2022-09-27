/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("workspace_members", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("workspace_id").unsigned().notNullable();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table
      .enum("role", ["Owner", "Admin", "Editor", "Viewer"])
      .notNullable()
      .comment(
        "Owner - the owner of workspace, Admin - can create/read/edit/delete, Editor - can read/edit, Viewer - can read only"
      );
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("workspace_id").references("id").inTable("workspaces");
    table.foreign("owner_user_id").references("id").inTable("users");
    table.foreign("creator_user_id").references("id").inTable("users");
    table.foreign("user_id").references("id").inTable("users");
    table.unique(["workspace_id", "user_id"]);

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment(
      "A workspace can have muliple user assigned by the owner/admin only."
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("workspace_members");
};
