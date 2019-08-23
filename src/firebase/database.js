const firebase = require('firebase');
const credentials = require('../credentials');

class database {
    constructor(){
        firebase.initializeApp(credentials.firebaseKey);
        this.database = firebase.database();
        this.root = this.database.ref('user');
    }

    async getRoom(user){
        var user = this.root.child(user);

        // user.once('value').then((snapshot) => {
        //     console.log(snapshot.val());
        //     return snapshot.val();
        // });

        return await user.once('value');
    }

    addRoom(userID,username, room_number){
        this.root.child(userID).set({username: username,room: room_number});
    }
}

module.exports.database = database;
// console.log(firebase.auth().currentUser);

