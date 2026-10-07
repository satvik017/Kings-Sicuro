/**
 * KINGS SICURO SOLUTIONS (KSS) - JAVASCRIPT LOGIC
 * "Protecting People. Securing Trust."
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const WHATSAPP_NUMBER = '919876543210'; // Replace with company's actual WhatsApp number
  const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=`;

  /* ==========================================================================
     1. HERO PORTAL TABS (BUYER VS SELLER)
     ========================================================================== */
  const portalTabBtns = document.querySelectorAll('.portal-tab-btn');
  const portalPanes = document.querySelectorAll('.portal-pane');

  portalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      portalTabBtns.forEach(b => b.classList.remove('active'));
      portalPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     2. GUARD REQUIREMENT & COST ESTIMATOR CALCULATOR
     ========================================================================== */
  const calcIndustry = document.getElementById('calc-industry');
  const calcGuardType = document.getElementById('calc-guard-type');
  const calcShift = document.getElementById('calc-shift');
  const calcCount = document.getElementById('calc-count');
  const calcCountVal = document.getElementById('calc-count-val');

  const calcTotalPrice = document.getElementById('calc-total-price');
  const calcPerGuard = document.getElementById('calc-per-guard');
  const calcBreakupIndustry = document.getElementById('calc-breakup-industry');
  const calcBreakupShift = document.getElementById('calc-breakup-shift');
  const calcBreakupGuards = document.getElementById('calc-breakup-guards');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  // Base monthly cost per guard type (INR)
  const guardTypeRates = {
    'unarmed': { name: 'Verified Unarmed Guard', rate: 16500 },
    'armed': { name: 'Licensed Armed Gunman', rate: 26500 },
    'female': { name: 'Female Security Guard', rate: 18000 },
    'supervisor': { name: 'Security Supervisor', rate: 22000 },
    'bouncer': { name: 'Executive Bouncer / Escort', rate: 28000 }
  };

  const industryMultipliers = {
    'society': { name: 'Gated Housing Society', mult: 1.0 },
    'corporate': { name: 'Corporate Office / Tech Park', mult: 1.08 },
    'factory': { name: 'Factory / Industrial Plant', mult: 1.05 },
    'bank': { name: 'Bank / Financial Vault', mult: 1.15 },
    'warehouse': { name: 'Warehouse / Logistics Hub', mult: 1.02 },
    'event': { name: 'Event / VIP Protection', mult: 1.25 }
  };

  const shiftMultipliers = {
    '8hrs': { name: '8 Hours (Single Shift)', mult: 1.0 },
    '12hrs': { name: '12 Hours (Day/Night Shift)', mult: 1.35 },
    '24hrs': { name: '24/7 Coverage (Rotating Shifts)', mult: 2.15 }
  };

  function updateCalculator() {
    if (!calcIndustry || !calcGuardType || !calcShift || !calcCount) return;

    const count = parseInt(calcCount.value, 10);
    calcCountVal.textContent = count;

    const industryData = industryMultipliers[calcIndustry.value] || industryMultipliers['society'];
    const guardData = guardTypeRates[calcGuardType.value] || guardTypeRates['unarmed'];
    const shiftData = shiftMultipliers[calcShift.value] || shiftMultipliers['12hrs'];

    // Calculation formula
    const perGuardMonthly = Math.round(guardData.rate * industryData.mult * shiftData.mult);
    const totalMonthly = perGuardMonthly * count;

    // Update UI elements
    if (calcTotalPrice) {
      calcTotalPrice.innerHTML = `₹${totalMonthly.toLocaleString('en-IN')} <span>/ month est.</span>`;
    }
    if (calcPerGuard) {
      calcPerGuard.textContent = `₹${perGuardMonthly.toLocaleString('en-IN')}`;
    }
    if (calcBreakupIndustry) {
      calcBreakupIndustry.textContent = industryData.name;
    }
    if (calcBreakupShift) {
      calcBreakupShift.textContent = shiftData.name;
    }
    if (calcBreakupGuards) {
      calcBreakupGuards.textContent = `${count} x ${guardData.name}`;
    }

    // Build custom WhatsApp Inquiry message
    if (calcWhatsappBtn) {
      const message = `Hello Kings Sicuro Solutions!%0A%0A*QUOTATION REQUEST VIA WEBSITE*%0A--------------------------------%0A• *Client Industry:* ${encodeURIComponent(industryData.name)}%0A• *Security Type:* ${encodeURIComponent(guardData.name)}%0A• *Required Headcount:* ${count} Guard(s)%0A• *Shift Requirement:* ${encodeURIComponent(shiftData.name)}%0A• *Estimated Budget:* Approx ₹${totalMonthly.toLocaleString('en-IN')}/month%0A%0APlease provide an official commercial quotation and deployment timeline.`;
      calcWhatsappBtn.href = `${WHATSAPP_BASE_URL}${message}`;
    }
  }

  // Attach calculator listeners
  if (calcIndustry && calcGuardType && calcShift && calcCount) {
    calcIndustry.addEventListener('change', updateCalculator);
    calcGuardType.addEventListener('change', updateCalculator);
    calcShift.addEventListener('change', updateCalculator);
    calcCount.addEventListener('input', updateCalculator);
    updateCalculator(); // Initial calculation
  }

  /* ==========================================================================
     3. FLOATING WHATSAPP CHAT POPUP
     ========================================================================== */
  const waTriggerBtn = document.getElementById('wa-trigger-btn');
  const waChatPopup = document.getElementById('wa-chat-popup');
  const waCloseBtn = document.getElementById('wa-close-btn');
  const waCustomInput = document.getElementById('wa-custom-input');
  const waSendCustomBtn = document.getElementById('wa-send-custom-btn');

  if (waTriggerBtn && waChatPopup) {
    waTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waChatPopup.classList.toggle('open');
    });

    if (waCloseBtn) {
      waCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waChatPopup.classList.remove('open');
      });
    }

    // Send custom message typed in popup
    if (waSendCustomBtn && waCustomInput) {
      waSendCustomBtn.addEventListener('click', () => {
        const text = waCustomInput.value.trim();
        if (text) {
          const waUrl = `${WHATSAPP_BASE_URL}${encodeURIComponent(text)}`;
          window.open(waUrl, '_blank');
          waCustomInput.value = '';
          waChatPopup.classList.remove('open');
        }
      });

      waCustomInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          waSendCustomBtn.click();
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!waChatPopup.contains(e.target) && !waTriggerBtn.contains(e.target)) {
        waChatPopup.classList.remove('open');
      }
    });
  }

  /* ==========================================================================
     4. MODAL MANAGEMENT (HIRE GUARDS & APPLY FOR JOB)
     ========================================================================== */
  const hireModal = document.getElementById('hire-modal');
  const applyModal = document.getElementById('apply-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  // Open Hire Modal
  document.querySelectorAll('.open-hire-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (hireModal) {
        hireModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open Apply Modal
  document.querySelectorAll('.open-apply-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (applyModal) {
        applyModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modals
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (hireModal) hireModal.classList.remove('open');
      if (applyModal) applyModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking overlay
  [hireModal, applyModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = 'auto';
        }
      });
    }
  });

  /* ==========================================================================
     5. FORM SUBMISSION HANDLERS WITH WHATSAPP DISPATCH
     ========================================================================== */
  const hireForm = document.getElementById('hire-guard-form');
  const heroHireForm = document.getElementById('hero-hire-form');
  const applyForm = document.getElementById('apply-guard-form');
  const heroApplyForm = document.getElementById('hero-apply-form');

  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.52 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Handle Organization / Buyer Inquiries
  function handleHireSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="client_name"]')?.value || 'Client';
    const org = form.querySelector('[name="org_name"]')?.value || 'Organization';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const guards = form.querySelector('[name="guard_count"]')?.value || 'Multiple';
    const type = form.querySelector('[name="guard_type"]')?.value || 'Security Guards';
    const city = form.querySelector('[name="city"]')?.value || 'Delhi NCR';

    const message = `*NEW GUARD HIRE INQUIRY - KSS*%0A--------------------------------%0A• *Contact Person:* ${encodeURIComponent(name)}%0A• *Company/Society:* ${encodeURIComponent(org)}%0A• *Phone:* ${encodeURIComponent(phone)}%0A• *City/Location:* ${encodeURIComponent(city)}%0A• *Service Required:* ${encodeURIComponent(type)}%0A• *Required Headcount:* ${encodeURIComponent(guards)}%0A%0AWe require security guard deployment. Please contact us with proposal.`;

    showToast('Inquiry received! Redirecting to WhatsApp for instant confirmation...');
    setTimeout(() => {
      window.open(`${WHATSAPP_BASE_URL}${message}`, '_blank');
      form.reset();
      if (hireModal) hireModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }, 1000);
  }

  // Handle Security Guard Job Seekers
  function handleApplySubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="candidate_name"]')?.value || 'Applicant';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const exp = form.querySelector('[name="experience"]')?.value || 'Fresher';
    const role = form.querySelector('[name="role_pref"]')?.value || 'Security Guard';
    const city = form.querySelector('[name="city"]')?.value || '';

    const message = `*NEW JOB APPLICATION - KSS SECURITY GUARD*%0A--------------------------------%0A• *Applicant Name:* ${encodeURIComponent(name)}%0A• *Phone Number:* ${encodeURIComponent(phone)}%0A• *City/Current Location:* ${encodeURIComponent(city)}%0A• *Experience:* ${encodeURIComponent(exp)}%0A• *Position Applied:* ${encodeURIComponent(role)}%0A%0AI want to join Kings Sicuro Solutions as a Security Guard. Please let me know the interview and joining process.`;

    showToast('Application submitted! Opening WhatsApp for HR interview scheduling...');
    setTimeout(() => {
      window.open(`${WHATSAPP_BASE_URL}${message}`, '_blank');
      form.reset();
      if (applyModal) applyModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }, 1000);
  }

  if (hireForm) hireForm.addEventListener('submit', handleHireSubmit);
  if (heroHireForm) heroHireForm.addEventListener('submit', handleHireSubmit);
  if (applyForm) applyForm.addEventListener('submit', handleApplySubmit);
  if (heroApplyForm) heroApplyForm.addEventListener('submit', handleApplySubmit);

  /* ==========================================================================
     6. FAQ ACCORDION & FILTER
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // FAQ Category switch (Buyer vs Guard FAQs)
  const faqTabBtns = document.querySelectorAll('.faq-tab-btn');
  faqTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      faqTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. MOBILE HAMBURGER MENU
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const hamburgerSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
    const closeSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;

    const closeNav = () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = hamburgerSvg;
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    });

    // Close menu when clicking link or action button
    navMenu.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        closeNav();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeNav();
      }
    });
  }
});
