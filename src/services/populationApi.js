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
