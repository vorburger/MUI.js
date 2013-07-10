MUI.js - Michael's ;) UI Framework, dot JS
======

MUI.JS is currently a sandbox where I try to experiment with 
modeling/rendering/editing/serializing UIs in pure Java Script.

It is the continuation of my earlier UFTAM + MUI.Java where I toyed with similar ideas,
but based instead on server-side Java, with e.g. Vaadin as preferred Web UI framework,
and Xtext for a UI Model DSL, plus some Data Binding dabblings I engaged in during 2012. 

MUI.JS Core should remain as independent as possible from JS frameworks 
(e.g. jQuery or YUI or qooxdoo etc.) & ecosystems (e.g. Node.js), so that
it may be used with any of them.
 
 
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

$ scripted from https://github.com/scripted-editor/scripted/ is great! Just:
	* Have a .scripted in your project root (especially if you don't have a .project)
	* Have a .jshintrc with { "browser" : true } for it to know about document.
	* Add "jquery" : true to .jshintrc for it not to whine about jQuery. + $(function() { (@see )


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

