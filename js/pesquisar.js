const apiTeste1 = 'https://projeto-integrador-back-end-2-0.vercel.app';

const tipoFormulario = document.querySelector('#tipo');
const inicioFormulario = document.querySelector('#dataInicio');
const fimFormulario = document.querySelector('#dataFim');
const btnFormulario = document.querySelector('#btnFormulario');
const tabela = document.querySelector('#servicos');
const loadingImg1 = document.querySelector('#loading');

btnFormulario.addEventListener('click', async (e) => {
  try {
    e.preventDefault();
    tabela.innerHTML = ``;

    if (!tipoFormulario.value || tipoFormulario.value === '') {
      return tipoFormulario.focus();
    }

    if (!inicioFormulario.value || inicioFormulario.value === '') {
      return inicioFormulario.focus();
    }

    if (!fimFormulario.value || fimFormulario.value === '') {
      return fimFormulario.focus();
    }

    loadingImg1.style.display = 'inline-block';

    const raw = {
      tipo: tipoFormulario.value,
      dataInicio: inicioFormulario.value,
      dataFim: fimFormulario.value
    };

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiTeste1}/servicos/busca-periodo`, requestOptions);
    const conteudo = await resposta.json();

    console.log(conteudo);

    if (conteudo.message === 'Nenhum serviço ou venda encontrado para o tipo e período especificados!') {
      await Swal.fire({
        title: "Nenhum serviço ou venda encontrado no período especificado!",
        icon: "warning",
        confirmButtonColor: "#5cb85c",
      });

      loadingImg1.style.display = 'none';
      return;
    }

    let totalLucro = 0; 
    let totalPreco = 0; 
    let totalCusto = 0; 

    conteudo.servicos.reverse().forEach((servico) => {
      const tr = document.createElement('tr');
      const lucro = (servico.preco - servico.custo) * servico.quantidade;

      totalLucro += lucro; 
      totalPreco += servico.preco * servico.quantidade; 
      totalCusto += servico.custo * servico.quantidade;

      tr.innerHTML = `
        <td class="text-center align-middle" title="Tipo do serviço realizado.">${servico.tipo}</td>
        <td class="text-center align-middle" title="Valor cobrado pelo serviço.">${(servico.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Custo para realizar o serviço.">${(servico.custo).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Quantidade realizado(a).">${servico.quantidade}</td>
        <td class="text-center align-middle" title="Lucro ganho pelo serviço realizado.">${lucro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td class="text-center align-middle" title="Porcentagem de lucro ganha no serviço realizado. (Por unidade)">${(((servico.preco - servico.custo) / servico.custo) * 100).toFixed(2)} %</td>
        <td class="text-center align-middle" title="Data que o serviço foi realizado.">${new Date(servico.data).toLocaleDateString('pt-BR')}</td>
        <td class="text-center align-middle" title="Observações.">${servico.observacao}</td>
        <td class="text-center align-middle">
          <a href="./excluirServico.html?id=${servico._id}&tipo=${servico.tipo}&preco=${servico.preco}&custo=${servico.custo}&quantidade=${servico.quantidade}&data=${servico.data}&observacao=${servico.observacao}" title="Excluir registro."><img src="../imgs/lixeira.png" width="20px"></a>
          <a href="./editarServico.html?id=${servico._id}&tipo=${servico.tipo}&preco=${servico.preco}&custo=${servico.custo}&quantidade=${servico.quantidade}&data=${servico.data}&observacao=${servico.observacao}" title="Editar registro."><img src="../imgs/editar.png" width="20px"></a>
        </td>
      `;

      tabela.appendChild(tr);
    });

    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `
      <td class="text-center align-middle" style="border-top: 1px solid black"><strong>Total:</strong></td>
      <td class="text-center align-middle"><strong>${totalPreco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></td>
      <td class="text-center align-middle"><strong>${totalCusto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></td>
      <td class="text-center align-middle"><strong></strong></td>
      <td class="text-center align-middle"><strong>${totalLucro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></td>
      <td colspan="5"></td>
    `;
    
    tabela.appendChild(trTotal);
    
    loadingImg1.style.display = 'none';
  } catch (error) {
    console.log(error);
    loadingImg1.style.display = 'none';
  }
});
