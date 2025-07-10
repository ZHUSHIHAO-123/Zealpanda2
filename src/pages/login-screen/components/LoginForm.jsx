import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLoadingChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'panda@chinese.com',
    password: 'panda123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Please enter your email address 📧';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address 🤔';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter your password 🔐';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters 💪';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onLoadingChange(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check credentials
    if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
      // Store user session with consistent key
      const userData = {
        email: formData.email,
        loginTime: new Date().toISOString(),
        rememberMe: formData.rememberMe
      };
      
      // Use consistent key for session storage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Store user-specific pet data
      const userKey = formData.email;
      localStorage.setItem(`pandaPetLevel_${userKey}`, '1');
      localStorage.setItem(`pandaPetMood_${userKey}`, 'happy');
      
      // Navigate to main chat interface
      navigate('/main-chat-interface');
    } else {
      setErrors({
        general: `Oops! Wrong email or password. Try: ${mockCredentials.email} / ${mockCredentials.password} 🐼`
      });
    }
    
    onLoadingChange(false);
  };

  const handleRegisterClick = () => {
    navigate('/registration-screen');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors.general && (
          <div className="p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-error">
                {errors.general}
              </p>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-body font-body-semibold text-text-primary text-sm">
            Email Address 📧
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full h-12 text-base ${errors.email ? 'border-error' : ''}`}
            required
          />
          {errors.email && (
            <p className="font-caption text-xs text-error flex items-center space-x-1">
              <Icon name="AlertTriangle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="block font-body font-body-semibold text-text-primary text-sm">
            Password 🔐
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full h-12 text-base pr-12 ${errors.password ? 'border-error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-gentle"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="font-caption text-xs text-error flex items-center space-x-1">
              <Icon name="AlertTriangle" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-3">
          <Input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-5 h-5"
          />
          <label htmlFor="rememberMe" className="font-body text-sm text-text-primary cursor-pointer">
            Remember me for next time 🐼
          </label>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          className="h-12 font-body-semibold"
        >
          Login & Start Learning! 🚀
        </Button>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="font-body text-sm text-text-secondary mb-3">
            New to PandaChinese? 🌟
          </p>
          <Button
            type="button"
            variant="outline"
            size="md"
            fullWidth
            onClick={handleRegisterClick}
            iconName="UserPlus"
            iconPosition="left"
          >
            Create New Account
          </Button>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-6 p-3 bg-accent bg-opacity-10 rounded-child-friendly border border-accent border-opacity-30">
          <p className="font-caption text-xs text-text-secondary text-center">
            <Icon name="Info" size={14} className="inline mr-1" />
            Demo: Use {mockCredentials.email} / {mockCredentials.password}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;