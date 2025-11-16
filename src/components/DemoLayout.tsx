import {useState} from 'react';

const tabs = [
	'Overview',
	'Assistants',
	'Text-to-Image',
	'Text-to-Speech',
	'Plugins',
	'Multi-Models'
];

const tabVideos = {
	Overview: 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
	Assistants: 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
	'Text-to-Image':
		'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
	'Text-to-Speech':
		'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
	Plugins: 'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1',
	'Multi-Models':
		'https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1'
};

type TabKeys = keyof typeof tabVideos;

export function DemoLayout() {
	const [activeTab, setActiveTab] = useState<TabKeys>('Overview');

	return (
		<div className="mb-10 space-y-6">
			{/* tabs */}
			<div className="relative z-10 mx-auto flex w-[40%] max-w-7xl justify-between rounded-[6px] border-[1px] border-light-border p-[2px] shadow-sm dark:border-dark-border">
				{tabs.map((tab, index) => (
					<button
						key={index}
						onClick={() => setActiveTab(tab as TabKeys)}
						className={`rounded-[5px] px-[12px] py-[7px] transition ${
							activeTab === tab
								? 'bg-vermilion-07 text-white hover:bg-vermilion-08'
								: 'text-slate-700 hover:bg-vermilion-07 hover:text-dark-text-primary hover:shadow-lg dark:text-dark-text-primary'
						}`}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="relative mx-auto w-full max-w-[1000px]">
				<div
					className="absolute inset-0 -m-4 rounded-[6px] opacity-20 blur-xl"
					style={{
						background:
							'linear-gradient(171.86deg, #A96AF3 -3.34%, #F34E3F 55.71%)'
					}}
				/>
				<div
					className="relative overflow-hidden rounded-[6px] border-[1px] border-light-border dark:border-dark-border"
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
						className="h-full w-full rounded-[5px]"
					/>
				</div>
			</div>
		</div>
	);
}
