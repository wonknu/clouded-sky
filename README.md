clouded-sky
===========

clouded sky effect, based on http://www.clicktorelease.com/code/css3dclouds/


Dependencies
------------------

requestAnimationFrame


Installation
------------------

Just grab the sky.js and compile sky.less & include them in your html file.


How to use
------------------

Create a new sky object

#### new sky
    
    var sky = new Sky({containerID : 'your-container-id'});

To start cloud rotation animation, call update() method

#### update()
    
    sky.update();

To stop cloud rotation animation, call stop() method

#### stop()
    
    sky.stop();
