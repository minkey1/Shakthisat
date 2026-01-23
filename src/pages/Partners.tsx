import { useMemo } from "react";

type Partner = {
  id: number;
  name: string;
  logo: string;
};

const partnerImages = import.meta.glob("../img/Partners/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolvePartnerLogo = (logo: string): string => {
  const cleaned = logo
    .replace(/^\/?img\/?Partners\//i, "")
    .replace(/^\/?partners\//i, "")
    .replace(/^\//, "");

  const key = `../img/Partners/${cleaned}`;
  return (partnerImages[key] as string | undefined) ?? logo;
};

const Partners = () => {
  const partners: Partner[] = useMemo(
    () =>
      [
        { id: 1, name: "ISRO", logo: "isro-indian-space-research-organisation-logo.jpg" },
        { id: 2, name: "InSpace", logo: "inspace-logo.jpg" },
        { id: 3, name: "BCI Aerospace", logo: "bci-aerospace-logo.png" },
        { id: 4, name: "Alpha Impulsion", logo: "alpha-impulsion-logo.jpg" },
        { id: 5, name: "Ananth Technologies", logo: "ananth-technologies-logo.jpg" },
        { id: 6, name: "SIA India", logo: "sia-india-logo.jpg" },
        { id: 7, name: "Niti Aayog", logo: "niti-aayog-logo.png" },
        { id: 8, name: "Zoho Learn", logo: "zoho-learn-logo.jpg" },
        { id: 9, name: "Zoho Webinar", logo: "zoho-webinar-logo.jpg" },
        { id: 10, name: "WSW Association", logo: "wsw-association-logo.jpg" },
        { id: 11, name: "WAN", logo: "wan-logo.jpg" },
        { id: 12, name: "AEC", logo: "aec-logo.jpg" },
        { id: 13, name: "Mireille", logo: "mireille-logo.jpg" },
        { id: 14, name: "Databot", logo: "databot-logo.jpg" },
        { id: 15, name: "Newrizon Space", logo: "newrizon-space-logo.jpg" },
        { id: 16, name: "We For We", logo: "we-for-we-logo.jpg" },
        { id: 17, name: "The Greatness Engineer", logo: "the-greatness-engineer-logo.jpg" },
        { id: 18, name: "STEM Queens", logo: "stem-queens-logo.jpg" },
        { id: 19, name: "MT Energy Resources", logo: "mt-energy-resources-logo.jpg" },
        { id: 20, name: "Atmanirbhar Bharat", logo: "atmanirbhar-bharat-logo.jpg" },
      ].map((partner) => ({ ...partner, logo: resolvePartnerLogo(partner.logo) })),
    [],
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-2 border-white rounded-xl p-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] via-[#FF6EC7] to-[#6A4FC8] bg-clip-text text-transparent">
              Our Partners
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="aspect-video bg-white border-2 border-[#FFD700]/20 rounded-lg flex items-center justify-center hover:shadow-lg hover:border-[#FFD700]/50 transition-all duration-300 overflow-hidden"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-w-[70%] max-h-[70%] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Partners;