/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("utm_parameters").del();
  await knex("utm_parameters").insert([
    {
      label: "Source",
      key: "utm_source",
      description: "Used to show which site the visitors are coming from.",
    },
    {
      label: "Medium",
      key: "utm_medium",
      description:
        "Used to show which marketing channels are bringing the visitor to your site. Examples include, but aren't limited to, email, social, or cost-per-click.",
    },
    {
      label: "Campaign",
      key: "utm_campaign",
      description:
        "Used to identify which campaign the promotion is associated with.",
    },
    {
      label: "Term",
      key: "utm_term",
      description:
        "Used to manually identify paid keywords you're targeting with your campaign.",
    },
    {
      label: "Content",
      key: "utm_content",
      description:
        "Used to identify the exact element on your ad or promotion that was clicked. This is often used for optimization purposes.",
    },
  ]);
};
