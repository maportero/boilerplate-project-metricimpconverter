  function convertToNumber ( elem ) {
    let num = null;   
    let x_reg = /^[0-9]?\d*\.?(\d+)?$/g  
       let x_num = elem.match(x_reg);
       if ( x_num ) num = parseFloat(x_num);
       if ( num == 0 ) num = null;
       return num;
  };

  function convertFractionToNumber ( elem ) {
      let num = null;
      let nums = elem.split('/');
      if ( nums.length == 2 ) {
        let numerator = convertToNumber(nums[0]);
        let denominator = convertToNumber(nums[1]);
        if ( numerator > 0 && denominator > 0 ) num = numerator/denominator;
      }
      return num;
  };

function ConvertHandler() {

  this.getNum = function(input) {
    let result = null;
    let x_reg = /[a-zA-Z]/
    let pos = input.search(x_reg);
    if (pos == 0 ){
      result = 1;
    } else if ( pos > 0 ) {
      let elem = input.slice(0, pos);
      if ( elem.includes('/')) {
        result = convertFractionToNumber(elem);
      }else {
        result = convertToNumber(elem);
      }   
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = null;
    let x_reg = /[a-zA-Z]/
    let pos = input.search(x_reg);
    if (pos > -1 ){ 
      let unit = input.slice(pos);
      x_reg = /^kg$|^lbs$|^km$|^mi$|^L$|^gal$/gmi
      unit_checked = unit.match(x_reg);
      if ( unit_checked ) {
        if (unit.toLowerCase() === 'l' ){
          result = unit.toUpperCase();
        }else {
          result = unit.toLowerCase();
        }         
      }   
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const measures = {
      'gal':  'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi':  'km',
      'km': 'mi'
    } 
    let result = measures[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    
    const measures = {
      'gal':  'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi':  'miles',
      'km': 'kilometers'
    }        
    
    let result= measures[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const measures = {
      'gal':  3.78541,
      'L': 1/3.78541,
      'lbs': 0.453592,
      'kg': 1/0.453592,
      'mi':  1.60934,
      'km': 1/1.60934
    };
    let result = measures[initUnit] * initNum;  
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === null || initUnit === null || returnNum === null || returnUnit === null ){
      return null;
    }
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
    
  };

}

module.exports = ConvertHandler;
