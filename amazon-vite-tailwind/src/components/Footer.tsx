import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGlobeAsia } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* Back to Top Button */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-gray-800 text-gray-200 py-3 text-center font-medium cursor-pointer hover:bg-gray-700 transition"
      >
        Back to Top
      </div>

      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">

        {/* Top Columns */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 px-6">

          {/* Column 1 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press Releases", "Blog", "Corporate Info"].map((item) => (
                <li key={item}>
                  <Link className="hover:text-white transition hover:translate-x-1 inline-block" to="#">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Make Money</h3>
            <ul className="space-y-3">
              {["Sell on MyAmazon", "Become Partner", "Advertise Products", "Affiliate Program", "Supply Chain"].map((item) => (
                <li key={item}>
                  <Link className="hover:text-white transition hover:translate-x-1 inline-block" to="#">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-3">
              {["Your Account", "Return Centre", "Track Orders", "Buy Again", "Help"].map((item) => (
                <li key={item}>
                  <Link className="hover:text-white transition hover:translate-x-1 inline-block" to="#">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-col space-y-3">
              <a className="hover:text-white transition hover:translate-x-1" href="#">Facebook</a>
              <a className="hover:text-white transition hover:translate-x-1" href="#">Instagram</a>
              <a className="hover:text-white transition hover:translate-x-1" href="#">Twitter</a>
              <a className="hover:text-white transition hover:translate-x-1" href="#">LinkedIn</a>
            </div>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Download App</h3>
            <div className="space-y-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Play_2022_logo.svg"
                className="h-12 bg-white rounded shadow hover:shadow-lg hover:scale-105 transition p-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Apple_logo_black.svg"
                className="h-12 bg-white rounded shadow hover:shadow-lg hover:scale-105 transition p-2"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 mb-6"></div>

        {/* Bottom Row */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Country Selector */}
          <div className="flex items-center gap-3">
            <FaGlobeAsia className="text-xl text-gray-400" />
            <select className="bg-gray-800 px-4 py-2 rounded text-sm text-gray-300 border border-gray-600 hover:border-gray-400 transition">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>

          {/* Social */}
          <div className="flex space-x-6 text-2xl text-gray-400">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
              <Icon
                key={i}
                className="cursor-pointer hover:text-white hover:scale-110 transition"
              />
            ))}
          </div>

          {/* Payments */}
          <div className="flex space-x-3">
            <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" className="h-6 opacity-70" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-6 opacity-70" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" className="h-6 opacity-70" />
            <img src="https://cdn-icons-png.flaticon.com/512/825/825465.png" className="h-6 opacity-70" />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} MyAmazonClone — All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
