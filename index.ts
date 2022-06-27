interface BookingData {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: Room;
}

interface RoomData {
  name: string;
  bookings: Array<BookingData>;
  rate: number;
  discount: number;
}

class Room implements RoomData {
  name;
  bookings;
  rate;
  discount;

  constructor({ name, bookings, rate, discount }: RoomData) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: Date) {
    const bookings = this.bookings;
    if (this.bookings.length) {
      // if the date matches a date's reservation
      for (let i = 0; i < bookings.length; i++) {
        if (date >= bookings[i].checkIn && date <= bookings[i].checkOut)
          return bookings[i].name; // return the guest's name
      }
      return false; // otherwise, return false
    }
    return false;
  }

  occupancyPercentage(startDate: Date, endDate: Date) {
    const bookings = this.bookings;

    let reservedBookings = []; // array for the reserved bookings

    for (let i = 0; i < bookings.length; i++) {
      if (startDate >= bookings[i].checkIn && endDate <= bookings[i].checkOut) {
        reservedBookings.push(bookings[i]);
      }
    }

    return Math.round((reservedBookings.length / bookings.length) * 100); // and return the rounded percentage
  }
}

class Booking implements BookingData {
  name;
  email;
  checkIn;
  checkOut;
  discount;
  room;

  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    const rate = this.room.rate;
    const discountRoom = rate * (this.room.discount / 100);
    const discountBooking = rate * (this.discount / 100);
    const totalDiscount = discountRoom + discountBooking;
    const price = totalDiscount > rate ? 0 : (rate - totalDiscount) / 100;
    return price;
  }
}
