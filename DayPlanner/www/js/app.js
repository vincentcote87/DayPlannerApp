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
  str: 'Have a glass of orange juice'
}, {
  name: 'milk',
  str: 'Pour a glass of milk'
}, {
  name: 'water',
  str: 'Have a glass of water'
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

var dinnerItem = [{
  name: 'spaghetti',
  str: 'Make some spaghetti'
}, {
  name: 'fancyMeal',
  str: 'Cook a five course meal'
}, {
  name: 'niceRestaurent',
  str: 'Go out to a nice restaurent'
}, {
  name: 'pizza',
  str: 'Order a pizza',
}, {
  name: 'breakfast',
  str: 'Have breakfast for dinner'
}, {
  name: 'kd',
  str: 'Make a pot of Kraft Dinner'
}, {
  name: 'burger',
  str: 'Go out for a burger'
}];
dinnerItem = shuffle(dinnerItem);

var eveningActivities = [{
  name: 'movie',
  str: 'Go to the movie theaters'
}, {
  name: 'drinks',
  str: 'Go out for drinks with firends'
}, {
  name: 'hockey',
  str: 'Go watch a hockey game'
}, {
  name: 'book',
  str: 'Read a book',
}, {
  name: 'netflix',
  str: 'Turn on Netflix and watch a movie'
}, {
  name: 'videoGames',
  str: 'Play some video games'
}, {
  name: 'walk',
  str: 'Go for a walk'
}];
eveningActivities = shuffle(eveningActivities);

var nightActivities = [{
  name: 'sleep',
  str: 'Go to bed for the night'
}, {
  name: 'bath',
  str: 'Have a relaxing bath before bed'
}, {
  name: 'stayUp',
  str: 'Stay up all night playing games'
}, {
  name: 'scaryMovie',
  str: 'Watch scary movies in the dark',
}, {
  name: 'call',
  str: 'Call a friend to talk about your day'
}];
nightActivities = shuffle(nightActivities);

var sessionChoices = [
  breakfastItem,
  drinks,
  morningActivities,
  lunchItems,
  afternoonActivities,
  dinnerItem,
  eveningActivities,
  nightActivities
];
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
    path: '/ChoicesPage/:computerChoice/',
    url: '../pages/ChoicesPage.html'
  }, {
    path: '/DayPlanned/',
    url: '../pages/DayPlanned.html'
  }]
});

var $$ = Dom7;
var mainView = app.views.create('.view-main');

document.getElementById('startBtn').onclick = function () {
  self.app.views.main.router.navigate('/ChoicesPage/false/')
};

document.getElementById('luckyBtn').onclick = function () {
  self.app.views.main.router.navigate('/ChoicesPage/true/')
};

$$(document).on('page:init', '.page[data-name="ChoicesPage"]', function (e) {
  initChoices();

  var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
  });

  $('.choose').on('click', function () {
    chooseRandom($(this).attr('data-question'));
  });

  $('.item-content').on('click', function () {
    $(this).closest('ul').children().addClass('disabled');
    userChoices.push(findObject($('input', this).val()));
    if ($(this).attr('data-last') == 'true') {
      self.app.views.main.router.navigate('/DayPlanned/');
    } else {
      swiper.slideNext();
    }
  });

  if (e.detail.route.params.computerChoice == 'true') {
    setTimeout(function() {chooseWithDelay(1);}, 800);
    // chooseWithDelay(1);
  };
 
  function chooseWithDelay(i) {
    if (i <= sessionChoices.length) {
      console.log(i);
      chooseRandom(`q${i}`);
      setTimeout(function() {
        chooseWithDelay(i + 1);
      }, 800)
    }
  }

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

  function chooseRandom(id) {
    var choice = Math.floor(Math.random() * 3) + 1;
    $(`#${id}c${choice} > input`).attr('checked', 'checked');
    setTimeout(function () {
      $(`#${id}c${choice}`).trigger('click');
    }, 300);
  }

});

$$(document).on('page:init', '.page[data-name="DayPlanned"]', function () {
  $('#plannedStr').html(getDayStr());

  function getDayStr() {
    return `After you wake up you will ${userChoices[0].str.toLowerCase()} and ${userChoices[1].str.toLowerCase()}, once you are done breakfast it is time to ${userChoices[2].str.toLowerCase()}. After a couple hours it will be time for lunch, you will ${userChoices[3].str.toLowerCase()}, good call! Now feeling nice and full it's time to ${userChoices[4].str.toLowerCase()}. That was a pretty busy afternoon, for dinner you will ${userChoices[5].str.toLowerCase()}. The day is almost over but why not ${userChoices[6].str.toLowerCase()}. It's now almost time to turn in, let's finish strong and ${userChoices[7].str.toLowerCase()}! <br><br> Looks like you have a busy day ahead of you, better get to it!`
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