// code for timezone
import {countriesStateCitiesData} from './countriesStateCitiesData';
export const getCountryCode = () => {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (userTimeZone === "Asia/Calcutta") {
        userTimeZone = "Asia/Kolkata";
    }
    for (let i = 0; i < countriesStateCitiesData.length; i++) {
        if (countriesStateCitiesData[i].tz === userTimeZone) {
            return { countryCode: countriesStateCitiesData[i].code.toLowerCase(), phone_code: countriesStateCitiesData[i].phone_code }
        }
    }
    return { countryCode: "am", code: "374" }
}