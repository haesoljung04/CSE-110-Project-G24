const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const auth0Id = req.user.sub; // Extract Auth0 user ID from the token
    const { recipientEmail } = req.body;

    // Find the requester in the database using Auth0 ID
    const requester = await User.findOne({ where: { auth0_id: auth0Id } });
    if (!requester) {
      return res.status(404).json({ message: 'Requester not found' });
    }

    // Find or create the recipient user by email
    const [recipient] = await User.findOrCreate({ where: { email: recipientEmail } });

    // Check for existing friend request
    const existingRequest = await FriendRequest.findOne({
      where: { requesterId: requester.id, recipientId: recipient.id, status: 'pending' },
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      requesterId: requester.id,
      recipientId: recipient.id,
    });

    res.status(201).json({ message: 'Friend request sent!', friendRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request', error });
  }
};
exports.getFriendRequests = async (req, res) => {
  try {
    const auth0Id = req.user.sub; // Extract Auth0 user ID from the token

    // Find the logged-in user
    const user = await User.findOne({ where: { auth0_id: auth0Id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all friend requests where the recipient is the logged-in user
    const requests = await FriendRequest.findAll({
      where: { recipientId: user.id },
      include: [
        {
          model: User,
          as: 'Requester',
          attributes: ['id', 'email'], // Include specific fields from the requester
        },
      ],
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving friend requests', error });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const auth0Id = req.user.sub; // Extract Auth0 user ID from the token
    const { requestId } = req.body;

    // Find the logged-in user
    const user = await User.findOne({ where: { auth0_id: auth0Id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend request
    const friendRequest = await FriendRequest.findOne({
      where: { id: requestId, recipientId: user.id },
    });

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found or unauthorized' });
    }

    // Update the status of the friend request to 'accepted'
    await friendRequest.update({ status: 'accepted' });

    res.status(200).json({ message: 'Friend request accepted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting friend request', error });
  }
};