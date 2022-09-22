const express = require('express');
const router = express.Router();
const _ = require('lodash');
const createError = require('http-errors');
const { each } = require('lodash');
const Payout = require('../utilites/payout');
const PayoutValidator = require('../validators/payout-validators');




router.post('/', async (request, response, next) => {


    try {

        const expenses = _.get(request, 'body.expenses');

        if (!PayoutValidator.validateRequest(expenses)) {

            return next(createError(400, { message: 'Invalid Input.' }));

        }

        let students = Payout.calcuateExpensePerStudent(expenses);

        const total= Payout.calculateTotal(students);

        let equalShare = Payout.calculateEqualShare(students,total);

        let payouts = Payout.calcuatePayouts(students, equalShare);

        return response.json({
            total,
            equalShare,
            payouts,
        });

    } catch (error) {
        return next({
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
