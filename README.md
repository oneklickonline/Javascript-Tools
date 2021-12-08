# Javascript Tools
Contains all the needed javascript files

dateTime.js file is required when you need to display time or date or both on your web page

# function.js
function.js provides most of the ajax related functions to sumbit html forms, return response from a server after request etc.

Function.js depends on  loader-preview.js and so these two files must always be linked together in any web page where it is to be used

# loader-preview.js
loader-preview.js provides simple methods like:- 
# showLoader()
This displays an overlay with a loading icon along side a message telling the user that request is beeing sent to server.
# hideLoader() method:
this method closes the overlay once called

the loader-preview.js also contains an object called preloader. the preloader object provides show() method which displays only a loader icon on any of the targeted DOM element.

preloader.show(dom): It takes string form of html class or id name which targets a particular element in the html document.

Note: the loader.preview.js file depends on JQuery.js to function. so you must link a jquery file to you page before linking the loader-preview.js
