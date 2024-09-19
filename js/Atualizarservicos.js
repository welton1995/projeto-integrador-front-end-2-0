const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const tipoURL = params.get('tipo');
const precoURL = params.get('preco');
const custoURL = params.get('custo');
const quantidadeURL = params.get('quantidade');
const observacaoURL = params.get('observacao');
const horaURL = params.get('data');
const btnAtualizar = document.querySelector('#btnAtualizarServico');

const tipo = document.querySelector('#servicoTipo');
const preco = document.querySelector('#servicoPreco');
const custo = document.querySelector('#servicoCusto');
const quantidade = document.querySelector('#servicoQuantidade');
const observacao = document.querySelector('#servicoObservacao');
const hora = document.querySelector('#servicoData');

console.log('teste')

tipo.value = tipoURL;
preco.value = precoURL;
custo.value = custoURL;
quantidade.value = quantidadeURL;
observacao.value = observacaoURL;
hora.value = new Date(horaURL).toISOString().slice(0, 16);
observacao.value = observacaoURL;


btnAtualizar.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    if(!tipo.value || tipo.value == 'Selecione um tipo'){
      return tipo.focus();
    }
    if(!preco.value){
      return preco.focus();
    }
    if(!custo.value){
      return custo.focus();
    }
    if(!quantidade.value){
      return quantidade.focus();
    }
    if(!hora.value){
      return hora.focus();
    }

    const raw = {
      tipo: tipo.value,
      preco: preco.value,
      custo: custo.value,
      quantidade: quantidade.value,
      hora: hora.value,
      observacao: observacao.value,
    }

    const requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiTeste}/servicos/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo.message == 'Servico editado com sucesso!'){
      await Swal.fire({
        title: "Serviço atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });
    }

    window.location.href = './servicos.html';

    console.log(conteudo);

    
  } catch (error) {
    console.log(error);
  }
})