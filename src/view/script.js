const API_URL = 'http://localhost:3000/reserva';

const criarReserva = async () => {
    const nomeCliente = document.getElementById('input-nome-cliente').value;
    const numeroMesa = document.getElementById('input-numero-mesa').value;
    const dataHora = document.getElementById('input-data-hora').value;
    const status = document.getElementById('input-status').value;
    const contatoCliente = document.getElementById('input-contato-cliente').value;
    const valor = parseFloat(document.getElementById('input-valor').value) || 0;

    const reserva = { nomeCliente, numeroMesa, dataHora, status, contatoCliente, valor };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        });

        if (!response.ok) throw new Error('Erro ao criar reserva');

        await response.json();
        listarReservas();
    } catch (error) {
        console.error(error);
        alert('Erro ao criar reserva');
    }
};

const listarReservas = async () => {
    try {
        const response = await fetch(API_URL);
        const reservas = await response.json();

        const container = document.getElementById('reservas-container');
        container.innerHTML = '';

        reservas.forEach(reserva => {
            const card = document.createElement('div');
            card.className = 'reserva-card';

            card.innerHTML = `
              <h3>${reserva.nomeCliente}</h3>
              <p><strong>Mesa:</strong> ${reserva.numeroMesa || 'Não informada'}</p>
              <p><strong>Data/Hora:</strong> ${new Date(reserva.dataHora).toLocaleString()}</p>
              <p><strong>Status:</strong> ${reserva.status}</p>
              <p><strong>Contato:</strong> ${reserva.contatoCliente}</p>
              <p><strong>Valor:</strong> R$ ${parseFloat(reserva.valor).toFixed(2)}</p>
            `;

            const excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.addEventListener('click', () => deletarReserva(reserva._id));

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.dataset.id = reserva._id;
            editarBtn.dataset.nome = reserva.nomeCliente;
            editarBtn.dataset.mesa = reserva.numeroMesa;
            editarBtn.dataset.datahora = reserva.dataHora;
            editarBtn.dataset.status = reserva.status;
            editarBtn.dataset.contato = reserva.contatoCliente;
            editarBtn.dataset.valor = reserva.valor;

            editarBtn.addEventListener('click', (e) => {
                prepararEdicao(
                    e.target.dataset.id,
                    e.target.dataset.nome,
                    e.target.dataset.mesa,
                    e.target.dataset.datahora,
                    e.target.dataset.status,
                    e.target.dataset.contato,
                    e.target.dataset.valor
                );
            });

            card.appendChild(excluirBtn);
            card.appendChild(editarBtn);
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao listar reservas');
    }
};

const deletarReserva = async (id) => {
    if (!confirm('Deseja excluir esta reserva?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir reserva');
        listarReservas();
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir reserva');
    }
};

// MODAL
const modal = document.getElementById('modal-edicao');
const btnFechar = document.getElementById('fechar-edicao');

const abrirModal = () => modal.style.display = 'flex';
const fecharModal = () => modal.style.display = 'none';

btnFechar.addEventListener('click', fecharModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

const prepararEdicao = (id, nomeCliente, numeroMesa, dataHora, status, contatoCliente, valor) => {
    abrirModal();
    document.getElementById('editar-nome-cliente').value = nomeCliente;
    document.getElementById('editar-numero-mesa').value = numeroMesa;
    document.getElementById('editar-data-hora').value = dataHora.split('.')[0];
    document.getElementById('editar-status').value = status;
    document.getElementById('editar-contato-cliente').value = contatoCliente;
    document.getElementById('editar-valor').value = valor;
    document.getElementById('botao-salvar-edicao').setAttribute('data-id', id);
};

const salvarEdicao = async () => {
    const id = document.getElementById('botao-salvar-edicao').getAttribute('data-id');
    const nomeCliente = document.getElementById('editar-nome-cliente').value;
    const numeroMesa = document.getElementById('editar-numero-mesa').value;
    const dataHora = document.getElementById('editar-data-hora').value;
    const status = document.getElementById('editar-status').value;
    const contatoCliente = document.getElementById('editar-contato-cliente').value;
    const valor = parseFloat(document.getElementById('editar-valor').value) || 0;

    const reservaAtualizada = { nomeCliente, numeroMesa, dataHora, status, contatoCliente, valor };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservaAtualizada)
        });

        if (!response.ok) throw new Error('Erro ao editar reserva');

        fecharModal();
        listarReservas();
    } catch (error) {
        console.error(error);
        alert('Erro ao editar reserva');
    }
};

document.getElementById('botao-criar-reserva').addEventListener('click', criarReserva);
document.getElementById('botao-salvar-edicao').addEventListener('click', salvarEdicao);

window.onload = listarReservas;
