
const Util = {
  inherits(childClass, parentClass) {
    const Surrogate = function(){};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec(length){
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m){
    return [vec[0] * m, vec[0] * m];
  },

  isCollidedWith(object1, object2){
    const sumRadii = object1.radius + object2.radius;
    const xDiff = Math.pow(object1.pos[0] - object2.pos[0], 2);
    const yDiff = Math.pow(object1.pos[1] - object2.pos[1], 2);
    const Distance = Math.sqrt(xDiff + yDiff);

    return Distance <= sumRadii;
  }

};

module.exports = Util;
