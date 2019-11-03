const { wordify } = require('../../../../src/exercises/aws-js-2019/number-wordifier');

describe('AWS JS coding challenge 2019: number wordifier', () => {
   it('should properly wordify numbers', () => {
       expect(wordify(1000000)).to.equal('One million');
       expect(wordify(1545120)).to.equal('One million, five hundred and forty-five thousand, one hundred and twenty');
       expect(wordify(999999999.99)).to.equal('Nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine and 99/100');
       expect(wordify(245.13)).to.equal('Two hundred and forty-five and 13/100');
   });

   it('should properly wordify integers less than one thousand', () => {
       expect(wordify(0)).to.equal('Zero');
       expect(wordify(1)).to.equal('One');
       expect(wordify(2)).to.equal('Two');
       expect(wordify(10)).to.equal('Ten');
       expect(wordify(11)).to.equal('Eleven');
       expect(wordify(12)).to.equal('Twelve');
       expect(wordify(100)).to.equal('One hundred');
       expect(wordify(101)).to.equal('One hundred and one');
       expect(wordify(123)).to.equal('One hundred and twenty-three');
       expect(wordify(999)).to.equal('Nine hundred and ninety-nine');
   });

   it('should properly wordify integers one thousand or greater', () => {
       expect(wordify(1000)).to.equal('One thousand');
       expect(wordify(1001)).to.equal('One thousand and one');
       expect(wordify(1000000)).to.equal('One million');
       expect(wordify(1001001)).to.equal('One million, one thousand, one');
       expect(wordify(1111111)).to.equal('One million, one hundred and eleven thousand, one hundred and eleven');
       expect(wordify(1000000000)).to.equal('One billion');
       expect(wordify(9999999999)).to.equal('Nine billion, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine');
   });

   it('should properly wordify numbers with integers and decimals', () => {
       expect(wordify(100.1)).to.equal('One hundred and 1/10');
       expect(wordify(100.99)).to.equal('One hundred and 99/100');
       expect(wordify(100.01)).to.equal('One hundred and 1/100');
       expect(wordify(1001001.01)).to.equal('One million, one thousand, one and 1/100');
   });
});
