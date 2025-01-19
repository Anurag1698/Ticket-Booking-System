# Ticket Booking System

## Overview
The Ticket Booking System is a web-based application designed to manage seat reservations in a theater-like environment. Users can view available seats, book tickets, cancel reservations, and search for customers. Additional features include displaying all customers with sorting options and viewing canceled tickets.

## Features
### Seat Management
- Display Seats: View a grid of seats, with booked seats marked in green and available seats in aqua. Clicking on an available seat allows selection for booking.
- Book Tickets: Book a seat by entering customer details (name and age). Ensures no duplicate bookings.
- Cancel Tickets: Cancel a booked seat, and its details are added to a queue of canceled tickets.
### Customer Management
- Search by Name: Search for a customer by name, with optional filtering by age if multiple matches are found.
- Display All Customers: View details of all booked customers sorted by:
    - Booking order
    - Alphabetical order of names
    - Age order
### Canceled Tickets
- Show Canceled Tickets: View details of all canceled tickets stored in a queue, including seat number, customer name, and age.

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: C

## How It Works
- **Initialize Seats:** The seating grid consists of 12 rows (A–L) and 8 columns. Each seat has a unique identifier (e.g., A1, B3).
- Interactive Booking:
    - Select an available seat from the grid or enter the seat number manually.
    - Provide customer details to confirm the booking.
- Canceling Reservations:
    - Enter the seat number to cancel the booking.
    - The seat is marked as available, and the canceled ticket details are added to a queue.
- Customer Search:
Search by name and optionally refine results by age.
- View Canceled Tickets:
Display and dequeue canceled ticket information.

## Getting Started
### Setup
- Clone or download the project repository.
- Open index.html in your browser to launch the application.
### Running the System
- The seating arrangement is displayed on load.
- Use the provided options to book, cancel, or search for tickets.

## Screenshots
- Website
![Whole Webpage](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/Whole%20webpage.png)
- Booking a Ticket
![Booking a Ticket](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/Booking%20a%20Ticket.png)
- Booked Ticket (in GREEN)
![Booked Ticket (in GREEN)](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/Booked%20Ticket%20(GREEN).png)
- Cancelled Tickets
![](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/Cancelled%20Tickets.png)
- Options to Display the Booked Tickets.png
![Options to Display the Booked Tickets.png](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/Options%20to%20Display%20the%20Booked%20Tickets.png)
- Booked Tickets
![Booked Tickets](https://github.com/Anurag1698/Ticket-Booking-System/blob/8d7fac3e5a7d8ed07c452f4683a84b98ff42b45e/Screenshots/List%20of%20Booked%20Tickets.png)


## Future Enhancements
- Integration with a database for persistent storage.
- User authentication for secure booking.
- Mobile-friendly design for better accessibility.
