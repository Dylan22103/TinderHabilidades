const express = require('express');
const app = express();
const connection = require('./knexfile')['development'];
const db = require('knex')(connection);

const port = 3000;

app.use(express.json());

app.get('/personas', (req, res) => {
    db('personas').then((personas) => {
        res.json(personas);
    });
});

app.post('/personas', (req, res) => {
    const toCreate = req.body;
    db('personas').insert(toCreate)
        .then((personas) => {
            res.json(personas);
        });
});

app.get('/empresas', (req, res) => {
    db('empresas').then((empresas) => {
        res.json(empresas);
    });
});

app.post('/empresas', (req, res) => {
    const toCreate = req.body;
    db('empresas').insert(toCreate)
        .then((empresas) => {
            res.json(empresas);
        });
});

app.get('/matches', (req, res) => {
    db('match').then((empresas) => {
        res.json(empresas);
    });
});

async function createMatches() {
    try {
        
        const personas = await db.select('*').from('personas');
        const empresas = await db.select('*').from('empresas');
        const matches = await db.select('*').from('match');

        
        for (const persona of personas) {
            const empresaMatch = empresas.find(empresa => empresa.habilidad_requerida == persona.habilidad);
            const verify = matches.find(i => i.nombre_empresa == empresaMatch.nombre_empresa && i.nombre_persona == persona.nombre_persona);

            if (empresaMatch && !verify) {
                
                await db('match').insert({
                    nombre_empresa: empresaMatch.nombre_empresa,
                    nombre_persona: persona.nombre_persona
                });
            }
        }

        console.log('Matches creados exitosamente');
    } catch (error) {
        console.error('Error al crear los matches:', error);
    }
}

app.post('/crearMatches', (req, res) => {
    createMatches()
        .then(() => {
            res.send('Matches creados exitosamente');
        })
        .catch(error => {
            res.status(500).send('Error al crear los matches: ' + error.message);
        });
});

app.listen(port, () => {
    console.log('Se esta ejecutando en el puerto 3000');
});
