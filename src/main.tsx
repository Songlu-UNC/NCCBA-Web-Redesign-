import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Globe2,
  Handshake,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import './styles.css';

const frontPage = '/Img/Front page/';
const team = '/Img/Executive Team/';
const board = '/Img/Board of Directors/';
const sponsor = '/Img/Sponsor/Current Sponsor/';

const navItems = [
  ['About Us', '#about'],
  ['Events', '#events'],
  ['Opportunities', '#opportunities'],
  ['Membership', '#membership'],
  ['Sponsors', '#sponsors'],
  ['My Account', '#account'],
  ['Contact Us', '#contact'],
];

const events = [
  {
    date: 'Jan 21, 2026',
    title: 'NCCBA New Year Celebration',
    image: `${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0298.webp`,
    description:
      'A signature annual gathering for members, sponsors, civic partners, and business leaders.',
  },
  {
    date: '2025',
    title: 'Guangzhou Consulate Speaker Forum',
    image: `${frontPage}Guangzhou2025_Consulate_Speakers.webp`,
    description:
      'Cross-border conversation with economic development and consular leadership.',
  },
  {
    date: '2025',
    title: 'Shanghai Host Speaker Exchange',
    image: `${frontPage}Host_Speaker2_Shanghai2025.webp`,
    description:
      'A business exchange format designed for practical introductions and market insight.',
  },
];

const gallery = [
  `${frontPage}FriendshipCity_WelcomeCeremony.webp`,
  `${frontPage}Gift2Governor.webp`,
  `${frontPage}2025-New-year-celebration.webp`,
  `${frontPage}2024-11-19_NCCBA-20th-Anniversary-Celebration_0715.webp`,
];

const people = [
  { name: 'Gloria', role: 'Executive Team', image: `${team}Gloria-1.webp` },
  { name: 'Jiarui', role: 'Executive Team', image: `${team}Jiarui.webp` },
  { name: 'Helen', role: 'Executive Team', image: `${team}Helen.webp` },
  { name: 'Fiona', role: 'Executive Team', image: `${team}Fiona-3.webp` },
  { name: 'Eva', role: 'Board of Directors', image: `${board}headshot-9-12-24-Eva.webp` },
  { name: 'Daniel Cheng', role: 'Board of Directors', image: `${board}DanielCheng-2.webp` },
  { name: 'Jeff Wang', role: 'Board of Directors', image: `${board}Jeff-Wang.webp` },
];

const sponsors = [
  {
    tier: 'Platinum',
    logos: [`${sponsor}Platinum Sponsor/goldenhomekitchens_logo-3.webp`],
  },
  {
    tier: 'Gold',
    logos: [`${sponsor}Gold Sponsor/rimonLaw.webp`, `${sponsor}Gold Sponsor/northStateBank.webp`],
  },
  {
    tier: 'Silver',
    logos: [
      `${sponsor}Silver Sponsor/Wyrick-1.webp`,
      `${sponsor}Silver Sponsor/barnes-thornburg.webp`,
      `${sponsor}Silver Sponsor/arco.webp`,
    ],
  },
  {
    tier: 'Bronze',
    logos: [
      `${sponsor}Bronze Sponsor/TransGlobal.webp`,
      `${sponsor}Bronze Sponsor/Fiona.webp`,
      `${sponsor}Bronze Sponsor/careerMister-1.webp`,
    ],
  },
];

function App() {
  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="NCCBA home">
          <img src={`${frontPage}nccba_latest_logo.webp`} alt="NCCBA" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
            <Search size={18} />
          </button>
          <a className="join-button" href="#membership">
            Join
          </a>
          <button className="icon-button mobile-only" aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <img
            className="hero-media"
            src={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0635.webp`}
            alt="NCCBA members gathered at a business celebration"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">North Carolina Chinese Business Association</p>
            <h1>Connecting business leaders across North Carolina and China.</h1>
            <p className="hero-copy">
              A modern home for NCCBA programs, member services, sponsorships, and cross-cultural
              business events.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#events">
                View Events <ArrowRight size={18} />
              </a>
              <a className="secondary-link" href="#about">
                Learn About NCCBA
              </a>
            </div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            <ChevronDown size={24} />
          </a>
        </section>

        <section className="quick-stats" aria-label="Association highlights">
          <div>
            <strong>20+</strong>
            <span>Years of community building</span>
          </div>
          <div>
            <strong>NC-China</strong>
            <span>Business and cultural bridge</span>
          </div>
          <div>
            <strong>Members</strong>
            <span>Professionals, companies, and partners</span>
          </div>
        </section>

        <section className="section split-section" id="about">
          <div className="section-copy">
            <p className="eyebrow">About Us</p>
            <h2>Built for business, diplomacy, and community.</h2>
            <p>
              NCCBA supports businesses, professionals, and organizations interested in commercial,
              cultural, and civic connections between North Carolina and China.
            </p>
            <div className="feature-list">
              <span>
                <Globe2 size={18} /> International business exchange
              </span>
              <span>
                <Handshake size={18} /> Partner and sponsor introductions
              </span>
              <span>
                <Users size={18} /> Member-centered programming
              </span>
            </div>
          </div>
          <div className="image-collage" aria-label="NCCBA event photos">
            {gallery.map((src, index) => (
              <img key={src} src={src} alt={`NCCBA event moment ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="section events-section" id="events">
          <div className="section-heading">
            <p className="eyebrow">Events</p>
            <h2>Programs that make introductions feel natural.</h2>
          </div>
          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <img src={event.image} alt="" />
                <div>
                  <p className="event-date">
                    <CalendarDays size={16} /> {event.date}
                  </p>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section opportunities" id="opportunities">
          <div>
            <p className="eyebrow">Opportunities</p>
            <h2>Clear pathways for involvement.</h2>
          </div>
          <div className="opportunity-grid">
            <article>
              <Building2 size={24} />
              <h3>Business Delegations</h3>
              <p>Host or join professional exchanges with industry, civic, and investment partners.</p>
            </article>
            <article>
              <Sparkles size={24} />
              <h3>Featured Programs</h3>
              <p>Promote workshops, panels, cultural celebrations, and sector-specific events.</p>
            </article>
            <article>
              <Handshake size={24} />
              <h3>Partner Introductions</h3>
              <p>Create warm connections between members, sponsors, and strategic collaborators.</p>
            </article>
          </div>
        </section>

        <section className="section membership" id="membership">
          <div className="membership-panel">
            <p className="eyebrow">Membership</p>
            <h2>Member access without WordPress friction.</h2>
            <p>
              This prototype keeps the member journey visible: join, renew, view events, and access
              member-only resources from a cleaner React interface.
            </p>
            <a className="primary-link" href="#account">
              Preview Account Area <ArrowRight size={18} />
            </a>
          </div>
          <div className="membership-benefits">
            <span>Event registration</span>
            <span>Member directory concept</span>
            <span>Sponsor visibility</span>
            <span>Announcements</span>
          </div>
        </section>

        <section className="section team-section">
          <div className="section-heading">
            <p className="eyebrow">Leadership</p>
            <h2>Executive team and board presence.</h2>
          </div>
          <div className="people-strip">
            {people.map((person) => (
              <article className="person-card" key={person.name}>
                <img src={person.image} alt={person.name} />
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section sponsors-section" id="sponsors">
          <div className="section-heading">
            <p className="eyebrow">Sponsors</p>
            <h2>Recognition designed for real partner visibility.</h2>
          </div>
          <div className="sponsor-tiers">
            {sponsors.map((tier) => (
              <article key={tier.tier} className="sponsor-tier">
                <h3>{tier.tier}</h3>
                <div className="logo-grid">
                  {tier.logos.map((logo) => (
                    <img key={logo} src={logo} alt={`${tier.tier} sponsor`} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section account-contact">
          <div className="account-panel" id="account">
            <LockKeyhole size={28} />
            <p className="eyebrow">My Account</p>
            <h2>Member dashboard concept</h2>
            <form>
              <label>
                Email
                <input type="email" placeholder="member@example.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="Password" />
              </label>
              <button type="button">Sign In</button>
            </form>
          </div>
          <div className="contact-panel" id="contact">
            <p className="eyebrow">Contact Us</p>
            <h2>Start a conversation.</h2>
            <p>
              Keep contact, sponsorship, and event inquiries easy to route from one focused area.
            </p>
            <address>
              <span>
                <Mail size={18} /> info@nc-cba.com
              </span>
              <span>
                <MapPin size={18} /> North Carolina
              </span>
            </address>
          </div>
        </section>
      </main>

      <footer>
        <img src={`${frontPage}nccba_latest_logo.webp`} alt="NCCBA" />
        <p>North Carolina Chinese Business Association</p>
        <div>
          {navItems.slice(0, 5).map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
