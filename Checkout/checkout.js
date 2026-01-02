document.addEventListener("DOMContentLoaded", function() {
    // Get references to form elements
    const codRadio = document.getElementById("cod");
    const cardRadio = document.getElementById("card");
    const easypaisaRadio = document.getElementById("easypaisa");
    const cardInfo = document.getElementById("card-info");
    const easypaisaInfo = document.getElementById("easypaisa-info");
    const checkoutBtn = document.getElementById("checkout-btn");
    const totalAmountElement = document.getElementById("total-amount");


    // Show payment details based on the selected method
    function handlePaymentMethod() {
        cardInfo.style.display = cardRadio.checked ? "block" : "none";
        easypaisaInfo.style.display = easypaisaRadio.checked ? "block" : "none";
    }

    // Attach event listeners to payment method radio buttons
    codRadio.addEventListener("change", handlePaymentMethod);
    cardRadio.addEventListener("change", handlePaymentMethod);
    easypaisaRadio.addEventListener("change", handlePaymentMethod);

    // Initially set the payment details based on the default selection (COD)
    handlePaymentMethod();

    // Handle the checkout button click
    checkoutBtn.addEventListener("click", function() {
        // Collect customer and shipping details
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const zip = document.getElementById("zip").value;
        const country = document.getElementById("country").value;

        // Validate customer and shipping information
        if (!name || !email || !phone || !address || !city || !zip || !country) {
            alert("Please fill out all customer and shipping details.");
            return;
        }

        let paymentDetails = "Payment Method: " + (codRadio.checked ? "Cash on Delivery" : cardRadio.checked ? "Credit/Debit Card" : easypaisaRadio.checked ? "Easypaisa" : "PayPal");

        // Validate payment details based on selected payment method
        if (cardRadio.checked) {
            const cardNumber = document.getElementById("card-number").value;
            const expiry = document.getElementById("expiry").value;
            const cvv = document.getElementById("cvv").value;
            if (!cardNumber || !expiry || !cvv) {
                alert("Please fill out card details.");
                return;
            }
            paymentDetails += ` (Card Number: ${cardNumber}, Expiry: ${expiry}, CVV: ${cvv})`;
        } else if (easypaisaRadio.checked) {
            const easypaisaNumber = document.getElementById("easypaisa-number").value;
            if (!easypaisaNumber) {
                alert("Please fill out Easypaisa number.");
                return;
            }
            paymentDetails += ` (Easypaisa Number: ${easypaisaNumber})`;
        }

        // Show confirmation alert
        alert(`Order confirmed! \nCustomer Info: ${name}, ${email}, ${phone}\nShipping Address: ${address}, ${city}, ${zip}, ${country}\n${paymentDetails}\nTotal Amount: Rs. ${totalAmount}`);
        
        // Optionally, clear localStorage if you don't need to keep the total after checkout
        localStorage.removeItem('totalAmount');
    });
});
