'use strict';
/**
 * Created by victor on 17.24.2.
 */

const Individual = require('../Models/Individual');
const Tournament = require('../Models/Tournament');
const Roulette = require('../Models/Roulette');
const HelperController = require('./HelperController');

class TwoCriteriaController {

  constructor(fn, XRange, YRange, populationCount, accuracy) {
    this.fn = fn;
    this.XRange = XRange;
    this.YRange = YRange;
    this.accuracy = accuracy;

    this.XMaxPossibleValues = (XRange[1] - XRange[0]) / this.accuracy + 1;
    this.YMaxPossibleValues = (YRange[1] - YRange[0]) / this.accuracy + 1;

    this.mutationProbability = 0.1;
    this.mutationGenes = 2;

    this.populationCount = populationCount;
    this.population = [];
    this.generation = null;

    return this;
  }

  prepare() {

    for (let i = 0; i < this.populationCount; i++) {
      let Xdec = HelperController.getRandomInt(0, this.XMaxPossibleValues);
      let Ydec = HelperController.getRandomInt(0, this.YMaxPossibleValues);
      let XFloat = this._getFloat(this.XRange, Xdec);
      let YFloat = this._getFloat(this.YRange, Ydec);
      let individ = new Individual(Xdec, Ydec, XFloat, YFloat, this.fn);
      this.population.push(individ);
    }

    this.generation = 0;

    this._printStats();
  }

  nextTournamentTic() {

    let tour = new Tournament(this.population, this.populationCount);

    let populos = tour.start();
    let newGen = [];

    for (let i = 0; i < populos.length; i += 2) {
      let res = populos[i].cross(populos[i + 1]);

      newGen.push(new Individual(
        res[0][0],
        res[0][1],
        this._getFloat(this.XRange, res[0][0]),
        this._getFloat(this.YRange, res[0][1]),
        this.fn
      ));
      newGen.push(new Individual(
        res[1][0],
        res[1][1],
        this._getFloat(this.XRange, res[1][0]),
        this._getFloat(this.YRange, res[1][1]),
        this.fn
      ));
    }
    newGen.map((el) => {

    })
    newGen = this._mutate(newGen);

    let selection = new Tournament(newGen.concat(this.population), this.populationCount);
    this.population = selection.start();

    this.generation++;
    this._printStats();
  }

  nextRouletteTic() {

    let newGen = [];
    // elitism
    this.population.sort(this._compare);
    let elite = this.population[0];

    let roul = new Roulette(this.population, this.populationCount);
    let populos = roul.start();

    for (let i = 0; i < populos.length; i += 2) {
      let res = populos[i].cross(populos[i + 1]);

      newGen.push(new Individual(
        res[0][0],
        res[0][1],
        this._getFloat(this.XRange, res[0][0]),
        this._getFloat(this.YRange, res[0][1]),
        this.fn
      ));
      newGen.push(new Individual(
        res[1][0],
        res[1][1],
        this._getFloat(this.XRange, res[1][0]),
        this._getFloat(this.YRange, res[1][1]),
        this.fn
      ));
    }

    newGen = this._mutate(newGen);


    let selection = new Roulette(newGen.concat(this.population), this.populationCount - 1);
    this.population = selection.start();
    this.population.push(elite);

    this.generation++;
    this._printStats();

  }

  /**
   * @param {Array<float>} range
   * @param {number} num
   * @returns {number}
   * @private
   */
  _getFloat(range, num) {
    // Ok, I just hardcoded here 255 instead 2^n-1
    let a = (range[1] - range[0]);
    let b = a / 256;
    let c = num * b;
    let result = c + range[0];
    if (result > 15) {
      console.log('sic!')
    }
    return result;
  }

  _printStats() {

    this.population.sort(this._compare);

    let sum = 0;
    for (let i = 0; i < this.populationCount; i++) {

      console.log((i + 1) + ';' +
        this.population[i].Xfloat.toFixed(4) + ';' +
        this.population[i].Yfloat.toFixed(4) + ';' +
        this.population[i].Xdec + ';' +
        this.population[i].Ydec + ';' +
        this.population[i].binary + ';' +
        this.population[i].score.toFixed(4)
      );

      sum += parseInt(this.population[i].score, 10); //don't forget to add the base
    }

    let avg = sum / this.populationCount;

    console.log('');
    console.log('STATS for ' + this.generation + ' generation:');
    console.log('MAX : ' + this.population[0].score.toFixed(4));
    console.log('AVG : ' + avg);
    console.log('SUM : ' + sum);
    console.log('');

  }


  _compare(a, b) {
    if (a.score > b.score)
      return -1;
    if (a.score < b.score)
      return 1;
    return 0;
  }

  _mutate(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (HelperController.getRandomFloat() < this.mutationProbability) {
        // concat binaries
        let binary = arr[i].Xbinary + arr[i].Ybinary;
        // change genes for genesCount
        for (let j = 0; j < this.mutationGenes; j++) {
          let num = Math.floor(HelperController.getRandomFloat() * binary.length);
          let char = binary.charAt(num);
          char = +char ? '0' : '1';
          binary = binary.substr(0, num) + char + binary.substr(num + 1);
        }
        // slice binaries
        let Xdec = parseInt(binary.slice(0, 8), 2);
        let Ydec = parseInt(binary.slice(8), 2);

        // change individs
        arr[i] = new Individual(
          Xdec,
          Ydec,
          this._getFloat(this.XRange, Xdec),
          this._getFloat(this.YRange, Ydec),
          this.fn
        );
      }
    }
    return arr;
  }

}

module.exports = TwoCriteriaController;
