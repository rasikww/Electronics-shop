function createProduct() {
    const txtName = document.getElementById("txt-name").value;
    const txtDesc = document.getElementById("txt-desc").value;
    const txtPrice = document.getElementById("txt-price").value;

    if (txtName == "" || txtDesc == "" || txtPrice == "") {
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

async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
}

async function addElectronic() {
    const data = createProduct();
    if (data != null) {
        const response = await postData("http://localhost:8080/product", data);
        if (response.ok) {
            window.alert("Product added successfully");
            clearFields();
        } else {
            window.alert("Operation Unsuccessful");
        }
    }
}

function clearFields() {
    document.getElementById("txt-name").value = "";
    document.getElementById("txt-desc").value = "";
    document.getElementById("txt-price").value = "";
}
