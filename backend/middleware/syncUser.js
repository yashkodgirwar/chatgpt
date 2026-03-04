import { findOne, create } from "../models/User.";

const syncUser = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const existingUser = await findOne({ clerkId: userId });

    if (!existingUser) {
      await create({
        clerkId: userId,
        email: req.auth.sessionClaims.email,
        plan: "free",
        dailyChatCount: 0,
        lastResetDate: new Date()
      });
      console.log("New user created");
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User sync failed" });
  }
};

export default syncUser;