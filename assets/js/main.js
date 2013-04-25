$(document).ready(function () {

  var articleInput = $('#articleInput');
  var inputWrap = $('#inputWrap');
  var resultWrap = $('#resultWrap');
  var output = $('#output');
  var redWordsList = $('#redWords ul');
  var uglyWordsList = $('#uglyWords ul');
  var toggleCtrl = $('.toggleCtrl');

  articleInput.focus();

  function countWords (text) {
    var i, word, reg, count, percent, match, redStatsArr = [], uglyStatsArr = [], l, total;
    total = text.length;

    // red words
    l = RED_WORDS.length;
    for (i=0; i< l; i += 1) {
      word = RED_WORDS[i];
      reg = new RegExp(word, 'g');
      match = text.match(reg);
      count = match ? match.length : 0;
      if (count > 0) {
        redStatsArr.push({
          word: word,
          count: count
        });
        text = text.replace(reg, '<span class="red">' + word + '</span>');
      }
    }

    redStatsArr.sort(function (a, b) {
      return (a.count === b.count) ? 0 : (a.count > b.count ? -1 : 1);
    });

    // ugly words
    l = UGLY_WORDS.length;
    for (i=0; i< l; i += 1) {
      word = UGLY_WORDS[i];
      reg = new RegExp(word, 'g');
      match = text.match(reg);
      count = match ? match.length : 0;
      percent = Math.round(count / total * 10000) / 100.00;
      if (percent > 0) {
        uglyStatsArr.push({
          word: word,
          percent: percent
        });
        text = text.replace(reg, '<span class="ugly">' + word + '</span>');
      }
    }

    uglyStatsArr.sort(function (a, b) {
      return (a.percent === b.percent) ? 0 : (a.percent > b.percent ? -1 : 1);
    });

    return {
      redStats: redStatsArr,
      uglyStats: uglyStatsArr,
      text: text
    };
  }

  function renderStats(stats, node) {
    var i, tmp;

    if (stats.length > 0) {
      for (i = 0; i< stats.length; i += 1) {
        tmp = stats[i];
        if (tmp.count) {
          node.append('<li><span>' + tmp.word + '</span> x ' + tmp.count + '</li>');
        } else {
          node.append('<li><span>' + tmp.word + '</span> ' + tmp.percent + ' %</li>');
        }
      }
    } else {
      node.append('<li>无</li>');
    }
  }

  $('#startCheck').click(function (e) {
    e.preventDefault();
    var text = $.trim(articleInput.val()), result, i, tmp;
    if (text.length <= 0) {
      return;
    }

    result = countWords(text);
    renderStats(result.redStats, redWordsList);
    renderStats(result.uglyStats, uglyWordsList);

    output.html('<pre>' + result.text + '</pre>');
    
    inputWrap.hide();
    resultWrap.show();
  });

  toggleCtrl.change(function (e) {
    var className = $(this).attr('data-class');

    if ($(this).is(':checked')) {
      output.addClass(className);
      $('#stats').addClass(className);
    } else {
      output.removeClass(className);
      $('#stats').removeClass(className);
    }
  });

  $('#reInput').click(function (e) {
    e.preventDefault();

    output.html('');
    redWordsList.html('');
    uglyWordsList.html('');
    toggleCtrl.prop('checked', true).trigger('change');

    resultWrap.hide();
    inputWrap.show();
    articleInput.focus();
  });
});
