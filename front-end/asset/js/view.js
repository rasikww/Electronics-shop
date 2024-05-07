let tableBody = document.getElementById("table");

async function generateTable() {
    let dataArray = await getDataArray();
    let allTableRows = `<thead><tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Desc</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>`;
    dataArray.forEach((element) => {
        let row = `<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.price}</td>
                </tr>`;
        allTableRows += row;
    });
    tableBody.innerHTML = allTableRows;
}

async function getDataArray() {
    const response = await fetch("http://localhost:8080/product");
    let promise = await response.json();
    return promise;
}

generateTable();
