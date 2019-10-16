var query = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='DATA_INICIAL'&@dataFinalCotacao='DATA_FINAL'&$top=100&$format=json";
var queryAdd = "&$select=";
var queryCompra = "cotacaoCompra";
var queryVenda = "cotacaoVenda";
var queryDataHora = "dataHoraCotacao";

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

function dateDiff(a, b) {
    var a = new Date(a.split("-"));
    var b = new Date(b.split("-"));
    return (b-a) / (1000*3600*24);
}

function submit() {
    var query = window.query;
    var DATA_INICIAL = document.getElementById("Data_Inicial").value;
    var DATA_FINAL = document.getElementById("Data_Final").value;
    var COMPRA = document.getElementById("Compra").checked;
    var VENDA = document.getElementById("Venda").checked;
    var DATAHORA = document.getElementById("DataHora").checked;
    var ORD = document.getElementById("Ordenacao").value;

    if (DATA_INICIAL == "" || DATA_FINAL == "" || dateDiff(DATA_INICIAL, DATA_FINAL) < 10 || dateDiff(DATA_INICIAL, DATA_FINAL) > 90) {
        alert("Período inválido: forneça um período de 10 (mínimo) a 90 (máximo) dias para a cotação.");
        return;
    }

    query = query.replace("DATA_INICIAL", DATA_INICIAL);
    query = query.replace("DATA_FINAL", DATA_FINAL);

    if (COMPRA || VENDA) {
        query += queryAdd;
        if (COMPRA)
            query += queryCompra;
        if (COMPRA && VENDA)
            query += ",";
        if (VENDA)
            query += queryVenda;
        if (DATAHORA)
            query += "," + queryDataHora;
    } else {
        alert("Selecione ao menos uma das opções de compra ou venda.");
        return;
    }
    loadQuery(query, ORD);
}

function loadQuery(query, ORD) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Table0").innerHTML = toTable(JSON.parse(xhttp.responseText));
            sortTable(ORD);
        }
    };
    xhttp.open("GET", query, true);
    xhttp.timeout = 3000;
    xhttp.ontimeout = function () { alert("Timed out!!!"); }
    xhttp.send();
}

function toTable(json) {
    var keys = Object.keys(json.value[0]).toString().split(",");
    var header = "<tr>";
    var content = "";

    for (i in keys)
        header += "<th>" + keys[i] + "</th>";
    header += "</tr>";
    
    for (i in json.value) {
        content += "<tr>";
        for (j in keys)
            content += "<td>" + json.value[i][keys[j]] + "</td>";
        content += "</tr>";
    }

    return "<table id=\"Table1\">" + header + content + "</table>";
}

function sortTable(ORD) {
    if (ORD == "NOrd")
        return;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("Table1");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (ORD == "Crescente") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}