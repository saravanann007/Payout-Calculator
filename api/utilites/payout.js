'use strict';

const _ = require('lodash');
const { each } = require('lodash');


class Payout {
    constructor(owes, owed, amount) {
        this.owes = owes;
        this.owed = owed;
        this.amount = amount;
    }

    static calcuateExpensePerStudent(expenses) {

        const students=[];
    
        _.each(expenses, expense => {
            const student = _.find(students, { name: expense.name });
            // This is calculate the expesnses if same person paid multiple times.
            if (!student) {
                // Student does not exist yet, create item:
                students.push(expense);
            } else {
                student.amount = (student.amount * 1) + (expense.amount * 1);
            }
        });
    
        return students;
    
    }
    
    static calculateEqualShare(students,total) {
        return total / students.length; 
    }

    static calculateTotal(students){

        let total = 0;
        _.each(students, student => {
            total = (total * 1) + (student.amount * 1);
        });
        return total;
    }
    
    
    static calcuatePayouts(students,averageShare) {
        const owed=[];
        const owes=[];
        const payouts=[];
        let totalOwed=0;
       
       _,each(students,student=>{
           if(student.amount> averageShare){
              student.owed=student.amount-averageShare;
              owed.push(student);
              totalOwed=(totalOwed*1)+ (student.owed*1);
           }
           else if(student.amount< averageShare){
               student.owes=averageShare-student.amount;
               owes.push(student);
             }
       });

       _.each(owed, studentOwed => {
             const fracionOfOwed = studentOwed.owed / totalOwed;        
           _.each(owes, studentOwes => {  
               const owedAmount =studentOwes.owes * fracionOfOwed;
               payouts.push(new Payout(studentOwes.name, studentOwed.name, parseFloat(owedAmount.toFixed(2))));
           });
       });
    
        return payouts;
    }
}

module.exports = Payout;