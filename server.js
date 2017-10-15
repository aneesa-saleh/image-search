let imageSearch = require('image-search-google');

// init project
let express = require('express');
let app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:terms", (request,response) => {
  
  let client = new imageSearch(process.env.CSE_ID, process.env.API_KEY);
  let terms = request.params.terms;
  let page = Number(request.query.page) ? Number(request.query.page) : 1;
  console.log(`page = ${page} ; terms = ${terms}`);
  let options = {page: page};
  client.search(terms, options)
      .then(images => {
          if(images.statusCode)
            response.json({Error : "Invalid page number. Please select a lower number."});
          else
            response.json(images.map(image => ({
              "URL" : image.url, 
              "Title": image.snippet,
              "Page URL": image.context
            })));
      })
      .catch(error => console.log(error));
  })

//handle 404 (page not found)
app.get('*', function(request, response){
  response.status(404);
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
