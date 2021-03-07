class Message {
   // Write code here!
  constructor(name, commands) {
     this.name = name;
    //  Throws error if a name is NOT passed into the constructor as the first parameter
     if (!name) {
       throw Error("Message name required.");
     }
     this.commands = commands;
   }
}

module.exports = Message;