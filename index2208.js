const carrito = document.querySelector('#CARRITO');
const template = document.querySelector('#template').content;
const templateFooter = document.querySelector('#templateFooter').content;
const footer = document.querySelector('footer');
const fragment = document.createDocumentFragment();
let carritoArray = [];

document.addEventListener('click', (e) => {
    console.log('@@@ evento => ', e);
    if (e.target.matches('.card button')) {
        agregarCarrito(e);
    }
    if (e.target.matches('.list-group-item .btn-success')) {
        btnAumentar(e);
    }
    if (e.target.matches('.list-group-item .btn-danger')) {
        btnDisminuir(e);
    }
    if (e.target.matches('#finalizar-compra')) {
        finalizarCompra();
    }
});

const btnAumentar = e => {
    carritoArray = carritoArray.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = e => {
    carritoArray = carritoArray.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad--;
            if (item.cantidad === 0) {
                return null;
            }
        }
        return item;
    }).filter(item => item !== null);
    pintarCarrito();
};

const agregarCarrito = e => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio) // Asegúrate de que el precio se convierta a número
    };

    const index = carritoArray.findIndex(item => item.id === producto.id);
    if (index === -1) {
        carritoArray.push(producto);
    } else {
        carritoArray[index].cantidad++;
    }
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = '';
    carritoArray.forEach(item => {
        const clone = template.cloneNode(true);
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.lead span').textContent = item.precio * item.cantidad;
        clone.querySelector('.btn-success').dataset.id = item.id;
        clone.querySelector('.btn-danger').dataset.id = item.id;

        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    pintarFooter();
};

const pintarFooter = () => {
    footer.textContent = '';
    if (carritoArray.length === 0) {
        footer.innerHTML = '<p class="text-center">Carrito vacío</p>';
        return;
    }

    const total = carritoArray.reduce((acc, current) => {
        console.log(`Precio: ${current.precio}, Cantidad: ${current.cantidad}`); // Depuración
        return acc + current.precio * current.cantidad;
    }, 0);
    console.log(`Total: ${total}`); // Depuración

    const clone = templateFooter.cloneNode(true);
    clone.querySelector('p span').textContent = total;
    footer.appendChild(clone);
};

const finalizarCompra = () => {
    carritoArray = [];
    pintarCarrito();
};
