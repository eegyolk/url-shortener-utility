/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("workspaces").del();
  await knex("workspace_members").del();

  const users = await knex("users").select("id");

  for (let i = 0; i < users.length; i++) {
    const workspace = await knex("workspaces").insert(
      [
        {
          owner_user_id: users[i].id,
          creator_user_id: users[i].id,
          name: "Default",
          space_character: "Blank Space",
          description: "My default workspace",
        },
      ],
      ["id"]
    );

    await knex("workspace_members").insert([
      {
        workspace_id: workspace[0],
        owner_user_id: users[i].id,
        creator_user_id: users[i].id,
        user_id: users[i].id,
        role: "Owner",
      },
    ]);

    await knex("users").where("id", users[i].id).update({
      primary_workspace_id: workspace[0],
    });
  }
};
