document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let formData = new FormData(this);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);

    fetch('https://localhost:3000/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Alert the response from the server
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong.');
    });
});