UI.registerHelper("isCurrentRoute", function(routeName){
  return Router.current().route.getName() === routeName;
});

UI.registerHelper("prettifyDate", function(timestamp) {
 App.prettifyDate(timestamp);
});