import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Call the onLogin callback
        onLogin(data);
        
        // Close modal
        onClose();
        
        // Reset form
        setFormData({ email: "", password: "" });
        
        // Reload page to update navigation
        window.location.reload();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{
          background: "linear-gradient(135deg, #8B4513 0%, #2F1810 100%)",
          borderRadius: "1rem"
        }}>
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title text-white fw-bold">Welcome Back</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isLoading}
            ></button>
          </div>
          
          <div className="modal-body pt-0">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white fw-medium">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <i className="fas fa-envelope text-white-50"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 bg-transparent text-white"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white"
                    }}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white fw-medium">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <i className="fas fa-lock text-white-50"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 bg-transparent text-white"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white"
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-light border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>
              
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  disabled={isLoading}
                />
                <label className="form-check-label text-white-75" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              
              <button
                type="submit"
                className="btn btn-light w-100 py-2 fw-bold mb-3"
                disabled={isLoading}
                style={{ borderRadius: "0.5rem" }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="text-center">
              <a href="#" className="text-white-50 text-decoration-none small">
                Forgot your password?
              </a>
            </div>
            
            <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
            
            <div className="text-center">
              <p className="text-white-75 mb-3">Or continue with</p>
              <button
                type="button"
                className="btn btn-outline-light w-100 py-2 fw-medium mb-2"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "0.5rem"
                }}
                disabled={isLoading}
              >
                <svg width="20" height="20" className="me-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-white-75 mb-0">
                Don't have an account?{" "}
                <a href="#" className="text-white fw-medium text-decoration-none">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 