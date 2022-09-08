/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("access_logs", function (table) {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("link_id").unsigned().notNullable();
    table.string("link_domain_slash_tag", 200).notNullable();
    table.string("link_domain", 100).notNullable();
    table.string("link_utm_source", 100).defaultTo("");
    table.string("link_utm_medium", 100).defaultTo("");
    table.string("link_utm_campaign", 100).defaultTo("");
    table.string("link_utm_term", 100).defaultTo("");
    table.string("link_utm_content", 100).defaultTo("");
    table.string("ip", 40).notNullable();
    table.string("location_country", 100).defaultTo("");
    table.string("location_continent", 100).defaultTo("");
    table.text("user_agent").notNullable();
    table.string("device_type", 25).defaultTo("");
    table.string("device_browser", 25).defaultTo("");
    table.string("device_os", 25).defaultTo("");
    table.string("referrer", 25).defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id", "idx_access_logs_user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("link_id", "idx_access_logs_link_id")
      .references("id")
      .inTable("links");

    table.engine("InnoDB");
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
