"use strict"

const getPuzzlePromiseChain = async () => {
    const wordCountElement = document.querySelector("#wordCount");
    const wordCount = wordCountElement.options[wordCountElement.selectedIndex].text;
    const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {});

    if (response.status === 200) {
        const data = await response.json();
        return data.puzzle;
    } else {
        throw new Error("Unable to fetch new puzzle");
    }

};

const getCountryInfoPromise = async (countryCode) => {

    const response = await fetch("https://restcountries.eu/rest/v2/all", {});
    if (response.status === 200) {
        const data = await response.json();
        return data.find((country) => country.alpha2Code.toUpperCase() === countryCode.toUpperCase());
    } else {
        throw new Error("Error during getCountryInfoPromise!");
    };

};

const getCountriesInRegion = (region) => {
    return fetch(`https://restcountries.eu/rest/v2/region/${region}`, {}).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Something went wrong!");
        }
    }).then((data) => data);
};

const getCountryInfo = (countryCode, callback) => {

    // Get a list of all countries
    const countryRequest = new XMLHttpRequest();
    countryRequest.open("GET", "https://restcountries.eu/rest/v2/all");
    countryRequest.send();

    countryRequest.addEventListener("readystatechange", (e) => {

        if (e.target.status === 200 && e.target.readyState === 4) {
            const countriesArr = JSON.parse(e.target.responseText);
            const israelObj = countriesArr.find((country) => country.alpha2Code.toUpperCase() === countryCode);

            if (israelObj != undefined) {
                callback(undefined, israelObj.name);
            } else {
                callback("An error has occured", undefined);
            };

        } else if (e.target.readyState === 4) {
            callback("an error has taken place", undefined);
        };

    })

}

const getLocation = () => {
    return fetch("https://ipinfo.io/json?token=de07d2289843ca").then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Error occured duting fetch location based on IP address");
        }
    });
};

const getCurrentCountry = async () => {
    let data = await getLocation();
    data = await getCountryInfoPromise(data.country);
    return data;
};