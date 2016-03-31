module.exports.displayTime = function(timestamp){
  var time = new Date(timestamp);
  return time.getDay() + '/' + time.getMonth() + '/' + time.getYear();
}

module.exports.range = function(num1, num2) {
  let array = [];
  for(let i = num1; i <= num2; i++){
    array.push(i);
  }
  return array;
};

module.exports.calculateDaysPassed = function(start, end){
  return end.diff(start, 'days');
};