'use strict';
/**
 * Created by victor on 17.24.2.
 */

const HelperController = require('../Controllers/HelperController');

class Individual {

  /**
   * @param Xdec
   * @param Ydec
   * @param Xfloat
   * @param Yfloat
   */
  constructor(Xdec, Ydec, Xfloat, Yfloat, fn) {
    this.Xdec = Xdec;
    this.Ydec = Ydec;

    this.Xfloat = Xfloat;
    this.Yfloat = Yfloat;
    // convert to binary
    this.Xbinary = (Xdec >>> 0).toString(2);
    this.Ybinary = (Ydec >>> 0).toString(2);

    this.Xbinary = '00000000'.substr(this.Xbinary.length) + this.Xbinary;
    this.Ybinary = '00000000'.substr(this.Ybinary.length) + this.Ybinary;

    this.fn = fn;
    this.score = fn(this.Xfloat, this.Yfloat);

    this.binary = this.Xbinary + ' ' + this.Ybinary;
    return this;
  }

  /**
   * @param individ
   * @returns {*[]} Array of 2 arrays of decimal values for next generation
   */
  cross(individ) {
    let points = this._getPoints(this.Xbinary + this.Ybinary);

    let binary1 = this.Xbinary + this.Ybinary;
    let binary2 = individ.Xbinary + individ.Ybinary;

    let start1 = binary1.slice(0, points[0]);
    let part1 = binary1.slice(points[0], points[1]);
    let end1 = binary1.slice(points[1]);

    let start2 = binary2.slice(0, points[0]);
    let part2 = binary2.slice(points[0], points[1]);
    let end2 = binary2.slice(points[1]);

    let result1 = start1 + part2 + end1;
    let result2 = start2 + part1 + end2;

    let Xbinary1 = result1.slice(0, 8);
    let Ybinary1 = result1.slice(8);

    let Xbinary2 = result2.slice(0, 8);
    let Ybinary2 = result2.slice(8);

    let res = [
      [parseInt(Xbinary1, 2), parseInt(Ybinary1, 2)],
      [parseInt(Xbinary2, 2), parseInt(Ybinary2, 2)]
    ];
    return res;

  }

  /**
   * @param binary
   * @returns {*[]} - sliced binary
   * @private
   */
  _getPoints(binary) {
    let point1 = Math.floor(HelperController.getRandomFloat() * binary.length);
    let point2 = Math.floor(HelperController.getRandomFloat() * binary.length);

    // switch points to avoid errors
    if (point1 > point2) {
      let a = point1;
      point1 = point2;
      point2 = a;
    }

    return [point1, point2];
  }

}

module.exports = Individual;
