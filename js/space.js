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
        console.error("Error fetching data:", error);
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

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${titulo}</h3>
            <img src="${imagen}" alt="${titulo}" width="200" />
        `;
        contenedor.appendChild(div);
    });
}