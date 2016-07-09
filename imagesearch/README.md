#API: Image Search Abstraction Layer

##User Story:
I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

I can paginate through the responses by adding a ?offset=2 parameter to the URL.

I can get a list of the most recently submitted search strings.
 
##Usage:
Get JSON response of a given search string:
https://pro-myprtfl.c9users.io/api/imagesearch/v1/lolcats%20funny

Get JSON response of offset:
https://pro-myprtfl.c9users.io/api/imagesearch/v1/lolcats%20funny?offset=2

Get JSON of the most recently submitted search strings:
https://pro-myprtfl.c9users.io/api/imagesearch/v1/?latest