$(document).ready(function () {

  var articleInput = $('#articleInput');
  var inputWrap = $('#inputWrap');
  var resultWrap = $('#resultWrap');
  var output = $('#output');
  var redWordsList = $('#redWords ul');

  articleInput.focus();

  function countWords (text, words) {
    var i, word, reg, count, match, statsArr = [], l = words.length;

    for (i=0; i< l; i += 1) {
      word = words[i];
      reg = new RegExp(word, 'g');
      match = text.match(reg);
      count = match ? match.length : 0;
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

  function renderStats(stats, node) {
  }

  $('#startCheck').click(function (e) {
    e.preventDefault();
    // TODO: check the input text
    var text = articleInput.val(), result, i, tmp;
    var redWords = ['认真贯彻'];

    result = countWords(text, redWords);

    output.html('<pre>' + result.text + '</pre>');

    if (result.stats.length > 0) {
      for (i = 0; i< result.stats.length; i += 1) {
        tmp = result.stats[i];
        redWordsList.append('<li><span>' + tmp.word + '</span> x ' + tmp.count + '</li>');
      }
    } else {
      redWordsList.append('<li>无</li>');
    }
    
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
