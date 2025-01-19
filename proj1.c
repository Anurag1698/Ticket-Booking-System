#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Define the maximum number of rows and columns
#define NUM_ROWS 12
#define NUM_COLUMNS 8
#define SEAT_NUMBER_LENGTH 3

// Seat structure
struct Seat {
    char seatNumber[SEAT_NUMBER_LENGTH];
    int booked;
    char customerName[100];
    int customerAge;
};

// Function to initialize seats
void initializeSeats(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    char rowLabels[] = "ABCDEFGHIJKL";

    for (int row = 0; row < NUM_ROWS; row++) {
        for (int col = 0; col < NUM_COLUMNS; col++) {
            snprintf(seats[row][col].seatNumber, SEAT_NUMBER_LENGTH, "%c%d", rowLabels[row], col + 1);
            seats[row][col].booked = 0;
            seats[row][col].customerName[0] = '\0';
            seats[row][col].customerAge = 0;
        }
    }
}

// Function to display seats
// Function to display seats in rows and columns
void displaySeats(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    printf("\n");
    printf("  "); // Initial spacing for column labels
    // Print column labels (1 to NUM_COLUMNS)
    for (int col = 1; col <= NUM_COLUMNS; col++) {
        printf("%2d ", col);
    }

    printf("\n");

    for (int row = 0; row < NUM_ROWS; row++) {
        // Print row label (A to L)
        printf("%c  ", 'A' + row);

        for (int col = 0; col < NUM_COLUMNS; col++) {
            if (seats[row][col].booked) {
                printf("X  "); // X represents a booked seat
            } else {
                printf("O  "); // O represents an available seat
            }
        }

        printf("\n");
    }
}

// Function to book a ticket
void bookTicket(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    char seatNumber[SEAT_NUMBER_LENGTH];
    printf("Enter the seat number: ");
    scanf("%s", seatNumber);

    int row = -1, col = -1;
    for (int i = 0; i < NUM_ROWS; i++) {
        for (int j = 0; j < NUM_COLUMNS; j++) {
            if (strcmp(seats[i][j].seatNumber, seatNumber) == 0) {
                row = i;
                col = j;
                break;
            }
        }
        if (row != -1) {
            break;
        }
    }

    if (row != -1 && col != -1) {
        if (seats[row][col].booked) {
            printf("Sorry, this seat is already booked.\n");
        } else {
            printf("Enter customer name: ");
            scanf("%s", seats[row][col].customerName);
            printf("Enter customer age: ");
            scanf("%d", &seats[row][col].customerAge);
            seats[row][col].booked = 1;
            printf("Ticket booked successfully!\n");
        }
    } else {
        printf("Invalid seat number.\n");
    }
}

// Function to cancel a booked ticket
void cancelTicket(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    char seatNumber[SEAT_NUMBER_LENGTH];
    printf("Enter the seat number to cancel: ");
    scanf("%s", seatNumber);

    int row = -1, col = -1;
    for (int i = 0; i < NUM_ROWS; i++) {
        for (int j = 0; j < NUM_COLUMNS; j++) {
            if (strcmp(seats[i][j].seatNumber, seatNumber) == 0) {
                row = i;
                col = j;
                break;
            }
        }
        if (row != -1) {
            break;
        }
    }

    if (row != -1 && col != -1) {
        if (seats[row][col].booked) {
            printf("Ticket for seat %s is canceled.\n", seats[row][col].seatNumber);
            seats[row][col].booked = 0;
            seats[row][col].customerName[0] = '\0';
            seats[row][col].customerAge = 0;
        } else {
            printf("This seat is not booked.\n");
        }
    } else {
        printf("Invalid seat number.\n");
    }
}

// Function to find a seat by seat number
int findSeatByNumber(struct Seat seats[NUM_ROWS][NUM_COLUMNS], char seatNumber[SEAT_NUMBER_LENGTH]) {
    for (int row = 0; row < NUM_ROWS; row++) {
        for (int col = 0; col < NUM_COLUMNS; col++) {
            if (strcmp(seats[row][col].seatNumber, seatNumber) == 0) {
                return 1; // Found
            }
        }
    }
    return 0; // Not found
}

// Function to search for a customer by name
void searchByName(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    char customerName[100];
    printf("Enter customer name to search: ");
    scanf("%s", customerName);

    int found = 0;
    for (int row = 0; row < NUM_ROWS; row++) {
        for (int col = 0; col < NUM_COLUMNS; col++) {
            if (seats[row][col].booked && strcasecmp(seats[row][col].customerName, customerName) == 0) {
                found = 1;
                printf("Seat %s is booked by %s (Age: %d).\n", seats[row][col].seatNumber, seats[row][col].customerName, seats[row][col].customerAge);
            }
        }
    }

    if (!found) {
        printf("No matching customer found.\n");
    }
}

// Function to show canceled tickets
void showCanceledTickets(struct Seat seats[NUM_ROWS][NUM_COLUMNS]) {
    for (int row = 0; row < NUM_ROWS; row++) {
        for (int col = 0; col < NUM_COLUMNS; col++) {
            if (!seats[row][col].booked && seats[row][col].customerName[0] != '\0' && seats[row][col].customerAge != 0) {
                printf("Canceled Ticket - Seat %s was booked by %s (Age: %d).\n", seats[row][col].seatNumber, seats[row][col].customerName, seats[row][col].customerAge);
            }
        }
    }
}

int main() {
    struct Seat seats[NUM_ROWS][NUM_COLUMNS];

    // Initialize seats
    initializeSeats(seats);

    int choice;
    while (1) {
        printf("\n");
        printf("Choose an action:\n");
        printf("1. Display seats\n");
        printf("2. Book a ticket\n");
        printf("3. Cancel a ticket\n");
        printf("4. Search by customer name\n");
        printf("5. Show canceled tickets\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                displaySeats(seats);
                break;
            case 2:
                bookTicket(seats);
                break;
            case 3:
                cancelTicket(seats);
                break;
            case 4:
                searchByName(seats);
                break;
            case 5:
                showCanceledTickets(seats);
                break;
            case 6:
                return 0;
            default:
                printf("Invalid choice. Try again.\n");
        }
    }

    return 0;
}