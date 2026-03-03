import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "+1 (775) 4105-977"; // Replace with your number
  const message = "Hello, I need assistance!";
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-3 left-5 sm:left-22 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-[1000]"
      whileHover={{ scale: 1.1 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <FaWhatsapp size={30} />
    </motion.a>
  );
}