module.exports.validate = function(bracket_list) {

  //empty parameter
  if(!bracket_list.length){
    return 'empty input';
  }

  //odd length
  if(bracket_list.length % 2!=0){
    return 'invalid length';
  }
  
  var supported_characters = "[]{}()";
  var result = [];

  for (var i = 0; i < bracket_list.length; i++) {
    var character = bracket_list[i];

    //invalid character
    if(supported_characters.indexOf(character)<0){  
      return 'invalid character';
    }

    var position = supported_characters.indexOf(character);
    var controll = position % 2 ? 'end' : 'init';
    
    if (controll === 'init') {
      result.push(character);
    } else {
      if (supported_characters.indexOf(result.pop()) != position - 1){
        return false;
      }
    }
  }

  return !result.length;
}