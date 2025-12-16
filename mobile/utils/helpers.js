import { DONATION_ELIGIBILITY_MONTHS } from './constants';

export const checkDonationEligibility = (lastDonationDate) => {
  if (!lastDonationDate) {
    return {
      eligible: true,
      message: 'You are eligible to donate!',
      daysUntilEligible: 0,
    };
  }

  const lastDonation = new Date(lastDonationDate);
  const today = new Date();
  const eligibilityDate = new Date(lastDonation);
  eligibilityDate.setMonth(eligibilityDate.getMonth() + DONATION_ELIGIBILITY_MONTHS);

  const isEligible = today >= eligibilityDate;
  const daysUntilEligible = Math.ceil(
    (eligibilityDate - today) / (1000 * 60 * 60 * 24)
  );

  if (isEligible) {
    return {
      eligible: true,
      message: 'You are eligible to donate!',
      daysUntilEligible: 0,
    };
  }

  return {
    eligible: false,
    message: `Next eligible: ${eligibilityDate.toLocaleDateString()}`,
    daysUntilEligible,
  };
};

export const formatDate = (date, format = 'long') => {
  const dateObj = new Date(date);

  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if (format === 'medium') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  }

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date, 'short')} at ${formatTime(date)}`;
};

export const calculateLivesSaved = (donationCount) => {
  return donationCount * 3;
};

export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
