const express = require('express');
const router = express.Router();
const { createProposal, updateProposal, getProposalHistory, getAllProposals } = require('../controllers/proposalController');

// POST route to create a new proposal
router.post('/proposal', createProposal);

// PUT route to update a proposal
router.put('/proposal/update', updateProposal);

// GET route to get proposal history by proposal number
router.get('/proposal/history/:proposalNumber', getProposalHistory);

// GET route to get all proposals
router.get('/proposal/all', getAllProposals);

module.exports = router;
