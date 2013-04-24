$(document).ready(function () {

  var articleInput = $('#articleInput');
  var inputWrap = $('#inputWrap');
  var resultWrap = $('#resultWrap');
  var output = $('#output');
  articleInput.focus();

  function countWords (text, words) {
    var i, word, reg, count, statsArr = [], l = words.length;

    for (i=0; i< l; i += 1) {
      word = words[i];
      reg = new RegExp(word, 'g');
      count = text.match(reg).length;
      if (count > 0) {
        statsArr.push({
          word: word,
          count: count
        });
        text = text.replace(reg, '<span class="red">' + word + '</span>');
      }
    }

    return {
      stats: statsArr,
      text: text
    };
  }

  $('#startCheck').click(function (e) {
    e.preventDefault();
    // TODO: check the input text
    var text = articleInput.val(), result;
    var redWords = ['认真贯彻'];

    result = countWords(text, redWords);

    // Beautify for display
    output.html('<pre>' + result.text + '</pre>');
    
    inputWrap.hide();
    resultWrap.show();
  });

  $('#reInput').click(function (e) {
    e.preventDefault();
    // TODO: remove the result
    resultWrap.hide();
    inputWrap.show();
    articleInput.focus();
  });
});
