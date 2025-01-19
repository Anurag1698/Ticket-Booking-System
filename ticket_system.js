// Initialize seats data
let seats = [];
let numRows = 12;
let numColumns = 8;

function initializeSeats() {
    let rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    for (let row = 0; row < numRows; row++) {
        for (let col = 1; col <= numColumns; col++) {
            let seatNumber = rowLabels[row] + col;
            seats.push({
                seatNumber: seatNumber,
                booked: false,
                customer: {}
            });
        }
    }
}

function displaySeats() {
    let seatsContainer = document.getElementById('seats-container');
    seatsContainer.innerHTML = '';

    seats.forEach(function (seat) {
        let seatElement = document.createElement('div');
        seatElement.className = 'seat';
        seatElement.id = seat.seatNumber; // Set a unique ID for each seat
        if (seat.booked) {
            seatElement.innerHTML = '<i class="fas fa-couch" style="color: #00ff00;"></i>';
        } else {
            seatElement.innerHTML = '<i class="fas fa-couch" style="color: aqua;"></i>';
            seatElement.addEventListener('click', function () {
                selectSeat(seat);
            });
        }
        let seatIdElement = document.createElement('div');
        seatIdElement.className = 'seat-id';
        seatIdElement.textContent = seat.seatNumber; // Display the unique seat ID
        seatElement.appendChild(seatIdElement);
        seatsContainer.appendChild(seatElement);
    });
}

// Function to select a seat
let selectedSeat = null;

function selectSeat(seat) {
    if (selectedSeat) {
        selectedSeat.classList.remove('selected');
    }
    selectedSeat = seat;
    seat.classList.add('selected');
}

// Function to book a ticket
function bookTicket() {
    let seatNumber = prompt('Enter the seat number :');
    let seat = findSeatByNumber(seatNumber);

    if (!seat) {
        alert('Invalid seat number');
        return;
    }

    if (seat.booked) {
        alert('We are really sorry but this Seat is already booked. Please choose another seat.');
        bookTicket();
        return;
    }

    let customerName = prompt('Enter customer name:');
    if (customerName === null || customerName.trim() === '') {
        alert('Customer name is required.');
        return;
    }

    let customerAge = prompt('Enter customer age:');
    if (customerAge === null || isNaN(customerAge)) {
        alert('Valid customer age is required.');
        return;
    }

    seat.booked = true;
    seat.customer.name = customerName;
    seat.customer.age = parseInt(customerAge);

    displaySeats();
}


// Function to cancel a booked ticket
function cancelTicket() {
    let seatNumber = prompt('Enter seat number to cancel:');
    let seat = findSeatByNumber(seatNumber);

    if (!seat) {
        alert('Seat not found or not booked.');
        return;
    }

    seat.booked = false;
    seat.customer = {};

    displaySeats();
}

// Function to find a seat by seat number
function findSeatByNumber(seatNumber) {
    return seats.find(function (seat) {
        return seat.seatNumber === seatNumber;
    });
}

// Function to display customer information
function displayCustomerInfo(seat) {
    alert('Seat Number: ' + seat.seatNumber +
        '\nCustomer Name: ' + seat.customer.name +
        '\nCustomer Age: ' + seat.customer.age);
}

// Function to search for a customer by name
function searchByName() {
    let customerName = prompt('Enter customer name to search:');
    if (customerName === null || customerName.trim() === '') {
        alert('Please enter a valid customer name.');
        return;
    }

    let matchingSeats = seats.filter(function (seat) {
        return seat.booked && seat.customer.name === customerName;
    });

    if (matchingSeats.length === 0) {
        alert('No matching customer found.');
    } else if (matchingSeats.length === 1) {
        displayCustomerInfo(matchingSeats[0]);
    } else {
        let customerAge = prompt('Enter customer age to narrow down the search:');
        if (customerAge === null || isNaN(customerAge)) {
            alert('Valid customer age is required.');
            return;
        }

        let matchingSeat = matchingSeats.find(function (seat) {
            return seat.customer.age === parseInt(customerAge);
        });

        if (matchingSeat) {
            displayCustomerInfo(matchingSeat);
        } else {
            alert('No matching customer found.');
        }
    }
}

// Function to display all customers and their details based on user's choice
function displayAllCustomers() {
    const sortOptions = ["booking order", "alphabetical order", "age order"];
    
    const choice = prompt("Enter your choice to display customer info:\n" +
        "1. Display in booking order\n" +
        "2. Display in alphabetical order of customer names\n" +
        "3. Display in order of customer ages\n");
    
    if (!choice || !sortOptions[choice - 1]) {
        alert("Invalid choice.");
        return;
    }
    
    let customerList = "List of Customers:\n\n";

    if (sortOptions[choice - 1] === "booking order") {
        seats.forEach(function (seat) {
            if (seat.booked) {
                customerList += `Seat Number: ${seat.seatNumber}\n`;
                customerList += `Customer Name: ${seat.customer.name}\n`;
                customerList += `Customer Age: ${seat.customer.age}\n\n`;
            }
        });
    } else if (sortOptions[choice - 1] === "alphabetical order") {
        seats
            .filter(seat => seat.booked)
            .sort((a, b) => a.customer.name.localeCompare(b.customer.name))
            .forEach(function (seat) {
                customerList += `Seat Number: ${seat.seatNumber}\n`;
                customerList += `Customer Name: ${seat.customer.name}\n`;
                customerList += `Customer Age: ${seat.customer.age}\n\n`;
            });
    } else if (sortOptions[choice - 1] === "age order") {
        seats
            .filter(seat => seat.booked)
            .sort((a, b) => a.customer.age - b.customer.age)
            .forEach(function (seat) {
                customerList += `Seat Number: ${seat.seatNumber}\n`;
                customerList += `Customer Name: ${seat.customer.name}\n`;
                customerList += `Customer Age: ${seat.customer.age}\n\n`;
            });
    }

    if (customerList === "List of Customers:\n\n") {
        customerList = "No customers have been booked.";
    }

    alert(customerList);
}


// Initialize seats and display the initial seating arrangement
initializeSeats();
displaySeats();

// Initialize a queue to store canceled ticket information
let canceledTicketsQueue = [];

// Function to display canceled tickets
function showCanceledTickets() {
    if (canceledTicketsQueue.length === 0) {
        alert('No tickets have been canceled.');
        return;
    }

    let canceledTicketInfo = "List of Canceled Tickets:\n\n";
    
    // Dequeue and display canceled ticket information
    while (canceledTicketsQueue.length > 0) {
        const canceledTicket = canceledTicketsQueue.shift();
        canceledTicketInfo += `Seat Number: ${canceledTicket.seatNumber}\n`;
        canceledTicketInfo += `Customer Name: ${canceledTicket.customerName}\n`;
        canceledTicketInfo += `Customer Age: ${canceledTicket.customerAge}\n\n`;
    }

    alert(canceledTicketInfo);
}

// Function to cancel a booked ticket
function cancelTicket() {
    let seatNumber = prompt('Enter seat number to cancel:');
    let seat = findSeatByNumber(seatNumber);

    if (!seat) {
        alert('Seat not found or not booked.');
        return;
    }

    // Enqueue canceled ticket information
    canceledTicketsQueue.push({
        seatNumber: seat.seatNumber,
        customerName: seat.customer.name,
        customerAge: seat.customer.age
    });

    seat.booked = false;
    seat.customer = {};

    displaySeats();
}

