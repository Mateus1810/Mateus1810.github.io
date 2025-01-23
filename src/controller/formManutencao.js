document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('manutencaoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const problema = document.getElementById('problema').value;
        const servico = document.getElementById('servico').value;
        const queryParams = new URLSearchParams({ problema, servico }).toString();
        window.location.href = `../names/nome.html?${queryParams}`;
    });
});