# Appointment-booking
Appointment Booking  is a tool built to assist the seller and customer for booking appointments.

##UI
The UI part is built using the react UI.
The default landing page is the dashboard page for Seller. Seller is allowed to create appointment to their customers for their service.
On clicking the "Add Appointment" icon from the navbar. The Add appoinment pop up pops up. We input details like appointment date, from time , to time in the pop up that appear.
The added appointment time slots are visible to the customers in their dashboard.
The landing page of the customer is obtained qith url localhost:3000/customers.
The customers can choose any of the appointment slots according the convenience inputting their basic details like name and contact number and book them by clicking the "Book Appointment" button.
Once the appointment is booked, the slot disappears from the screen.

Once when the customer books an appointment, it will be shown as a new booking request on the seller's Pending Request icon in the navbar
When the seller approves/ rejects the appointment, it will updated to user.

##API

The api part is implemented using Node js Express.

##Database
MongoDB is the databased used

## Collections
customers -- Stores the basic details of the customer like name and  contact no
sellers -- Stores the basic details of the seller like Seller Name, place,working hours etc
appointment-- Stores the detail of every transaction between seller and customer.

Note: Installing npm in the folder appointmentbooking folder inside ui-react  folderinstalls the npm packages required for client side
 Installing npm in the folder demo folder inside server folder installs the npm packages required for server side
