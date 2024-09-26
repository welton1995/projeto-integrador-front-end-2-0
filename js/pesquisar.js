const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';

const tipoFormulario = document.querySelector('#tipo');
const inicioFormulario = document.querySelector('#dataInicio');
const fimFormulario = document.querySelector('#dataFim');
const btnFormulario = document.querySelector('#btnFormulario');
const tabela = document.querySelector('#servicos');
const loadingImg = document.querySelector('#loading');



btnFormulario.addEventListener('click', async (e) => {
try {
  e.preventDefault();
  tabela.innerHTML = ``;

  if(!tipoFormulario.value || tipoFormulario.value === ''){
    return tipoFormulario.focus();
  }

  if(!inicioFormulario.value || inicioFormulario.value === ''){
    return inicioFormulario.focus();
  }

  if(!fimFormulario.value || fimFormulario.value === ''){
    return fimFormulario.focus();
  }
  
  loadingImg.style.display = 'inline-block';


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

  const resposta = await fetch(`${apiTeste}/servicos/busca-periodo`, requestOptions);
  const conteudo = await resposta.json();

  console.log(conteudo);

  if(conteudo.message === 'Nenhum serviço ou venda encontrado para o tipo e período especificados!') {
    await Swal.fire({
      title: "Nenhum serviço ou venda encontrado no período especificado!",
      icon: "warning",
      confirmButtonColor: "#5cb85c",
    });

    loadingImg.style.display = 'none';

    return;
  }

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

    tabela.appendChild(tr);
    
  });
  
  loadingImg.style.display = 'none';
} catch (error) {
  console.log(error);
}
})