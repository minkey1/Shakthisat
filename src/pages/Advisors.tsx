import { useEffect, useMemo, useState } from "react";
import advisorsData from "@/data/Advisors.json";

type Advisor = {
  name: string;
  desc: string;
  image: string;
  poster?: string;
};

const advisorImages = import.meta.glob("../img/Advisors/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolveAdvisorImage = (image: string): string => {
  const cleaned = image
    .replace(/^\/img\/Advisors\//i, "")
    .replace(/^\/advisors\//i, "")
    .replace(/^\//, "");

  const key = `../img/Advisors/${cleaned}`;
  return (advisorImages[key] as string | undefined) ?? image;
};

const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

const Advisors = () => {
  const [search, setSearch] = useState("");
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    setAdvisors(advisorsData as Advisor[]);
  }, []);

  const filteredAdvisors = useMemo(
    () =>
      advisors.filter((advisor) =>
        advisor.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, advisors]
  );

  const openModal = (index: number) => {
    setModalIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIndex(null);
    document.body.style.removeProperty("overflow");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] pt-24 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-2 border-white/30 rounded-xl p-6 sm:p-8 shadow-xl shadow-[#6A4FC8]/10">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
              Advisors
            </span>

            <div className="space-y-4 mt-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
                Our Advisors
              </h1>

              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Explore the leaders guiding ShakthiSAT with experience across space, innovation, policy, and education.
              </p>
            </div>

            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full mt-6" />
          </div>

          <div className="mb-10 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search advisors by name..."
              className="w-full px-4 py-3 rounded-lg bg-[#0f1724] text-white border border-white/10 focus:outline-none focus:border-purple-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAdvisors.map((advisor, index) => {
              const preview = truncateText(advisor.desc, 240);

              return (
                <div
                  key={advisor.name}
                  className="flex flex-col md:flex-row gap-6 bg-[#071028] rounded-xl p-6 shadow-lg hover:shadow-[#6A4FC8]/40 transition duration-200"
                >
                  <div className="w-full md:w-1/3 h-72 md:h-48 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={resolveAdvisorImage(advisor.image)}
                      alt={advisor.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[#FFD700] mb-3">{advisor.name}</h3>

                    <p className="text-sm text-[#C0C0C0] leading-relaxed">{preview}</p>

                    {advisor.desc.length > 240 && (
                      <button
                        type="button"
                        className="mt-3 text-[#FF6EC7] text-xs font-semibold underline hover:text-[#FFD700] transition"
                        onClick={() => openModal(index)}
                      >
                        Read More
                      </button>
                    )}

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => openModal(index)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {modalIndex !== null && filteredAdvisors[modalIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={closeModal}
        >
          <div
            className="relative bg-[#12152e] rounded-xl border border-[#6A4FC8]/40 max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-3xl"
              aria-label="Close advisor details"
            >
              ×
            </button>

            <div className="relative w-full h-[55vh] sm:h-[500px] overflow-y-auto">
              <img
                src={
                  filteredAdvisors[modalIndex].poster
                    ? filteredAdvisors[modalIndex].poster
                    : filteredAdvisors[modalIndex].image
                }
                alt={filteredAdvisors[modalIndex].name}
                className="object-contain w-full h-full rounded-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Advisors;