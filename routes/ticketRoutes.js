const express = require('express');

const ticketController = require('../controllers/ticketController');

const router = express.Router();

router
	.route('/')
	.get(ticketController.getAllTickets)
	.post(ticketController.createTicket);

router
	.route('/:id')
	.get(ticketController.getOneTicket)
	.patch(ticketController.updateTicket)
	.delete(ticketController.deleteTicket);

module.exports = router;
