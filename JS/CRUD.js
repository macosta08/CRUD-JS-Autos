/*
Evaluación semana 5
 - Crud de Coches para agenciaRealiza un sitio web para un CRUD de autos con las siguientes características:
 ●Marca     ●Modelo     ●Color     ●Año     ●Precio*/

const autos = [
    {
        id: 1,
        marca: 'Renault',
        modelo: 'Logan',
        color: 'Rojo',
        año: 2019,
        precio: 35000000
    },
    {
        id: 2,
        marca: 'Toyota',
        modelo: 'Corolla',
        color: 'Azul',
        año: 2017,
        precio: 48000000
    },
    {
        id: 3,
        marca: 'Volkswagen',
        modelo: 'Jetta 1.4',
        color: 'Blanco',
        año: 2021,
        precio: 108000000
    },
    
];
const tableBody = document.getElementById('table-autos-body');

function limpiarFormulario() {
  // Limpia todos los input del formulario
  document.getElementById("miForm").reset();

  // Restauro los nombres del titulo y del boton
  document.getElementById('idAddEdit-title').innerHTML = 'Agregar Auto';
  document.getElementById('idAddEdit-btn').innerHTML = 'Agregar';
}

function createTableHeader() {
    const tableHeader = document.getElementById('table-autos-header');
    let header;
    header = `<tr>
                <th scope="col"></th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Color</th>
                <th scope="col">Año</th>
                <th scope="col">Precio</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>`;
    tableHeader.innerHTML = header;
  }

function createRowTbody(car) {
    let row;
    row = `<tr>
                <td></td>            
                <td>${car.marca}</td>
                <td>${car.modelo}</td>
                <td>${car.color}</td>
                <td>${car.año}</td>
                <td>${car.precio}</td>
                <td><i class="fa fa-pencil-square-o" style="font-size:24px" onclick="loadCarData(${car.id})"></i></td>
                <td><i class="fa fa-trash-o" style="font-size:24px" onclick="deleteCar(${car.id})"></i></td>
            </tr>`;
    return row; 
  }

  function getfullTbody(autosN){
    let tBody = autosN.map(car => createRowTbody(car)).join(" ");
    return tBody;
  }

  function printCars() {
    // Se limpia el codigo HTML que contenga el tableBody
    //alert(tableBody.innerHTML);
    tableBody.innerHTML = '';
    //alert(tableBody.innerHTML);

    // Se construye el HTML para el table BODY del listado de autos y se almacena en una variable
    let tBody = getfullTbody(autos);
    //alert(tBody);
    //Asigno el codigo HTML en el tableBody que esta almacenado en la variable tBody
    tableBody.innerHTML = tBody;
  }

  function newCar(marca, modelo, color, año, precio) {
    // Con esto se calcula el ID unico. Primero se obtiene un array con los ids, luego se calcula el nuevo id
    const ids = autos.map(car => car.id); 
    // de la siguiente manera: si el arreglo de ids no tiene elementos el id sera 1 de lo contrario sera el max(id)+1 
    let newId = (ids.length == 0) ? 1 : Math.max(...ids) + 1;

    // se crea el objeto con las propiedades del auto
    const newCar = {
      id: newId,
      marca: marca,
      modelo: modelo,
      color: color,
      año: año,
      precio: precio
    }

    // Devuelvo el carro
    return newCar;
  }

  function addCar() {
    // PASO 1: Obtener desde el HTML los valores de los atributos del carro nuevo a agregar
    const  marcaCar= document.getElementById('marcaId').value;
    const  modeloCar= document.getElementById('modeloId').value;
    const  colorCar= document.getElementById('colorId').value;
    const  añoCar= document.getElementById('yearId').value;
    const  precioCar= document.getElementById('precioId').value;
    
    // PASO 2: Creo un nuevo objeto de carro por medio de la función newCar
    let car = newCar(marcaCar, modeloCar, colorCar, añoCar, precioCar);

    // PASO 3: Incluyo el nuevo carro en mi listado (array) de carros
    autos.push(car);

    // PASO 4: Imprimo en la tabla de HTML el listado de carros actual (OJO: siempre se basa en el array de autos)
    printCars();
    printFilters();
    
    // PASO 5: Limpiar o restaurar el formulario
    limpiarFormulario();
  }

  function loadCarData(carId) {
    //Paso 1: Recibir por parametro el id unico del carro de interes por medio del icono editar q es el q invoca esta funcion 
    
    //Paso 2: Buscar el carro con el mismo id del q recibi por parametro y guardar el resultado de la busqueda en una variable
    const findCar = autos.find(auto=> auto.id == carId);
    //alert(findCar.id+" "+findCar.marca+" "+findCar.modelo);
    
    //Paso 3: Asignar cada una de las propiedades del objeto carro consultado a cada elemento del HTML(DOM)
    document.getElementById('id').value = findCar.id;
    document.getElementById('marcaId').value = findCar.marca;
    document.getElementById('modeloId').value = findCar.modelo;
    document.getElementById('colorId').value = findCar.color;
    document.getElementById('yearId').value = findCar.año;
    document.getElementById('precioId').value = findCar.precio;

    // Cambiando el nombre del titulo y el boton
    document.getElementById('idAddEdit-title').innerHTML = 'Editar Auto';
    document.getElementById('idAddEdit-btn').innerHTML = 'Editar';
  }

  function submitCar() {
    let action = document.getElementById('idAddEdit-btn').innerHTML;
    if (action == 'Agregar') {
      addCar();
    } else if (action == 'Editar') {
      editCar();
    }
}

function editCar() {
    // PASO 1: Obtener desde el HTML los valores de los atributos del carro existente a editar
    const  idCar= document.getElementById('id').value; 
    const  marcaCar= document.getElementById('marcaId').value;
    const  modeloCar= document.getElementById('modeloId').value;
    const  colorCar= document.getElementById('colorId').value;
    const  añoCar= document.getElementById('yearId').value;
    const  precioCar= document.getElementById('precioId').value;
    
    // PASO 2: Buscar el carro por id
    const findCar = autos.find(auto=> auto.id == idCar);

    // PASO 3: actualizar cada una de las propiedades del carro 
    findCar.marca = marcaCar;
    findCar.modelo = modeloCar;
    findCar.color = colorCar;
    findCar.año = añoCar;
    findCar.precio = precioCar;

    // PASO 4: Imprimo en la tabla de HTML el listado de carros actual (OJO: siempre se basa en el array de autos)
    printCars();
    printFilters();
    
    // PASO 5: Limpiar o restaurar el formulario
    limpiarFormulario();
}

function deleteCar(idCar) {
  //PASO 1: Busco el indice del auto a eliminar
  const findIndexCar = autos.findIndex(auto=> auto.id == idCar);

  //PASO 2: Con el indice elimino el objeto y lo agrego a una variable 
  let removedCar = autos.splice(findIndexCar, 1);

  // PASO 4: Imprimo en la tabla de HTML el listado de carros actual
  printCars();
  printFilters();

  // PASO 5: Con el array del elemento eliminado sale una alerta indicado las propiedades eliminadas 
  alert(`Se elimino el auto de marca ${removedCar[0].marca}, modelo ${removedCar[0].modelo} y año ${removedCar[0].año}`);
}

/*************
 * Aquí la siguiente sección es la de los filtros 
 * 
 */
function printFilters() {
  // Funcion para garantizar valores únicos del arreglo
  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  } 

  const options = '<option>Todos</option>';

  // Se construye el HTML del input select de la MARCA basado en el array autos.
  // Se aplica un filter para garantizar que solo hayan valores únicos de MARCA en el input select.
  let optionsMarca = options + autos.map(auto=> `<option>${auto.marca}</option>`).sort().filter(onlyUnique).join(" ");
  document.getElementById('filterIdMarca').innerHTML= optionsMarca; 

  // Se construye el HTML del input select del COLOR basado en el array autos.
  // Se aplica un filter para garantizar que solo hayan valores únicos de COLOR en el input select.
  let optionsColor = options + autos.map(auto=> `<option>${auto.color}</option>`).sort().filter(onlyUnique).join(" ");
  document.getElementById('filterIdColor').innerHTML= optionsColor; 

  // Se construye el HTML del input select del AÑO basado en el array autos.
  // Se aplica un filter para garantizar que solo hayan valores únicos de AÑO en el input select.
  let optionsAño = options + autos.map(auto=> `<option>${auto.año}</option>`).sort().filter(onlyUnique).join(" ");
  document.getElementById('filterIdAño').innerHTML= optionsAño;

}

function filterCars() {
  // PASO 1: Obtener desde el HTML los valores de los filtros
  const  filterValueMarca = document.getElementById('filterIdMarca').value;
  const  filterValueColor = document.getElementById('filterIdColor').value;
  const  filterValueAño = document.getElementById('filterIdAño').value;

  // PASO 2: Constantes que contendra la función anonima con las condiciones para filtrar 
  const condition = auto => (auto.marca == filterValueMarca || filterValueMarca == "Todos") && 
                            (auto.color == filterValueColor || filterValueColor == "Todos") && 
                            (auto.año == filterValueAño || filterValueAño == "Todos");

  //PASO 3: Filtrar los autos y construir el HTML para el table BODY del listado de autos y se almacena en una variable
  let tBody = getfullTbody(autos.filter(condition));
  
  //Asigno el codigo HTML en el tableBody que esta almacenado en la variable tBody
  tableBody.innerHTML = tBody;

}

 /****
  * la sección siguiente corresponde a la invocación de funciones cuando se carga la pagina 
  */

  //se crea encabezado de la tabla...
  createTableHeader();

 //se obtiene el listado de carros y se imprime en el body de la tabla...
  printCars();

// Se imprime las opciones de los filtros basado en mi arreglo de carros 
  printFilters();

  
