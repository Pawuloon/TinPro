// Purpose: Database actions for the application
class DbActions
{
    constructor(db)
    {
        this.db = db;
    }
    getAllUsers()
    {
        return this.db.all('SELECT * FROM APP_USER');
    }

    getUser(name, password)
    {
        const user = this.db.get('SELECT * FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return user !== undefined ? user : false;
    }

    addUser(name, password, email)
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
