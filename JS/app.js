const clickButtons = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

// Archivo JSON con los datos de los productos
const productosJSON = [
{
    "title": "Pikachu",
    "precio": "$ 5.000",
    "img": "./img/pikachu.jpg",
    "cantidad": 1
},
{
    "title": "Jigglypuff",
    "precio": "$ 5.000",
    "img": "./img/p2.jpg",
    "cantidad": 1
},
{
    "title": "Charizard",
    "precio": "$ 5.000",
    "img": "./img/p3.jpg",
    "cantidad": 1
},
{
    "title": "Dragonite",
    "precio": "$ 5.000",
    "img": "./img/p4.jpg",
    "cantidad": 1
},
{
    "title": "Bulbasaur",
    "precio": "$ 5.000",
    "img": "./img/p5.jpg",
    "cantidad": 1
},
{
    "title": "Machamp",
    "precio": "$ 5.000",
    "img": "./img/p6.jpg",
    "cantidad": 1
},
{
    "title": "Gengar",
    "precio": "$ 5.000",
    "img": "./img/p7.jpg",
    "cantidad": 1
},
{
    "title": "Syther",
    "precio": "$ 5.000",
    "img": "./img/p8.jpg",
    "cantidad": 1
},
{
    "title": "Suicune",
    "precio": "$ 5.000",
    "img": "./img/p9.jpg",
    "cantidad": 1
},
{
    "title": "Zapdos",
    "precio": "$ 5.000",
    "img": "./img/p10.jpg",
    "cantidad": 1
},
{
    "title": "Mew",
    "precio": "$ 5.000",
    "img": "./img/p11.jpg",
    "cantidad": 1
},
{
    "title": "Gyarados",
    "precio": "$ 5.000",
    "img": "./img/p12.jpg",
    "cantidad": 1
},
{
    "title": "Gyarados Red",
    "precio": "$ 5.000",
    "img": "./img/p13.jpg",
    "cantidad": 1
}
];

clickButtons.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem);
});

function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    };

    addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
    const alert = document.querySelector('.alert');

    setTimeout(function () {
        alert.classList.add('hide');
    }, 2000);

    alert.classList.remove('hide');

    const inputElementos = tbody.getElementsByClassName('input__elemento');
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElementos[i];
            inputValue.value++;
            carritoTotal();
            return null;
        }
    }

    carrito.push(newItem);
    renderCarrito();
}

function renderCarrito() {
    tbody.innerHTML = '';
    carrito.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('ItemCarrito');
        const content = `
            <th scope="row">${index + 1}</th>
            <td class="table__productos">
                <img src=${item.img} alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__precio"><p>${item.precio}</p></td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>
        `;
        tr.innerHTML = content;
        tbody.append(tr);

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
    });
    carritoTotal();
}

function carritoTotal() {
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach(item => {
        const precio = Number(item.precio.replace("$", ''));
        total = total + precio * item.cantidad;
    });
    itemCartTotal.innerHTML = `Total $${total}`;
    addLocalStorage();
}

function removeItemCarrito(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".ItemCarrito");
    const title = tr.querySelector('.title').textContent;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1);
            break; // Añadimos el break para salir del loop una vez eliminado el elemento.
        }
    }

    const alert = document.querySelector('.remove');

    setTimeout(function () {
        alert.classList.add('remove');
    }, 2000);

    alert.classList.remove('remove');

    tr.remove();

    if (carrito.length === 0) {
        document.getElementById('btnComprar').disabled = true;
        // Mostrar Sweet Alert cuando el carrito está vacío
        swal("Tu Pokemon a escapado", "oh oh! algo extraño a ocurrido, puedes volver a los productos para seguir agregando", "info");
    }

    carritoTotal();
}

function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest(".ItemCarrito");
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (simaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    });
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito();
    } else {
        // Si no hay datos en el LocalStorage, cargamos los datos del archivo JSON
        carrito = productosJSON;
        renderCarrito();
    }
};
