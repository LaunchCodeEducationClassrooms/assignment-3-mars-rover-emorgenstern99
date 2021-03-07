class Rover {
   // Write code here!

   // This class builds a rover object with a few properties, and it also contains a function outside of constructor to handle updates to its properties.

   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   //Methods outside constructor
   receiveMessage(message) {
     let response = {};
     response.message = message.name;

     response.results = [];
    // Add a result for each command
    for (let i = 0; i < message.commands.length; i++) {
      let resultObject = {};
      let commandType = message.commands[i].commandType;
      let commandValue = message.commands[i].value;

      if (commandType === "STATUS_CHECK") {
        resultObject.completed = true;
        resultObject.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
      } else if (commandType === "MODE_CHANGE") {
        this.mode = commandValue;
        resultObject.completed = true;
      } else if (commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = commandValue;
          resultObject.completed = true;
        } else {
          // low power
          resultObject.completed = false;
        }
      } else {
        resultObject.completed = true;
      }


      response.results.push(resultObject);
    }

     return response;
   }
}

module.exports = Rover;