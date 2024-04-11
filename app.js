const express = require('express');
const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

const app = express();
const servient = new Servient();
servient.addClientFactory(new HttpClientFactory(null));

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    next();
});

app.post('/start', async (req, res) => {
    try {
        const WoT = await servient.start();
        const td = await WoT.requestThingDescription("http://34.91.249.112:8480/ferris-wheel");
        const thing = await WoT.consume(td);
        await thing.invokeAction("start");
        console.log("La ferris wheel a été démarrée avec succès !");
        res.sendStatus(200);
    } catch (error) {
        console.error("Une erreur s'est produite lors du démarrage de la ferris wheel :", error);
        res.sendStatus(500);
    }
});

app.post('/stop', async (req, res) => {
    try {
        const WoT = await servient.start();
        const td = await WoT.requestThingDescription("http://34.91.249.112:8480/ferris-wheel");
        const thing = await WoT.consume(td);
        await thing.invokeAction("stop");
        console.log("La ferris wheel a été arrêtée avec succès !");
        res.sendStatus(200);
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'arrêt de la ferris wheel :", error);
        res.sendStatus(500);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
