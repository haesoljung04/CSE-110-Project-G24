const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    console.log('Request headers:', req.headers.authorization); // Log authorization headers for debugging

    const { requesterEmail, recipientEmail } = req.body;

    // Validate the requester (sender)
    const requester = await User.findOne({ where: { email: requesterEmail } });
    if (!requester) {
      console.log('Requester not found in database:', requesterEmail);
      return res.status(404).json({ message: 'Requester not found' });
    }
    console.log('Requester found:', requester);

    // Validate the recipient
    const recipient = await User.findOne({ where: { email: recipientEmail } });
    if (!recipient) {
      console.log('Recipient not found in database:', recipientEmail);
      return res.status(404).json({ message: 'Recipient not found' });
    }
    console.log('Recipient found:', recipient);

    // Check for existing friend requests
    const existingRequest = await FriendRequest.findOne({
      where: { requesterId: requester.id, recipientId: recipient.id, status: 'pending' },
    });
    if (existingRequest) {
      console.log('Duplicate friend request found between:', requester.id, recipient.id);
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      requesterId: requester.id,
      recipientId: recipient.id,
    });
    console.log('Friend request created successfully:', friendRequest);

    res.status(201).json({ message: 'Friend request sent!', friendRequest });
  } catch (error) {
    console.error('Error in sendFriendRequest:', error);
    res.status(500).json({ message: 'Error sending friend request', error });
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