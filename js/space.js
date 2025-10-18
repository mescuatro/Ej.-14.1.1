const input1 = document.getElementById("inputBuscar");
const boton = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

boton.addEventListener('click', function(){

    const input2 = input1.value.trim();

    fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(input2)}`)
    .then(response => response.json())
    .then(data => {
        const items = data.collection?.items || [];
        const filtrado = filtro(items, input2);
        mostrarResultados(filtrado);
    })
    .catch(error => {
        console.error("Error:", error);
        contenedor.innerHTML = "<p>Error al obtener los datos.</p>";
    });
});

function filtro(items, busqueda){
return items.filter(item => {
    const titulo = item.data[0]?.title?.toLowerCase() || "";
    return titulo.includes(busqueda.toLowerCase());
});
}

function mostrarResultados(resultados){
    if(resultados.length === 0){
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
    }

    contenedor.innerHTML = "";

    resultados.forEach(item => {
        const titulo = (item.data[0]?.title) || "Sin título";
        const imagen = (item.links?.[0]?.href) || "Sin imagen";
        const desc = (item.data?.[0]?.description) || "Sin descripción";
        const fecha = (item.data?.[0]?.date_created) || "Sin fecha";

        const cartas = document.createElement("div");
        cartas.innerHTML = `
            <img src="${imagen}" alt="${imagen}" />
        `;
        cartas.classList.add("card");
        const title = document.createElement("div");
        title.innerHTML = `
        <h3>${titulo}</h3>
        `;
        title.classList.add("card-title");
        const info = document.createElement('div');
        info.innerHTML = `
            <p>${desc}</p>
            <p>${fecha}</p>
        `;
        info.classList.add("card-body");
        cartas.appendChild(title);
        cartas.appendChild(info);
        contenedor.appendChild(cartas);
    });
}