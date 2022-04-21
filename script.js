const objs  = [
    {
        "nome": "Cassio",
        "idade": 30,
        "esta_trabalhando": true,
        "detalhes_profissao":{
            "profissão": "Programador",
            "empresa": "Empresa X"
        },
        "hobbies": ["Programar", "Correr", "ler"]
      },

    {
        "nome": "Matheus",
        "idade": 25,
        "esta_trabalhando": false,
        "detalhes_profissao": {
            "profissão": null,
            "empresa": null
        },
        "hobbies": ["jogar", "Academia" ]
      }

]

const jsonData = JSON.stringify(objs)

console.log(objs)
console.log(jsonData)

const objData = JSON.parse(jsonData);

console.log(jsonData)