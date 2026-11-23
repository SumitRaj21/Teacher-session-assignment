const mongoose = require('mongoose');
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

const AppError = require('../utils/AppError');

class UserService {
    createUser = async (userData) => {
        const { fullName, email, phone } = userData;
        if (!fullName || !email || !phone) throw new AppError(400, 'fullName, email and phone are required');
        const user = await User.create({ fullName, email, phone });
        return user;
    }
    getUserSessions = async (userId) => {
        if (!mongoose.isValidObjectId(userId)) throw new AppError(400, 'Invalid user ID');
        const userExists = await User.exists({ _id: userId });
        if (!userExists) throw new AppError(404, 'User not found');
        const now = new Date();
        const result = await Session.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $lookup: { from: 'teachers', localField: 'teacherId', foreignField: '_id', as: 'teacher' } },
            { $unwind: { path: '$teacher', preserveNullAndEmptyArrays: true } },
            { $project: { teacherId: 1, userId: 1, startTime: 1, endTime: 1, status: 1, completedAt: 1, teacher: { fullName: 1, specialization: 1, email: 1 } } },
            { $facet: {
                upcomingSessions: [{ $match: { status: 'BOOKED', startTime: { $gte: now } } }, { $sort: { startTime: 1 } }],
                completedSessions: [{ $match: { status: 'COMPLETED' } }, { $sort: { completedAt: -1 } }]
            } }
        ]);
        const sessions = result[0] || { upcomingSessions: [], completedSessions: [] };
        return sessions;
    }
}

module.exports = new UserService();