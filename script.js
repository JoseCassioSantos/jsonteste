function fetchApiData() {
    fetch('data.json')
    .then(response => response.json())
    .then((data) =>{
        const list = document.querySelector('#fill_list')

        data.map((item) => {
            const li = document.createElement('li');

            li.setAttribute('id', item.id);
            li.innerHTML +='Id:'+ item.id +' Nome: '+ item.nome +' Idade:  '+ item.idade +' Profissão: '+ item.detalhes_profissao.profissao;
            list.appendChild(li)
        })
    })
}

