import "./upcomingbookings.css";

function UpcomingBookings({ bookings }) {
  // Sort bookings by date and time
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(
      `${a.booking_date}T${a.booking_time || "00:00:00"}`
    );

    const dateB = new Date(
      `${b.booking_date}T${b.booking_time || "00:00:00"}`
    );

    return dateA - dateB;
  });

  // Show only the first 3 upcoming bookings
  const upcomingBookings = sortedBookings.slice(0, 3);

  // Format date and time
  const formatDateTime = (booking) => {
    if (!booking.booking_date) {
      return "-";
    }

    const date = new Date(
      `${booking.booking_date}T${booking.booking_time || "00:00:00"}`
    );

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const formattedTime = booking.booking_time
      ? date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      : "Time not set";

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="table-card">

      <div className="table-header">
        <h3>Upcoming Bookings</h3>

        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Date & Time</th>
            <th>Provider</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                 {booking.service_name || "Service not available"}
                </td>

                <td>
                  {formatDateTime(booking)}
                </td>

                <td>
                  {booking.provider_name || "Not assigned"}
                </td>

                <td>
                  {booking.status || "New"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No upcoming bookings
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default UpcomingBookings;
