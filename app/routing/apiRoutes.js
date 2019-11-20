var path = require("path");
var friends = require("../data/friends");
var friendsArray = friends.friends;

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends.friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        console.log(newFriend);
        var newScores = newFriend.answers;
        console.log(newScores);
        var differences = [];
        var friends = [];
        console.log(friendsArray.length);
        friendsArray.forEach(function (friend) {
            var matchScores = friend.answers;
            let totalDifference = 0;
            for (let i = 0; i < matchScores.length; i++) {
                totalDifference += Math.abs(matchScores[i] - newScores[i]);
            }
            differences.push(totalDifference);
            differences.sort();
            bestScore = differences[0];
            friends.push({ name: friend.name, photoURL: friend.photoURL, difference: totalDifference });
        });
        var bestMatch = friends.find(function (element) {
            return element.difference === bestScore;
        });
        friendsArray.push(newFriend);
        res.json(bestMatch);
    });
}