$(document).ready(function () {
    let index = 1;
    var array = JSON.parse(window.localStorage.getItem("puntuacions")) || [];
    array.sort(function (a, b) { return b.Punts - a.Punts; })
    array.forEach(element => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.innerHTML = index;
        let td1 = document.createElement("td");
        td1.innerHTML = element.Nom;
        let td2 = document.createElement("td");
        //td2.innerHTML = JSON.stringify(str);
        let _string = element.Punts;
        td2.innerHTML = _string;
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementById("taula").appendChild(tr);
        index++;
    });
});