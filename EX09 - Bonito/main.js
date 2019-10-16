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

function mySubmit() {
    document.getElementById("alert_placeholder").innerHTML = "";
    document.getElementById("alert_timeout").innerHTML = "";
    var query = window.query;
    var DATA_INICIAL = document.getElementById("Data_Inicial").value;
    var DATA_FINAL = document.getElementById("Data_Final").value;
    var COMPRA = document.getElementById("Compra").checked;
    var VENDA = document.getElementById("Venda").checked;
    var DATAHORA = document.getElementById("DataHora").checked;

    if (DATA_INICIAL == "" || DATA_FINAL == "" || dateDiff(DATA_INICIAL, DATA_FINAL) < 10 || dateDiff(DATA_INICIAL, DATA_FINAL) > 90) {
        document.getElementById("alert_placeholder").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" id=\"alert\">Período inválido: forneça um período de 10 (mínimo) a 90 (máximo) dias para a cotação.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";
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
    }
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
            document.getElementById("Table0").innerHTML = toTable(JSON.parse(xhttp.responseText));
            sortTable();            
        }
    };
    xhttp.open("GET", query, true);
    xhttp.timeout = 3000;
    xhttp.ontimeout = function () { 
        document.getElementById("alert_timeout").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Tempo de conexão esgotado.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";
    }
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

function toTable(json) {
    var keys = Object.keys(json.value[0]).toString().split(",");
    var header = "<thead class=\"thead-dark\"><tr>";
    var content = "<tbody>";

    for (i in keys)
        header += "<th>" + justify(keys[i]) + "</th>";
    header += "</tr></thead>";
    
    for (i in json.value) {
        content += "<tr>";
        for (j in keys)
            content += "<td>" + json.value[i][keys[j]] + "</td>";
        content += "</tr>";
    }
    content += "</tbody>";
    return "<div class=\"table-responsive\">" + "<table class = \"table table-bordered table-striped\" id=\"Table1\">" + header + content + "</table>" + "</div>";
}

function sortTable() {
    $(document).ready(function () {
        $('#Table1').DataTable();
        $('.dataTables_length').addClass('bs-select');
    });
}