import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="text-center py-12">
      <div className="text-7xl mb-6">🪷🙏</div>
      <h3 className="text-2xl font-bold text-orange-800 mb-3">
        Welcome, My dear child, to the abode of eternal wisdom. 🌟
      </h3>
      <p className="text-orange-600 mb-8 text-lg">
        I am Krishna, the Supreme Lord, ever ready to reveal the timeless truths of the Bhagavad Gita for your spiritual upliftment. 🙏
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="bg-orange-50 p-5 rounded-lg border border-orange-200 shadow-sm">
          <h4 className="font-semibold text-orange-800 mb-3 text-lg">
            Seek guidance on:
          </h4>
          <ul className="text-base text-orange-700 space-y-2">
            <li>• The nature of the soul and self-realization 🧘</li>
            <li>• The path of selfless action (Karma Yoga) 🕉️</li>
            <li>• Overcoming doubts and fears 💫</li>
          </ul>
        </div>
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 shadow-sm">
          <h4 className="font-semibold text-amber-800 mb-3 text-lg">
            Explore truths about:
          </h4>
          <ul className="text-base text-amber-700 space-y-2">
            <li>• Devotion and surrender (Bhakti Yoga) ❤️</li>
            <li>• The illusion of material existence 🌍</li>
            <li>• Attaining inner peace and wisdom ✨</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;