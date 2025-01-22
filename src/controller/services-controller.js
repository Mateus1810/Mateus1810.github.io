// src/controller/app.js (ou um novo arquivo, por exemplo, src/controller/services-controller.js)

// ... código anterior para o menu de navegação ...

// Seleciona a div 'catalogue' no HTML
const catalogue = document.querySelector('.catalogue');

// Função para criar os elementos do card de serviço
function createServiceCard(service) {
  const serviceItem = document.createElement('div');
  serviceItem.classList.add('catalogue-item');

  const link = document.createElement('a');
  link.href = service.href;

  const img = document.createElement('img');
  img.src = service.img;
  img.alt = service.alt;

  const button = document.createElement('button');
  button.textContent = service.label;
  button.onclick = () => {
    window.location.href = service.href;
  };

  link.appendChild(img);
  serviceItem.appendChild(link);
  serviceItem.appendChild(button);

  return serviceItem;
}

// Gera os cards de serviço com base nos dados de services.js
if (catalogue) { // Verifica se o elemento 'catalogue' existe na página atual
  services.forEach(service => {
    const serviceCard = createServiceCard(service);
    catalogue.appendChild(serviceCard);
  });
}