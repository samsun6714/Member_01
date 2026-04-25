import { useEffect, useState, useRef } from "react";
import { BottomNav } from "../components/Navigation";
import { Mail, Phone, Calendar, Edit3, Camera, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "../types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/user").then(res => res.json()).then(data => {
      setUser(data);
      setFormData({ name: data.name, email: data.email, phone: data.phone });
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatar: base64String }),
        });
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="max-w-md mx-auto pt-8 px-5 flex flex-col items-center">
        {/* Profile Header */}
        <div className="w-full flex flex-col items-center relative mt-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleAvatarClick}
            className={`w-32 h-32 rounded-full overflow-hidden shadow-elevation bg-surface-container-lowest border-4 border-surface-container-lowest z-10 relative ${isEditing ? "cursor-pointer group" : ""}`}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className={`w-full h-full object-cover transition-all ${isEditing ? "group-hover:brightness-50" : ""}`}
            />
            <AnimatePresence>
              {(isEditing || isUploading) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 text-white pointer-events-none"
                >
                  {isUploading ? (
                    <Loader2 size={32} className="animate-spin" />
                  ) : (
                    <Camera size={32} className="opacity-80" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-surface-container-lowest rounded-2xl pt-20 pb-6 px-6 -mt-16 shadow-soft flex flex-col items-center"
          >
            {isEditing ? (
              <input
                className="text-2xl font-bold text-on-surface mb-2 text-center bg-surface-container-low border border-outline-variant rounded-lg px-2 w-full outline-none focus:border-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
            ) : (
              <h2 className="text-2xl font-bold text-on-surface mb-1">{user.name}</h2>
            )}
            
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-6">
              {user.status}
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs text-outline font-bold uppercase px-1">Email</label>
                <input
                  className="text-on-surface-variant bg-surface-container-low border border-outline-variant rounded-lg px-2 py-1 w-full outline-none focus:border-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            ) : (
              <p className="text-on-surface-variant flex items-center gap-2 font-medium">
                <Mail size={18} className="text-secondary" />
                {user.email}
              </p>
            )}
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="w-full mt-6 flex flex-col gap-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest rounded-xl p-4 shadow-soft flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <Phone size={24} fill="currentColor" fillOpacity={0.1} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-on-surface-variant">Phone Number</p>
              {isEditing ? (
                <input
                  className="text-lg font-semibold text-on-surface bg-surface-container-low border border-outline-variant rounded-lg px-2 w-full outline-none focus:border-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold text-on-surface">{user.phone}</p>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-container-lowest rounded-xl p-4 shadow-soft flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <Calendar size={24} fill="currentColor" fillOpacity={0.1} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-on-surface-variant">Member Since</p>
              <p className="text-lg font-semibold text-on-surface">{user.memberSince}</p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-8">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 h-[52px] rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface-variant font-bold flex items-center justify-center active:scale-95 transition-transform"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 h-[52px] rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform disabled:opacity-50"
              >
                {isSaving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full h-[52px] rounded-xl border border-outline-variant bg-surface-container-lowest text-primary font-bold flex items-center justify-center gap-2 shadow-soft active:scale-95 transition-transform"
            >
              <Edit3 size={20} />
              แก้ไขข้อมูล
            </button>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
