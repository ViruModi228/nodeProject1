console.log("user file")
var userAge = 25;
var userName ="RAM"

// module.exports = userAge;
// module.exports = userName;

const sendUserData = () => {
    console.log("send user data");
}


module.exports = {
    userAge,
    userName,
    sendUserData
}
// module.exports  = sendUSerData;