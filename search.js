function getSelectedText() {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    }
    
    function deselectText() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.getSelection) {
            txt = document.getSelection().removeAllRanges();
        } else if (document.selection) {
            txt = document.selection.empty;
        }

    }

var body,
    instance;

var s = '<span class="hglt2></span>'; // HTML string
var div = document.createElement('div');
div.innerHTML = s;
var node = div.firstChild;

function findNew (e) {
    var t = getSelectedText().toString().trim();
    if (t==='') return;
    var regex = new RegExp('\\b'+t+'\\b', "gi")
    // var regex = new RegExp('/b'+t+'/b', "gi")
    // revert the last find
    instance && instance.revert();
    // find new
    instance = findAndReplaceDOMText(body, {
        preset: 'prose',
        find: regex,
        replace: function(fill) {
            var el = document.createElement('span');
            el.className = 'hglt2';
            el.innerHTML = fill.text;
            return el;
        }
    });
    deselectText();
    }

$(document).ready(function() {
    body =  document.body;
    $(body).dblclick(function(evt) {
      if (evt.altKey)
      findNew(this);
    });
    $(body).mouseup(function(evt) {
      if (evt.altKey)
      findNew(this);
    });
    
});
