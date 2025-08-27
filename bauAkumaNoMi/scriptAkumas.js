let gold = 50;
let currentAkumaNoMi = 0;
const inventorio = [];

const goldText = document.querySelector("#gold");
const botao = document.getElementById("abrirBau");
const resultado = document.getElementById("resultado");
const inventarioLista = document.getElementById("inventario");

const locations = [
  {
    name: "Loja secreta da nami",
  },
];

const bauDeAkumas = {
  paramercia: [
    "Gomu Gomu no Mi",
    "Ope Ope no Mi",
    "Bara Bara no Mi",
    "Suke Suke no Mi",
    "Hana Hana no Mi",
    "Doru Doru no Mi",
    "Bomu Bomu no Mi",
    "Awa Awa no Mi",
    "Gura Gura no Mi",
    "Nikyu Nikyu no Mi",
    "Mero Mero no Mi",
    "Yomi Yomi no Mi",
    "Kilo Kilo no Mi",
    "Toge Toge no Mi",
    "Soru Soru no Mi",
    "Noro Noro no Mi",
    "Mane Mane no Mi",
    "Horo Horo no Mi",
  ],
  logia: [
    "Mera Mera no Mi",
    "Hie Hie no Mi",
    "Pika Pika no Mi",
    "Goro Goro no Mi",
    "Yami Yami no Mi",
    "Magu Magu no Mi",
    "Suna Suna no Mi",
    "Moku Moku no Mi",
  ],
  zoan: [
    "Hebi Hebi no Mi",
    "Tori Tori no Mi[Modelo Fenix]",
    "Ushi Ushi no Mi",
    "Hito Hito no Mi",
    "Inu Inu no Mi",
    "Uo Uo no Mi[Model Dragon]",
    "Mogu Mogu no Mi",
    "Tori Tori no Mi[Modelo Falcon]",
    "Hito Hito no Mi[Modelo Daibutsu]",
    "Ushi Ushi no Mi[Modelo Bisonte]",
    "Hito Hito no Mi[Modelo Nika]",
  ],
};

function abrirBauAkuma() {
  const categoria = Object.keys(bauDeAkumas);

  const categoriaAleatoria =
    categoria[Math.floor(Math.random() * categoria.length)];

  const frutas = bauDeAkumas[categoriaAleatoria];
  const frutaAleatoria = frutas[Math.floor(Math.random() * frutas.length)];

  resultado.innerText =
    "Você encontrou a " +
    frutaAleatoria +
    ", que é do tipo " +
    categoriaAleatoria +
    "!";

  inventario.push(frutaAleatoria + " do tipo " + categoriaAleatoria + ".");

  atualizarInventario();
}

function atualizarInventario() {
  inventarioLista.innerHTML = "";
  for (let i = 0; i < inventario.length; i++) {
    const li = document.createElement("li");
    li.innerText = inventario[i];
    inventarioLista.appendChild(li);
  }
}

botao.addEventListener("click", abrirBauAkuma);
