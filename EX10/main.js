var query = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='DATA_DIA'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";

if (typeof Object.keys !== "function") {
    (function() {
        var hasOwn = Object.prototype.hasOwnProperty;
        Object.keys = Object_keys;
        function Object_keys(obj) {
            var keys = [], name;
            for (name in obj) {
                if (hasOwn.call(obj, name)) {
                    keys.push(name);
                }
            }
            return keys;
        }
    })();
}

function submit() {
    var query = window.query;
    var DATA_DIA = document.getElementById("Data_Dia").value;

    if (DATA_DIA == "") {
        alert("Dia inválido.");
        return;
    }
    DATA_DIA = DATA_DIA.split("-");
    DATA_DIA = DATA_DIA[1] + "-" + DATA_DIA[2] + "-" + DATA_DIA[0];
    query = query.replace("DATA_DIA", DATA_DIA);

    loadQuery(query);
}

function loadQuery(query) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var table = toTable(JSON.parse(xhttp.responseText));
            var inner = document.getElementById("Table0").innerHTML;
            if (inner.includes("Table1")){
                table = table.match("<tr><td>.*</table>");
                if (table && table[0]) {
                    table = table[0];
                    var aux = (table.match("<tr><td>.*</td></tr>"))[0];
                    if (inner.includes(aux)) {
                        inner = inner.replace(aux, "");
                    } else {
                        inner = inner.replace("</tbody></table>", table);
                    }
                    document.getElementById("Table0").innerHTML = inner;
                }
            } else
                document.getElementById("Table0").innerHTML = table;
        }
    };
    xhttp.open("GET", query, true);
    xhttp.timeout = 5000;
    xhttp.ontimeout = function () { alert("Timed out!!!"); }
    xhttp.send();
}

function justify(string) {
    var newStrings, newString = "";
    string = string.charAt(0).toUpperCase() + string.slice(1);
    newStrings = string.match(/[A-Z][a-z]+/g)
    for (i in newStrings)
        newString += newStrings[i] + " ";
    return newString.replace(/cao/g, "ção");
}

function removeFromTable(element) {
    var inner = document.getElementById("Table0").innerHTML;
    document.getElementById("Table0").innerHTML = inner.replace(element.outerHTML, "");
}

function toTable(json) {
    if (json.value[0] != null) {
        var keys = Object.keys(json.value[0]).toString().split(",");
        var header = "<thead><tr>";
        var content = "<tbody>";

        for (i in keys)
            header += "<th>" + justify(keys[i]) + "</th>";
        header += "<th>Remover</th></thead></tr>";
        
        for (i in json.value) {
            content += "<tr>";
            for (j in keys)
                content += "<td>" + json.value[i][keys[j]] + "</td>";
            content += "<td style=\"text-align:center\"><input type=\"button\" value=\"X\" onclick=\"removeFromTable(this.parentNode.parentNode)\"></td></tr>";
        }
        content += "</tbody>";

        return "<table id=\"Table1\">" + header + content + "</table>";
    } else {
        alert("Dia sem cotação");
        return "";
    }
}