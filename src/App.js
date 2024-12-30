import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'resume':
        return <Resume />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <ParticleBackground />
      <Navigation setActivePage={setActivePage} activePage={activePage} />
      <main>{renderPage()}</main>
      <SocialLinks />
    </div>
  );
}

function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
            ctx.stroke();
          }
        });
      });
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas id="particle-canvas" className="particle-background" />;
}

function Navigation({ setActivePage, activePage }) {
  return (
    <nav>
      <div 
        className="logo" 
        onClick={() => setActivePage('home')}
      >
        Adir Ali Yerima
      </div>
      <div className="nav-links">
        {['about', 'projects', 'resume'].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={activePage === page ? 'active' : ''}
          >
            {page.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}

function SocialLinks() {
  return (
    <div className="social-links"> {[ { name: 'Medium', url: 'https://medium.com/@adirbryan' }, { name: 'GitHub', url: 'https://github.com/K2320' }, { name: 'Instagram', url: 'https://www.instagram.com/adir_ali_b/' }, { name: 'LinkedIn', url: 'https://www.linkedin.com/in/adir-ali-yerima-226664267/' }, ].map((platform, index) => ( <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="fade-in" style={{ animationDelay: `${index * 0.1}s` }} > {platform.name} </a> ))} </div>
  );
}

function Home({ setActivePage }) {
  return (
    <div className="home">
      <div className="content-wrapper">
        <h1 className="title-animation">
          hi, i'm <span className="highlight">Adir</span>.
        </h1>
        <div className="text-reveal-container">
          <p className="text-reveal">
            I'm an aspiring software engineer and AI Engineer with a diverse skill
            set ranging from full-stack development to network security in the
            cybersecurity realm. I build software that seamlessly blends robust
            functionality with simplistic design.
          </p>
          <p className="text-reveal">
            My goal is to develop applications that not only look aesthetically
            pleasing but also make a meaningful impact. Let's build something amazing together - reach out at <a href="mailto:adiraliyerima@gmail.com" className="hightlight-link">Adiraliyerima@gmail.com</a>
          </p>
        </div>
        <div className="cta-buttons">
          <button 
            onClick={() => setActivePage('projects')}
            className="button-slide"
          >
            View Projects
          </button>
          <button 
            onClick={() => setActivePage('about')}
            className="button-slide"
          >
            About Me
          </button>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="about">
      <h2 className="title-animation">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <div className="text-reveal-container">
            <p className="text-reveal">
              Hi, I'm Adir Ali Yerima, a senior at Innovation Academy with a knack for creating software
              that's both simple and impactful. I thrive on turning real-world challenges into seamless
              digital solutions. My toolset includes Java, CSS, HTML, and a host of other programming
              languages and technologies.
            </p>
            <p className="text-reveal">
              As a certified cybersecurity professional with a CompTIA Security+ certification, I merge
              cybersecurity with programming to craft secure and efficient software. Plus, I love sharing my
              insights and expertise on my cybersecurity blog, where I discuss the latest trends and tips in
              the field.
            </p>
            <p className="text-reveal">
              My journey as an IT enthusiast began at the age of 13 when I was introduced to Python
              Turtle and started creating art. I soon moved on to making basic Python decision-making
              games.
            </p>
            <p className="text-reveal">
              In my freshman year of high school, I delved into web development by learning HTML and
              CSS. In my sophomore year, I improved my Python skills and began researching machine
              learning applications in cybersecurity, particularly in intrusion detection systems. I created my
              own machine learning model with over 90% accuracy in detecting network attacks.
            </p>
          </div>
        </div>
        <div className="profile-image-container">
          <img 
            src="/profilepic.jpg" 
            alt="Adir Ali Yerima" 
            className="profile-image fade-in"
          />
          <div className="image-backdrop"></div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="projects">
      <h2 className="title-animation">My Projects</h2>
      <div className="projects-grid">
        {[
          {
            title: "AegisFile Scanner",
            description: "Developed a virus file scanner that verifies the integrity of user-uploaded files using the VirusTotal API",
            year: "2024",
            role: "Lead Developer",
            image: "/Aegisfile Scanner.png",
            links: {
              live: " https://k2320.github.io/aegisfile-/",
              code: "https://github.com/K2320/aegisfile-",
            }
          },
          {
            title: "Password Assessment System",
            description: "Developed a system to verify password integrity and provide feedback for stronger password creation.",
            year: "2024",
            role: "Full Stack Developer",
            image: "/password security.png",
            links: {
              live: "https://k2320.github.io/psswrd-sec/",
              code: "https://github.com/K2320/psswrd-sec",
            }
          }
        ].map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, description, year, role, image, links }) {
  return (
    <div className="project-card text-reveal-container">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            {links.live && (
              <a href={links.live} className="button-slide">View Live</a>
            )}
            {links.code && (
              <a href={links.code} className="button-slide">View Code</a>
            )}
          </div>
        </div>
      </div>
      <div className="project-details">
        <h3 className="text-reveal">{title}</h3>
        <p className="project-meta text-reveal">{role} • {year}</p>
        <p className="project-description text-reveal">{description}</p>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className="resume">
      <h2 className="title-animation">Resume</h2>
      <div className="resume-header">
        <a 
          href="/AdirAliYerimaResume1.docx (1).pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="button-slide"
        >
          Download Full Resume
        </a>
      </div>
      <div className="resume-content text-reveal-container">
        <div className="resume-section text-reveal">
          <h3>Education</h3>
          <div className="resume-item">
            <h4>Innovation Academy</h4>
            <p>Senior Year</p>
            <p>Focus on Computer Science and Cybersecurity</p>
          </div>
        </div>
        
        <div className="resume-section text-reveal">
          <h3>Certifications</h3>
          <div className="resume-item">
            <h4>CompTIA Security+</h4>
            <p>Certified Cybersecurity Professional</p>
          </div>
        </div>

        <div className="resume-section text-reveal">
          <h3>Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming Languages</h4>
              <ul>
                <li>Python</li>
                <li>Java</li>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Technologies</h4>
              <ul>
                <li>React</li>
                <li>Machine Learning</li>
                <li>Network Security</li>
                <li>Web Development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;

