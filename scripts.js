async function buscaEndereco(cep) {
  let mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = ``;
  try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCEPConvertida = await consultaCEP.json();

    if (consultaCEPConvertida.erro) {
      throw Error("CEP não existente!");
    }

    let cidade = document.getElementById("cidade");
    let logradouro = document.getElementById("endereco");
    let estado = document.getElementById("estado");

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;

    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente</p>`;
  }
}

// Promise All

// let ceps = ["01001000", "01001001"];
// let conjuntoCeps = ceps.map((valores) => buscaEndereco(valores));
// console.log(conjuntoCeps);
// Promise.all(conjuntoCeps).then((responses) => console.log(responses));

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
