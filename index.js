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

app.get('/MainMenu', async (req, res) =>{

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

// Posts
app.post('/loginUser', async (req, res) =>
{
    const result = dbActions.getUser(req.body.username, req.body.password);
    if (result === undefined)
    {
        res.status(500).json({error: "No such user"});
        return;
    }
    res.json(result);
});

app.post('/registerUser', async (req, res) =>
{
    try
    {
        const result = dbActions.addUser(req.body.username, req.body.password, req.body.email);
        if (result === false)
        {
            res.status(500).json({error: "Error while registering user"});
            return;
        }
        res.json(result);
    }
    catch (e)
    {
        res.status(500).json({error: e});
    }
});


// Init
initDb('.\\MyDb').then(() =>
{
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
    dbActions = new DbActions(db);
});