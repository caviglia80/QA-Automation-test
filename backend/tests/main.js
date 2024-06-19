const axios = require('axios');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let expectedResults;

//TODO: tener en cuenta de renombrar el env para acceder a las variables de entorno

// Cargamos los resultados esperados
before(async function () {
    const fixturePath = path.resolve(__dirname, '../fixtures/expectedResults.json');
    const fixtureData = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    expectedResults = fixtureData.expectedResults;
});

describe('BACKEND - Scenarios', function () {
    it('Crocodile API', async function () {
        this.timeout(10000); // ya que la consulta es lenta, entonces incremento el timeout de mocha

        try {
            // 1. Do a GET on https://test-api.k6.io/public/crocodiles
            const response = await axios.get(process.env.API_URL, {
                timeout: parseInt(process.env.TIMEOUT ?? 10000, 10) // Incrementamos el timeout porque la consulta es lenta
            });
            const crocodiles = response.data;

            // 2. Verify the number of entries
            expect(crocodiles, 'La respuesta deberia ser una array').to.be.an('array'); // Verificamos que response.data sea un array
            expect(crocodiles, 'EL array no deberia estar vacio').to.have.length.greaterThan(0); // Verificamos que el array no este vacío
            console.log(`Cantidad de cocodrilos: ${crocodiles.length}`);

            // 3. Check the "Name" and "Date of Birth" values of the 3rd and 7th "entries"
            const thirdEntry = crocodiles[2];
            const seventhEntry = crocodiles[6];

            console.log(`Nombre de tercer cocodrilo: ${thirdEntry.name}`);
            console.log(`Nacimiento de tercer cocodrilo: ${thirdEntry.date_of_birth}`);

            console.log(`Nombre de septimo cocodrilo: ${seventhEntry.name}`);
            console.log(`Nacimiento de septimo cocodrilo: ${seventhEntry.date_of_birth}`);

            // Verificamos que los campos de la respuesta de la API coincidan con los campos esperados en fixtures
            expect(thirdEntry, 'El nombre del cocodrilo deberia coincidir con el esperado (3)').to.have.property('name', expectedResults.thirdEntry.name);
            expect(thirdEntry, 'El nacimiento del cocodrilo deberia coincidir con el esperado (3)').to.have.property('date_of_birth', expectedResults.thirdEntry.date_of_birth);

            expect(seventhEntry, 'El nombre del cocodrilo deberia coincidir con el esperado (7)').to.have.property('name', expectedResults.seventhEntry.name);
            expect(seventhEntry, 'El nacimiento del cocodrilo deberia coincidir con el esperado (7)').to.have.property('date_of_birth', expectedResults.seventhEntry.date_of_birth);

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });
});
