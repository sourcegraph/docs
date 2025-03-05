import {useTheme} from 'next-themes';
import {Listbox} from '@headlessui/react';
import clsx from 'clsx';

const themes = [
	{name: 'Light', value: 'light', icon: LightIcon},
	{name: 'Dark', value: 'dark', icon: DarkIcon},
	{name: 'System', value: 'system', icon: SystemIcon}
];

function LightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7 1a1 1 0 0 1 2 0v1a1 1 0 1 1-2 0V1Zm4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2.657-5.657a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm-1.415 11.313-.707-.707a1 1 0 0 1 1.415-1.415l.707.708a1 1 0 0 1-1.415 1.414ZM16 7.999a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2h1a1 1 0 0 0 1-1ZM7 14a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm-2.536-2.464a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm0-8.486A1 1 0 0 1 3.05 4.464l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707ZM3 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Z"
			/>
		</svg>
	);
}

function DarkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.23 3.333C7.757 2.905 7.68 2 7 2a6 6 0 1 0 0 12c.68 0 .758-.905.23-1.332A5.989 5.989 0 0 1 5 8c0-1.885.87-3.568 2.23-4.668ZM12 5a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 1 1 0 0 0-1 1 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1Z"
			/>
		</svg>
	);
}

function SystemIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5l.31 1.242c.084.333.36.573.63.808.091.08.182.158.264.24A1 1 0 0 1 11 15H5a1 1 0 0 1-.704-1.71c.082-.082.173-.16.264-.24.27-.235.546-.475.63-.808L5.5 11H4a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
			/>
		</svg>
	);
}

export function ThemeSelector(
	props: React.ComponentPropsWithoutRef<typeof Listbox<'div'>>
) {
	let {theme, setTheme} = useTheme();

	return (
		<Listbox as="div" value={theme} onChange={setTheme} {...props}>
			<Listbox.Label className="sr-only">Theme</Listbox.Label>
			<Listbox.Button
				className="flex h-7 w-7 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-light-border-2 dark:bg-dark-bg-2 dark:ring-inset dark:ring-dark-border"
				aria-label="Theme"
			>
				<LightIcon className={clsx('h-4 w-4 fill-link dark:hidden')} />
				<DarkIcon
					className={clsx('hidden h-4 w-4 fill-link dark:block')}
				/>
			</Listbox.Button>
			<Listbox.Options className="absolute left-1/2 top-full mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-light-bg-1 p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-dark-bg-2 dark:ring-white/5">
				{themes.map(theme => (
					<Listbox.Option
						key={theme.value}
						value={theme.value}
						className={({active, selected}) =>
							clsx(
								'flex cursor-pointer select-none items-center rounded-xl p-1',
								{
									'text-link': selected,
									'text-slate-700 dark:text-white':
										active && !selected,
									'text-slate-700 dark:text-dark-paragraph-text':
										!active && !selected,
									'bg-vermilion-08 text-vermilion-11': active
								},
								'hover:bg-vermilion-08 hover:text-vermilion-11'
							)
						}
					>
						{({selected}) => (
							<>
								<div className="rounded-md bg-light-bg-1 p-1 shadow ring-1 ring-light-border-2 dark:bg-dark-bg-2 dark:ring-inset dark:ring-dark-border-2">
									<theme.icon
										className={clsx(
											'h-4 w-4',
											selected
												? 'fill-link-light dark:fill-link'
												: 'fill-slate-400'
										)}
									/>
								</div>
								<div className="ml-3">{theme.name}</div>
							</>
						)}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
}
