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
    <section id="diets" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Built Around Your Diet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell Upvote how you eat and what you avoid. Every scan is scored against your profile,
              not against an average shopper who doesn't exist. Over 8 million products, matched in
              under two seconds.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {diets.map((diet) => (
              <span
                key={diet}
                className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-800 font-semibold shadow-sm hover:border-upvote-pink hover:text-upvote-pink hover:shadow-md transition-all"
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
          <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto leading-relaxed">
            Upvote matches products against the preferences you set. It is not a medical device and
            does not provide medical or dietary advice. Always check the physical label and talk to a
            healthcare professional about your diet, especially if you have an allergy or a medical
            condition.
          </p>
        </div>
      </div>
    </section>
  );
}
