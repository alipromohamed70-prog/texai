"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // تم تعديل الرابط هنا ليكون متصلاً بدون مسافات نائية لتجنب مشاكل السيرفر
      const response = await fetch(
        "https://oussapro1.app.n8n.cloud/webhook/dental-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data to n8n");
      }

      alert("Appointment request sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book Your Appointment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium text-gray-800">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border rounded-xl p-3 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@email.com"
            className="w-full border rounded-xl p-3 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 555 123 456"
            className="w-full border rounded-xl p-3 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 text-gray-900"
            required
          >
            <option value="">Select a service</option>
            <option value="Dental Check-up">Dental Check-up</option>
            <option value="Teeth Cleaning">Teeth Cleaning</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Root Canal">Root Canal</option>
            <option value="Tooth Extraction">Tooth Extraction</option>
            <option value="Emergency Visit">Emergency Visit</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-800">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 text-gray-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">
            Reason for Visit
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={5}
            placeholder="Please describe the reason for your visit..."
            className="w-full border rounded-xl p-3 text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>

      </form>

    </div>
  );
}