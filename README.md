# Image Search Abstraction Microservice
Returns an array of JSON objects of images related to a particular search term.

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
  "URL": "http://www.carters.com/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dwcbd14ecc/productimages/118H540.jpg?sw=244",
  "Title": "Baby Girl Dresses & Rompers | Carter's | Free Shipping",
  "Page URL": "http://www.carters.com/carters-baby-girl-dresses"
}
```

#### Sample Error:
```
{
  "Error": "Invalid page number. Please select a lower number."
}
```



