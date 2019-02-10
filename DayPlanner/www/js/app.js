var breakfastItem = [{
    name: 'pancakes',
    str: 'Make some pancakes'
  },
  {
    name: 'leftoverPizza',
    str: 'Grab a slice of leftover pizza'
  },
  {
    name: 'cereal',
    str: 'Pour a bowl of cereal'
  }, {
    name: 'oatmeal',
    str: 'Whip up some oatmeal'
  }, {
    name: 'waffles',
    str: 'Go for waffles'
  }, {
    name: 'eggs',
    str: 'Make an omlette with bacon'
  }
];
breakfastItem = shuffle(breakfastItem);

var drinks = [{
  name: 'coffee',
  str: 'Have a cup of coffee'
}, {
  name: 'tea',
  str: 'Have a cup of tea'
}, {
  name: 'beer',
  str: 'Have a beer'
}, {
  name: 'ceaser',
  str: 'Have a ceaser'
}, {
  name: 'juice',
  str: 'Have a a glass of orange juice'
}, {
  name: 'milk',
  str: 'Pour a glass of milk'
}, {
  name: 'water',
  str: 'Late night, have some water'
}];
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

var afternoonActivities = [{
  name: 'beach',
  str: 'Go to the beach'
}, {
  name: 'wow',
  str: 'Play World of Warcraft'
}, {
  name: 'bed',
  str: 'Go back to bed'
}, {
  name: 'errand',
  str: 'Run some errands'
}, {
  name: 'chores',
  str: 'Do some chores'
}, {
  name: 'tv',
  str: 'Binge your favorite show'
}, {
  name: 'bake',
  str: 'Bake some goodies'
}];
afternoonActivities = shuffle(afternoonActivities);

var sessionChoices = [breakfastItem, drinks, morningActivities, lunchItems, afternoonActivities];
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
  }, {
    path: '/ChoicesPage/',
    url: '../pages/ChoicesPage.html'
  }, {
    path: '/DayPlanned/',
    url: '../pages/DayPlanned.html'
  }]
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

  document.getElementById('doneBtn').onclick = function () {
    self.app.views.main.router.navigate('/DayPlanned/')
  };
});

$$(document).on('page:init', '.page[data-name="DayPlanned"]', function () {
  $('#plannedStr').html(getDayStr());
  
  function getDayStr() {
    return `After you wake up you will ${userChoices[0].str} and ${userChoices[1].str}, once you are done breakfast it is time to ${userChoices[2].str}. After a couple hours it will be time for lunch, you will ${userChoices[3].str}, good call! Now feeling nice and full it's time to ${userChoices[4].str} and more to come...`
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