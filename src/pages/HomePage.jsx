import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import "../components/NavBar.css";

function HomePage() {
  const { fundraisers } = useFundraisers();
  console.log(fundraisers)
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to 2gethR</h1>
        <p className="hero-subtitle">
          A community-driven crowdfunding platform connecting university students 
          with isolated seniors to reduce loneliness and build meaningful relationships.
        </p>
      </section>

      {/* ABOUT / MISSION SECTION */}
      <section className="about">
        <h2>Our Mission</h2>
        <p>
          2gethR empowers local communities to support older adults who live alone 
          and lack close family support. Through student-led engagement programs, 
          we help seniors feel seen, valued, and connected.
        </p>
        <p>
          Join our crowdfunding community — raise money, support a cause, or make 
          a donation with confidence and peace of mind.
        </p>
      </section>

      {/* FUNDRAISER LIST */}
      <section className="fundraiser-section">
        <h2>Active Fundraisers</h2>

        <div id="fundraiser-list" className="fundraiser-grid">
          {fundraisers.map((fundraiserData) => (
            <FundraiserCard
              key={fundraiserData.id}
              fundraiserData={fundraiserData}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;
