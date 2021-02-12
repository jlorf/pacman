$(document).ready(function () {
    let index = 1;
    var array = JSON.parse(window.localStorage.getItem("puntuacions")) || [];
    // array.sort(function (a, b) { return b.Punts - a.Punts; })
    // array.forEach(element => {
    //     let tr = document.createElement("tr");
    //     let th = document.createElement("th");
    //     th.scope = "row";
    //     th.innerHTML = index;
    //     let td1 = document.createElement("td");
    //     td1.innerHTML = element.Nom;
    //     let td2 = document.createElement("td");
    //     td2.innerHTML = element.Punts;
    //     let td3 = document.createElement("td");
    //     td3.innerHTML = ObtenirDificultat(element?.Dificultat);
    //     tr.appendChild(th);
    //     tr.appendChild(td1);
    //     tr.appendChild(td2);
    //     tr.appendChild(td3);
    //     document.getElementById("taula").appendChild(tr);
    //     index++;
    // });
    var arr = groupBy(array, e => e.Dificultat || 5);
    arr = new Map([...arr.entries()].sort((a, b) => b[0] - a[0]));
    arr.forEach(df => {
        df.sort(function (a, b) { return b.Punts - a.Punts; });
        df.forEach(element => {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.scope = "row";
            th.innerHTML = index;
            let td1 = document.createElement("td");
            td1.innerHTML = element.Nom;
            let td2 = document.createElement("td");
            td2.innerHTML = element.Punts;
            let td3 = document.createElement("td");
            td3.innerHTML = ObtenirDificultat(element?.Dificultat);
            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            document.getElementById("taula").appendChild(tr);
            index++;
        })
    });
});

function ObtenirDificultat(df) {
    var str = null;
    switch (parseInt(df) || 5) {
        case 5:
            str = 'fàcil'
            break;
        case 10:
            str = 'intermig'
            break;
        case 20:
            str = 'dificil'
            break;
        default:
            str = 'fàcil'
            break;
    }
    return str;
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}