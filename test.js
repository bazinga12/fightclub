var assert = require('assert');
let task = require('./fighters');
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
})