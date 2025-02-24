const myHeaders = new Headers();
myHeaders.append("Authorization", "Basic QVBJVE9QREVTSzo3aGFxNS1sMnpuai14ZHpnZi1qcGRweC1vdm96Mg==");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

const tabelaResultados = document.getElementById("tabelaResultados").getElementsByTagName("tbody")[0];
let calendario;

function exibirResultados(data) {
    tabelaResultados.innerHTML = "";

    if (data.length === 0) {
        tabelaResultados.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
        return;
    }

    data.forEach(item => {
        const linha = tabelaResultados.insertRow();
        const celulaNumero = linha.insertCell();
        const celulaDescricao = linha.insertCell();
        const celulaData = linha.insertCell();
        const celulaStatus = linha.insertCell();

        celulaNumero.textContent = item.number;
        celulaDescricao.textContent = item.briefDescription;
        celulaData.textContent = item.creationDate;
        celulaStatus.textContent = item.status.name;
    });

    atualizarCalendario(data);
}

function criarCalendario() {
    const calendarEl = document.getElementById("calendario");
    if (!calendarEl) return;

    calendario = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: []
    });

    calendario.render();
}

function atualizarCalendario(data) {
    if (!calendario) return;

    const eventos = data.map(item => {
        let backgroundColor;

        switch (item.status.name) {
            case 'Cancelada':
                backgroundColor = 'gray';
                break;
            case 'Em execução':
                backgroundColor = 'purple';
                break;
            case 'Em aprovação':
                backgroundColor = 'blue';
                break;
            case 'Finalizada com Sucesso':
                backgroundColor = 'green';
                break;
            case 'Finalizado sem Sucesso sem Impacto':
                backgroundColor = 'orange';
                break;
            case 'Finalizado sem Sucesso com Impacto':
                backgroundColor = 'tomato';
                break;
            default:
                backgroundColor = 'skyblue';
        }

        return {
            title: item.number,
            start: item.creationDate,
            allDay: true,
            backgroundColor: backgroundColor
        };
    });

    calendario.setOption('events', eventos);
}

function filtrarResultados(data) {
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    if (!dataInicio && !dataFim) {
        return data;
    }

    return data.filter(item => {
        const dataCriacao = item.creationDate.substring(0, 10);

        if (dataInicio && dataCriacao < dataInicio) {
            return false;
        }

        if (dataFim && dataCriacao > dataFim) {
            return false;
        }

        return true;
    });
}

fetch("https://neoservice.neobpo.com.br/tas/api/operatorChanges", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        criarCalendario();
        exibirResultados(data.results);

        document.getElementById("filtrar").addEventListener("click", () => {
            const resultadosFiltrados = filtrarResultados(data.results);
            exibirResultados(resultadosFiltrados);
        });
    })
    .catch(error => {
        tabelaResultados.innerHTML = `<tr><td colspan="4">Erro: ${error.message}</td></tr>`;
        console.error("Erro na requisição:", error);
    });