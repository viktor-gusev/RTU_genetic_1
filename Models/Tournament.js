'use strict';
/**
 * Created by victor on 17.24.2.
 */

const HelperController = require('../Controllers/HelperController');

class Tournament {

  /**
   * @param {Array<Individual>} population - Initial population
   * @param {Number} totalCount - Indvidual to finish
   */
  constructor(population, totalCount) {

    this.population = population;
    this.totalCount = totalCount;
    this.result = [];
    return this;

  }

  /**
   * Start tournament between population with totalCount results
   * @returns {Array}
   */
  start() {

    let candidates = [];

    for (let i = 0; i < this.totalCount * 2; i++) {
      let rand = HelperController.getRandomFloat();
      let ind = this._getIndivid(rand);
      candidates.push(ind);
    }

    for (let i = 0; i < candidates.length; i += 2) {
      if(candidates[i].score > candidates[i+1].score) {
        this.result.push(candidates[i]);
      } else {
        this.result.push(candidates[i+1]);
      }
    }

    return this.result;
  }

  /**
   * Get random individ from population
   * @param {Double} rand - random float [0,1]
   * @private
   */
  _getIndivid(rand) {
    let number = Math.floor(rand * this.population.length);
    let result = this.population[number];
    return result;
  }

}

module.exports = Tournament;
