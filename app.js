const agencies = [
  {
    name: "Aurora Creative",
    segment: "Branding",
    location: "São Paulo, SP",
    budget: "50k+",
    rating: 4.9,
    projects: 180,
    nps: 91,
    focus: "Reposicionamento, identidade visual e campanhas de awareness.",
    availability: "Disponível agora",
  },
  {
    name: "Pulsar Performance",
    segment: "Performance",
    location: "Belo Horizonte, MG",
    budget: "20k-50k",
    rating: 4.7,
    projects: 240,
    nps: 88,
    focus: "Mídia paga, growth e otimização de conversões multicanal.",
    availability: "Vagas em 2 semanas",
  },
  {
    name: "Orbe Digital",
    segment: "Produto Digital",
    location: "Florianópolis, SC",
    budget: "50k+",
    rating: 4.8,
    projects: 95,
    nps: 93,
    focus: "Squads de produto, UX research e desenvolvimento full-stack.",
    availability: "Disponível agora",
  },
  {
    name: "Narrativa Studio",
    segment: "Conteúdo",
    location: "Curitiba, PR",
    budget: "até 20k",
    rating: 4.6,
    projects: 150,
    nps: 86,
    focus: "Conteúdo editorial, social e produção audiovisual.",
    availability: "Vagas em 1 mês",
  },
  {
    name: "Flux Growth",
    segment: "Performance",
    location: "Recife, PE",
    budget: "20k-50k",
    rating: 4.8,
    projects: 120,
    nps: 90,
    focus: "Estratégia de aquisição, CRM e automação de marketing.",
    availability: "Disponível agora",
  },
  {
    name: "Lumen Brandhouse",
    segment: "Branding",
    location: "Rio de Janeiro, RJ",
    budget: "50k+",
    rating: 4.9,
    projects: 210,
    nps: 94,
    focus: "Brand experience, packaging e campanhas 360°.",
    availability: "Vagas em 3 semanas",
  },
];

const cards = document.getElementById("cards");
const results = document.getElementById("results");
const searchInput = document.getElementById("search");
const segmentSelect = document.getElementById("segment");
const budgetSelect = document.getElementById("budget");
const clearButton = document.getElementById("clear");

const createCard = (agency) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3>${agency.name}</h3>
        <p>${agency.location}</p>
      </div>
      <span class="tag">${agency.segment}</span>
    </div>
    <p>${agency.focus}</p>
    <div class="metrics">
      <div>
        <strong>${agency.rating}</strong>
        Avaliação
      </div>
      <div>
        <strong>${agency.projects}</strong>
        Projetos
      </div>
      <div>
        <strong>${agency.nps}</strong>
        NPS
      </div>
    </div>
    <div class="card-footer">
      <div>
        <p>Investimento: <strong>${formatBudget(agency.budget)}</strong></p>
        <p class="availability">${agency.availability}</p>
      </div>
      <button class="primary">Solicitar proposta</button>
    </div>
  `;
  return card;
};

const formatBudget = (value) => {
  if (value === "até 20k") return "Até R$ 20k";
  if (value === "20k-50k") return "R$ 20k - 50k";
  return "R$ 50k+";
};

const filterAgencies = () => {
  const query = searchInput.value.toLowerCase();
  const segment = segmentSelect.value;
  const budget = budgetSelect.value;

  const filtered = agencies.filter((agency) => {
    const matchesQuery =
      agency.name.toLowerCase().includes(query) ||
      agency.segment.toLowerCase().includes(query) ||
      agency.location.toLowerCase().includes(query) ||
      agency.focus.toLowerCase().includes(query);
    const matchesSegment = segment ? agency.segment === segment : true;
    const matchesBudget = budget ? agency.budget === budget : true;

    return matchesQuery && matchesSegment && matchesBudget;
  });

  renderCards(filtered);
};

const renderCards = (data) => {
  cards.innerHTML = "";
  results.textContent = `Mostrando ${data.length} de ${agencies.length} agências`;

  if (!data.length) {
    cards.innerHTML = `
      <div class="card">
        <h3>Nenhuma agência encontrada</h3>
        <p>Tente ajustar os filtros ou busque por outra especialidade.</p>
      </div>
    `;
    return;
  }

  data.forEach((agency) => {
    cards.appendChild(createCard(agency));
  });
};

searchInput.addEventListener("input", filterAgencies);
segmentSelect.addEventListener("change", filterAgencies);
budgetSelect.addEventListener("change", filterAgencies);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  segmentSelect.value = "";
  budgetSelect.value = "";
  renderCards(agencies);
});

renderCards(agencies);
