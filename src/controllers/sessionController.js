const asyncHandler = require('../utils/asyncHandler');
const sessionService = require('../services/sessionService');

class SessionController {

    createSession=asyncHandler(async (req, res) => {
    const session = await sessionService.createSession(req.body);
    res.status(201).json({ success: true, message: "Session created successfully", data: session });
  });

  getAvailableSessions=asyncHandler(async (req, res) => {
    const sessions = await sessionService.getAvailableSessions(req.query.dateTimestamp);
    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  });

  bookSession=asyncHandler(async (req, res) => {
    const session = await sessionService.bookSession(req.params.id, req.body.userId);
    res.status(200).json({ success: true, message: "Session booked successfully", data: session });
  });

  completeSession=asyncHandler(async (req, res) => {
    const session = await sessionService.completeSession(req.params.id);
    res.status(200).json({ success: true, message: "Session completed successfully", data: session });
  }); 

}

module.exports = new SessionController();
