const cityTarrifMap = {
    AndhraPradesh: 9.95,
    Assam: 7.15,
    Bihar: 8.05,
    Chhattisgarh: 4.85,
    Delhi: 8.00,
    Goa: 4.25,
    Gujarat: 5.20,
    Haryana: 7.10,
    HimachalPradesh: 5.45,
    Jharkhand: 4.25,
    Karnataka: 8.15,
    Kerala: 7.90,
    MadhyaPradesh: 6.65,
    Maharashtra: 11.82,
    Manipur: 6.75,
    Meghalaya: 5.90,
    Mizoram: 6.00,
    Nagaland: 7.00,
    Odisha: 6.20,
    Punjab: 6.63,
    Rajasthan: 7.95,
    Sikkim: 4.00,
    TamilNadu: 6.60,
    Telangana: 9.50,
    Tripura: 7.20,
    UttarPradesh: 7.00,
    Uttarakhand: 6.25,
    WestBengal: 8.99,
}

const xDistCost = (batteryCap, state, range, dist) => {
    return (batteryCap / range) * dist * (cityTarrifMap[state]);
}

const fullChargeCost = (batteryCap, state) => {
    return (batteryCap * (costPerKWH[state])).toPrecision(2);
}