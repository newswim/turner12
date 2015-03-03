// Initialize the Swiper

this.Swiper = new Swipe(['geometries', 'page1', 'page2', 'page3', 'page4', 'page5']);

Template.main.helpers({
  Swiper: function() {
    return Swiper;
  }
});

// If an element controls swiping, make sure to include the `swipe-control` class.
// Then to use the control, use `swipeControl`.


Swiper.click('page1', '.next', function(e, t) {
  return Swiper.moveRight();
});

Swiper.click('page2', '.big-right', function(e, t) {
  return Swiper.moveRight();
});

Swiper.click('page2', '.custom-transition', function(e, t) {
  return Swiper.transitionRight('page5');
});

Swiper.click('page5', '.left-to-page4', function(e, t) {
  return Swiper.transitionLeft('page4');
});

Swiper.click('page5', '.right-to-page1', function(e, t) {
  return Swiper.transitionRight('page1');
});

Swiper.click('page3', '.right-to-page1', function(e, t) {
  return Swiper.transitionRight('page1');
});

Swiper.click('page1', '.pop-up', function(e, t) {
  return alert('you cant swipe on this page. only transition left and right and see a pop up.');
});

Template.main.rendered = function() {
  
  var removePage4;

  //    starting page
  Swiper.setInitialPage(Router.current().route.getName());

  // initially, you cant swipe left. but once you go around the loop, page4 drops
  // off. This tests to see that the animation completes and page4 doesnt disappear
  // before it is done animating.

  // once page4 drops off, we have 3 pages. We can scroll through these fast to make
  // sure that the pages wrap around without animating in front of us.

  removePage4 = false;
  Tracker.autorun(function() {
    if (Swiper.pageIs('page1')) {
      Router.go('page1');
      if (removePage4) {
        return Swiper.leftRight('page3', 'page2');
      } else {
        return Swiper.leftRight(null, 'page2');
      }
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('page2')) {
      Router.go('page2');
      return Swiper.leftRight('page1', 'page3');
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('page3')) {
      Router.go('page3');
      if (removePage4) {
        return Swiper.leftRight('page2', 'page1');
      } else {
        return Swiper.leftRight('page2', 'page4');
      }
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('page4')) {
      Router.go('page4');
      removePage4 = true;
      return Swiper.leftRight('page3', 'page1');
    }
  });
  return Tracker.autorun(function() {
    if (Swiper.pageIs('page5')) {
    //  you're stuck here. must use a control!
      Router.go('page5');
      return Swiper.leftRight(null, null);
    }
  });
};

// --------------------------------------------------------------
// converted from coffeeScript back to JS by http://js2.coffee/
// --------------------------------------------------------------