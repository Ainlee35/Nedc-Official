

  // Navbar color change on scroll
  window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
document.querySelectorAll('.color-hover').forEach(el => {
  el.addEventListener('mousemove', e => {
    let rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

    // Navbar scroll effect
    window.addEventListener("scroll", function() {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

document.querySelectorAll('.color-hover').forEach(el => {
  el.addEventListener('mousemove', e => {
    let rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});
document.querySelectorAll('.color-hover').forEach(el => {
  el.addEventListener('mousemove', e => {
    let rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-section, .stat-card').forEach(el => observer.observe(el));

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // smaller = faster

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const updateCount = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if(count < target){
              counter.innerText = count + increment;
              setTimeout(() => updateCount(counter), 20);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          updateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(c => counterObserver.observe(c));

  // Force preloader for 10 seconds
  window.addEventListener("load", function() {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 10000); // 10000ms = 10 seconds
  });



