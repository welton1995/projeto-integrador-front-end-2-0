const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';
const address = 'https://projeto-integrador-front-end-2-0.vercel.app';
const tabelaServicos = document.querySelector('#servicos');

// inputs cadastro
const tipo = document.querySelector('#servicoTipo');
const preco = document.querySelector('#servicoPreco');
const custo = document.querySelector('#servicoCusto');
const quantidadeServico = document.querySelector('#servicoQuantidade');
const observacao = document.querySelector('#servicoObservacao');
const hora = document.querySelector('#servicoData');
const btnCadastrarServico = document.querySelector('#btnServicoCadastrar');
const btnExcluir = document.querySelector('#btnServicoExcluir');

// inputs cadastro
const tipoModal = document.querySelector('#servicoTipo');
const precoModal = document.querySelector('#servicoPreco');
const custoModal = document.querySelector('#servicoCusto');
const quantidadeServicoModal = document.querySelector('#servicoQuantidade');
const observacaoModal = document.querySelector('#servicoObservacao');
const horaModal = document.querySelector('#servicoData');
const btnCadastrarServicoModal = document.querySelector('#btnServicoCadastrar');


// Listar Servicos
const listarServicos = async() => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }
    const resposta = await fetch(`${apiTeste}/servicos`, requestOptions);
    const conteudo = await resposta.json();

    conteudo.servicos.reverse().forEach((servico) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-center align-middle" title="Tipo do serviço realizado.">${servico.tipo}</td>
        <td class="text-center align-middle" title="Valor cobrado pelo serviço.">${(servico.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Custo para realizar o serviço.">${(servico.custo).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Quantidade realizado(a).">${servico.quantidade}</td>
        <td class="text-center align-middle" title="Lucro ganho pelo serviço realizado.">${((servico.preco - servico.custo) * servico.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Porcentagem de lucro ganha no serviço realizado. (Por unidade)">${(((servico.preco - servico.custo)/servico.custo) * 100).toFixed(2)} % </td>
        <td class="text-center align-middle" title="Data que o serviço foi realizado.">${new Date(servico.data).toLocaleDateString('pt-BR')}</td>
        <td class="text-center align-middle" title="Observações.">${servico.observacao}</td>
        <td class="text-center align-middle">
          <a href="./excluirServico.html?id=${servico._id}&tipo=${servico.tipo}&preco=${servico.preco}&custo=${servico.custo}&quantidade=${servico.quantidade}&data=${servico.data}&observacao=${servico.observacao}" title="Excluir registro."><img src="../imgs/lixeira.png" width="20px"></a>
          <a href="./editarServico.html?id=${servico._id}&tipo=${servico.tipo}&preco=${servico.preco}&custo=${servico.custo}&quantidade=${servico.quantidade}&data=${servico.data}&observacao=${servico.observacao}" title="Editar registro."><img src="../imgs/editar.png" width="20px"></a>
        </td>
      `;

      tabelaServicos.appendChild(tr);

    });

    console.log(conteudo.servicos );
  } catch (error) {
    console.log(error);
  }
}

listarServicos();

// Cadastrar Servico
btnCadastrarServico.addEventListener('click', async () => {
  try {
    if(tipo.value == 'Selecione um tipo' || !tipo.value){
      return tipo.focus();
    }
    if(!preco.value){
      return preco.focus();
    }
    if(!custo.value){
      return custo.focus();
    }
    if(!quantidadeServico.value){
      return quantidadeServico.focus();
    }
    if(!hora.value){
      return hora.focus();
    }


    const raw = {
      tipo: tipo.value,
      preco: preco.value,
      custo: custo.value,
      quantidade: quantidadeServico.value,
      hora: hora.value,
      observacao: observacao.value,
    }

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiTeste}/servicos`, requestOptions);
    const conteudo = await resposta.json();

    await Swal.fire({
      title: "Serviço cadastrado com sucesso!",
      icon: "success",
      confirmButtonColor: "#5cb85c",
    });

    window.location.href = `${address}/pages/servicos.html`;

  } catch (error) {
    console.log(error);
  }
});
