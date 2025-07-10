import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    childName: '',
    ageRange: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [parentalConsent, setParentalConsent] = useState(false);

  const ageRanges = [
    { value: '5-7', label: '5-7 years old' },
    { value: '8-10', label: '8-10 years old' },
    { value: '11-12', label: '11-12 years old' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required 📧';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address 🤔';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required 🔒';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long 🐼';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password 🔐';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match 😅';
    }

    // Child name validation
    if (!formData.childName) {
      newErrors.childName = 'Child\'s name is required 👶';
    } else if (formData.childName.length < 2) {
      newErrors.childName = 'Name must be at least 2 characters long 📝';
    }

    // Age range validation
    if (!formData.ageRange) {
      newErrors.ageRange = 'Please select an age range 🎂';
    }

    // Parental consent validation
    if (!parentalConsent) {
      newErrors.parentalConsent = 'Parental consent is required 👨‍👩‍👧‍👦';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration success
      const userData = {
        email: formData.email,
        childName: formData.childName,
        ageRange: formData.ageRange,
        registrationDate: new Date().toISOString()
      };

      // Store user data in localStorage
      localStorage.setItem('pandaChineseUser', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('pandaPetLevel', '1');
      localStorage.setItem('pandaPetMood', 'excited');

      onRegistrationSuccess();
      
      // Navigate to main chat interface after successful registration
      setTimeout(() => {
        navigate('/main-chat-interface');
      }, 1500);

    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again! 🐼💔' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block font-body font-body-medium text-text-primary mb-2">
          Parent's Email Address 📧
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="parent@example.com"
          className={`w-full ${errors.email ? 'border-error' : ''}`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error font-caption">{errors.email}</p>
        )}
      </div>

      {/* Child's Name Field */}
      <div>
        <label htmlFor="childName" className="block font-body font-body-medium text-text-primary mb-2">
          Child's Name 👶
        </label>
        <Input
          type="text"
          id="childName"
          name="childName"
          value={formData.childName}
          onChange={handleInputChange}
          placeholder="What should the panda call you?"
          className={`w-full ${errors.childName ? 'border-error' : ''}`}
          disabled={isLoading}
        />
        {errors.childName && (
          <p className="mt-1 text-sm text-error font-caption">{errors.childName}</p>
        )}
      </div>

      {/* Age Range Field */}
      <div>
        <label htmlFor="ageRange" className="block font-body font-body-medium text-text-primary mb-2">
          Age Range 🎂
        </label>
        <select
          id="ageRange"
          name="ageRange"
          value={formData.ageRange}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-child-friendly border bg-background text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-gentle ${
            errors.ageRange ? 'border-error' : 'border-border'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <option value="">Select your child's age</option>
          {ageRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        {errors.ageRange && (
          <p className="mt-1 text-sm text-error font-caption">{errors.ageRange}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block font-body font-body-medium text-text-primary mb-2">
          Create Password 🔒
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="At least 6 characters"
            className={`w-full pr-12 ${errors.password ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-gentle"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error font-caption">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary font-caption">
          Make it strong but easy to remember! 💪
        </p>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block font-body font-body-medium text-text-primary mb-2">
          Confirm Password 🔐
        </label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Type your password again"
            className={`w-full pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-gentle"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error font-caption">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Parental Consent Checkbox */}
      <div className="flex items-start space-x-3">
        <Input
          type="checkbox"
          id="parentalConsent"
          checked={parentalConsent}
          onChange={(e) => setParentalConsent(e.target.checked)}
          className="mt-1"
          disabled={isLoading}
        />
        <label htmlFor="parentalConsent" className="flex-1 text-sm text-text-primary font-caption">
          I am the parent/guardian and consent to my child using PandaChinese. I understand this is an educational app designed for children's Chinese language learning. 👨‍👩‍👧‍👦
        </label>
      </div>
      {errors.parentalConsent && (
        <p className="text-sm text-error font-caption">{errors.parentalConsent}</p>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly">
          <p className="text-sm text-error font-caption">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-8"
      >
        {isLoading ? 'Creating Your Account...' : 'Create Account 🎉'}
      </Button>

      {/* Back to Login Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/login-screen')}
          className="font-body font-body-medium text-primary hover:text-primary-foreground transition-gentle"
          disabled={isLoading}
        >
          Already have an account? Sign in here! 🐼
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;