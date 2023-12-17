const exp = require('express');
const app = exp();
const bo = require('body-parser');
const fs = require('fs').promises;
const port = Math.floor((Math.random() * 1000) + 2000);
const sql3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const DbActions = require("./DbActions.js");

let db;
let dbActions;
async function initDb(dbPath)
{
    db = await open({
        filename: dbPath,
        driver: sql3.Database
    });
}

app.use(exp.static(__dirname));
app.use(bo.json());


// Gets
app.get('/', async (req, res) =>
{
    try
    {
        const content =  await fs.readFile(__dirname + "\\pages\\HomePage.html", 'utf8');
        res.send(content);
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }
});

app.get('/login', async (req, res) =>
{
    try
    {
        const content =  await fs.readFile(__dirname + "\\pages\\LogReg.html", 'utf8');
        res.send(content);
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }
});

app.get('/MainMenu', async (req, res) =>
{

    try
    {
        const content =  await fs.readFile(__dirname + "\\pages\\Menu.html", 'utf8');
        res.send(content);
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }

});

app.get('/AdminMenu', async (req, res) =>
{

    try
    {
        const content =  await fs.readFile(__dirname + "\\pages\\AdminMenu.html", 'utf8');
        res.send(content);
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }

});

app.get('/allUsers', async (req, res) =>
{
    const data = await dbActions.getAllUsers();
    if (data.length === 0)
    {
        res.status(500).json({error: "No data"});
        return;
    }
    res.send(data);
});


// Posts
app.post('/registerUser', async (req, res) =>
{
    try
    {
        const result = await dbActions.addUser(req.body.username, req.body.password, req.body.email);
        if (result === false)
        {
            res.status(500).json({error: "Error while registering user"});
            return;
        }
        res.json("Registered");
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }
});


app.post('/loginUser', async (req, res) =>
{
    const userResult = await dbActions.checkUser(req.body.username, req.body.password);
    if (userResult === false)
    {
        res.status(500).json({error: "No such user"});
        return;
    }
    res.send(userResult);
});

app.post('/checkAdmin', async (req, res) =>
{
    const result = await dbActions.checkAdmin(req.body.username, req.body.password);
    if (result === false)
    {
        res.status(500).json({error: "No such user/admin"});
        return;
    }
    res.send(result);
});

app.post('grantPermission', async (req, res) =>
{
    const result = await dbActions.grantPermission(req.body.username);
    if (result === false)
    {
        res.status(500).json({error: "No such user"});
        return;
    }
    res.send(result);
});

app.delete('/deleteUser', async (req, res) =>
{
    const result = await dbActions.deleteUser(req.body.username, req.body.email);
    if (result === false)
    {
        res.status(500).json({error: "No such user"});
        return;
    }
    res.send(result);
});

// Init
initDb('.\\MyDb').then(() =>
{
    app.listen(port, () =>
    {
        console.log(`App listening at http://localhost:${port}`);

    });
    dbActions = new DbActions(db);
});