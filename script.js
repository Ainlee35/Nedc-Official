
(async function(){
  try {
    const res = await fetch('data.json');
    if(!res.ok) throw new Error('Could not load data.json');
    const data = await res.json();

    const app = document.getElementById('app');

    // NAV
    const nav = document.createElement('nav');
    nav.className = 'top-nav';
    nav.innerHTML = `
      <div class="brand">
        <img src="${data.site.logo}" alt="NEDC logo" onerror="this.style.display='none'"/>
        <div>
          <div style="font-weight:800">${data.site.title}</div>
          <div style="font-size:12px;opacity:.9">${data.site.tagline}</div>
        </div>
      </div>
      <div class="links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#leadership">Leadership</a>
        <a href="#programs">Programs</a>
        <a href="#contact">Contact</a>
      </div>
    `;
    app.appendChild(nav);

    // HERO
    const hero = document.createElement('header');
    hero.className = 'hero';
    hero.id = 'home';
    hero.innerHTML = `
      <div class="parallelogram"><img src="${data.header.image}" alt="NEDC"></div>
      <div class="hero-text">
        <h1>${data.header.title}</h1>
        <p class="lead">${data.header.subtitle}</p>
        <p style="opacity:.95"><strong>Source:</strong> ${data.header.source}</p>
      </div>
    `;
    app.appendChild(hero);

    // MAIN container
    const main = document.createElement('main');
    main.className = 'container';

    // ABOUT
    const about = document.createElement('section');
    about.className = 'section';
    about.id = 'about';
    about.innerHTML = `
      <h2>About NEDC</h2>
      <p><strong>Vision:</strong> ${data.about.vision}</p>
      <p><strong>Mission:</strong> ${data.about.mission}</p>
      <p><strong>Core values:</strong> ${data.about.coreValues.join(' • ')}</p>
      <p class="small" style="margin-top:10px; color:#667f89">Source: ${data.about.source}</p>
    `;
    main.appendChild(about);

    // LEADERSHIP
    const leadership = document.createElement('section');
    leadership.className = 'section';
    leadership.id = 'leadership';
    leadership.innerHTML = `<h2>Leadership</h2>`;
    const leaderGrid = document.createElement('div'); leaderGrid.className = 'grid';
    data.leadership.forEach(l => {
      const card = document.createElement('div'); card.className = 'card';
      card.innerHTML = `
        <img src="${l.img}" alt="${l.name}" onerror="this.src='images/placeholder-person.png'"/>
        <h3>${l.name}</h3>
        <p class="role">${l.title}</p>
        <p style="color:#4b5962;margin-top:10px">${l.bio}</p>
        <p style="font-size:12px;color:#92aeb8;margin-top:10px">${l.source}</p>
      `;
      leaderGrid.appendChild(card);
    });
    leadership.appendChild(leaderGrid);
    main.appendChild(leadership);

    // PROGRAMS
    const programs = document.createElement('section');
    programs.className = 'section';
    programs.id = 'programs';
    programs.innerHTML = `<h2>Flagship Programs</h2>`;
    const progGrid = document.createElement('div'); progGrid.className='grid';
    data.programs.forEach(p => {
      const el = document.createElement('div'); el.className='card';
      el.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:12px">
          <div style="width:46px;height:46px;border-radius:10px;background:#0b2b3a;color:white;display:grid;place-items:center;font-weight:800">${p.id}</div>
          <div>
            <h3 style="margin:0 0 6px">${p.title}</h3>
            <p style="margin:0;color:#546a72">${p.summary}</p>
            <p style="font-size:12px;color:#96b8c3;margin-top:8px">${p.source}</p>
          </div>
        </div>
      `;
      progGrid.appendChild(el);
    });
    programs.appendChild(progGrid);
    main.appendChild(programs);

    // CALL TO ACTION / IMPACT SUMMARY
    const impact = document.createElement('section');
    impact.className = 'section';
    impact.innerHTML = `
      <h2>The Next Tanzania — Our 3-Year Outcomes (Summary)</h2>
      <p>Targets include: 50,000 quality jobs enabled; 10,000 MSMEs formalized; TZS 120B mobilized in finance; 30,000 entrepreneurs trained; 100,000 app users by 2028. Source: NEDC Company Profile.</p>
    `;
    main.appendChild(impact);

    // FOOTER
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.id = 'contact';
    footer.innerHTML = `
      <div class="row">
        <div class="col">
          <h3 style="color:#cde9ff;margin:0 0 10px">Contact</h3>
          <p class="small">${data.contact.headquarters}</p>
          <p style="margin:6px 0"><strong>Email:</strong> <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
          <p style="margin:6px 0"><strong>Website:</strong> <a href="${data.contact.website}" target="_blank" rel="noopener">${data.contact.website}</a></p>
          <p style="margin:6px 0"><strong>Membership Portal:</strong> <a href="${data.contact.portal}" target="_blank" rel="noopener">${data.contact.portal}</a></p>
          <p style="font-size:12px;color:#8fb9c8;margin-top:8px">${data.contact.source}</p>
        </div>
        <div class="col" style="max-width:420px">
          <h3 style="color:#cde9ff;margin:0 0 10px">Quick Links</h3>
          <p><a href="#about">About</a> • <a href="#leadership">Leadership</a> • <a href="#programs">Programs</a></p>
          <h3 style="color:#cde9ff;margin:18px 0 6px">Subscribe for updates</h3>
          <form id="subscribeForm">
            <input type="email" id="subEmail" placeholder="Your email" style="padding:10px;width:70%;border-radius:6px;border:1px solid rgba(255,255,255,0.06)" required />
            <button type="submit" style="padding:10px 12px;margin-left:8px;border-radius:6px;border:none;background:#ffd07a;color:#06222b;font-weight:700;cursor:pointer">Subscribe</button>
          </form>
          <p id="subMsg" style="margin-top:10px;font-size:13px;color:#9fcbdc"></p>
        </div>
      </div>
    `;

    // assemble
    app.appendChild(main);
    app.appendChild(footer);

    // subscription form behaviour (local only)
    const form = document.getElementById('subscribeForm');
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('subEmail').value;
      document.getElementById('subMsg').textContent = `Thanks — ${email} has been recorded (demo).`;
      form.reset();
    });

    // small smooth scroll for in-page nav
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if(el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      });
    });

  } catch (err) {
    console.error(err);
    document.body.innerHTML = `<div style="padding:40px;font-family:system-ui;color:#333"><h2>Error loading site</h2><pre>${err.message}</pre></div>`;
  }
})();
