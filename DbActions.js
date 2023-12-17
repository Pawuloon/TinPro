// Purpose: Database actions for the application
class DbActions
{
    constructor(db)
    {
        this.db = db;
    }
    async getAllUsers()
    {
        return await this.db.all('SELECT U.USER_ID, U.USER_USERNAME, U.USER_PASSWORD, U.USER_EMAIL, R.ROLE_NAME, U.CREATED_DATE FROM APP_USER U JOIN main.APP_ROLES R ON R.ROLE_VAL = U.USER_PERMISSION WHERE U.USER_PERMISSION != 3');
    }

    async checkAdmin(name, password)
    {
        const perLvl = await this.db.all('SELECT USER_PERMISSION FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return perLvl !== (perLvl.length === 0) && perLvl[0].USER_PERMISSION === 3;
    }
    async checkUser(name, password)
    {
        const perLvl = await this.db.all('SELECT USER_PERMISSION FROM APP_USER WHERE USER_USERNAME=? AND USER_PASSWORD=?', name, password);
        return perLvl !== (perLvl.length === 0);
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

    async grantPermission(name, permission)
    {
        try
        {
            await this.db.all('UPDATE APP_USER SET USER_PERMISSION=? WHERE USER_USERNAME=?', permission, name);
            return true;
        }
        catch (e)
        {
            return false;
        }
    }

    async deleteUser(name, email)
    {
        try
        {
            await this.db.all('DELETE FROM APP_USER WHERE USER_USERNAME=? AND USER_EMAIL=?', name, email);
            return true;
        }
        catch(e)
        {
            return false;
        }
    }
}
module.exports = DbActions;
