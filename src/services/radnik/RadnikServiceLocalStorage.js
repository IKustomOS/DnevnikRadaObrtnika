const STORAGE_KEY = 'radnici';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const radnici = dohvatiSveIzStorage();
    return {success: true,  data: [...radnici] };
}

async function getById(id) {
    const radnici = dohvatiSveIzStorage();
    const radnik = radnici.find(r => r.id === parseInt(id));
    return {success: true,  data: radnik };
}

async function dodaj(radnik) {
    const radnici = dohvatiSveIzStorage();
    
    if (radnici.length === 0) {
        radnik.id = 1;
    } else {
        const maxId = Math.max(...radnici.map(r => r.id));
        radnik.id = maxId + 1;
    }
    
    radnici.push(radnik);
    spremiUStorage(radnici);
    return { data: radnik };
}

async function promjeni(id, radnik) {
    const radnici = dohvatiSveIzStorage();
    const index = radnici.findIndex(r => r.id === parseInt(id));
    
    if (index !== -1) {
        radnici[index] = { ...radnici[index], ...radnik};
        spremiUStorage(radnici);
    }
    return { data: radnici[index] };
}

async function obrisi(id) {
    let radnici = dohvatiSveIzStorage();
    radnici = radnici.filter(r => r.id !== parseInt(id));
    spremiUStorage(radnici);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getById,
    promjeni,
    obrisi
};
