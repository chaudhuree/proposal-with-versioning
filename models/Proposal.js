const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  originalProposalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal', default: null },
  version: { type: String, default: '1.0' }, // Tracks the version of the proposal
  proposalNumber: { type: String, required: true, unique: true }, // Auto-generated proposal number
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Proposal = mongoose.model('Proposal', proposalSchema);
module.exports = Proposal;
