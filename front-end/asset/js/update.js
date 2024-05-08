let btnSearch = document.getElementById("btn-search");
let btnUpdate = document.getElementById("btn-update");
let btnRefresh = document.getElementById("btn-refresh");
let txtName = document.getElementById("txt-name-update");
let txtDesc = document.getElementById("txt-desc-update");
let txtPrice = document.getElementById("txt-price-update");

disableFields(true);

function disableFields(isDisabled) {
    txtName.disabled = isDisabled;
    txtDesc.disabled = isDisabled;
    txtPrice.disabled = isDisabled;
    btnUpdate.disabled = isDisabled;
}

btnSearch.addEventListener("click", searchById);
btnUpdate.addEventListener("click", updateById);
btnRefresh.addEventListener("click", refresh);

async function searchById() {
    let id = document.getElementById("txt-id").value;
    if (numberCheck(id)) {
        try {
            let response = await fetch(`http://localhost:8080/product/${id}`);
            let promise = await response.json();

            displayProduct(promise);
            disableFields(false);
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

async function updateById() {
    disableFields(true);
    let id = document.getElementById("txt-id").value;
    if (!numberCheck(id)) {
        window.alert("Please check the values entered");
    } else {
        try {
            let data = generateUpdatedProduct();
            let response = await fetch(`http://localhost:8080/product/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            let promise = await response.json();
            if (response.ok) {
                window.alert("Update successful");
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
    disableFields(true);
}

function numberCheck(string) {
    const pattern = /^\d+$/;
    return pattern.test(string);
}

function generateUpdatedProduct() {
    let txtName = document.getElementById("txt-name-update").value;
    let txtDesc = document.getElementById("txt-desc-update").value;
    let txtPrice = document.getElementById("txt-price-update").value;

    if (txtName == "" && txtDesc == "" && txtPrice == "") {
        window.alert("Please fill the fields");
        return null;
    } else {
        let product = {
            name: txtName,
            description: txtDesc,
            price: txtPrice,
        };
        console.log(product);
        return product;
    }
}
