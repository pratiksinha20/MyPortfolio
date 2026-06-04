import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaCheck,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "../../data/mockData";
import "./Contact.css";

const WEB3FORMS_ACCESS_KEY = "0b1634b9-04ff-4444-a0b8-c7feec8503bc";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  show: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const contactCards = [
    {
      icon: <FaEnvelope />,
      title: "EMAIL ME",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      gradient: "contact-card--email",
    },
    {
      icon: <FaPhone />,
      title: "CALL ME",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      gradient: "contact-card--phone",
    },
    {
      icon: <FaWhatsapp />,
      title: "WHATSAPP",
      value: "Chat with me",
      href: "https://wa.me/917667238151",
      gradient: "contact-card--whatsapp",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: personalInfo.linkedin,
      className: "social-pill--linkedin",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: personalInfo.github,
      className: "social-pill--github",
    },
    {
      name: "X",
      icon: <FaXTwitter />,
      url: personalInfo.twitter,
      className: "social-pill--twitter",
    },
    {
      name: "Gmail",
      icon: <FaEnvelope />,
      url: `mailto:${personalInfo.email}`,
      className: "social-pill--gmail",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: personalInfo.instagram,
      className: "social-pill--instagram",
    },
  ];

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      next.email = "Please enter a valid email";
    if (!formData.subject.trim()) next.subject = "Subject is required";
    if (!formData.message.trim()) next.message = "Message is required";
    return next;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("subject", formData.subject || "Portfolio Contact");
      formPayload.append("message", formData.message);
      formPayload.append("from_name", "Portfolio Visitor");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const json = await response.json();

      if (response.status === 200 && json.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        console.error("Web3Forms error:", json);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3500);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Ambient background glows */}
      <div className="contact-ambient">
        <div className="contact-ambient__orb contact-ambient__orb--1" />
        <div className="contact-ambient__orb contact-ambient__orb--2" />
        <div className="contact-ambient__grid" />
      </div>

      <div ref={ref} className="contact-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          className="contact-header"
        >
          <p className="contact-header__label">Get In Touch</p>
          <h2 className="contact-header__title">Contact Me</h2>
          <div className="contact-header__underline" />
          <p className="contact-header__subtitle">
            Have a project in mind? Let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* Main 2-Column Layout */}
        <div className="contact-grid">
          {/* LEFT: Contact Info Panel */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={fadeRight}
            custom={0.1}
            className="contact-info-panel"
          >
            <p className="contact-pitch">
              Have an exciting project to build, internship opportunities, or
              just want to chat? Drop me a message and I&apos;ll get back to
              you!{" "}
              <span className="contact-pitch__dot" />
            </p>

            {/* Contact Info Cards */}
            <div className="contact-info-cards">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`contact-card ${card.gradient}`}
                >
                  <div className="contact-card__icon">{card.icon}</div>
                  <div className="contact-card__content">
                    <h4 className="contact-card__title">{card.title}</h4>
                    <p className="contact-card__value">{card.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="contact-form-panel"
          >
            <div className="contact-form-panel__glow" />

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__group">
                <label htmlFor="contact-name" className="contact-form__label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
                />
                {errors.name && (
                  <p className="contact-form__error">{errors.name}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label htmlFor="contact-email" className="contact-form__label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="john@example.com"
                  autoComplete="email"
                  className={`contact-form__input ${errors.email ? "contact-form__input--error" : ""}`}
                />
                {errors.email && (
                  <p className="contact-form__error">{errors.email}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label
                  htmlFor="contact-subject"
                  className="contact-form__label"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  placeholder="Project Discussion"
                  className={`contact-form__input ${errors.subject ? "contact-form__input--error" : ""}`}
                />
                {errors.subject && (
                  <p className="contact-form__error">{errors.subject}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label
                  htmlFor="contact-message"
                  className="contact-form__label"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={handleChange("message")}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`contact-form__textarea ${errors.message ? "contact-form__input--error" : ""}`}
                />
                {errors.message && (
                  <p className="contact-form__error">{errors.message}</p>
                )}
              </div>

              {/* Status Message */}
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-form__status contact-form__status--success"
                >
                  <FaCheck /> Thank you! Your message has been sent
                  successfully.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-form__status contact-form__status--error"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="contact-form__submit"
              >
                {status === "idle" && (
                  <span className="contact-form__submit-inner">
                    Send Message <FaPaperPlane />
                  </span>
                )}
                {status === "sending" && (
                  <span className="contact-form__submit-inner">
                    <span className="contact-form__spinner" /> Sending...
                  </span>
                )}
                {status === "sent" && (
                  <span className="contact-form__submit-inner">
                    <FaCheck /> Message Sent!
                  </span>
                )}
                {status === "error" && (
                  <span className="contact-form__submit-inner">
                    Error — Try Again
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Redirect Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="contact-socials"
        >
          <h4 className="contact-socials__title">Quick Connect</h4>
          <div className="contact-socials__row">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-pill ${link.className}`}
              >
                <span className="social-pill__icon">{link.icon}</span>
                <span className="social-pill__label">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}