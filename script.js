    /* Your JavaScript code here */
    const questions = document.querySelectorAll('.question');
    let currentStep = 0;
    let sendNotifications = 0;
    let receivedNotifications = 0;

    // Placeholder SMS price logic for the providers
// Placeholder SMS price logic for the providers
const providerPrices = {
    SNS: { 
        local: {
            price: 2,
            smsSent: 0.00847,
            smsReceived: 0.0075
        },
        tollFree: {
            price: 2,
            smsSent: 0.00847,
            smsReceived: 0.0075
        }
    },
    Bandwidth: { 
        local: {
            price: 0.035,
            smsSent: 0.005,
            smsReceived: 0.0
        },
        tollFree: {
            price: 0.035,
            smsSent: 0.005,
            smsReceived: 0.0
        }
    },
    Telnyx: { 
        local: {
            price: 1.00,
            smsSent: 0.067,
            smsReceived: 0.0
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.067,
            smsReceived: 0.0
        }
    },
    Ooma: { 
        local: {
            price: 4.99,
            smsSent: 0.0063,
            smsReceived: 0.0065
        },
        tollFree: {
            price: 4.99,
            smsSent: 0.0063,
            smsReceived: 0.0065
        }
    },
    RingCentral: { 
        local: {
            price: 5.00,
            smsSent: 0.0085,
            smsReceived: 0.0085
        },
        tollFree: {
            price: 5.00,
            smsSent: 0.0085,
            smsReceived: 0.0085
        }
    },
    Twilio: { 
        local: {
            price: 1.00,
            smsSent: 0.0068,
            smsReceived: 0.0063
        },
        tollFree: {
            price: 2.00,
            smsSent: 0.0068,
            smsReceived: 0.0063
        }
    },
    Vonage: { 
        local: {
            price: 0.99,
            smsSent: 0.0068,
            smsReceived: 0.0063
        },
        tollFree: {
            price: 1.08,
            smsSent: 0.0068,
            smsReceived: 0.0063
        }
    },
    Plivo: { 
        local: {
            price: 1.00,
            smsSent: 0.0065,
            smsReceived: 0.0065
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.0065,
            smsReceived: 0.0065
        }
    },
    Sinch: { 
        local: {
            price: 1.00,
            smsSent: 0.0078,
            smsReceived: 0.0078
        },
        tollFree: {
            price: 2.00,
            smsSent: 0.0078,
            smsReceived: 0.0078
        }
    },
    MessageBird: { 
        local: {
            price: 1.5,
            smsSent: 0.0071,
            smsReceived: 0.0
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.0071,
            smsReceived: 0.0
        }
    },
    Karix: { 
        local: {
            price: 0.0076,
            smsSent: 0.0048,
            smsReceived: 0.0
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.0048,
            smsReceived: 0.0
        }
    },
    Exotel: { 
        local: {
            price: 1.00,
            smsSent: 0.0022,
            smsReceived: 0.0
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.0022,
            smsReceived: 0.0
        }
    },
    Gupshup: { 
        local: {
            price: 1.00,
            smsSent: 0.028,
            smsReceived: 0.028
        },
        tollFree: {
            price: 1.00,
            smsSent: 0.028,
            smsReceived: 0.028
        }
    }
};



  // Get all provider dropdowns
const providerDropdowns = document.querySelectorAll('select[name^="provider"]');

// Create an array to track selected providers
const selectedProviders = ['', '', ''];

providerDropdowns.forEach((dropdown, index) => {
    dropdown.addEventListener('change', (event) => {
        const selectedOption = event.target.value;

        // Disable the selected option in all dropdowns except the current one
        providerDropdowns.forEach((otherDropdown, otherIndex) => {
            if (otherIndex !== index) {
                otherDropdown.querySelectorAll('option').forEach((option) => {
                    option.disabled = false;
                });
                otherDropdown.querySelector(`option[value="${selectedOption}"]`).disabled = true;
            }
        });

        // Update the selected providers array
        selectedProviders[index] = selectedOption;
    });
});



  
    function showStep(step) {
        questions.forEach(question => question.style.display = 'none');
        questions[step - 1].style.display = 'block';
        currentStep = step - 1;
    }

    function nextStep(step) {
        showStep(step);
    }

    function prevStep(step) {
        showStep(step);
    }

    function calculatePrice() {
    sendNotifications = parseFloat(document.getElementById('smsSentInput').value) || 0;
    receivedNotifications = parseFloat(document.getElementById('smsReceivedInput').value) || 0;

    const selectedProvider1 = document.getElementById('provider1').value;
    const selectedProvider2 = document.getElementById('provider2').value;
    const selectedProvider3 = document.getElementById('provider3').value;

    // Get the selected number type (local or toll-free)
    const selectedNumberType = document.querySelector('input[name="numberType"]:checked').value;

    const priceProvider1 = calculateProviderPrice(providerPrices[selectedProvider1], sendNotifications, receivedNotifications, selectedNumberType);
    const priceProvider2 = calculateProviderPrice(providerPrices[selectedProvider2], sendNotifications, receivedNotifications, selectedNumberType);
    const priceProvider3 = calculateProviderPrice(providerPrices[selectedProvider3], sendNotifications, receivedNotifications, selectedNumberType);

    // Display the selected provider names along with prices
    const provider1Name = document.getElementById('provider1Name');
    const provider2Name = document.getElementById('provider2Name');
    const provider3Name = document.getElementById('provider3Name');

    provider1Name.innerText = selectedProvider1;
    provider2Name.innerText = selectedProvider2;
    provider3Name.innerText = selectedProvider3;

    displayPrice(priceProvider1, priceProvider2, priceProvider3);

    nextStep(5);
}




    function calculateProviderPrice(providerPrices, sendNotifications, receivedNotifications, numberType) {
    const pricing = providerPrices[numberType]; // Use the selected number type (local or toll-free) pricing
    const price = pricing.price + (sendNotifications * pricing.smsSent) + (receivedNotifications * pricing.smsReceived);
    return price.toFixed(2);
}


    function displayPrice(priceProvider1, priceProvider2, priceProvider3) {
        const provider1PriceElement = document.getElementById('provider1Price');
        const provider2PriceElement = document.getElementById('provider2Price');
        const provider3PriceElement = document.getElementById('provider3Price');
        const provider1ChartElement = document.getElementById('provider1Chart');
        const provider2ChartElement = document.getElementById('provider2Chart');
        const provider3ChartElement = document.getElementById('provider3Chart');

        provider1PriceElement.innerText = `$${priceProvider1}`;
        provider2PriceElement.innerText = `$${priceProvider2}`;
        provider3PriceElement.innerText = `$${priceProvider3}`;

        provider1ChartElement.style.width = `${priceProvider1 * 20}px`;
        provider2ChartElement.style.width = `${priceProvider2 * 20}px`;
        provider3ChartElement.style.width = `${priceProvider3 * 20}px`;
    }
