import clsx from 'clsx';
import {Children, isValidElement, ReactNode} from 'react';
import {Users, Flag} from 'lucide-react';

const styles = {
	container: 'border-slate-300 border-[#eaeaea] dark:border-[#333333]',
	icon: 'text-inherit',
	body: 'text-[#334155] dark:text-dark-paragraph-text'
};

export function TierCallout({children}: {children: ReactNode}) {
	const [flagContent, userContent] = Children.toArray(children).reduce<
		[ReactNode[], ReactNode]
	>(
		(acc, child) => {
			if (isValidElement(child) && child.type === 'user') {
				acc[1] = child.props.children;
			} else {
				acc[0].push(child);
			}
			return acc;
		},
		[[], null]
	);

	return (
		<div
			className={clsx(
				'mb-4 overflow-hidden rounded-xl border px-5 py-4',
				styles.container
			)}
		>
			<div
				className={`flex items-center space-x-3 ${
					userContent && 'mb-3'
				}`}
			>
				<Flag className={clsx(styles.icon, 'h-5 w-5')} />
				<div
					className={clsx(
						'prose flex-1 overflow-x-auto text-base',
						styles.body
					)}
				>
					{flagContent}
				</div>
			</div>
			{userContent && (
				<div className="flex items-center space-x-3">
					<Users className={clsx(styles.icon, 'h-5 w-5')} />
					<div
						className={clsx(
							'prose flex-1 overflow-x-auto text-base',
							styles.body
						)}
					>
						{userContent}
					</div>
				</div>
			)}
		</div>
	);
}
