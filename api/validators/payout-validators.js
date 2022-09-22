'use strict';

const Joi = require('@hapi/joi');


class PayoutValidator {

  static validateRequest(expenses) {

    const rules = Joi.array()
      .items({
        amount: Joi.number().required(),
        name: Joi.string().required(),
      });

    const { error, value } = rules.validate(expenses);

    if (error) {
      console.log("printing error",error);
      return false;
    } else {
      return expenses.length>1;
    }

  }


}



module.exports = PayoutValidator;