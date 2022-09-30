/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("utm_parameter_values").del();

  const users = await knex("users").select("id");
  const utmParameters = await knex("utm_parameters").select("id", "label");

  for (let i = 0; i < users.length; i++) {
    const workspace = await knex("workspaces")
      .select("id")
      .where("owner_user_id", users[i].id)
      .first();

    for (let ii = 0; ii < utmParameters.length; ii++) {
      if (utmParameters[ii].label.toString().toUpperCase() === "SOURCE") {
        await knex("utm_parameter_values").insert([
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "facebook",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "twitter",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "linkedin",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "instagram",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "youtube",
          },
        ]);
      }

      if (utmParameters[ii].label.toString().toUpperCase() === "MEDIUM") {
        await knex("utm_parameter_values").insert([
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "social",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "cpc",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "display",
          },
          {
            utm_parameter_id: utmParameters[ii].id,
            owner_user_id: users[i].id,
            creator_user_id: users[i].id,
            workspace_id: workspace.id,
            value: "email",
          },
        ]);
      }
    }
  }
};
