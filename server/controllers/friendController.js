const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Search for a user by email
exports.searchUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ userId: user._id, name: user.name });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  const { requesterId, recipientId } = req.body;
  try {
    const existingRequest = await FriendRequest.findOne({ requesterId, recipientId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }
    const friendRequest = new FriendRequest({ requesterId, recipientId });
    await friendRequest.save();
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};