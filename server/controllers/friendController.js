const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { requesterId, recipientEmail } = req.body;

    // Find or create the recipient user by email
    const [recipient] = await User.findOrCreate({ where: { email: recipientEmail } });

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      requesterId,
      recipientId: recipient.id,
    });

    res.status(201).json({ message: 'Friend request sent!', friendRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request', error });
  }
};

// Get all friend requests for a specific user
exports.getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all friend requests where the recipient is the user
    const requests = await FriendRequest.findAll({
      where: { recipientId: userId },
      include: [
        {
          model: User,
          as: 'Requester',
          attributes: ['id', 'email'], // Include only specific fields from the requester
        },
      ],
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving friend requests', error });
  }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Update the status of the friend request to 'accepted'
    const friendRequest = await FriendRequest.update(
      { status: 'accepted' },
      { where: { id: requestId } }
    );

    res.status(200).json({ message: 'Friend request accepted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting friend request', error });
  }
};