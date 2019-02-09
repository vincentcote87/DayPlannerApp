var drinks = [{
    name: 'coffee',
    str: 'Have a cup of coffee'
  },
  {
    name: 'tea',
    str: 'Have a cup of tea'
  },
  {
    name: 'beer',
    str: 'Have a beer'
  }, {
    name: 'tea',
    str: 'Have a ceaser'
  }
];
drinks = shuffle(drinks);

var morningActivities = [{
  name: 'news',
  str: 'Watch the news'
}, {
  name: 'tv',
  str: 'Binge your favorite show'
}, {
  name: 'gym',
  str: 'Go to the gym'
}, {
  name: 'bed',
  str: 'Go back to bed'
}, {
  name: 'book',
  str: 'Read a book'
}, {
  name: 'wow',
  str: 'Play World of Warcraft'
}, {
  name: 'skill',
  str: 'Learn a new skill'
}];
morningActivities = shuffle(morningActivities);

var lunchItems = [{
  name: 'pizza',
  str: 'Order a pizza'
}, {
  name: 'sandwhich',
  str: 'Make a sandwich'
}, {
  name: 'sushi',
  str: 'Go get sushi'
}, {
  name: 'fastFood',
  str: 'Go get fast food'
}, {
  name: 'salad',
  str: 'Have a salad'
}];
lunchItems = shuffle(lunchItems);

var sessionChoices = [drinks, morningActivities, lunchItems];
var userChoices = [];

function Choice(question, c1, c2, c3) {
  this.question = question;
  this.choice1 = c1;
  this.choice2 = c2;
  this.choice3 = c3;
}

var app = new Framework7({
  root: "#app",
  routes: [{
      path: '/home/',
      url: '../index.html'
    },
    {
      path: '/ChoicesPage/',
      url: '../pages/ChoicesPage.html'
    }
  ]
});

var $$ = Dom7;
var mainView = app.views.create('.view-main');

document.getElementById('startBtn').onclick = function () {
  self.app.views.main.router.navigate('/ChoicesPage/')
};

$$(document).on('page:init', '.page[data-name="ChoicesPage"]', function () {
  initChoices();
  console.log(findObject('tea'));
  var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
  });

  $('.item-content').on('click', function () {
    $(this).closest('ul').children().addClass('disabled');
    userChoices.push(findObject($('input', this).val()));
    swiper.slideNext();
    console.log(userChoices);
  });

  function initChoices() {
    for (var i = 0; i < sessionChoices.length; ++i) {
      displayChoice(`q${i + 1}c1`, sessionChoices[i][0]);
      displayChoice(`q${i + 1}c2`, sessionChoices[i][1]);
      displayChoice(`q${i + 1}c3`, sessionChoices[i][2]);
    }
  }

  function displayChoice(id, choice) {
    $(`#${id} > div.item-inner`).children().html(`<span>${choice.str}</span>`);
    $(`#${id} > input`).val(choice.name);
  }

  function findObject(name) {
    var obj;
    for (var i = 0; i < sessionChoices.length; ++i) {
      sessionChoices[i].find(function (e) {
        if (e.name == name) 
          obj = e;
      })
    }
    return obj;
  }
});

//source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}