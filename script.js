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
    const alpha3ToRegionName = {};
    const alpha3ToRegionCode = {};
    const alpha2ToRegionCode = {};
    const alpha2ToRegionName = {};
    const regionCodeToRegionName = {};

    parsed.forEach((country) => {
        const a2 = country['alpha-2'];
        const a3 = country['alpha-3'];
        const code = country['country-code'];
        const name = country.name;
        const regionName = country.region;
        const regionCode = country['region-code'];

        if (a2 && regionName && regionCode) {
            alpha2ToRegionName[a2] = regionName;
            alpha2ToRegionCode[a2] = regionCode;
        }

        if (a3 && regionName && regionCode) {
            alpha3ToRegionName[a3] = regionName;
            alpha3ToRegionCode[a3] = regionCode;
        }

        if (regionCode && regionName) {
            regionCodeToRegionName[regionCode] = regionName;
        }

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
        fs.writeFileSync(path.join(__dirname, 'alpha3ToRegionName.json'), JSON.stringify(alpha3ToRegionName, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToRegionCode.json'), JSON.stringify(alpha3ToRegionCode, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToRegionName.json'), JSON.stringify(alpha2ToRegionName, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToRegionCode.json'), JSON.stringify(alpha2ToRegionCode, null, 2)),
        fs.writeFileSync(path.join(__dirname, 'regionCodeToRegionName.json'), JSON.stringify(regionCodeToRegionName, null, 2)),


        fs.writeFileSync(path.join(__dirname, 'alpha2ToAlpha3.min.json'), JSON.stringify(alpha2ToAlpha3)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToAlpha2.min.json'), JSON.stringify(alpha3ToAlpha2)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToCountryCode.min.json'), JSON.stringify(alpha2ToCountryCode)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToCountryCode.min.json'), JSON.stringify(alpha3ToCountryCode)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToName.min.json'), JSON.stringify(alpha2ToName)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToName.min.json'), JSON.stringify(alpha3ToName)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToName.min.json'), JSON.stringify(countryCodeToName)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToAlpha2.min.json'), JSON.stringify(countryCodeToAlpha2)),
        fs.writeFileSync(path.join(__dirname, 'countryCodeToAlpha3.min.json'), JSON.stringify(countryCodeToAlpha3)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToRegionName.min.json'), JSON.stringify(alpha3ToRegionName)),
        fs.writeFileSync(path.join(__dirname, 'alpha3ToRegionCode.min.json'), JSON.stringify(alpha3ToRegionCode)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToRegionName.min.json'), JSON.stringify(alpha2ToRegionName)),
        fs.writeFileSync(path.join(__dirname, 'alpha2ToRegionCode.min.json'), JSON.stringify(alpha2ToRegionCode)),
        fs.writeFileSync(path.join(__dirname, 'regionCodeToRegionName.min.json'), JSON.stringify(regionCodeToRegionName)),
    ])
})();