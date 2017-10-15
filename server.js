let imageSearch = require('image-search-google');
let mongo = require('mongodb').MongoClient;
let express = require('express');
let app = express();

function errorJSON(error){
  return {
            "Error" : error
         };
}

// serve static files from the 'public' folder
app.use(express.static('public'));

//db uri
let uri = process.env.DB_URI;

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:terms", (request,response) => {
  
  let client = new imageSearch(process.env.CSE_ID, process.env.API_KEY);
  let terms = request.params.terms;
  let page = Number(request.query.page) ? Number(request.query.page) : 1;
  //console.log(`page = ${page} ; terms = ${terms}`);
  let options = {page: page};
  client.search(terms, options)
      .then(images => {
          if(images.statusCode)
            response.json(errorJSON("Invalid page number. Please try a lower number."));
          else{
             mongo.connect(uri, (err, db) => {
              if (err)
                return errorJSON("A database error occured.");
              let history = db.collection('history');
              history.insert({
                "Term" : terms,
                "Time" : new Date()
              })
             });
            
            response.json(images.map(image => ({
              "URL" : image.url, 
              "Title": image.snippet,
              "Page URL": image.context
              })));
            }
        })
      .catch(error => console.log(error));
  })

// get search history
app.get('/recent', (request, response) => {
   mongo.connect(uri, (err, db) => {
      if (err)
        return errorJSON("A database error occured.");
     
      let history = db.collection('history');
      history.find().sort({Time: -1}).toArray((err, documents) => {
        if (err)
          return errorJSON("A database error occured.");
        
        if(documents.length === 0) // short code not in database
          return response.json(errorJSON("No search terms in history."));

        response.json(documents);
      });
    });
});

//handle 404 (page not found)
app.get('*', (request, response) => {
  response.status(404);
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  //console.log('Your app is listening on port ' + listener.address().port);
});
