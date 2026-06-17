import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheck,
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

type MembershipPlan = {
  name: string;
  price: string;
  cadence: string;
  slug: string;
  registerPath: string;
  benefits: string[];
};

type MemberProfile = {
  fullName: string;
  phone: string;
  organization: string;
  membershipType: string;
  membershipStatus: 'Pending Review' | 'Active';
};

type StoredUser = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  profile: MemberProfile;
};

type SessionUser = Omit<StoredUser, 'password'>;

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

const membershipPlans: MembershipPlan[] = [
  {
    name: 'Student Membership',
    price: '$100.00',
    cadence: '/Year. Auto renew unless canceled.',
    slug: 'student-member',
    registerPath: '/register/student-member/',
    benefits: [
      'Free attendance at monthly luncheons',
      'Opportunity to give member-spotlight remarks at one luncheon',
      'Access to members-only business events',
      'Free admission to the NCCBA Annual Business Summit',
      'Career development support from the NCCBA board and leadership team',
    ],
  },
  {
    name: 'Standard Membership',
    price: '$200.00',
    cadence: '/Year. Auto renew unless canceled.',
    slug: 'standard-membership',
    registerPath: '/register/standard-membership/',
    benefits: [
      'Free attendance at monthly luncheons',
      'Opportunity to pitch your company or give brief introductory remarks at one luncheon',
      'Access to members-only business events',
      'Free admission to the NCCBA Annual Business Summit',
      'Professional and business support from the NCCBA board and leadership team',
    ],
  },
  {
    name: 'Life Time Membership',
    price: '$1000.00',
    cadence: 'for life time. No need to renew.',
    slug: 'life-time-member',
    registerPath: '/register/life-time-member/',
    benefits: [
      'Free attendance at all NCCBA events, including monthly luncheons, members-only events, and the Annual Business Summit',
      'Participation in NCCBA leadership meetings to help shape strategy and direction',
      'Opportunity to present a program or moderate a panel discussion',
      'Ongoing professional and business support from the NCCBA board and leadership team',
    ],
  },
  {
    name: 'Corporate Membership',
    price: '$500.00',
    cadence: '/Year. Auto renew unless canceled.',
    slug: 'corporate-membership',
    registerPath: '/register/corporate-membership/',
    benefits: [
      'Free attendance at monthly luncheons',
      'Access to members-only business events',
      'One company pitch slot at a luncheon per year',
      'Company listing on the NCCBA website as a business partner',
      'One designated representative receives free admission to all monthly luncheons and the Annual Business Summit',
    ],
  },
];

const usersKey = 'nccba.demo.users';
const sessionKey = 'nccba.demo.session';

const defaultProfile = (membershipType = 'Standard Membership'): MemberProfile => ({
  fullName: '',
  phone: '',
  organization: '',
  membershipType,
  membershipStatus: 'Pending Review',
});

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(window.localStorage.getItem(usersKey) ?? '[]') as StoredUser[];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
};

const toSessionUser = ({ password: _password, ...user }: StoredUser): SessionUser => user;

function useAuth() {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const userId = window.localStorage.getItem(sessionKey);
    const storedUser = readUsers().find((item) => item.id === userId);
    return storedUser ? toSessionUser(storedUser) : null;
  });

  const register = ({
    email,
    password,
    fullName,
    phone,
    organization,
    membershipType,
  }: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    organization: string;
    membershipType: string;
  }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();

    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters.');
    }

    const newUser: StoredUser = {
      id: window.crypto.randomUUID(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
      profile: {
        ...defaultProfile(membershipType),
        fullName: fullName.trim(),
        phone: phone.trim(),
        organization: organization.trim(),
      },
    };

    writeUsers([...users, newUser]);
    window.localStorage.setItem(sessionKey, newUser.id);
    setUser(toSessionUser(newUser));
  };

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const storedUser = readUsers().find(
      (item) => item.email === normalizedEmail && item.password === password,
    );

    if (!storedUser) {
      throw new Error('Email or password is incorrect.');
    }

    window.localStorage.setItem(sessionKey, storedUser.id);
    setUser(toSessionUser(storedUser));
  };

  const logout = () => {
    window.localStorage.removeItem(sessionKey);
    setUser(null);
  };

  const updateProfile = (profile: MemberProfile) => {
    if (!user) {
      return;
    }

    const users = readUsers();
    const updatedUsers = users.map((item) =>
      item.id === user.id ? { ...item, profile: { ...item.profile, ...profile } } : item,
    );
    const updatedUser = updatedUsers.find((item) => item.id === user.id);

    writeUsers(updatedUsers);
    if (updatedUser) {
      setUser(toSessionUser(updatedUser));
    }
  };

  return { user, register, login, logout, updateProfile };
}

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
        eyebrow="NCCBA Membership"
        title="Join NCCBA and become part of a growing community."
        copy="NCCBA membership supports professionals, families, companies, and future leaders through luncheons, member-only programs, business support, and annual events."
        image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0171.webp`}
      />
      <section className="section membership-intro">
        <div>
          <p className="eyebrow">Membership Category</p>
          <h2>Choose the membership level that fits your role.</h2>
          <p>
            The original WordPress page uses four membership categories. This React version keeps
            the same organization and benefits while making the pricing easier to scan.
          </p>
        </div>
        <Link path="/my-account" className="primary-link" onNavigate={navigate}>
          Member Login <ArrowRight size={18} />
        </Link>
      </section>
      <section className="section membership-plans" aria-label="Membership categories">
        {membershipPlans.map((plan) => (
          <article className="plan-card" key={plan.name}>
            <h2>{plan.name}</h2>
            <p className="plan-price">
              <strong>{plan.price}</strong> {plan.cadence}
            </p>
            <ul>
              {plan.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <Link path={plan.registerPath} className="primary-link" onNavigate={navigate}>
              Select <ArrowRight size={18} />
            </Link>
          </article>
        ))}
      </section>
      <section className="section membership">
        <div className="membership-panel">
          <p className="eyebrow">Member Experience</p>
          <h2>Keep the account and renewal path visible.</h2>
          <p>
            This area can connect to a future member portal, payment provider, or CRM without
            requiring WordPress.
          </p>
        </div>
        <div className="membership-benefits">
          <span>Monthly luncheons</span>
          <span>Members-only business events</span>
          <span>Annual Business Summit</span>
          <span>Leadership and career support</span>
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

function RegisterPage({
  plan,
  onRegister,
  navigate,
}: {
  plan: MembershipPlan;
  onRegister: ReturnType<typeof useAuth>['register'];
  navigate: (path: string) => void;
}) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    password: '',
    membershipType: plan.name,
  });
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      onRegister(form);
      navigate('/my-account');
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'Unable to register.');
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Member Registration"
        title={`Register for ${plan.name}`}
        copy="Create an account with your email and a password. This local prototype stores your demo member profile in this browser."
        image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0234.webp`}
      />
      <section className="section auth-layout">
        <form className="auth-card" onSubmit={handleSubmit}>
          <p className="eyebrow">Create Account</p>
          <h2>Register with your email</h2>
          <div className="form-grid two-column">
            <label>
              Full name
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <label>
              Organization
              <input name="organization" value={form.organization} onChange={handleChange} />
            </label>
            <label>
              Membership type
              <select name="membershipType" value={form.membershipType} onChange={handleChange}>
                {membershipPlans.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </label>
          </div>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit">Create Account</button>
          <p className="auth-note">
            Local prototype only: this demonstrates the flow before Supabase is connected.
          </p>
        </form>
        <aside className="selected-plan">
          <p className="eyebrow">Selected Plan</p>
          <h2>{plan.name}</h2>
          <p className="plan-price">
            <strong>{plan.price}</strong> {plan.cadence}
          </p>
          <ul>
            {plan.benefits.slice(0, 4).map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}

function AccountPage({
  user,
  onLogin,
  onLogout,
  onUpdateProfile,
}: {
  user: SessionUser | null;
  onLogin: ReturnType<typeof useAuth>['login'];
  onLogout: ReturnType<typeof useAuth>['logout'];
  onUpdateProfile: ReturnType<typeof useAuth>['updateProfile'];
}) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [profileForm, setProfileForm] = useState<MemberProfile>(
    user?.profile ?? defaultProfile(),
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm(user.profile);
    }
  }, [user]);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      onLogin(loginForm.email, loginForm.password);
      setMessage('Signed in successfully.');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    }
  };

  const handleProfileSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdateProfile(profileForm);
    setMessage('Profile saved.');
  };

  if (user) {
    return (
      <>
        <PageHero
          eyebrow="My Account"
          title={`Welcome, ${user.profile.fullName || user.email}`}
          copy="Your member dashboard shows account details, membership status, and editable profile information."
          image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0298.webp`}
        />
        <section className="section dashboard-layout">
          <aside className="dashboard-summary">
            <CircleCheck size={32} />
            <p className="eyebrow">Signed In</p>
            <h2>{user.profile.membershipType}</h2>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{user.profile.membershipStatus}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
            <button type="button" className="secondary-action" onClick={onLogout}>
              Log Out
            </button>
          </aside>
          <form className="auth-card" onSubmit={handleProfileSubmit}>
            <p className="eyebrow">Member Profile</p>
            <h2>Update your information</h2>
            <div className="form-grid two-column">
              <label>
                Full name
                <input
                  name="fullName"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Phone
                <input name="phone" value={profileForm.phone} onChange={handleProfileChange} />
              </label>
              <label>
                Organization
                <input
                  name="organization"
                  value={profileForm.organization}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Membership type
                <select
                  name="membershipType"
                  value={profileForm.membershipType}
                  onChange={handleProfileChange}
                >
                  {membershipPlans.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {message ? <p className="form-success">{message}</p> : null}
            <button type="submit">Save Profile</button>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="My Account"
        title="Register or log in with your email."
        copy="Members can create a local prototype account, log in, and view an account dashboard. The same UI can later connect to Supabase Auth."
        image={`${frontPage}2026-01-21_NCCBA-New-Year-Celebration_0298.webp`}
      />
      <section className="section auth-layout">
        <form className="auth-card" onSubmit={handleLogin}>
          <LockKeyhole size={28} />
          <p className="eyebrow">Member Login</p>
          <h2>Sign in to your account</h2>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="member@example.com"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}
          <button type="submit">Sign In</button>
        </form>
        <div className="registration-panel">
          <p className="eyebrow">New Member</p>
          <h2>Create your account from a membership plan.</h2>
          <p>
            Choose Student, Standard, Life Time, or Corporate membership and complete registration
            with your email.
          </p>
          <div className="compact-plan-list">
            {membershipPlans.map((plan) => (
              <a key={plan.slug} href={plan.registerPath}>
                {plan.name}
                <span>{plan.price}</span>
              </a>
            ))}
          </div>
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
  const auth = useAuth();

  const page = useMemo(() => {
    const registrationPlan = membershipPlans.find(
      (plan) => path === plan.registerPath || path === plan.registerPath.replace(/\/$/, ''),
    );

    if (registrationPlan) {
      return <RegisterPage plan={registrationPlan} onRegister={auth.register} navigate={navigate} />;
    }

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
        return (
          <AccountPage
            user={auth.user}
            onLogin={auth.login}
            onLogout={auth.logout}
            onUpdateProfile={auth.updateProfile}
          />
        );
      case '/contact-us':
        return <ContactPage />;
      default:
        return <NotFound navigate={navigate} />;
    }
  }, [auth.login, auth.logout, auth.register, auth.updateProfile, auth.user, navigate, path]);

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
