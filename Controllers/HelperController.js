'use strict';

/**
 * Created by victor on 17.24.2.
 */

const array = [
  0.8329722754, 0.4511927902, 0.0116602381, 0.2658512833, 0.1172531919, 0.5543929762, 0.8265259277, 0.2364711902, 0.5881144333, 0.6853440186,
  0.482353257, 0.1994705856, 0.3461929681, 0.175754434, 0.8161835231, 0.7417656846, 0.8828168166, 0.350231574, 0.4089750929, 0.4347041402,
  0.8076012517, 0.7993683819, 0.725570238, 0.9421525782, 0.1903073877, 0.7093517178, 0.2255434645, 0.3477031582, 0.6554151603, 0.4250436465,
  0.6488882526, 0.4623779669, 0.7094678184, 0.5572904086, 0.409758736, 0.133504652, 0.1364082284, 0.4214460983, 0.0131864997, 0.6589859872,
  0.2580124283, 0.7565291915, 0.8570506621, 0.8529726205, 0.3979967374, 0.7800846254, 0.1130810125, 0.3231248952, 0.7426522529, 0.8002673946,
  0.6132276367, 0.9139519921, 0.7563724112, 0.2986754312, 0.8807273624, 0.4065824299, 0.4071290251, 0.8910360101, 0.6022368251, 0.0513192156,
  0.9697763394, 0.1262920915, 0.6790427168, 0.855788255, 0.5750172055, 0.5830477153, 0.7083484965, 0.5226313484, 0.4678526849, 0.0716122503,
  0.6377835379, 0.8946749857, 0.7480988576, 0.8290679779, 0.3582384158, 0.4266716825, 0.7092534864, 0.4617688369, 0.2950634626, 0.4580815909,
  0.5389753614, 0.2671674565, 0.5413840148, 0.5442395745, 0.0164282578, 0.8755637142, 0.8024245435, 0.2557771256, 0.0384625355, 0.0325317796,
  0.8506219784, 0.0351201854, 0.8021408356, 0.7773419058, 0.1316178821, 0.0704883755, 0.5304082647, 0.2916373573, 0.2197529137, 0.2178329247
];

let i = 0;
let row = true;

let fn = (i) => {
  if (i < 10)
    return i * 10;
  else
    return ((i % 10) || 1) * 10 + parseInt(i.toString().slice(0, 1), 10);
};

class HelperController {

  static reset() {
    i=0;
    row = true;
  }

  static getRandomFloat() {
    let result = null;
    if (row) {
      result = array[i]
    } else {
      result = array[fn(i)];
    }
    i++;
    if (i >= 100) {
      i = 0;
      row = !row;
    }
    if (!result) {
      console.log()
    }
    return result;
    //return Math.random();
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  static getRandomInt(min, max) {
    return Math.floor(HelperController.getRandomFloat() * (max - min + 1)) + min;
  }

}

module.exports = HelperController;
