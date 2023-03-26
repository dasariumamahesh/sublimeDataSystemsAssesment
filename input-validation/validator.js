const {check, validationResult} = require('express-validator')
const express = require('express')
const app = express()
app.use(express.json())


// module.exports.addCustomer = (req, res, next)=>{
//     check('first_name').exists()
//     const errors = validationResult(req)
//     console.log(errors)
//     if(!errors.isEmpty()){
//         res.status(400).json({ errors: errors.array() });
//     }
//     next()
// }

module.exports.addCustomer = [
    check('first_name','first_name is required').exists().isString().withMessage("should be a string"),
    check('last_name','last_name is required').exists().isString().withMessage("should be a string"),
    check('city','city is required').exists().isString().withMessage("should be a string"),
    check('company','company is required').exists().isString().withMessage("should be a string"),

    async (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
        }
        else next()
    }
]

module.exports.checkPageNumber = [
    check('page').isInt().withMessage("should be an Integer"),
    
    async (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
        }
        else next()
    }
]