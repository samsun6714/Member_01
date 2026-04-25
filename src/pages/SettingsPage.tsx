import { useState } from "react";
import { TopBar, BottomNav } from "../components/Navigation";
import { Bell, Lock, Globe, ChevronRight, LogOut, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <TopBar />
      <main className="max-w-md mx-auto px-5 py-6">
        <h2 className="text-xl font-bold text-primary mb-6 text-center">Settings</h2>

        <section className="bg-surface-container-lowest rounded-2xl shadow-soft overflow-hidden mb-6 border border-outline-variant/20">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Bell size={20} fill="currentColor" fillOpacity={0.1} />
              </div>
              <span className="font-medium text-on-surface">การแจ้งเตือน</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications ? "bg-primary" : "bg-outline-variant"}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? "translate-x-6" : "translate-x-1"}`} 
              />
            </button>
          </div>

          {/* Change Password */}
          <button className="w-full flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Lock size={20} fill="currentColor" fillOpacity={0.1} />
              </div>
              <span className="font-medium text-on-surface">เปลี่ยนรหัสผ่าน</span>
            </div>
            <ChevronRight className="text-outline" size={20} />
          </button>

          {/* Language Selection */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Globe size={20} fill="currentColor" fillOpacity={0.1} />
              </div>
              <span className="font-medium text-on-surface">เลือกภาษา</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="text-sm">ไทย</span>
              <ChevronDown size={20} />
            </div>
          </button>
        </section>

        {/* Logout Action */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleLogout}
          className="w-full h-[52px] mt-6 rounded-xl border border-error text-error font-bold flex items-center justify-center gap-2 hover:bg-error-container/10 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </main>
      <BottomNav />
    </div>
  );
}
