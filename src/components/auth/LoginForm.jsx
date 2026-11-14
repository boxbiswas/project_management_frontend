import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../redux/slices/authSlice.js';
import { Eye, EyeOff, AlertCircle, AlertTriangle, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Client-side field validation logic
  const validate = () => {
    const errs = {};
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      dispatch(clearError());
    }
  };

  // Submit login payload
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const result = await dispatch(
      loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl border border-[#F5E6D3] p-8 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#292524] tracking-tight">Sign in to BugBoard</h2>
        <p className="text-sm text-[#78716C] mt-1">Welcome back! Please enter your details</p>
      </div>

      {/* Server error alert banner */}
      {serverError && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-[#991B1B] text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Login form inputs */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            disabled={loading}
            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#292524] placeholder-[#A8A29E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-1 ${
              errors.email ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#E7D5BF] hover:border-[#D6BFA3] focus:border-[#F97316]'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              className={`w-full h-11 pl-3.5 pr-10 rounded-xl border bg-white text-sm text-[#292524] placeholder-[#A8A29E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-1 ${
                errors.password ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#E7D5BF] hover:border-[#D6BFA3] focus:border-[#F97316]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#292524] focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] active:bg-[#9A3412] text-white font-semibold text-sm transition-colors shadow-sm disabled:bg-[#FDBA74] disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Switch to register page link */}
      <div className="mt-6 text-center text-sm text-[#78716C]">
        New to BugBoard?{' '}
        <Link to="/register" className="font-semibold text-[#C2410C] hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
