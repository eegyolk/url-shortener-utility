/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("access_logs", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("domain", 100).notNullable();
    table.string("slash_tag", 100).notNullable();
    table.string("destination", 250).notNullable();
    table.json("tags").nullable();
    table.json("channels").nullable();
    table.string("og_title", 100).defaultTo("");
    table.string("og_description", 250).defaultTo("");
    table.string("og_image", 1000).defaultTo("");
    table.string("utm_source", 100).defaultTo("");
    table.string("utm_medium", 100).defaultTo("");
    table.string("utm_campaign", 100).defaultTo("");
    table.string("utm_term", 100).defaultTo("");
    table.string("utm_content", 100).defaultTo("");
    table.tinyint("is_active", 1).defaultTo(0);
    table.dateTime("starts_at").nullable();
    table.dateTime("ends_at").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    table
      .foreign("user_id", "idx_links_user_id")
      .references("id")
      .inTable("users");
    table.unique(["domain", "slash_tag"], {
      indexName: "uniq_links_domain_slash_tag",
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
  return knex.schema.dropTable("access_logs");
};
