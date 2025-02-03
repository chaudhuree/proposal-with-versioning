const Proposal = require('../models/Proposal');

// Create a new proposal
const createProposal = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Find the latest proposal and increment its proposal number
    const latestProposal = await Proposal.findOne().sort({ createdAt: -1 });

    // If no proposals exist, create the first proposal with number '1'
    const newProposalNumber = latestProposal
      ? (parseInt(latestProposal.proposalNumber.split('.')[0]) + 1).toString() // Increment main proposal number
      : '1';

    const newProposal = new Proposal({
      title,
      description,
      proposalNumber: newProposalNumber + '.0', // Initial version will be 1.0
      version: '1.0',
    });

    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing proposal
const updateProposal = async (req, res) => {
  try {
    const { proposalId, title, description } = req.body;

    const originalProposal = await Proposal.findById(proposalId);
    if (!originalProposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Increment the version from the current proposal version
    const newVersion = parseFloat(originalProposal.version) + 0.1;
    const newVersionString = newVersion.toFixed(1); // Ensures it stays like '1.1', '1.2', etc.

    const updatedProposal = new Proposal({
      originalProposalId: originalProposal._id, // Reference to original
      version: newVersionString,
      proposalNumber: `${originalProposal.proposalNumber.split('.')[0]}.${newVersionString.split('.')[1]}`, // Increment the version number
      title,
      description,
    });

    await updatedProposal.save();
    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all versions of a proposal (proposal history)
const getProposalHistory = async (req, res) => {
  try {
    const { proposalNumber } = req.params;

    const proposalHistory = await Proposal.find({ proposalNumber: new RegExp(`^${proposalNumber}`) }).sort({ version: 1 });

    if (!proposalHistory.length) {
      return res.status(404).json({ error: 'No proposal history found' });
    }

    res.status(200).json(proposalHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get all proposals to display in proposals.ejs
const getAllProposals = async (req, res) => {
    try {
      const allProposals = await Proposal.find({ originalProposalId: null }).sort({ createdAt: 1 });
  
      if (!allProposals.length) {
        return res.status(404).json({ error: 'No proposals found' });
      }
  
      res.status(200).json(allProposals);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
module.exports = { createProposal, updateProposal, getProposalHistory, getAllProposals };
