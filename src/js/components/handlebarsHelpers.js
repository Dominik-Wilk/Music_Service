Handlebars.registerHelper('name', function (context) {
  let str = context;

  str = str.slice(0, -4);
  let parts = str.split('_');
  parts = parts.slice(-2);
  let artist = parts.join(' ');
  return artist;
});

Handlebars.registerHelper('toString', function (context) {
  let arr = context;
  let str = arr.join(', ').toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
});
