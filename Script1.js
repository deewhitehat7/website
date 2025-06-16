document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.main-nav .container')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navLinks.style.display = 'none';
      }
    });
  }
  
  // Donation amount selection
  const amountBtns = document.querySelectorAll('.amount-btn');
  const donationAmount = document.querySelector('input[name="donation_amount"]');
  const customAmount = document.querySelector('.custom-amount');
  
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      amountBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      donationAmount.value = this.dataset.amount;
      customAmount.value = '';
    });
  });
  
  // Custom amount handling
  customAmount.addEventListener('input', function() {
    if (this.value) {
      amountBtns.forEach(b => b.classList.remove('active'));
      donationAmount.value = this.value;
    }
  });
  
  // Donation frequency
  const frequencyBtns = document.querySelectorAll('.frequency-btn');
  const donationFrequency = document.querySelector('input[name="donation_frequency"]');
  
  frequencyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      frequencyBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      donationFrequency.value = this.dataset.frequency;
    });
  });
  
  // Payment method selection
  const paymentOptions = document.querySelectorAll('.payment-option');
  const paymentMethod = document.querySelector('input[name="payment_method"]');
  const paymentDetails = document.querySelectorAll('.payment-details');
  
  paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
      paymentOptions.forEach(o => o.classList.remove('active'));
      this.classList.add('active');
      paymentMethod.value = this.dataset.method;
      
      // Show corresponding payment details
      paymentDetails.forEach(detail => {
        detail.style.display = 'none';
      });
      document.getElementById(${this.dataset.method}-details).style.display = 'block';
    });
  });
  
  // Form submission
  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!document.getElementById('terms').checked) {
        alert('Please agree to the Terms and Privacy Policy');
        return;
      }
      
      // Process donation (in a real app, this would connect to payment processor)
      const amount = donationAmount.value || customAmount.value;
      const frequency = donationFrequency.value;
      const method = paymentMethod.value;
      
      console.log(Processing $${amount} ${frequency} donation via ${method});
      
      // Track donation
      trackDonation(amount);
      
      // Submit form (in real app, this would be AJAX or natural form submission)
      this.submit();
    });
  }
  
  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCount = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(counter);
        current = target;
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };
  
  // Only animate when stat is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
  
  // Track donation conversion
  function trackDonation(amount) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-123456789/AbCdEfGhIjKl',
        'value': amount,
        'currency': 'USD'
      });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Donate', { value: amount, currency: 'USD' });
    }
  }
  
  // Accessibility enhancements
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on ESC
    if (e.key === 'Escape' && navLinks.style.display === 'flex') {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      navLinks.style.display = 'none';
      mobileMenuBtn.focus();
    }
  });
  
  // Focus styles for keyboard navigation
  document.addEventListener('keyup', function(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.documentElement.classList.remove('keyboard-nav');
  });
});