let assert = require('assert');
let chai = require('chai');

let task = require('./fighters');

let expect = chai.expect;
let Fighter = task.Fighter;
let ImprovedFighter = task.ImprovedFighter;
let fight = task.fight;

let points = [10,10,10,10,10];

describe('Finished games', () => {
	it("should be a win of Fighter", () => {
		let first = new Fighter("Tyler", 1, 50);
		let second = new ImprovedFighter("Durden", 1, 30);
		fight(first, second, ...points);
		assert.equal(first.getHealth(), 10);
		assert.equal(second.getHealth(), 0);
	});
	it("should be a win of ImprovedFighter because of the multiplication by @power", () => {
		let first = new Fighter("Tyler", 1, 50);
		let second = new ImprovedFighter("Durden", 2, 50);
		fight(first, second, ...points);
		assert.equal(first.getHealth(), -30);
		assert.equal(second.getHealth(), 30);
    });
});

describe('Unfinished games', () => {
	it("both players should stay alive", () => {
		let first = new Fighter("Tyler", 1, 50);
		let second = new ImprovedFighter("Durden", 1, 50);
		fight(first, second, ...points);
		assert.ok(true, first.getHealth() > 0);
		assert.ok(true, second.getHealth() > 0);
	})
});

describe('Error checking', () => {
	it('should throw an error if the first two arguments are not Fighters', () => {
	  let first = new Fighter();
	  let bindedFight = fight.bind(null, first, 10);
	  expect(bindedFight).to.throw(Error, 'First two arguments should be fighters');
	});
	it('should throw an error if at least one of @points arguments is not a Number', () => {
		let first = new Fighter();
		let second = new Fighter();
		let bindedFight = fight.bind(null, first, second, 'string');
	    expect(bindedFight).to.throw(Error, `is not a Number`);
	});
})