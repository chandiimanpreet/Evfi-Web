// code for timezone
import { data } from './data';
export const getCountryCode = () => {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (userTimeZone === "Asia/Calcutta") {
        userTimeZone = "Asia/Kolkata";
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].tz === userTimeZone) {
            return { countryCode: data[i].code.toLowerCase(), phone_code: data[i].phone_code }
        }
    }
    return { countryCode: "am", code: "374" }
}