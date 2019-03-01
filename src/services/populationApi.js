export const getCountryYearPopulation = (country, year) => {
    const url = `http://api.population.io:80/1.0/population/${year}/${country}/`;

    let promise = new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                accept: 'application/json; charset=utf-8;'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            const agePopulationArray = data;
            let populationSum = 0;

            for(let agePopulation of agePopulationArray) {
                populationSum += agePopulation.total;
            }

            resolve(populationSum);
        }).catch((err) => {
            reject(err);
        });
    });

    return promise;
}

export const getCountries = () => {
    const url = 'http://api.population.io:80/1.0/countries';

    let countryPromise = new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                accept: 'application/json; charset=utf-8;'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            resolve(data.countries);
        }).catch((err) => {
            reject(err);
        });
    });


    return countryPromise;
}
