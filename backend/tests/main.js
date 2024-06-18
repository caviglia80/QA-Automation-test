const axios = require('axios');
const { expect } = require('chai');

describe('BACKEND - Crocodile API', function () {
    it('should get crocodile data and verify entries', async function () {
        try {
            // 1. Do a GET on https://test-api.k6.io/public/crocodiles
            const response = await axios.get('https://test-api.k6.io/public/crocodiles', {
                timeout: 10000 // la respuesta de esta api puede demorar..
            });
            const crocodiles = response.data;

            // 2. Verify the number of entries
            expect(crocodiles).to.be.an('array'); // verificamos que response.data es un array
            expect(crocodiles).to.have.length.greaterThan(0); // no especificamos cantidad pero sabemos que el array no puede ser de 0 items

            console.log(`Cantidad de cocodrilos: ${crocodiles.length}`); // 0 to 7

            // 3. Check the "Name" and "Date of Birth" values of the 3rd and 7th "entries"
            const thirdEntry = crocodiles[2];
            const expectedThirdEntryName = 'Lyle the Crocodile';
            const expectedThirdEntryDob = '1985-03-03';
            // console.log(thirdEntry.name);
            // console.log(thirdEntry.date_of_birth);

            const seventhEntry = crocodiles[6];
            const expectedSeventhEntryName = 'Sobek';
            const expectedSeventhEntryDob = '1854-09-02';
            // console.log(seventhEntry.name);
            // console.log(seventhEntry.date_of_birth);

            // expected results
            expect(thirdEntry).to.have.property('name', expectedThirdEntryName);
            expect(thirdEntry).to.have.property('date_of_birth', expectedThirdEntryDob);

            expect(seventhEntry).to.have.property('name', expectedSeventhEntryName);
            expect(seventhEntry).to.have.property('date_of_birth', expectedSeventhEntryDob);

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });
});
