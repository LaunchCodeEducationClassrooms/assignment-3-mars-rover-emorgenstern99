const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  // TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(100);
    expect([rover.position, rover.mode, rover.generatorWatts]).toEqual([100, 'NORMAL', 110]);
  });

  // TEST 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(8);    // Passes 8 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual(message.name);
  });

  // TEST 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(9);    // Passes 9 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(commands.length);
  });

  // TEST 10
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with STATUS_CHECK command', commands);
    let rover = new Rover(10);    // Passes 10 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results[0]).toEqual({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 10}});
  });


  // TEST 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with MODE_CHANGE command', commands);
    let rover = new Rover(11);    // Passes 11 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results[0]).toEqual({completed: true});
  });

  // TEST 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 444), new Command('STATUS_CHECK')];
    let message = new Message('Test message with three commands', commands);
    let rover = new Rover(12);    // Passes 12 as the rover's position.
    let response = rover.receiveMessage(message);

    expect([ response.results[1], response.results[2] ]).toEqual([ {completed: false},  {completed: true, roverStatus: {mode: 'LOW_POWER', generatorWatts: 110, position: 12}} ]);
  });

  // TEST 12
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 444), new Command('STATUS_CHECK')];
    let message = new Message('Test message with three commands', commands);
    let rover = new Rover(13);    // Passes 12 as the rover's position.
    let response = rover.receiveMessage(message);

    expect([ response.results[0], response.results[1] ]).toEqual([ {completed: true},  {completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 444}} ]);
  });

});
