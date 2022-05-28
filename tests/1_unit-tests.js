const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   test('Whole number input', (done) => {
     let input = '32L';
     assert.equal(convertHandler.getNum(input), 32);
     done();
   });
  
   test('Decimal number input', (done) => {
     let input = '3.5km';
     assert.equal(convertHandler.getNum(input), 3.5);
     done();
   });
  
   test('Fractional input', (done) => {
     let input = '1/2lbs';
     assert.equal(convertHandler.getNum(input), 1/2);
     done();
   });

   test('Fractional input with a decimal', (done) => {
     let input = '2.5/2km';
     assert.equal(convertHandler.getNum(input), 2.5/2);
     done();
   }); 

   test('Default to a numerical input of 1', (done) => {
     let input = '3/2/3mi';
     assert.equal(convertHandler.getNum(input), null);
     done();
   });
  
   test('Default to a numerical input of 1', (done) => {
     let input = 'kg';
     assert.equal(convertHandler.getNum(input), 1);
     done();
   });

   suite('ConvertHandler.getUnit',() => {
     test('Read each valid input unit', (done) => {
       // [[input, expected]]
       let inputs = [
        ['gal', 'gal'],
        ['L', 'L'],
        ['kg', 'kg'],
        ['lbs', 'lbs'],
        ['mi',  'mi'],
        ['km', 'km']       
       ];
       
       inputs.forEach(input => {
         assert.equal(convertHandler.getUnit(input[0]), input[1]);
       });     
       done();
     });
   });
  
   test('Error for an invalid input unit', (done) => {
     let input = 'kgs';
     assert.equal(convertHandler.getUnit(input), null);
     done();
   });

    suite('ConvertHandler.getReturnUnit', () => { 
     test('Converted unit for each valid input unit', (done) => {
       // [[input, expected]]
       let inputs = [
        ['gal', 'L'], 
        ['L', 'gal'],
        ['kg', 'lbs'],
        ['lbs', 'kg'],
        ['mi',  'km'],
        ['km', 'mi']       
       ];
       
       inputs.forEach(input => {
         assert.equal(convertHandler.getReturnUnit(input[0]), input[1]);
       });     
       done();
     });
    });

    suite('ConvertHandler.spellOutUnit',() => {
     test('Spelled-out string unit for each valid input', (done) => {
       // [[input, expected]]
       let inputs = [
        ['gal', 'gallons'],
        ['L', 'liters'],
        ['kg', 'kilograms'],
        ['lbs', 'pounds'],
        ['mi',  'miles'],
        ['km', 'kilometers']       
       ];
       
       inputs.forEach(input => {
         assert.equal(convertHandler.spellOutUnit(input[0]), input[1]);
       });     
       done();
     }); 
    });

    suite('ConvertHandler.convert',() => {

      test('Gal to L', (done) => {
         let input = [5, 'gal'];
         let expec = 18.92705;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });
      
      test('L to Gal', (done) => {
         let input = [2, 'L'];
         let expec = 0.52834;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });
      
      test('Mi to Km', (done) => {
         let input = [1.5, 'mi'];
         let expec = 2.41401;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });

       test('Km to Mi', (done) => {
         let input = [2, 'km'];
         let expec = 1.24275;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });
      
       test('Lbs to Kg', (done) => {
         let input = [1/2, 'lbs'];
         let expec = 0.22680;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });
      
       test('Kg to Lbs', (done) => {
         let input = [3.75, 'kg'];
         let expec = 8.26734;
         assert.equal(convertHandler.convert(input[0], input[1]), expec);
         done();
       });      
    });
  
});