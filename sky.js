/**
 * Cloud Maker based on : http://www.clicktorelease.com/code/css3dclouds/
 * Tutorial can be found here : http://www.clicktorelease.com/blog/how-to-make-clouds-with-css-3d
 * 
 * Dependencies : requestAnimationFrame
 */

/**
 * Utility function that return prefix vendor or not for the current browser used 
 * @param {Array} proparray, array of css3 properties
 */
function getsupportedprop (proparray)
{
    var root = document.documentElement; //reference root element of document
    for (var i = 0; i < proparray.length; i++){ //loop through possible properties
        if (proparray[i] in root.style){ //if property exists on element (value will be string, empty string if not set)
            return proparray[i]; //return that string
        }
    }
}

/**
 * Utility function to generate random number 
 * @param {Number} number, number max to randomize
 * @param {Int} fixed, to cut decimal number
 * @param {Number} min, to add to the random number (to not have zero value)
 */
function randomize (number, fixed, min)
{
    var fixed = fixed || 0,
        min = min || 0;
    return min + parseFloat((Math.random() * number).toFixed(fixed));
}

/**
 * Sky Module to manage clouds 
 * @param {Object} options, container ID of the cloud container
 */
var Sky = function (options)
{
    if(typeof requestAnimationFrame === undefined || typeof requestAnimationFrame !== 'function' || requestAnimationFrame == null){
        throw new TypeError('requestAnimationFrame is not defined');
    }
    this.world = document.getElementById(options.containerID);
    this.objects = [];
    this.layers = [];
    this.animRotation = null;
    this.generate();
};

/**
 * Generate all clouds
 */
Sky.prototype.generate = function ()
{
    this.objects = [];
    this.layers = [];
    if (this.world.hasChildNodes()) {
        while(this.world.childNodes.length >= 1) {
            this.world.removeChild(this.world.firstChild);
        } 
    }
    for(var j = 0; j < 5; j++) {
        this.objects.push(this.createCloud());
    }
};

/**
 * Create cloud and add them to the DOM 
 */
Sky.prototype.createCloud = function ()
{
    var div = document.createElement('div'),
        vendorTransform = getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']),
        t = 'translate3d(' + randomize(this.world.offsetWidth) + 'px,' + randomize(this.world.offsetHeight) + 'px,' + randomize(100) + 'px)',
        randomLength = randomize(10, 0, 5),
        cloud;
    randomLength = 1;
    div.className = 'cloudBase';
    div.style[vendorTransform] = t;
    this.world.appendChild(div);
    for(var j = 0; j < randomLength; j++) {
        cloud = document.createElement('img');
        cloud.className = 'cloudLayer';
        cloud.src = 'cloud.png';
        cloud.data = {x:randomize(40,0,-20), y:randomize(40,0,-20), z:randomize(20), a:randomize(360), s:randomize(2,2,0.3), speed:randomize(-.02,3,-.02)};
        t = 'translate3d(' + cloud.data.x + 'px,' + cloud.data.y + 'px,' + cloud.data.z + 'px)' + ' rotate(' + cloud.data.a + 'deg)' + ' scale(' + cloud.data.s + ')';
        cloud.style[vendorTransform] = t;
        div.appendChild(cloud);
        this.layers.push(cloud);
    }
    return div;
};

/**
 * Loop to animate the clouds 
 */
Sky.prototype.update = function ()
{
    var self = this,
        vendorTransform = getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']),
        layer;
    
    for(var j = 0; j < this.layers.length; j++) {
        layer = this.layers[j];
        layer.data.a += layer.data.speed;
        layer.style[vendorTransform] = 'translate3d(' + layer.data.x + 'px,' + layer.data.y + 'px,' + layer.data.z + 'px) rotate(' + layer.data.a + 'deg) scale(' + layer.data.s + ')';
    }
    this.animRotation = requestAnimationFrame(function ()
    {
        self.update();
    });
};

/**
 * Stop animation
 */
Sky.prototype.stop = function ()
{
    if(typeof this.animRotation !== "undefined" && this.animRotation !== null){
        cancelAnimationFrame(this.animRotation);
    }
};
