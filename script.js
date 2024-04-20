window.addEventListener("load", start);

let nomeTabela = document.getElementById("nomeTabela");
let numColunas = document.getElementById("colunas");
let btnCodigo = document.getElementById("gerarCodigo");

function start() {
  submit();
}

function submit() {
  let form = document.querySelector("form");
  form.addEventListener("submit", cadastro);

  function cadastro(evento) {
    evento.preventDefault();
  }
}

function Gerar() {
  if(nomeTabela.value != '' && numColunas.value != '') {
    let colNome = document.getElementById("nome");
    let colTipo = document.getElementById("tipo");
    let colTam = document.getElementById("tamanho");
    let colNulo = document.getElementById("nulo");
    let colIndice = document.getElementById("indice");
    let colAI = document.getElementById("ai");
    if(colNome.innerHTML != '') {
        colNome.innerHTML = '';
        colTipo.innerHTML = '';
        colNulo.innerHTML = '';
        colTam.innerHTML = '';
        colIndice.innerHTML = '';
        colAI.innerHTML = '';
    }
    for (let i = 0; i < numColunas.value; i++) {
        colNome.innerHTML += '<input type="text" id="nomeS' + i + '">';
        colTipo.innerHTML += `
            <select id="tipoS`+i+`">
                <option value="INT">INT</option>
                <option value="VARCHAR">VARCHAR</option>
                <option value="CHAR">CHAR</option>
                <option value="DATE">DATE</option>
                <option value="DECIMAL">DECIMAL</option>
                <option value="BLOB">BLOB</option>
                <option value="BOOLEAN">BOOLEAN</option>
            </select>`;
        colTam.innerHTML += '<input type="text" id="tamS' + i + '">';
        colNulo.innerHTML += `
            <select id="nuloS`+i+`">
                <option value="SIM">SIM</option>
                <option value="NÃO">NÃO</option>
            </select>`;
        colIndice.innerHTML += `
            <select id="indiceS`+i+`">
                <option value=""></option>
                <option value="PRIMARY">PRIMARY</option>
                <option value="UNIQUE">UNIQUE</option>
            </select>`;
        colAI.innerHTML += `
            <select id="aiS`+i+`">
                <option value="SIM">SIM</option>
                <option value="NÃO">NÃO</option>
            </select>`;
    }
    btnCodigo.disabled = false;
  }
  else {
    alert("Há campos vazios!");
  }
}

function GerarCodigo() {
    let codigo = "CREATE TABLE " + nomeTabela.value + "(\n";
    let controlador = 0;
    bloco: {
        for(let i = 0; i < numColunas.value; i++) {
            codigo += "\t" + document.getElementById('nomeS' + i).value;
            codigo += " " + document.getElementById('tipoS' + i).value;
            if(document.getElementById('tamS' + i).value != '') {
                codigo += " (" + document.getElementById('tamS' + i).value + ")";
            }
            else {
                if(document.getElementById('tipoS' + i).value == "DECIMAL" || document.getElementById('tipoS' + i).value == "VARCHAR" || document.getElementById('tipoS' + i).value == "CHAR") {
                    controlador = 1;
                }
            }
    
            if(controlador == 1) {
                alert("Para os tipos VARCHAR, CHAR e DECIMAL é necessário definir um tamanho/valor!");
                break bloco;
            }
    
    
            if(document.getElementById('nuloS' + i).value == "NÃO") {
                codigo += " NOT NULL";
            }
    
            if(document.getElementById('indiceS' + i).value == "PRIMARY") {
                codigo += " PRIMARY KEY";
            }
            else if (document.getElementById('indiceS' + i).value == "UNIQUE") {
                codigo += " UNIQUE ";
            }
    
            if(document.getElementById('aiS' + i).value == "SIM") {
                codigo += " AUTO_INCREMENT";
            }
    
            if(i == numColunas.value - 1) {
                codigo += "\n);";
            }
            else {
                codigo += ",\n";
            }
    
        }
    }
    if(controlador != 1) {
        document.getElementById('cod').style.display = 'block';
        document.getElementById('cod').innerText = codigo;
    }
}