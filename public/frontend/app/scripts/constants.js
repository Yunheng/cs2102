module.exports.countryCode = [
  'ID',
  'MY',
  'PH',
  'SG',
  'VN'
];

module.exports.category = [
  'charity',
  'personal',
  'community'
];
var range = function(num1, num2) {
  let array = [];
  for(let i = num1; i <= num2; i++){
    array.push(i);
  }
  return array;
};
module.exports.month = range(0, 11);

module.exports.year = range(2016, 2025);
