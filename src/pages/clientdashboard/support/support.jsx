import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import "./support.css";

function Support() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://consultancy-management-system-2.onrender.com/api/accounts/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      setUser({
        name: data.full_name || "",
        email: data.email || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      alert("Please enter both subject and message.");
      return;
    }

    console.log({
      subject,
      message,
      email: user.email,
    });

    alert("Your message has been submitted successfully!");

    setSubject("");
    setMessage("");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar
          title="Support"
          username={loading ? "" : user.name}
        />

        <div className="support-container">
          <div className="support-left">
            <div className="support-card">
              <h2>Need Help?</h2>

              <p>
                Submit your query and our consultancy team will contact you as
                soon as possible.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Subject</label>

                  <input
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>

                  <textarea
                    rows="7"
                    placeholder="Describe your issue..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="send-btn"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="support-right">
            <div className="contact-card">
              <h3>Contact Information</h3>

              <p>📧 support@consultancy.com</p>

              <p>📞 +977-9800000000</p>

              <p>🕘 Sunday - Friday</p>

              <p>10:00 AM - 6:00 PM</p>
            </div>

            <div className="faq-card">
              <h3>Frequently Asked Questions</h3>

              <ul>
                <li>How do I apply to a university?</li>

                <li>How can I book a consultation?</li>

                <li>How do I upload my documents?</li>

                <li>When will I receive my offer letter?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
