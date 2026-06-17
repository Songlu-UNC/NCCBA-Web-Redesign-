import React, { useEffect, useMemo, useState } from 'react';
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
  X,
} from 'lucide-react';
import './styles.css';

const frontPage = '/Img/Front page/';
const team = '/Img/Executive Team/';
const board = '/Img/Board of Directors/';
const sponsor = '/Img/Sponsor/Current Sponsor/';

type NavItem = {
  label: string;
  path: string;
  children?: NavItem[];
};

type EventItem = {
  date: string;
  title: string;
  image: string;
  description: string;
};

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about-nccba',
    children: [
      { label: 'About NCCBA', path: '/about-nccba' },
      { label: 'Board Of Directors', path: '/board-of-directors' },
      { label: 'Our Executive Team', path: '/our-executive-team' },
      { label: 'By Laws', path: '/by-laws' },
    ],
  },
  {
    label: 'Events',
    path: '/upcoming-events',
    children: [
      { label: 'Upcoming Events', path: '/upcoming-events' },
      { label: 'Past Event', path: '/past-event' },
    ],
  },
  {
    label: 'Opportunities',
    path: '/volunteer',
    children: [{ label: 'Volunteer', path: '/volunteer' }],
  },
  { label: 'Membership', path: '/membership' },
  {
    label: 'Sponsors',
    path: '/current-sponsors',
    children: [
      { label: 'Become A Sponsor', path: '/become-a-sponsor' },
      { label: 'Current Sponsors', path: '/current-sponsors' },
      { label: 'Previous Sponsors', path: '/previous-sponsors' },
    ],
  },
  { label: 'My Account', path: '/my-account' },
  { label: 'Contact Us', path: '/contact-us' },
];

const events: EventItem[] = [
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

const executiveTeam = [
  { name: 'Gloria', role: 'Executive Team', image: `${team}Gloria-1.webp` },
  { name: 'Jiarui', role: 'Executive Team', image: `${team}Jiarui.webp` },
  { name: 'Helen', role: 'Executive Team', image: `${team}Helen.webp` },
  { name: 'Shujian', role: 'Executive Team', image: `${team}shujian.webp` },
  { name: 'Fiona', role: 'Executive Team', image: `${team}Fiona-3.webp` },
  { name: 'Zhou Yun', role: 'Executive Team', image: `${team}ZhouYun.webp` },
  { name: 'Kelly', role: 'Executive Team', image: `${team}Kelly-1.webp` },
];

const directors = [
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

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (nextPath: string) => {
    if (nextPath === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState(null, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path, navigate };
}

function Link({
  path,
  children,
  className,
  onNavigate,
}: {
  path: string;
  children: React.ReactNode;
  className?: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <a
      href={path}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(path);
      }}
    >
      {children}
    </a>
  );
}

function Header({
  currentPath,
  navigate,
}: {
  currentPath: string;
  navigate: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <header className="site-header">
      <Link path="/" className="brand" onNavigate={handleNavigate}>
        <img src={`${frontPage}nccba_latest_logo.webp`} alt="NCCBA" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active =
            currentPath === item.path || item.children?.some((child) => child.path === currentPath);

          return (
            <div className="nav-group" key={item.label}>
              <Link
                path={item.path}
                className={active ? 'nav-link is-active' : 'nav-link'}
                onNavigate={handleNavigate}
              >
                {item.label}
                {item.children ? <ChevronDown size={15} /> : null}
              </Link>
              {item.children ? (
                <div className="dropdown-menu">
                  {item.children.map((child) => (
                    <Link key={child.path} path={child.path} onNavigate={handleNavigate}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="header-actions">
        <button className="icon-button" aria-label="Search">
          <Search size={18} />
        </button>
        <Link path="/membership" className="join-button" onNavigate={handleNavigate}>
          Join
        </Link>
        <button
          className="icon-button mobile-only"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <div className="mobile-nav-group" key={item.label}>
              <Link path={item.path} onNavigate={handleNavigate}>
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link key={child.path} path={child.path} onNavigate={handleNavigate}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
}) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero-shade" />
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  return (
    <>
      <section className="hero">
        <img
          className="hero-media"
          src={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0635.webp`}
          alt="NCCBA members gathered at a business celebration"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">NCCBA</p>
          <h1>Welcome to NC Chinese Business Association</h1>
          <p className="hero-copy">
            Welcome to NCCBA, a growing community dedicated to supporting businesses,
            professionals, and future leaders through meaningful programs, cultural exchange, and
            local engagement.
          </p>
          <div className="hero-actions">
            <Link path="/about-nccba" className="primary-link" onNavigate={navigate}>
              Learn More <ArrowRight size={18} />
            </Link>
            <Link path="/membership" className="secondary-link" onNavigate={navigate}>
              Join Us
            </Link>
          </div>
        </div>
        <button className="scroll-cue" aria-label="Scroll to content" onClick={() => window.scrollTo({ top: window.innerHeight - 90, behavior: 'smooth' })}>
          <ChevronDown size={24} />
        </button>
      </section>

      <section className="home-gallery" aria-label="NCCBA photo highlights">
        {[
          `${frontPage}Guangzhou2025_Consulate_Speakers.webp`,
          `${frontPage}FriendshipCity_WelcomeCeremony.webp`,
          `${frontPage}Gift2Governor.webp`,
          `${frontPage}2025-New-year-celebration.webp`,
          `${frontPage}NCCBA_EDPNC_2016_Event.webp`,
          `${frontPage}EDPNC_NCCBA_2016-2.webp`,
        ].map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </section>

      <section className="section membership-teaser">
        <div>
          <p className="eyebrow">Membership</p>
          <h2>Explore our membership tiers and find the right level of access.</h2>
        </div>
        <Link path="/membership" className="primary-link" onNavigate={navigate}>
          Join us <ArrowRight size={18} />
        </Link>
      </section>

      <EventList title="Upcoming Events" events={events} />

      <section className="newsletter-band">
        <div>
          <h2>Join 1000+ subscribers</h2>
          <p>Stay in the loop with everything you need to know.</p>
        </div>
        <form>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="button">Sign up</button>
        </form>
      </section>
    </>
  );
}

function AboutNccba() {
  return (
    <>
      <PageHero
        eyebrow="About NCCBA"
        title="A bridge for business, culture, and local engagement."
        copy="NCCBA connects people and organizations interested in North Carolina-China business relationships, professional exchange, and community programs."
        image={`${frontPage}Guangzhou2025_Consulate_Speakers.webp`}
      />
      <section className="section split-section">
        <div className="section-copy">
          <p className="eyebrow">Mission</p>
          <h2>Supporting businesses, professionals, and future leaders.</h2>
          <p>
            The redesigned site keeps the original message but gives it a clearer structure for
            members, sponsors, event visitors, and civic partners.
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
    </>
  );
}

function PeoplePage({
  title,
  eyebrow,
  people,
}: {
  title: string;
  eyebrow: string;
  people: typeof executiveTeam;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        copy="Leadership profiles are presented as a proper page rather than a small homepage strip."
        image={`${frontPage}2024-11-19_NCCBA-20th-Anniversary-Celebration_0715.webp`}
      />
      <section className="section">
        <div className="people-grid">
          {people.map((person) => (
            <article className="person-card large" key={person.name}>
              <img src={person.image} alt={person.name} />
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BylawsPage() {
  return (
    <>
      <PageHero
        eyebrow="By Laws"
        title="Governance information in a cleaner reading layout."
        copy="The original site includes a bylaws page. This prototype reserves that page for governance documents, member policies, and downloadable PDFs."
        image={`${frontPage}NCCBA_EDPNC_2016_Event.webp`}
      />
      <section className="section text-page">
        <p className="eyebrow">Document Area</p>
        <h2>Bylaws and association policies</h2>
        <p>
          This page can host the official bylaws text, PDF downloads, amendment history, and board
          governance notes once the finalized documents are available.
        </p>
      </section>
    </>
  );
}

function EventList({ title, events }: { title: string; events: EventItem[] }) {
  return (
    <section className="section events-section">
      <div className="section-heading">
        <p className="eyebrow">Events</p>
        <h2>{title}</h2>
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
  );
}

function EventsPage({ kind }: { kind: 'upcoming' | 'past' }) {
  const isPast = kind === 'past';

  return (
    <>
      <PageHero
        eyebrow={isPast ? 'Past Event' : 'Upcoming Events'}
        title={isPast ? 'Past programs and community moments.' : 'Upcoming programs and gatherings.'}
        copy={
          isPast
            ? 'A visual archive of NCCBA programs, celebrations, and partner gatherings.'
            : 'A clearer event page format for upcoming programs, registration, and featured details.'
        }
        image={
          isPast
            ? `${frontPage}2025-New-year-celebration.webp`
            : `${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0234.webp`
        }
      />
      <EventList title={isPast ? 'Past Event' : 'Upcoming Events'} events={events} />
    </>
  );
}

function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Help power programs, events, and community outreach."
        copy="The Opportunities menu on the original site leads to Volunteer. This page turns that into a clear call for event, operations, and outreach support."
        image={`${frontPage}FriendshipCity_WelcomeCeremony.webp`}
      />
      <section className="section opportunities">
        <div>
          <p className="eyebrow">Opportunities</p>
          <h2>Clear pathways for involvement.</h2>
        </div>
        <div className="opportunity-grid">
          <article>
            <Building2 size={24} />
            <h3>Event Support</h3>
            <p>Help with guest check-in, venue flow, speaker support, and member hospitality.</p>
          </article>
          <article>
            <Sparkles size={24} />
            <h3>Program Outreach</h3>
            <p>Support announcements, community partnerships, and cultural exchange programs.</p>
          </article>
          <article>
            <Handshake size={24} />
            <h3>Member Connections</h3>
            <p>Welcome new members and help sponsors connect with the right audience.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function MembershipPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Member access without WordPress friction."
        copy="The membership page remains a main destination, now with a clearer pitch and a cleaner account path."
        image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0171.webp`}
      />
      <section className="section membership">
        <div className="membership-panel">
          <p className="eyebrow">Join NCCBA</p>
          <h2>Explore tiers, renew membership, and access member resources.</h2>
          <p>
            This prototype keeps the original join flow visible while preparing the structure for a
            future membership backend.
          </p>
          <Link path="/my-account" className="primary-link" onNavigate={navigate}>
            Preview Account Area <ArrowRight size={18} />
          </Link>
        </div>
        <div className="membership-benefits">
          <span>Event registration</span>
          <span>Member directory concept</span>
          <span>Sponsor visibility</span>
          <span>Announcements</span>
        </div>
      </section>
    </>
  );
}

function SponsorsPage({ page }: { page: 'current' | 'previous' | 'become' }) {
  const isPrevious = page === 'previous';
  const isBecome = page === 'become';

  return (
    <>
      <PageHero
        eyebrow={
          isBecome ? 'Become A Sponsor' : isPrevious ? 'Previous Sponsors' : 'Current Sponsors'
        }
        title={
          isBecome
            ? 'Sponsor visibility for business and civic partners.'
            : isPrevious
              ? 'Recognizing past NCCBA partners.'
              : 'Current sponsors by recognition level.'
        }
        copy={
          isBecome
            ? 'The sponsor journey now has a dedicated page for benefits, visibility, and inquiry conversion.'
            : 'Sponsor recognition is structured by tier so visitors can scan partner support clearly.'
        }
        image={`${frontPage}Gift2Governor.webp`}
      />
      {isBecome ? (
        <section className="section opportunities">
          <div>
            <p className="eyebrow">Sponsor Benefits</p>
            <h2>Visibility, relationships, and event presence.</h2>
          </div>
          <div className="opportunity-grid">
            <article>
              <Sparkles size={24} />
              <h3>Brand Recognition</h3>
              <p>Prominent web and event visibility across NCCBA programming.</p>
            </article>
            <article>
              <Users size={24} />
              <h3>Member Access</h3>
              <p>Meet professionals, business leaders, and community partners.</p>
            </article>
            <article>
              <Mail size={24} />
              <h3>Inquiry Path</h3>
              <p>Route sponsor questions through a focused contact experience.</p>
            </article>
          </div>
        </section>
      ) : isPrevious ? (
        <section className="section sponsors-section">
          <div className="section-heading">
            <p className="eyebrow">Previous Sponsors</p>
            <h2>Past sponsor recognition</h2>
          </div>
          <div className="previous-sponsor-card">
            <img src="/Img/Sponsor/Previous Sponsors/past_sponsors.webp" alt="Previous NCCBA sponsors" />
          </div>
        </section>
      ) : (
        <CurrentSponsors />
      )}
    </>
  );
}

function CurrentSponsors() {
  return (
    <section className="section sponsors-section">
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
  );
}

function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="My Account"
        title="A cleaner member login and dashboard entry."
        copy="The original site includes My Account in the main nav. This prototype keeps it as a top-level route for future membership features."
        image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0298.webp`}
      />
      <section className="section account-contact single-panel">
        <div className="account-panel">
          <LockKeyhole size={28} />
          <p className="eyebrow">Member Login</p>
          <h2>Sign in to your account</h2>
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
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Start a conversation with NCCBA."
        copy="A dedicated contact page keeps general, sponsor, volunteer, and event inquiries easy to route."
        image={`${frontPage}EDPNC_NCCBA_2016-2.webp`}
      />
      <section className="section account-contact">
        <div className="contact-panel">
          <p className="eyebrow">Contact Us</p>
          <h2>Reach the NCCBA team.</h2>
          <p>Use this page for membership, sponsorship, event, and partnership inquiries.</p>
          <address>
            <span>
              <Mail size={18} /> info@nc-cba.com
            </span>
            <span>
              <MapPin size={18} /> North Carolina
            </span>
          </address>
        </div>
        <div className="account-panel">
          <p className="eyebrow">Inquiry</p>
          <h2>Send a message</h2>
          <form>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea placeholder="How can NCCBA help?" />
            </label>
            <button type="button">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

function Footer({ navigate }: { navigate: (path: string) => void }) {
  const footerLinks = useMemo(
    () => [
      { label: 'About NCCBA', path: '/about-nccba' },
      { label: 'Board Of Directors', path: '/board-of-directors' },
      { label: 'Membership', path: '/membership' },
      { label: 'Privacy Policy', path: '/contact-us' },
      { label: 'Terms and Conditions', path: '/contact-us' },
      { label: 'Contact Us', path: '/contact-us' },
    ],
    [],
  );

  return (
    <footer>
      <img src={`${frontPage}nccba_latest_logo.webp`} alt="NCCBA" />
      <p>Welcome to NC Chinese Business Association</p>
      <div>
        {footerLinks.map((item) => (
          <Link key={item.label} path={item.path} onNavigate={navigate}>
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

function NotFound({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="section text-page not-found">
      <p className="eyebrow">Page Not Found</p>
      <h1>That page is not in the prototype yet.</h1>
      <Link path="/" className="primary-link" onNavigate={navigate}>
        Return Home <ArrowRight size={18} />
      </Link>
    </section>
  );
}

function App() {
  const { path, navigate } = useRoute();

  const page = useMemo(() => {
    switch (path) {
      case '/':
        return <Home navigate={navigate} />;
      case '/about-nccba':
        return <AboutNccba />;
      case '/board-of-directors':
        return <PeoplePage eyebrow="Board Of Directors" title="NCCBA Board Of Directors" people={directors} />;
      case '/our-executive-team':
        return (
          <PeoplePage
            eyebrow="Our Executive Team"
            title="NCCBA Executive Team"
            people={executiveTeam}
          />
        );
      case '/by-laws':
        return <BylawsPage />;
      case '/upcoming-events':
        return <EventsPage kind="upcoming" />;
      case '/past-event':
        return <EventsPage kind="past" />;
      case '/volunteer':
        return <VolunteerPage />;
      case '/membership':
        return <MembershipPage navigate={navigate} />;
      case '/become-a-sponsor':
        return <SponsorsPage page="become" />;
      case '/current-sponsors':
        return <SponsorsPage page="current" />;
      case '/previous-sponsors':
        return <SponsorsPage page="previous" />;
      case '/my-account':
        return <AccountPage />;
      case '/contact-us':
        return <ContactPage />;
      default:
        return <NotFound navigate={navigate} />;
    }
  }, [navigate, path]);

  return (
    <>
      <Header currentPath={path} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
