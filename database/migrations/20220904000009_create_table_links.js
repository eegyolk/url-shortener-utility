/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("links", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("owner_user_id").unsigned().notNullable();
    table.bigInteger("creator_user_id").unsigned().notNullable();
    table.bigInteger("workspace_id").unsigned().notNullable();
    table.string("domain", 100).notNullable();
    table.string("slash_tag", 100).notNullable().collate("utf8mb4_bin");
    table.string("destination", 250).notNullable();
    table.json("tags").nullable();
    table.json("channels").nullable();
    table.string("site_title", 100).defaultTo("");
    table.string("site_description", 250).defaultTo("");
    table.string("site_icon", 1000).defaultTo("");
    table.string("utm_source", 100).defaultTo("");
    table.string("utm_medium", 100).defaultTo("");
    table.string("utm_campaign", 100).defaultTo("");
    table.string("utm_term", 100).defaultTo("");
    table.string("utm_content", 100).defaultTo("");
    table.tinyint("is_active", 1).defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("owner_user_id").references("id").inTable("users");
    table.foreign("creator_user_id").references("id").inTable("users");
    table.foreign("workspace_id").references("id").inTable("workspaces");
    table.unique(["domain", "slash_tag"]);

    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_general_ci");
    table.comment("A user can have multiple links.");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
