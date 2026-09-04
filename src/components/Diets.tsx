// IMPORTANT: this list must mirror the diets the app actually ships. Anything
// listed here that Upvote cannot score is a false claim to a shopper who
// downloads on the strength of it. Trim or extend to match the product.
const diets = [
  'Keto',
  'Diabetic-friendly',
  'Gluten-free',
  'Low-sodium',
  'Dairy-free',
  'Vegan',
  'Vegetarian',
  'Low-sugar',
  'High-protein',
  'Paleo',
  'Nut-free',
  'Low-FODMAP',
];

export default function Diets() {
  return (
    <section id="diets" className="bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="text-center">
          <h2 className="section-title">Built Around Your Diet</h2>
          <p className="section-lead mx-auto mt-4 max-w-[640px] text-pretty">
            Tell Upvote how you eat and what you avoid. Every scan is scored against your profile,
            not against an average shopper who doesn't exist. Over 8 million products, matched in
            under two seconds.
          </p>
        </div>

        <div className="mx-auto mt-9 flex max-w-[820px] flex-wrap justify-center gap-[10px]">
          {diets.map((diet) => (
            <span
              key={diet}
              className="rounded-full border border-line-2 bg-white px-5 py-[11px] text-[14px] font-bold text-ink-2 transition-colors hover:border-brand hover:text-brand"
            >
              {diet}
            </span>
          ))}
        </div>

        {/*
          LEGAL REVIEW REQUIRED. Upvote scores products against a profile the user
          configures. It must not read as medical or dietary advice, and the
          allergen flags must not read as a safety guarantee. Keep this disclaimer
          visible wherever diets or allergens are promised.
        */}
        <p className="mx-auto mt-9 max-w-[680px] text-center text-[12.5px] font-medium leading-[1.6] text-muted-3">
          Upvote matches products against the preferences you set. It is not a medical device and
          does not provide medical or dietary advice. Always check the physical label and talk to a
          healthcare professional about your diet, especially if you have an allergy or a medical
          condition.
        </p>
      </div>
    </section>
  );
}
