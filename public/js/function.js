
$('#contactForm').on('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    const tel = $('#tel').val();
    const cc = $('#countryCode').val();

    // Send the form data to the server using AJAX
    $.ajax({
        url: 'https://5xvb47x0ml.execute-api.us-east-1.amazonaws.com/default/website_contactus',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
            "firstname": name,
            "lastname": "",
            "message": message,
            "tel": cc + '' + tel
        }),
        success: function (response, textStatus, xhr) {
            if (xhr.status === 200) { // Check for HTTP status code 200
                showAlert('Thanks, your message is sent successfully.', 'success', 'alert'); // Success alert

                // Clear form fields
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
                $('#tel').val('');
            } else {
                showAlert('Error sending message, please try again.', 'error', 'alert'); // Error alert
            }
        },
        error: function (xhr, status, error) {
            showAlert('There was an issue with the server. Please try again later.', 'error', 'alert'); // Error alert
        }
    });
});


$('#newsletterForm').on('submit', function (event) {
    event.preventDefault();

    const email = $('#newsletter_email').val();

    $.ajax({
        url: 'https://djmlciyetl.execute-api.us-east-1.amazonaws.com/default/website_subscribe',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email }),
        success: function (response, textStatus, xhr) {
            if (xhr.status === 200) {
                showAlert('Thanks for subscribing!', 'success', 'newsletter_alert'); // Success alert
                $('#newsletter_email').val(''); // Clear input
            } else {
                showAlert('Error subscribing, please try again.', 'error', 'newsletter_alert'); // Error alert
            }
        },
        error: function (xhr, status, error) {
            showAlert('There was an issue with the server. Please try again later.', 'error', 'newsletter_alert'); // Error alert
        }
    });
});


function showAlert(message, type, component) {
    const alertDiv = document.getElementById(component);

    alertDiv.style.display = 'block';
    alertDiv.innerHTML = `${message}`; // Set the alert message

    // Apply correct class based on success or error
    if (type === 'success') {
        alertDiv.className = 'alert-success';
    } else {
        alertDiv.className = 'alert-danger';  // Red background for error
    }

    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

document.querySelectorAll('.mil-input.with-flag').forEach(select => {
    select.addEventListener('change', function () {
        var option = this.options[this.selectedIndex];
        var flagIcon = option.getAttribute('data-icon');
        this.style.backgroundImage = "url('" + flagIcon + "')";
    });

    // Initialize the background for the selected option
    var initialOption = select.options[select.selectedIndex];
    var initialFlagIcon = initialOption.getAttribute('data-icon');
    select.style.backgroundImage = "url('" + initialFlagIcon + "')";
});