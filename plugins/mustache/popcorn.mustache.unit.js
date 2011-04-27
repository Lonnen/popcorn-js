test('Popcorn Mustache Plugin', function () {

  var popped = Popcorn('#video'),
      expects = 7,
      count = 0,
      mustacheDiv = document.getElementById('mustache-div');

  expect( expects );

  function plus() {
    if ( ++count === expects) {
      start();
    }
  }

  stop();

  ok('mustache' in popped, 'mustache is a method of the popped instance');
  plus();

  equals ( mustacheDiv.innerHTML, '', 'initially, there is nothing inside the mustache-div' );
  plus();
  
  // Ensure Mustache is Loaded
  popped.mustache({
    start: 1, // seconds
    end:   3, // seconds
    template: '<h1>{{heading}}</h1>',
    data: '{"heading": "mustache - test 1/4"}',
    target: 'mustache-div',
    dynamic: false
  } );

  // Static strings
  popped.mustache({
    start: 5, // seconds
    end: 7, // seconds
    template: '<h1>{{heading}}</h1>',
    data: '{"heading": "mustache - test 2/4"}',
    target: 'mustache-div',
    dynamic: false
  } );

  // Dynamic functions
  popped.mustache({
    start: 9, // seconds
    end: 11, // seconds
    template: function(plugin, options) {
      return '<h1>{{heading}}</h1>';
    },
    data: function(plugin, options) {
      return JSON.parse('{"heading": "mustache - test 3/4"}');
    },
    target: 'mustache-div',
  } );

  // Template + Object literal
  popped.mustache({
    start: 13, // seconds
    end: 15, // seconds
    template: function(plugin, options) {
      return '<h1>{{heading}}</h1>';
    },
    data: { heading: 'mustache - test 4/4' },
    target: 'mustache-div',
    dynamic: false
  } );

  var video = document.getElementById('video');
  var two = six = ten = fourteen = false;

  video.addEventListener('timeupdate', function() {

    function pass(a, b) {
      equals( mustacheDiv.innerHTML, '<h1>mustache - test ' + a + '/' + b + '<\/h1>','Mustache template rendered' );
      plus();
    }

    function unchanged(a, b) {
      equals( mustacheDiv.innerHTML, '', 'Mustache template not rendered' );
      plus();
    }

    var t = Math.floor(video.currentTime),
        swap;
   
   if (t === 2 && !two) {
      unchanged(1, 4);
      two = true;
      delayedGetScript.execute(); // defined in setup
    } else if (t === 6 && !six) {
      pass(2, 4);
      six = true;
    } else if (t === 10 && !ten) {
      pass(3, 4);
      ten = true;
    } else if (t === 14 && !fourteen) {
      pass(4, 4);
      ten = true;
    }

    if (t === 16) {
      equals( delayedGetScript.count === 1 );
      plus();
      video.pause();
    }

  }, false);

  popped.volume(0);
  popped.play();
});
