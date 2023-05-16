const listaBebidas = document.querySelector("#listaBebidas");
const listaPlatos = document.querySelector("#listaPlatos");
const cuentaBody = document.querySelector("#cuentaBody");
const cuentaTotal = document.querySelector("#cuentaTotal");

const bebidas = [
  { nombre: "Martini", precio: 2550, id: "b1" },
  { nombre: "Cappuccino", precio: 1370, id: "b2" },
  { nombre: "Latte", precio: 1350, id: "b3" },
  { nombre: "Mojito", precio: 2290, id: "b4" },
];

const platos = [
  {
    id: "p1",
    nombre: "Insalata de riso",
    desc: "L'insalata di riso é un classico delle ricette estive. Veloce e facile da preparare L'insalata di riso si pué insaporire con gil ingredienti piú vari.",
    img: "assets/img/insalataderiso.png",
    precio: 6750,
  },
  {
    id: "p2",
    nombre: "Insalata al cipollotti",
    desc: "Pio delicati delle cipolle, i cipollotti sono perfetti in insalata, sul pesco e sulia carne.",
    img: "assets/img/insalataaicipollotti.gif",
    precio: 5990,
  },
  {
    id: "p3",
    nombre: "Insalata caprese",
    desc: "Questo piatto é un cuito della cittá partenopea dove la mozzarella é protagonista di moltissimi piasti.",
    img: "assets/img/insalatacaprese.png",
    precio: 8250,
  },
];

const cuenta = [];

function formatCurrency(amount) {
  let CLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return CLP.format(amount);
}

const actualizarCuenta = (item, menu) => {
  const id = item.id;

  if (item.checked) {
    const index = menu.findIndex((element) => element.id === id);
    cuenta.push(menu[index]);
  } else {
    const index = cuenta.findIndex((element) => element.id === id);
    cuenta.splice(index, 1);
  }

  let cuentaHTML = "";

  cuenta.forEach((item) => {
    cuentaHTML += `<div class="cuenta-item">
    <p>${item.nombre}</p>
    <p>${formatCurrency(item.precio)}</p>
  </div>`;
  });

  cuentaBody.innerHTML = cuentaHTML;

  cuentaTotal.textContent = formatCurrency(
    cuenta.reduce((acc, next) => acc + next.precio, 0)
  );
};

const popularBebidas = () => {
  let bebidasHTML = "";

  bebidas.forEach((bebida) => {
    bebidasHTML += `
  <li>
  <div class="seleccion">
    <input 
    type="checkbox" 
    name="${bebida.nombre.toLowerCase()}" 
    id="${bebida.id}" 
    onclick="actualizarCuenta(${bebida.id}, bebidas)"/>

    <label for="${bebida.nombre.toLowerCase()}">${bebida.nombre}</label>
  </div>
  <p class="precio">${formatCurrency(bebida.precio)}</p>
</li>`;
  });

  listaBebidas.innerHTML = bebidasHTML;
};

const popularPlatos = () => {
  let platosHTML = "";

  platos.forEach((plato) => {
    platosHTML += `<li>
    <div class="seleccion seleccion-menu">
      <input
        type="checkbox"
        name="${plato.nombre.toLowerCase()}" 
        id="${plato.id}" 
        onclick="actualizarCuenta(${plato.id}, platos)"/>

      <label for="${plato.nombre.toLowerCase()}">${plato.nombre}</label>
      <p class="subtitulo">${plato.desc}</p>
      <p class="precio">${formatCurrency(plato.precio)}</p>
    </div>
    <div class="menu-img">
      <img src="${plato.img}" alt="${plato.nombre}"/>
    </div>
  </li>`;
  });

  listaPlatos.innerHTML = platosHTML;
};

window.addEventListener("DOMContentLoaded", () => {
  popularBebidas();
  popularPlatos();
});