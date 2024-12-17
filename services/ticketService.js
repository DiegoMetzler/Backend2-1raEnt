const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');

const createTicket = async (amount, purchaser) => {
  const newTicket = new Ticket({
    code: uuidv4(),
    amount,
    purchaser,
  });
  return await newTicket.save();
};

module.exports = { createTicket };
