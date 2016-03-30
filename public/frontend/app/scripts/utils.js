module.exports.displayTime = function(timestamp){
  var time = new Date(timestamp);
  return time.getDay() + '/' + time.getMonth() + '/' + time.getYear();
}