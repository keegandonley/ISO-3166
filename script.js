const fs = require('fs');
const path = require('path');

(async () => {
    const input = await fs.readFileSync(path.join(__dirname, 'raw.json'));
    const data = await input.toString();
    const parsed = JSON.parse(data);

    const alpha2ToAlpha3 = {};
    const alpha3ToAlpha2 = {};
    const alpha2ToCountryCode = {};
    const alpha3ToCountryCode = {};
    const alpha2ToName = {};
    const alpha3ToName = {};
    const countryCodeToName = {};
    const countryCodeToAlpha2 = {};
    const countryCodeToAlpha3 = {};

    parsed.forEach((country) => {
        const a2 = country['alpha-2'];
        const a3 = country['alpha-3'];
        const code = country['country-code'];
        const name = country.name;

        if (a2 && a3) {
            alpha2ToAlpha3[a2] = a3;
            alpha3ToAlpha2[a3] = a2;
        }
        if (a2 && code) {
            alpha2ToCountryCode[a2] = code;
            countryCodeToAlpha2[code] = a2;
        }
        if (a3 && code) {
            alpha3ToCountryCode[a3] = code;
            countryCodeToAlpha3[code] = a3;
        }
        if (a2 && name) {
            alpha2ToName[a2] = name;
        }
        if (a3 && name) {
            alpha3ToName[a3] = name;
        }
        if (code && name) {
            countryCodeToName[code] = name;
        }
    });

    await Promise.all([
        fs.writeFileSync(path.join(__dirname, 'alpha2ToAlpha3.json'), JSON.stringify(alpha2ToAlpha3, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToAlpha2.json'), JSON.stringify(alpha3ToAlpha2, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToCountryCode.json'), JSON.stringify(alpha2ToCountryCode, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToCountryCode.json'), JSON.stringify(alpha3ToCountryCode, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToName.json'), JSON.stringify(alpha2ToName, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToName.json'), JSON.stringify(alpha3ToName, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToName.json'), JSON.stringify(countryCodeToName, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToAlpha2.json'), JSON.stringify(countryCodeToAlpha2, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToAlpha3.json'), JSON.stringify(countryCodeToAlpha3, null, 2)),
    ])
})();