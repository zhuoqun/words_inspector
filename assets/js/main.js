$(document).ready(function () {

  var articleInput = $('#articleInput');
  var inputWrap = $('#inputWrap');
  var resultWrap = $('#resultWrap');
  var output = $('#output');
  articleInput.focus();

  $('#startCheck').click(function (e) {
    e.preventDefault();
    // TODO: check the input text
    var text = articleInput.val();

    // Beautify for display
    output.html('<pre>' + text + '</pre>');
    
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
