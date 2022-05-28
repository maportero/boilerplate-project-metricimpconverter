'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  console.log('inside apiRoutes');
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) =>{
    //console.log('post api/convert', req.query.input);
    let data = {};
    let x_in = req.query.input;
    let initUnit = convertHandler.getUnit(x_in);
    let initNum = convertHandler.getNum(x_in);
    if (!initNum && !initUnit){
      data = 'invalid number and unit';
    }else if (!initNum && initUnit){
      data = 'invalid number';
    }else if (initNum && !initUnit){
      data = 'invalid unit';
    }else{
      let returnNum = convertHandler.convert(initNum,initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let str = convertHandler.getString(initNum,convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit));
      //console.log( 'num: ', initNum);
      //console.log( 'unit: ', initUnit);
      data = {
        "initNum":initNum,
        "initUnit":initUnit,
        "returnNum":returnNum,
        "returnUnit":returnUnit,
        "string":str
      }
    }
    res.send( data );
  });
};
