export function saveTolocal (id,key,value){
    let seller = window.localStorage.__seller__;

    if(!seller){
        seller = {};
        seller[id] = {};
        seller[id][key] = value;
    }
    else{
        seller = JSON.parse(seller);
        if(!seller.id){
            seller[id] = {}; 
        }

    }
    seller[id][key] = value;
    localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id,key,def){
    let seller = window.localStorage.__seller__;
    console.log(seller);
    if(!seller){
        return def;
    }
    seller = JSON.parse(seller)[id];
    console.log(seller);
    if(!seller)
    {
        return def;
    }
    console.log(seller[key]);
    return seller[key];
}