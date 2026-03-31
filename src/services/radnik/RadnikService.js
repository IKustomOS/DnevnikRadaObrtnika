import RadnikServiceLocalStorage from "./RadnikServiceLocalStorage";
import RadnikServiceMemorija from "./RadnikServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = RadnikServiceMemorija;
        break;
    case 'localStorage':
        Servis = RadnikServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getById: async (id) => ({ success: false, data: {} }),
    dodaj: async (radnik) => { console.error("Servis nije učitan"); },
    promjeni: async (id, radnik) => { console.error("Servis nije učitan"); },
    obrisi: async (id) => { console.error("Servis nije učitan"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getById: (id) => AktivniServis.getById(id),
    dodaj: (radnik) => AktivniServis.dodaj(radnik),
    promjeni: (id, radnik) => AktivniServis.promjeni(id, radnik),
    obrisi: (id) => AktivniServis.obrisi(id)
};