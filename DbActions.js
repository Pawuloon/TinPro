// Purpose: Database actions for the application
class DbActions
{
    constructor(db)
    {
        this.db = db;
    }
    async getAllUsers()
    {
        return await this.db.all('SELECT * FROM APP_USER WHERE APP_USER.USER_PERMISSION != 3');
    }

    async checkAdmin(name, password)
    {
        const perLvl = await this.db.all('SELECT USER_PERMISSION FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return perLvl !== null;
    }
    async checkUser(name, password)
    {
        const perLvl = await this.db.all('SELECT USER_PERMISSION FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return perLvl !== null;
    }

    async addUser(name, password, email)
    {
        if (name.toString().length === 0 || password.toString().length === 0 || email.toString().length === 0)
            throw new Error("Invalid user");
        try
        {
            await this.db.all('INSERT INTO APP_USER (USER_USERNAME, USER_PASSWORD, USER_EMAIL) VALUES (?,?,?)', name, password, email);
            return true;
        }
        catch (e)
        {
            return false;
        }
    }
}
module.exports = DbActions;
