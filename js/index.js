$(document).ready(function() {
    let index = 1;
    for(let property in navigator){ 
        let str = navigator[property];
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.innerHTML = index;
        let td1 = document.createElement("td");
        td1.innerHTML = property;
        let td2 = document.createElement("td");
        //td2.innerHTML = JSON.stringify(str);
        let _string = typeof str === "string" ? str : JSON.stringify(str)
        td2.innerHTML = _string;
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementById("taula").appendChild(tr);
        index++;
    } 
});