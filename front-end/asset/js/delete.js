let btnSearch = document.getElementById("btn-search");
let btnDelete = document.getElementById("btn-delete");
let btnRefresh = document.getElementById("btn-refresh");
let txtName = document.getElementById("txt-name-delete");
let txtDesc = document.getElementById("txt-desc-delete");
let txtPrice = document.getElementById("txt-price-delete");

txtName.disabled = true;
txtDesc.disabled = true;
txtPrice.disabled = true;

btnSearch.addEventListener("click", searchById);
btnDelete.addEventListener("click", deleteById);
btnRefresh.addEventListener("click", refresh);

async function searchById() {
    let id = document.getElementById("txt-id").value;
    if (numberCheck(id)) {
        try {
            let response = await fetch(`http://localhost:8080/product/${id}`);
            let promise = await response.json();

            displayProduct(promise);
            return promise;
        } catch (error) {
            window.alert("ID doesn't exist");
            refresh();
        }
    } else {
        window.alert("Please check the values entered");
        refresh();
    }
}

function displayProduct(product) {
    txtName.value = product.name;
    txtDesc.value = product.description;
    txtPrice.value = product.price;
}

async function deleteById() {
    let id = document.getElementById("txt-id").value;
    if (!numberCheck(id)) {
        window.alert("Please check the values entered");
    } else {
        try {
            let response = await fetch(`http://localhost:8080/product/${id}`, {
                method: "DELETE",
            });
            let promise = await response.json();
            if (response.ok) {
                window.alert("Soft Delete successful");
            }
        } catch (error) {
            window.alert("ID doesn't exist");
        }
    }
}
function refresh() {
    document.getElementById("txt-id").value = "";
    txtName.value = "";
    txtDesc.value = "";
    txtPrice.value = "";
}

function numberCheck(string) {
    const pattern = /^\d+$/;
    return pattern.test(string);
}
