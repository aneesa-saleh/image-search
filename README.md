# Image Search Abstraction Microservice
Returns an array of JSON objects showing images related to a particular search term.

## Usage
* Pass a search term in the URL to get JSON object of related images.
* Use 'page' to select which page to display from.
* Get the last 20 searches by using 'recent'.

### Example
#### Get related images from a search term:
* https://as-image-search.glitch.me/search/baby%20dresses?page=1

#### Get last 20 searches:
* https://as-image-search.glitch.me/recent

#### Sample JSON Output:

``` 
{ 
  "URL": "https://as-url-shortener.glitch.me/9P9QX", 
  "Title": "https://google.com",
  "Page URL": "https://google.com"
} 
```

#### Sample Error:
```
{
  "Error": "Code not recognized."
}
```



