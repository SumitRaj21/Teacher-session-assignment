const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/userService');

class UserController {

    createUser=asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, message: "User created successfully", data: user });
  });

  getUserSessions=asyncHandler(async (req, res) => {
    const sessions = await userService.getUserSessions(req.params.id);
    res.status(200).json({ success: true, data: sessions });
  });
}

module.exports = new UserController();
