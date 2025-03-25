import React from 'react';
import { CheckCircle2, Pin } from 'lucide-react';

interface Update {
  version: string;
  time: string;
  date: string;
  changes: string[];
  futureUpdates: string[];
}

const UPDATES: Update[] = [
    {
    version: "1.2.9",
    time: "2:01 AM",
    date: "3/26/2025",
    changes: [
      "Add Article Section",
      "More Content",
      "Bug fixes",
      "Add What Our Users Say",
      "Add FAQ"
    ],
    futureUpdates: [
      "Any Regex DFA Simulation"

    ]
  },

    {
    version: "1.1.8",
    time: "10:41 AM",
    date: "3/25/2025",
    changes: [
      "Add some changes in Team",
      "More Content",
      "Removed PDA validation section"
    ],
    futureUpdates: [
      "Fix Bugs",
      "More Content",
      "Enhanced visualizations"
    ]
  },
  {
    version: "1.1.5",
    time: "4:43 PM",
    date: "3/24/2025",
    changes: [
      "Change the content of about",
      "More Content",
      "Added PDA section",
      "Updated learning resources"
    ],
    futureUpdates: [
      "Fix Bugs",
      "More Content",
      "Enhanced visualizations"
    ]
  },
  {
    version: "1.1.2",
    time: "11:14 AM",
    date: "3/24/2025",
    changes: [
      "New More Design UI",
      "Add Footer",
      "Add Header",
      "Add new different types of new page",
      "Fix Bugs"
    ],
    futureUpdates: [
      "Fix Bugs",
      "More Content"
    ]
  },
  {
    version: "1.0.2",
    time: "4:14 AM",
    date: "3/24/2025",
    changes: [
      "Fix CFG Visualization not good",
      "Remove String Validation CFG",
      "Accurate PDA Visualization like the shape etc."
    ],
    futureUpdates: [
      "New More Design UI",
      "Landing Page for Creator and Website",
      "Fix Bugs",
      "More Content"
    ]
  },
  {
    version: "1.0.1",
    time: "3:22 AM",
    date: "3/24/2025",
    changes: [
      "Revamped UI with a fresh new look",
      "Migrated from Streamlit to Tailwind for better performance and styling",
      "UI now aligns with Ma'am's board visualization requirements",
      "Fully functional DFA (Deterministic Finite Automaton) simulation",
      "Accurate DFA validation now implemented"
    ],
    futureUpdates: [
      "Remove String Validation CFG",
      "Accurate PDA Visualization like the shape etc.",
      "Fix CFG Visualization not good",
      "New More Design UI",
      "Landing Page for Creator and Website",
      "Fix Bugs",
      "More Content"
    ]
  }
];

export default function Updates() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Updates & Changelog</h1>
      
      <div className="space-y-8">
        {UPDATES.map((update, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Version {update.version}</h2>
                <p className="text-sm text-gray-500">
                  {update.time} | {update.date}
                </p>
              </div>
              {index === 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Latest
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Changes</h3>
                <ul className="space-y-2">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-center space-x-2 text-gray-700">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Future Updates</h3>
                <ul className="space-y-2">
                  {update.futureUpdates.map((future, futureIndex) => (
                    <li key={futureIndex} className="flex items-center space-x-2 text-gray-700">
                      <Pin size={16} className="text-blue-500 flex-shrink-0" />
                      <span>{future}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}