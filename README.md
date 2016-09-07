# viral

![viral](http://res.cloudinary.com/doilr7vvv/image/upload/v1473274375/viral_vpbzkp.png)

### Implementation

The game has two main objects: ```ship``` which the user controls, and ```bacteria``` that move around randomly. Since their behaviour is so similar, I used prototypal inheritance to derive both objects from a movingObject class: 

```javascript
inherits(childClass, parentClass) {
  const Surrogate = function(){};
  Surrogate.prototype = parentClass.prototype;
  childClass.prototype = new Surrogate();
  childClass.prototype.constructor = childClass;
},
```

To make each new instance of the game feel original, the ship spawns at a random position. I had to implement a safe zone so that spawning does not result in an immediate loss:

```javascript
while(tooClose){
  x =  [
    (Math.random() * (this.DIM_X - (Game.RADIUS * 2))) + Game.RADIUS,  
    (Math.random() * (this.DIM_Y - (Game.RADIUS * 2))) + Game.RADIUS
  ];

  const sumRadii = this.ship.radius + 60;
  const xDiff = Math.pow(this.ship.pos[0] - x[0], 2);
  const yDiff = Math.pow(this.ship.pos[1] - x[1], 2);
  const Distance = Math.sqrt(xDiff + yDiff);

  tooClose = Distance <= sumRadii;
}
```
