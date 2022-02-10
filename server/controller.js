const bcrypt = require('bcryptjs');

const chats = [];



module.exports = {
    createMessage: (req, res) => {
        
        const {pin, message} = req.body;

        for (let i = 0; i < chats.length; i++) {
            const existing = bcrypt.compareSync(pin, chats[i].pinHash);

            if (existing) {
                chats[i].messages.push(message);
                const chatObjCopy = {...chats[i]}; //creates copy of chats object for security
                delete chatObjCopy.pinHash; //deletes pinHash from copy so hash doesn't show up on the front end in the Inspect
                res.status(200).send(chatObjCopy); //sends copy without pinHash for FE security
                return;
            } 
        }

        let salt = bcrypt.genSaltSync(5); //generates set of random characters
        const pinHash = bcrypt.hashSync(pin, salt);

        const newChat = {
            pinHash: pinHash,
            messages: [message]
        }

        chats.push(newChat);
        let chatObjCopy = {...newChat};
        delete chatObjCopy.pinHash;
        res.status(200).send(chatObjCopy);
    }
}