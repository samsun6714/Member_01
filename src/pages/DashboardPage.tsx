import { useEffect, useState } from "react";
import { TopBar, BottomNav } from "../components/Navigation";
import { Star, Award, Coffee, ShoppingBag, Gift, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { User, Activity } from "../types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/user").then(res => res.json()).then(setUser);
    fetch("/api/activity").then(res => res.json()).then(setActivities);
  }, []);

  const IconMap: Record<string, any> = {
    Coffee,
    ShoppingBag,
    Gift
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-28">
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 py-6 flex flex-col gap-8">
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-on-surface"
          >
            สวัสดี, {user.name.split(" ")[0]}
          </motion.h2>
          <p className="text-lg text-on-surface-variant mt-1">Here is your membership overview.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-soft border border-outline-variant/30 flex flex-col justify-between min-h-[160px] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                <Star size={18} fill="currentColor" />
                <span className="text-xs font-bold uppercase tracking-wider">Available Points</span>
              </div>
              <div className="text-4xl font-bold text-on-surface">{user.points.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-primary font-semibold hover:underline cursor-pointer">
              <span className="text-sm">Redeem Rewards</span>
              <ArrowRight size={16} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary-container to-primary rounded-2xl p-6 shadow-lg shadow-primary/20 flex flex-col justify-between min-h-[160px] text-on-primary"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs opacity-80 uppercase tracking-widest font-bold mb-1 block">Current Status</span>
                <div className="text-2xl font-bold">{user.status}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Award size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs opacity-90 mb-1 font-medium">
                <span>Progress to Platinum</span>
                <span>2,500 pts</span>
              </div>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-surface-container-lowest rounded-2xl shadow-soft border border-outline-variant/30 overflow-hidden">
          <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-on-surface">Recent Activity</h3>
            <button className="text-sm text-primary font-semibold hover:underline">View All</button>
          </div>
          <div className="flex flex-col">
            {activities.map((activity, index) => {
              const Icon = IconMap[activity.icon] || Coffee;
              return (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="px-4 py-4 flex items-center justify-between border-b last:border-b-0 border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface">{activity.title}</div>
                      <div className="text-xs text-on-surface-variant">{activity.date}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${activity.points.startsWith("-") ? "text-error" : "text-primary"}`}>
                    {activity.points}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
