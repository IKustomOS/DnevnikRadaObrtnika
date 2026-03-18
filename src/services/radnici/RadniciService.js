import { radnici } from "./RadniciPodaci";

async function get() {
    return {data: radnici}
}

export default {
    get
}
