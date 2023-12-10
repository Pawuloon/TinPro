// Purpose: Database actions for the application
class DbActions
{
    constructor(db)
    {
        this.db = db;
    }
    async getAllUsers()
    {
        return this.db.all('SELECT * FROM APP_USER WHERE APP_USER.USER_PERMISSION != 3');
    }

    async checkAdmin(name, password)
    {
        const user = this.db.get('SELECT * FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=? AND USER_PERMISSION=3', name, password);
        return user !== undefined;
    }

    async getUser(name, password)
    {
        const user = this.db.get('SELECT * FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return user !== undefined ? user : false;
    }

     async addUser(name, password, email)
    {
        if (name.empty() || password.empty())
            throw new Error("Invalid user");
        try
        {
            this.db.run('INSERT INTO APP_USER (USER_USERNAME, USER_PASSWORD, USER_EMAIL) VALUES (?,?,?)', name, password, email);
            return true;
        }
        catch (e)
        {
            return false;
        }
    }
}
module.exports = DbActions;
