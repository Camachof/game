
const Util = {
  inherits(childClass, parentClass) {
    const Surrogate = function(){};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  },

  randomVec(length){
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m){
    return [vec[0] * m, vec[0] * m];
  }
};

module.exports = Util;
