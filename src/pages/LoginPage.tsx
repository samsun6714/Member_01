import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-lowest rounded-[24px] shadow-elevation p-8 flex flex-col items-stretch"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface text-center">เข้าสู่ระบบ</h1>
          <p className="text-sm text-on-surface-variant text-center mt-2">ยินดีต้อนรับกลับสู่ระบบสมาชิก</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-surface-variant ml-1" htmlFor="email">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-outline" size={20} />
              <input 
                className="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder:text-outline-variant"
                id="email" 
                placeholder="example@email.com" 
                type="email"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-surface-variant ml-1" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-outline" size={20} />
              <input 
                className="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface placeholder:text-outline-variant"
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-outline hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                className="w-5 h-5 border border-outline-variant rounded bg-surface-container-low checked:bg-primary transition-all cursor-pointer"
                type="checkbox" 
              />
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">จดจำฉัน</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline font-semibold">ลืมรหัสผ่าน?</a>
          </div>

          <button 
            className="w-full h-[52px] bg-primary text-on-primary font-semibold rounded-xl flex items-center justify-center hover:bg-primary-container active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            type="submit"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-on-surface-variant">
          ยังไม่ได้เป็นสมาชิก? <Link to="/register" className="text-primary font-bold hover:underline">สมัครสมาชิก</Link>
        </div>
      </motion.div>
    </div>
  );
}
