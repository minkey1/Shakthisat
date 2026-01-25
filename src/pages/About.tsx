import { useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-purple-700 blur-[120px]" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-teal-500 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* HERO SECTION */}
        <div className="text-center space-y-6 mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
            About Us
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
              Space Kidz India & ShakthiSAT Mission
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Inspiring young minds and empowering girls across the world
              through space science, innovation, and global unity.
            </p>
          </div>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full" />
        </div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)] p-8 sm:p-12 space-y-12"
        >
          {/* SECTION 1 — Space Kidz India Intro */}
          <section className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-teal-100">
              Space Kidz India
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              "Space Kidz India" is an aerospace startup designing and building
              satellites and rockets. It is the only organisation to have
              launched <span className="text-teal-300 font-semibold">19+ Balloon Satellites</span>,{" "}
              <span className="text-teal-300 font-semibold">3 Suborbital Satellites</span>, and{" "}
              <span className="text-teal-300 font-semibold">5 Orbital Satellites</span>.
            </p>

            <p className="text-white/80 leading-relaxed text-lg">
              Beginning its journey in 2012 as an ambassador to the NASA Space
              Camps, Space Kidz India has inspired more than{" "}
              <span className="text-purple-300 font-semibold">3500 students</span> across India with
              hands-on experience at world-renowned institutions like the
              Kennedy Space Center, Johnson Space Center – NASA, European Space
              Agency, Russian Space Center – Star City, Gagarin Cosmonaut
              Training Centre, and Moscow Aviation Institute.
            </p>
          </section>

          <div className="h-[1px] w-full bg-white/10" />

          {/* SECTION 2 — Mission */}
          <section className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-200">
              Our Mission — ShakthiSAT
            </h2>

            <p className="text-white/80 leading-relaxed text-lg">
              ShakthiSAT is driven by the powerful vision of empowering young
              girls across the globe through the awe-inspiring world of space
              exploration. The mission aims to involve{" "}
              <span className="text-teal-300 font-semibold">12,000 girls</span>{" "}
              from <span className="text-teal-300 font-semibold">108 nations</span>, giving{" "}
              <span className="text-purple-300 font-semibold">108 talented students</span> in each
              country a life-changing opportunity to discover their passion.
            </p>
          </section>

          <div className="h-[1px] w-full bg-white/10" />

          {/* SECTION 3 — Peace & Power */}
          <section className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-fuchsia-200">
              ShakthiSAT — Peace & Power
            </h2>

            <p className="text-white/80 leading-relaxed text-lg">
              In a world often divided by differences, ShakthiSAT stands as a
              shining symbol of unity and hope. The mission strives to build
              unprecedented global cooperation by bringing together young minds
              under the vast expanse of the cosmos.
            </p>

            <p className="text-white/80 leading-relaxed text-lg">
              With the spirit of togetherness, ShakthiSAT dares to transcend the
              boundaries of geography, culture, and ideology—envisioning a
              momentous event that unites humanity with shared dreams among the
              stars.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutUs;
