//backend/routes/user.js
const express = require("express");

const router = express.Router();
//export zod for validate inpute
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

//check validation using zod schema
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});



//signup routes
router.post("/signup", async (req, res) => {
  //first check inputs are correct or not
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/ Incorrect input",
    });
  }

  //then check user are exists or not
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  //then create a user in db
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  //initialize monney to user account
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  // create token with signin
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  //send response user account created
  res.json({
    message: "User created successfully",
    token: token,
  });
});

// signin vaildation using zod
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  //vaildate using zod
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "email already taken /Incorrect inputs",
    });
  }

  //find user they are exist or not
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Erroe while logging in",
  });
});

//update validate
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.json({
    messsage: "Updated successfully",
  });
});

//get all the user
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
