import { radnici } from "./RadnikPodaci"


async function get() {
    return {data: [...radnici]}
}


async function getById(id) {
   return {data: radnici.find(s => s.id === parseInt(id))} 
}


async function dodaj(radnik){
    if(radnici.length>0){
        radnik.id = radnici[radnici.length - 1].id + 1
    }else{
        radnik.id = 1
    }
    
    radnici.push(radnik);
}


async function promjeni(id,radnik) {
    const index = nadiIndex(id)
    radnici[index] = {...radnici[index], ...radnik}
}

function nadiIndex(id){
    return radnici.findIndex(s => s.id === parseInt(id))
}

async function obrisi(id) {
    const index = nadiIndex(id)
    radnici.splice(index,1)
}


export default{
    get,
    dodaj,
    getById,
    promjeni,
    obrisi
}