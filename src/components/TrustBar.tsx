// Falls back to the wordmark if `logo` is ever cleared.
const partner = {
  name: 'Fermented Food Holdings',
  logo: '/ffh-logo.webp' as string,
};

export default function TrustBar() {
  return (
    <section className="border-y border-gray-200/70 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Data partner
          </p>

          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 sm:h-20 w-auto opacity-90"
            />
          ) : (
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{partner.name}</p>
          )}

          <p className="text-sm sm:text-base text-gray-600 max-w-xl">
            Working with Upvote on commercial intelligence and consumer sentiment research.
          </p>
        </div>
      </div>
    </section>
  );
}
