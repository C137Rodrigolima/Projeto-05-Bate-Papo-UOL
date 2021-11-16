let NomedoCliente=prompt("Diga-nos seu nome:");
let ObjNome = {
    name: NomedoCliente
};

const PromessaEntrada = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", ObjNome);
PromessaEntrada.then(continuarativo);
PromessaEntrada.catch(TratarErro);

function TratarErro(erro) {
    window.location.reload(true);
}
function continuarativo() {
    setInterval(function() {
        const PromessaPermanencia = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", ObjNome);
    }, 5000);
}

setInterval(function() {
const Promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
Promessa.then(BuscarMensagens);

function BuscarMensagens(resposta) {
    PrintarAMensagem(resposta.data);
}

const quadroDEmensagens=document.querySelector("main");
function PrintarAMensagem(Objetopai) {

    const Objetopaicomprimento = Object.keys(Objetopai).length;

    for (let i=0; i<Objetopaicomprimento; i++){

        const Tempo = Objetopai[i].time;
        const Pessoa = Objetopai[i].from;
        const PraQuem = Objetopai[i].to;
        const Texto = Objetopai[i].text;
        const Tipo = Objetopai[i].type;

        if (Tipo !== "private_message" || (Tipo ==="private_message" && PraQuem === NomedoCliente)) {
        quadroDEmensagens.innerHTML += `<p data-identifier="message" class="${Tipo}"><span class="hora">${Tempo}</span> <span>${Pessoa}</span> para 
        <span>${PraQuem}</span>: ${Texto}</p>`;
        }
        

    }
    const ultimoelemento = document.querySelector("main").lastChild;
    ultimoelemento.scrollIntoView();
}

}, 3000);

const botão = document.querySelector(".botão");
function EnviarAOclick(botão) {

    const textoinput = document.querySelector(".textoai");
    const Mensagemdigitada = textoinput.value;

    const ObjetoMensagem = {
        from: NomedoCliente,
        to: "Todos", 
        text: Mensagemdigitada,
        type: "message"
    }

    const PromessaMensagem = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", ObjetoMensagem);
    PromessaMensagem.then(BuscarMensagens);
    PromessaMensagem.catch(TratarErroMensagem);

    function TratarErroMensagem(Erro) {
        window.location.reload(true);
    }
}