
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import Input from './components/Input';
import SocialLogin from './components/SocialLogin';
import { geminiService } from './services/geminiService';
import { SecurityTip, UserSession } from './types';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [tip, setTip] = useState<SecurityTip | null>(null);

  // Fetch AI Security Tip on mount
  useEffect(() => {
    const fetchTip = async () => {
      const result = await geminiService.getSecurityTip();
      setTip(result);
    };
    fetchTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (password === 'password123') { // Mock logic
        setSession({ email, name: email.split('@')[0], isLoggedIn: true });
        setIsLoading(false);
      } else {
        setError("Invalid credentials. Try 'password123' to test.");
        setIsLoading(false);
      }
    }, 1500);
  }, [email, password]);

  if (session?.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-3xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <ShieldCheck className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Welcome Back!</h1>
          <p className="text-slate-400">Successfully authenticated as <span className="text-blue-400 font-medium">{session.email}</span></p>
          <button 
            onClick={() => setSession(null)}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all font-medium border border-slate-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center z-10">
        
        {/* Left Side: Branding & Content */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-100 tracking-tight">NexusAuth</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-50 leading-tight">
              Secure access to your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digital Realm.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md">
              The modern standard for enterprise-grade authentication. Quick, seamless, and powered by artificial intelligence.
            </p>
          </div>

          {tip && (
            <div className="glass p-6 rounded-2xl max-w-sm space-y-3 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full -mr-8 -mt-8" />
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-300">AI Security Tip</p>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    "{tip.text}"
                  </p>
                  <p className="text-[10px] text-blue-500/70 font-bold uppercase tracking-widest">
                    — {tip.author}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="glass p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
            <div className="lg:hidden flex justify-center mb-8">
               <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-100">NexusAuth</span>
              </div>
            </div>

            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Welcome Back</h2>
              <p className="text-slate-400 text-sm">Log in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <Input
                label="Email Address"
                placeholder="name@company.com"
                type="email"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />

              <div className="relative">
                <Input
                  label="Password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  icon={<Lock size={18} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full" />
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-xs px-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-slate-700 bg-slate-800 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-2 h-2 bg-blue-500 rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  Remember me
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900/0 px-4 text-slate-500 glass rounded-full py-0.5">Or continue with</span>
              </div>
            </div>

            <SocialLogin />

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline">
                Sign up for free
              </a>
            </p>
          </div>

          <footer className="mt-8 text-center text-xs text-slate-600 space-x-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
