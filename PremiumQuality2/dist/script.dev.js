"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var currentSlide = 0;
var cardColor = document.querySelector('.card-color');
var carousel = document.querySelector('.carousel');
var thumbnailsContainer = document.querySelector('.thumbsnails');
var slides;
var autoSlideInterval; // Intervalo para el cambio automático de slides
// Clase SlideInfo

var SlideInfo =
/*#__PURE__*/
function () {
  function SlideInfo(nombre, descripcion, imagen, fondo, thumbsnail1, thumbsnail2, thumbsnail3, thumbsnail4, marca, estado, precio, color, año) {
    _classCallCheck(this, SlideInfo);

    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.fondo = fondo;
    this.thumbnails = [thumbsnail1, thumbsnail2, thumbsnail3, thumbsnail4]; // Guardar los thumbnails en un array

    this.marca = marca;
    this.estado = estado;
    this.precio = precio;
    this.color = color;
    this.año = año;
  }

  _createClass(SlideInfo, [{
    key: "generateSlide",
    value: function generateSlide() {
      var slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      slide.setAttribute('data-card-bg', this.fondo);
      var img = document.createElement('img');
      img.src = this.imagen;
      img.alt = this.nombre;
      var textContent = document.createElement('div');
      textContent.classList.add('text-content');
      var title = document.createElement('h3');
      title.textContent = this.nombre;
      var subtitle = document.createElement('h4');
      subtitle.textContent = this.descripcion;
      var button = document.createElement('button');
      button.classList.add('btn', 'btn-dark');
      button.textContent = 'Ver más';
      textContent.appendChild(title);
      textContent.appendChild(subtitle);
      textContent.appendChild(button);
      slide.appendChild(img);
      slide.appendChild(textContent);
      return slide;
    }
  }, {
    key: "generateThumbnails",
    value: function generateThumbnails() {
      var _this = this;

      thumbnailsContainer.innerHTML = ''; // Limpiar los thumbnails anteriores

      this.thumbnails.forEach(function (thumb, index) {
        var thumbDiv = document.createElement('div');
        thumbDiv.classList.add('box');
        var img = document.createElement('img');
        img.src = thumb; // Asigna la imagen de fondo

        img.alt = "Thumbnail for ".concat(_this.nombre); // Texto alternativo para accesibilidad
        // Añadir evento al hacer clic en el thumbnail

        thumbDiv.addEventListener('click', function () {
          window.open(thumb, '_blank'); // Abrir la imagen en una nueva pestaña

          stopAutoSlide(); // Detener el intervalo

          showSlide(index); // Cambiar al slide correspondiente

          setTimeout(startAutoSlide, 20000); // Reiniciar el intervalo después de 20 segundos
        });
        thumbDiv.appendChild(img); // Agregar la imagen al contenedor

        thumbnailsContainer.appendChild(thumbDiv); // Agregar el contenedor al contenedor de thumbnails
      });
    }
  }, {
    key: "generateSlide2",
    value: function generateSlide2() {
      var slide2 = document.createElement('div');
      slide2.classList.add('item'); // Aplica el formato de clase para cada elemento

      slide2.setAttribute('data-marca', this.marca);
      slide2.setAttribute('data-estado', this.estado);
      slide2.setAttribute('data-precio', this.precio);
      slide2.setAttribute('data-color', this.color);
      slide2.setAttribute('data-year', this.año);
      var img = document.createElement('img');
      img.src = this.imagen;
      img.alt = this.nombre;
      var title = document.createElement('h1');
      title.textContent = this.nombre;
      var subtitle = document.createElement('h2');
      subtitle.textContent = this.descripcion;
      var button = document.createElement('button');
      button.classList.add('btn', 'btn-dark');
      button.textContent = 'Ver más'; // Añadir los elementos al slide

      slide2.appendChild(img);
      slide2.appendChild(title);
      slide2.appendChild(subtitle);
      slide2.appendChild(button);
      return slide2;
    }
  }]);

  return SlideInfo;
}(); // Generar los datos de los slides de manera global


var slidesData = [new SlideInfo('Volkswagen Tiguan Allspace', 'Life 350TSI', 'img/f.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, rgb(137, 2, 62) 20%, rgb(137, 2, 62) 21%, black 24%, black 26%, rgb(137, 2, 62) 26%, rgb(137, 2, 62) 100%)', 'img/f.png', 'img/t_tiguan1.jpg', 'img/t_tiguan2.jpg', 'img/t_tiguan3.jpg', 'Volkswagen', '0km', '20000millones', 'Gris', '2024'), new SlideInfo('Changan CS15', 'Luxury Dct', 'img/changan_cs15.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, #313715 20%, #313715 21%, black 24%, black 26%, #313715 26%, #313715 100%)', 'img/changan_cs15.png', 'img/t_changan1.jpg', 'img/t_changan2.jpg', 'img/t_changan3.jpg', 'Changan', 'Usado', '10000millones', 'Rojo', '2020'), new SlideInfo('Volkswagen Amarok', 'Highline V6', 'img/volmarok.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, #123456 20%, #123456 21%, black 24%, black 26%, #123456 26%, #123456 100%)', 'img/volmarok.png', 'img/t_amarok1.jpg', 'img/t_amarok2.jpg', 'img/t_amarok3.jpg', 'Volkswagen', 'Usado', '20000millones', 'Gris', '2010'), new SlideInfo('Chevrolet Cruze', '4P 1.4 Turbo Lt AT', 'img/che-2022-cruze-5p-bordo.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, #00F5DC 20%, #00F5DC 21%, black 24%, black 26%, #00F5DC 26%, #00F5DC 100%)', 'img/che-2022-cruze-5p-bordo.png', 'img/t_cruze1.jpg', 'img/t_cruze2.jpg', 'img/t_cruze3.jpg', 'Chevrolet', '0km', '20000millones', 'Rojo', '2024'), new SlideInfo('Renault Alaska', 'Confort Mt 4x4', 'img/renault-2022-alaskan.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, #F8F32B 20%, #F8F32B 21%, black 24%, black 26%, #F8F32B 26%, #F8F32B 100%)', 'img/renault-2022-alaskan.png', 'img/t_alaskan1.jpg', 'img/t_alaskan2.jpg', 'img/t_alaskan3.jpg', 'Renault', '0km', '20000millones', 'Verde', '2024'), new SlideInfo('Peugeot 208', 'Allure Pk T200', 'img/blanco.png', 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(-25deg, black 0%, black 20%, #DB592A 20%, #DB592A 21%, black 24%, black 26%, #DB592A 26%, #DB592A 100%)', 'img/blanco.png', 'img/t_2081.png', 'img/t_2082.png', 'img/t_2083.png', 'Peugeot', 'Usado', '10000millones', 'Blanco', '2024')]; // Función para generar los slides en el contenedor del carrusel

function generateSlides() {
  slidesData.forEach(function (slideInfo) {
    var slideElement = slideInfo.generateSlide();
    carousel.appendChild(slideElement);
  });
  slides = document.querySelectorAll('.carousel-slide');
  showSlide(currentSlide);
}

function generateSlide2() {
  var slider = document.querySelector('.slider'); // Seleccionar el contenedor
  //slider.innerHTML = ''; // Limpiar el contenido previo

  slidesData.forEach(function (slideInfo) {
    var slideElement = slideInfo.generateSlide2();
    slider.appendChild(slideElement);
  });
} // Función para mostrar un slide específico


function showSlide(index) {
  var totalSlides = slides.length;
  currentSlide = (index + totalSlides) % totalSlides;
  carousel.style.transform = "translateX(-".concat(currentSlide * 100, "%)");
  var bg = slides[currentSlide].getAttribute('data-card-bg');

  if (bg) {
    cardColor.style.background = bg;
  }

  slidesData[currentSlide].generateThumbnails();
} // Navegación de los slides


document.querySelector('.next').addEventListener('click', function () {
  return showSlide(currentSlide + 1);
});
document.querySelector('.prev').addEventListener('click', function () {
  return showSlide(currentSlide - 1);
}); // Soporte táctil para dispositivos móviles

var startX = 0;
carousel.addEventListener('touchstart', function (e) {
  return startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', function (e) {
  var diffX = startX - e.changedTouches[0].clientX;
  if (diffX > 50) showSlide(currentSlide + 1);else if (diffX < -50) showSlide(currentSlide - 1);
}); // Función para iniciar el cambio automático de slides

function startAutoSlide() {
  autoSlideInterval = setInterval(function () {
    showSlide(currentSlide + 1);
  }, 6000); // Cambia cada 6 segundos
} // Función para detener el cambio automático de slides


function stopAutoSlide() {
  clearInterval(autoSlideInterval);
} // Eventos para pausar y reanudar el slideshow


carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide); // Inicializar

generateSlides();
generateSlide2();
startAutoSlide();
document.addEventListener("DOMContentLoaded", function () {
  var yearFromSelect = document.getElementById("year-from");
  var yearToSelect = document.getElementById("year-to");
  var currentYear = new Date().getFullYear();

  for (var year = 1980; year <= currentYear; year++) {
    var optionFrom = document.createElement("option");
    optionFrom.value = year;
    optionFrom.textContent = year;
    yearFromSelect.appendChild(optionFrom);
    var optionTo = document.createElement("option");
    optionTo.value = year;
    optionTo.textContent = year;
    yearToSelect.appendChild(optionTo);
  }
}); //intendo filtrar

var filtersButtons = document.querySelectorAll(".mark-items button");
var filterableCards = document.querySelectorAll(".slider .item");

var filterCards = function filterCards(e) {
  var button = e.currentTarget;

  if (!button.dataset.name) {
    console.warn('El botón no tiene un dataset válido.');
    return;
  }

  console.log("Bot\xF3n seleccionado: ".concat(button.dataset.name));
  var currentActive = document.querySelector(".active");

  if (currentActive) {
    currentActive.classList.remove("active");
  }

  button.classList.add("active");
  filterableCards.forEach(function (card) {
    card.classList.add("hide");

    if (card.dataset.marca === button.dataset.name || button.dataset.name === "All") {
      card.classList.remove("hide");
    }
  }); // Recarga la vista del carrusel después de actualizar la lista

  loadShow();
}; // Añadir evento de clic a todos los botones de filtro


filtersButtons.forEach(function (button) {
  button.addEventListener("click", filterCards);
}); // Definición de items y controles del carrusel

var active = 0; // Declara 'active' de forma global para que sea accesible en todas las funciones

function loadShow() {
  // Filtra solo los elementos que no tienen la clase 'hide'
  var items = Array.from(document.querySelectorAll('.slider .item')).filter(function (item) {
    return !item.classList.contains('hide');
  });
  console.log("Elementos visibles:", items);

  if (items.length === 0) {
    console.warn("No hay elementos visibles para mostrar.");
    return;
  } // Asegúrate de que 'active' esté en el rango correcto


  if (active >= items.length) {
    active = items.length - 1;
  } else if (active < 0) {
    active = 0;
  }

  var stt = 0;
  items[active].style.transform = "none";
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1; // Posiciona los elementos a la derecha del elemento activo

  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = "translateX(".concat(120 * stt, "px) scale(").concat(1 - 0.2 * stt, ") perspective(16px) rotateY(-1deg)");
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  stt = 0; // Posiciona los elementos a la izquierda del elemento activo

  for (var _i = active - 1; _i >= 0; _i--) {
    stt++;
    items[_i].style.transform = "translateX(".concat(-120 * stt, "px) scale(").concat(1 - 0.2 * stt, ") perspective(16px) rotateY(1deg)");
    items[_i].style.zIndex = -stt;
    items[_i].style.filter = 'blur(5px)';
    items[_i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}

loadShow(); // Manejo de botones

var next2 = document.getElementById('next2');
var prev2 = document.getElementById('prev2');

next2.onclick = function () {
  var items = Array.from(document.querySelectorAll('.slider .item')).filter(function (item) {
    return !item.classList.contains('hide');
  });
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
};

prev2.onclick = function () {
  var items = Array.from(document.querySelectorAll('.slider .item')).filter(function (item) {
    return !item.classList.contains('hide');
  });
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
};

document.getElementById('filterForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario y la recarga de la página
  // Obtén los valores de los filtros seleccionados

  var marca = document.getElementById('marca').value;
  var estado = document.getElementById('estado').value;
  var precio = document.getElementById('precio').value;
  var color = document.getElementById('color').value;
  var yearFrom = document.getElementById('year-from').value;
  var yearTo = document.getElementById('year-to').value; // Selecciona todos los elementos del carrusel

  var items = Array.from(document.querySelectorAll('.slider .item'));
  items.forEach(function (item) {
    var itemMarca = item.getAttribute('data-marca');
    var itemEstado = item.getAttribute('data-estado');
    var itemPrecio = item.getAttribute('data-precio'); // Precio como cadena para comparación directa

    var itemColor = item.getAttribute('data-color');
    var itemYear = parseInt(item.getAttribute('data-year'), 10); // Supone que el año es un número
    // Verifica si el elemento cumple con todos los filtros aplicados

    var showItem = true;

    if (marca && itemMarca !== marca) {
      showItem = false;
    }

    if (estado && itemEstado !== estado) {
      showItem = false;
    }

    if (precio && itemPrecio !== precio) {
      showItem = false;
    }

    if (color && itemColor !== color) {
      showItem = false;
    }

    if (yearFrom && itemYear < parseInt(yearFrom, 10)) {
      showItem = false;
    }

    if (yearTo && itemYear > parseInt(yearTo, 10)) {
      showItem = false;
    } // Muestra u oculta el elemento según el resultado de los filtros


    if (showItem) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  }); // Llama a la función que reorganiza los elementos visibles

  loadShow();
}); // Genera las opciones de años de forma dinámica

function populateYearOptions() {
  var currentYear = new Date().getFullYear();
  var yearFromSelect = document.getElementById('year-from');
  var yearToSelect = document.getElementById('year-to');

  for (var year = currentYear; year >= 1990; year--) {
    var optionFrom = document.createElement('option');
    optionFrom.value = year;
    optionFrom.textContent = year;
    var optionTo = document.createElement('option');
    optionTo.value = year;
    optionTo.textContent = year;
    yearFromSelect.appendChild(optionFrom);
    yearToSelect.appendChild(optionTo);
  }
} // Llama a la función para poblar las opciones de año al cargar la página


populateYearOptions();