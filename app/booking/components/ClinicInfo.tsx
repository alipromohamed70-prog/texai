import {
  MapPin,
  Phone,
  Clock3,
  Mail,
} from "lucide-react";

export default function ClinicInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-fit">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Clinic Information
      </h2>

      <div className="space-y-6">

        <div className="flex gap-4">
          <MapPin className="text-blue-600 mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-gray-600">
              123 Dental Street<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Phone className="text-blue-600 mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600">
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Mail className="text-blue-600 mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">
              contact@brightsmile.com
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Clock3 className="text-blue-600 mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-gray-900">Working Hours</h3>

            <div className="text-gray-600 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}