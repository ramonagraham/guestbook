Messages = new Mongo.Collection("message");

if (Meteor.isClient) {
  
  Meteor.subscribe("messages");  // every client created will subscribe to the same database
  
  Template.guestBook.helpers( {  // go to the Template called guestBook and call its helpers
    "messages" : function () {
      return  Messages.find(
                  {},
                  {sort: {createdOn: -1}} )  || {};  // this will query the database and find everything
      // returns all message objects, or an empty object if no DB
    }
    } );
  
  
  Template.guestBook.events(  // Template is a variable, guestBook is an Object, events is a function
      {   // events takes an object, this is an object
        "submit form": function (event){  // listening for the submit event on a form is a css selector
          event.preventDefault(); // overrides the GET
          
          // find the textarea, with jQuery
          var messageBox =
            $(event.target).find('textarea[name=guestBookMessage]');
          
          // console.log(messageBox);
          var messageText = messageBox.val();
          
          var nameBox = $(event.target).find('input[name=guestName]');
          var nameText = nameBox.val();
          
          if (nameText.length > 0 &&
              messageText.length > 0 ) {
          
            Messages.insert(
                {
                  name: nameText,
                  message: messageText,
                  createdOn: Date.now()
                }
            );
            
            nameBox.val("");
            messageBox.val("");
          }
          else{
            // alert (Name and Message are both required.");
            console.log(messageBox);
            messageBox.classList.add("has-warning"); //style.backgroundColor = "red";
          }
          
          
          
       //   alert("Name is " + nameText + ", msg is " + messageText);
        }
      }
  );

  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("messages", function () {
    return Messages.find();
    });
  
  
}
