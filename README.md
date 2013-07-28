MUI.js - M..(y) UI Builder Framework ;)
======

Demos
---
* http://www.vorburger.ch/MUI.js/angular-addressbook/app/index.html

Background
---

MUI.JS is currently a sandbox where I try to experiment with 
modeling/rendering/editing/serializing UIs in pure Java Script.

It is the continuation of my earlier UFTAM + MUI.Java where I toyed with similar ideas,
but based instead on server-side Java, with e.g. Vaadin as preferred Web UI framework,
and Xtext for a UI Model DSL, plus some Data Binding dabblings I engaged in during 2012. 

MUI.JS Core should remain as independent as possible from JS frameworks 
(e.g. jQuery or YUI or qooxdoo etc.) & ecosystems (e.g. Node.js), so that
it may be used with any of them.


Support
---

Support the development of MUI.js with a GitTip: <iframe style="border: 0; margin: 0; padding: 0;" src="https://www.gittip.com/vorburger/widget.html" width="48pt" height="22pt"></iframe>
 
 
JS Dev - Lessons Learnt, Tips & Tricks
====

Tools etc.
---

$ python -m SimpleHTTPServer
... is very handy!

$ grunt server  (WAS: yeoman server)
... is even better, as it listens for changes (but doesn't detect them in JS?)

$ grunt
... builds dist/, with JS+CSS concatenated and (some) minification

http://net.tutsplus.com/tutorials/tools-and-tips/meet-bower-a-package-manager-for-the-web/
http://blog2.vorburger.ch/2013/07/bower1.html
$ bower lookup angular-ui-router	
$ bower install jquery
$ bower ls

$ scripted from https://github.com/scripted-editor/scripted/ is great! Just:
	* Have a .scripted in your project root (especially if you don't have a .project)
	* Have a .jshintrc with { "browser" : true } for it to know about document.
	* Add "jquery" : true to .jshintrc for it not to whine about jQuery. + $(function() { (@see )

* AngularJS Chrome extension plug-in; nice! https://github.com/angular/angularjs-batarang

* JetBrains WebStorm built-in web server: http://localhost:63342/angular-addressbook/app/index.html#/main/contacts


Code
----

* JavaScript Source Maps!  Chrome Wheel [X] Enable Source Maps
  I had to hack jquery-1.9.1.min.js to point to the correct *.map
  http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/

* console.log(someObject).. but, even better, why not just always Use The Debugger!


One-time setup (some/many completely OPTIONAL)
---

* yeoman ...

* https://developers.google.com/closure/utilities/docs/linter_howto
$ sudo apt-get install python-setuptools
$ sudo easy_install http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz
$ ./gjslint

$ ./closure-compiler.sh
  but see https://code.google.com/p/closure-compiler/issues/detail?id=941

