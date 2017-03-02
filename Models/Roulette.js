'use strict';
/**
 * Created by victor on 17.24.2.
 */

const HelperController = require('../Controllers/HelperController');

class Roulette {

  /**
   * @param {Array<Individual>} population - Initial population
   * @param {Number} totalCount - Indvidual to finish
   */
  constructor(population, totalCount) {

    this.population = population;
    this.totalCount = totalCount;
    this.result = [];


    let sum = 0;
    for (let i = 0; i < this.population.length; i++) {
      sum += parseInt(this.population[i].score, 10);
    }
    this.sum = sum;

    return this;

  }

  /**
   * Return totalCount elements selectioned from population
   * @returns {Array}
   */
  start() {

    for (let i = 0; i < this.totalCount; i++) {
      this.result.push(this._getIndivid(HelperController.getRandomFloat()));
    }

    return this.result;
  }

  /**
   * Get random individ from population
   * @param {Double} rand - random float [0,1]
   * @private
   */
  _getIndivid(rand) {
    let number = rand * this.sum;
    let result = null;
    let i = 0;
    while (!result) {
      if ((number - this.population[i].score) > 0) {
        number -= this.population[i].score;
        i++;
      } else {
        result = this.population[i];
      }
    }
    return result;
  }

}

module.exports = Roulette;
