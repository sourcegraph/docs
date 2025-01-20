import { useState } from 'react'

const tabs = ['Overview', 'Assistants', 'Text-to-Image', 'Text-to-Speech', 'Plugins', 'Multi-Models']

const tabVideos = {
  'Overview': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
  'Assistants': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
  'Text-to-Image': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
  'Text-to-Speech': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
  'Plugins': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
  'Multi-Models': 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1'
}

export function DemoLayout() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6 mb-10">
      {/* tabs */}
      <div className="relative z-10 border-[1px] border-light-border dark:border-dark-border shadow-sm rounded-[6px] p-[2px] flex justify-between w-[40%] max-w-7xl mx-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`px-[12px] py-[7px] rounded-[5px] transition ${
              activeTab === tab
                ? 'bg-vermilion-07 text-white hover:bg-vermilion-08'
                : 'text-slate-700 dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-vermilion-07 hover:shadow-lg'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Video Container with Gradient Shadow */}
      <div className="relative w-full max-w-[1000px] mx-auto">
        <div 
          className="absolute inset-0 -m-4 rounded-[6px] blur-xl opacity-20"
          style={{
            background: 'linear-gradient(171.86deg, #A96AF3 -3.34%, #F34E3F 55.71%)',
          }}
        />
        <div 
          className="relative rounded-[6px] overflow-hidden border-[1px] border-light-border dark:border-dark-border"
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1000/625'
          }}
        >
					<iframe
						key={activeTab}
						src={tabVideos[activeTab]}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full rounded-[5px]"
					/>
        </div>
      </div>
    </div>
  );
}
