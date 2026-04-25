import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, User as UserIcon, Settings, Bell } from "lucide-react";
import { User } from "../types";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-container rounded-t-2xl px-6 py-3 pb-8 md:hidden z-50 flex justify-around items-center">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? "text-primary bg-primary/10 px-4" : "text-on-surface-variant"
          }`
        }
      >
        <LayoutDashboard size={24} fill="currentColor" fillOpacity={0} />
        <span className="text-[11px] font-medium">Dashboard</span>
      </NavLink>
      
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? "text-primary bg-primary/10 px-4" : "text-on-surface-variant"
          }`
        }
      >
        <UserIcon size={24} />
        <span className="text-[11px] font-medium">Profile</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? "text-primary bg-primary/10 px-4" : "text-on-surface-variant"
          }`
        }
      >
        <Settings size={24} />
        <span className="text-[11px] font-medium">Settings</span>
      </NavLink>
    </nav>
  );
}

export function TopBar() {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setAvatar(data.avatar))
      .catch(() => {
        const stored = localStorage.getItem("user_data");
        if (stored) {
          setAvatar(JSON.parse(stored).avatar);
        }
      });
  }, []);

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-surface-container px-5 h-16 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
          {avatar ? (
            <img 
              src={avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
              <UserIcon size={16} />
            </div>
          )}
        </div>
        <h1 className="font-bold text-primary text-lg">Membership</h1>
      </div>
      <button className="text-primary p-2 hover:bg-surface-container rounded-full transition-colors">
        <Bell size={24} />
      </button>
    </header>
  );
}
