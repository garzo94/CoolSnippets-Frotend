import startCase from "lodash/startCase";

export const getErrorMessages = (err) => {
    // console.log('errorrr:',err)
    if (err && err.response && err.response.status === 500) {
        return "Encountered Internal Server Error";
    }

    if (err && err.response && err.response.status === 404) {
        return "Not Found";
    }

    if (err && err.response && err.response.data) {
        return err.response.data;
    }

    if (err && err.message) {
        return err.message;
    }
    return "Encountered Error";
};

const hideKeys = ["non_field_errors"];

export function formatHttpApiError(err, startCaseKey = true) {
    const msg = getErrorMessages(err);
    

    if (typeof msg === "string") {
        return msg;
    }

    if (typeof msg === "object") {
        let finalMsg = "";
        // console.log(Object.keys(msg)) here take keys name and color
        Object.keys(msg).forEach((k) => {
            const current = msg[k]; //take message error from every error
            // console.log('current:',current) //This field may not be blank
            const joined = Array.isArray(current) ? current.join(" ") : current;
            const newKey = startCaseKey ? startCase(k) : k;
            let message = `${joined}\n`;
            if (!hideKeys.includes(k)) {
                message = `${newKey}: ${joined}\n`;
            }
            finalMsg += message;
        });
        return finalMsg;
    }
}

export default formatHttpApiError;
