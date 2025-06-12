// GET /quests
// View all uncompleted quests

// GET /quests/:id:
// get quest by id

// POST /quests:
// Create a new quest
export const questPost = async (req, res, next) => {
  try {
    // Save user in database
    const result = await createUser(req.body, hashedPassword);

    if (result.rows.length === 0) {
      throw new Error("User not created");
    }

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// POST /quests/:id/complete
// Attempt a quest

// PUT /quests/:id
// Update a quest

// DELETE /quests/:id:
// Delete a quest

// The quest_completions table is only updated when a user attempts/completes a quest
