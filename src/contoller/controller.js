const customerData = require('../data/customerData.json')
var fs = require('fs')
const { json } = require('express')
const { cwd } = require('process')

module.exports.searchCustomers = (req,res)=>{
    try{
        let userRes
    if(req.query.first_name!= undefined || req.query.first_name!= null){
        userRes = customerData.filter(x=>x["first_name"].toLowerCase() == req.query.first_name.toLowerCase())
    }
    else if(req.query.last_name != undefined || req.query.last_name != null){
        userRes = customerData.filter(x=>x["last_name"].toLowerCase() == req.query.last_name.toLowerCase())
    }
    else if(req.query.city != undefined || req.query.city != null){
        userRes = customerData.filter(x=>x["city"].toLowerCase() == req.query.city.toLowerCase())
    }
    else{
        res.status(400).send({error: "Please provide a valid input"})
    }
    if(userRes != undefined & userRes.length > 0){
        let response = pagination(req.query.page, userRes)
        res.status(200).send(response)
    }else{
        res.status(200).send({Status: "No users were found"})
    }}catch(Error){
        res.status(500).send({Error})
    }
}

module.exports.searchCustomer = (req,res)=>{
    let userRes = customerData.filter(x=> x["id"] == req.params.id)
    if(userRes.length == 1){
        res.status(200).send(userRes[0])
    }else{
        res.status(500).send({Error: "No customer details found"})
    }
}

module.exports.addCustomer = async (req,res)=>{
    if(checkInsertCondition(req.body)){
        let id = Math.max(...customerData.map(x=>x["id"]))
        let userData = {
            "id": ++id,
            "first_name": req.body.last_name,
            "last_name": req.body.first_name,
            "city": req.body.city,
            "company": req.body.company
        }
        fs.readFile('./src/data/customerData.json', function (err, data) {
            if(err) throw err
        let json = JSON.parse(data)
        json.push(userData)
        fs.writeFileSync('./src/data/customerData.json', JSON.stringify(json), (err)=>{
            if (err) throw err;
          console.log('The "data to append" was appended to file!');
        })
        res.status(200).send({Status : "Data inserted sucessfully"})
    })
    }else{
        res.status(500).send({Error:"Incorrect data was submitted"})
    }
}

module.exports.listCities = (req,res)=>{
    let userRes = customerData.reduce((acc,crr)=>{
        if(acc[crr["city"]]){
            acc[crr["city"]]++
        }else{
            acc[crr["city"]] = 1
        }
        return acc
    },{})
    res.status(200).send(userRes)
}

function checkInsertCondition(data){
    let checkCity = customerData.some(x => x["city"] == data.city)
    let checkCompany = customerData.some(x => x["company"] == data.company)
    return (checkCity && checkCompany)? true: false
}

function pagination(page, data){
    let pageNumber = (page != undefined || page != null)? page : 1
    if(pageNumber > Math.ceil(data.length/5)){
        throw ("Incorrrect page number")
    }else{

        //hard coded to have 5 records per page
        let UserData = data.slice(pageNumber*5-5,pageNumber*5)
        let NextPage = (pageNumber*5 >= data.length)? null: ++pageNumber
        return {
            UserData,
            NextPage
        }
    }
}