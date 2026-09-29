import "./summarycards.css";
import {
  FaFileAlt,
  FaCalendarCheck,
} from "react-icons/fa";

function SummaryCards({ bookings }) {
  // Sort bookings by date and time
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.booking_date}T${a.booking_time || "00:00:00"}`);
    const dateB = new Date(`${b.booking_date}T${b.booking_time || "00:00:00"}`);

    return dateA - dateB;
  });

  // Find upcoming booking
  const upcomingBooking = sortedBookings.find((booking) => {
    const bookingDate = new Date(
      `${booking.booking_date}T${booking.booking_time || "00:00:00"}`
    );

    return bookingDate >= new Date();
  });

  // Format appointment date
  const formatAppointment = (booking) => {
    if (!booking) {
      return "No upcoming appointment";
    }

    const date = new Date(
      `${booking.booking_date}T${booking.booking_time || "00:00:00"}`
    );

    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${formattedDate} • ${formattedTime}`;
  };

  const cards = [
    {
      title: "Active Bookings",
      value: bookings.length,
      icon: <FaFileAlt />,
      color: "#2563eb",
    },
    {
      title: "Next Appointment",
      value: formatAppointment(upcomingBooking),
      icon: <FaCalendarCheck />,
      color: "#10b981",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>
          <div
            className="card-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>
            <h4>{card.title}</h4>
            <p>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
