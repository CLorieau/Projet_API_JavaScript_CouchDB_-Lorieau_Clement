const users = [
    { login: "clement", mdp: "test123" },
    { login: "utilisateur", mdp: "mdp123" },
    { login: "user", mdp: "user123" },
];

module.exports = {
    findByLogin(login) {
        return users.find(user => user.login === login);
    },
};
