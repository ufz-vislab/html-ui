import Ember from 'ember';

export default Ember.Route.extend({
  socketService: Ember.inject.service('websockets'),
  model() {
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);

    var self = this;

    socket.on('message', function(data){
      console.log(data.data);
      var obj = JSON.parse(data.data);
      self.store.push(self.store.normalize(obj.type, obj));

      //var json = "{\n          \"id\": 4,\n   \"type\": \"visibility\",\n      \"attributes\": {\n            \"name\": \"Grand Old Mansion\",\n            \"enabled\": true,\n            \"opacity\": 0.5\n          }\n}"
      //console.log(obj.type);
      //console.log(obj);
      //console.log(JSON.parse(json));
      //console.log(JSON.parse("{\"type\": \"visibilities\"}"));
      //var foo = { id: 6, type: 'visibility', attributes: {name: 'myUserName', enabled: true, opacity: 0.5}};
      //console.log(foo);
      //self.store.push(self.store.normalize("visibility", foo));
      //self.store.push(self.store.normalize(obj.type, JSON.parse(json)));
    });

    return this.store.findAll('visibility');
  },

  myOpenHandler: function(event) {
    //console.log('On open event has been called: ' + event);
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');
    socket.send('Hello Unity World from Ember!');
    socket.send('GET');
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
  }
});
