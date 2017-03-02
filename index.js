'use strict';
/**
 * Created by victor on 17.24.2.
 */

const TwoCriteriaController = require('./Controllers/TwoCriteriaController');
const HelperController = require('./Controllers/HelperController');

let fn = (x, y) => {
  let z = (2 * 174) + (x * x) + (y * y) - (174 * Math.cos(2 * Math.PI * x)) - (174 * Math.cos(2 * Math.PI * y));
  return z;
};

let XRange = [-12.8, 12.7];
let YRange = [-12.8, 12.7];

let population = 10;
let accuracy = 0.1;

let generations = 2;

let control = new TwoCriteriaController(fn, XRange, YRange, population, accuracy);

control.prepare();
for (let i = 0; i<generations; i++)
control.nextTournamentTic();

console.log('');
console.log('START 2nd experiment');
console.log('');

HelperController.reset();

let control2 = new TwoCriteriaController(fn, XRange, YRange, 10, 0.1);

control2.prepare();
for (let i = 0; i<generations; i++)
control2.nextRouletteTic();
