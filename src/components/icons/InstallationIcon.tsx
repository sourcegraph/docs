import {Gradient} from '@/components/Icon';

export function InstallationIcon({
	id,
	color
}: {
	id: string;
	color?: React.ComponentProps<typeof Gradient>['color'];
}) {
	return (
		<>
			<defs>
				<Gradient
					id={`${id}-gradient`}
					color={color}
					gradientTransform="matrix(0 21 -21 0 16 7)"
				/>
			</defs>

			<path
				d="m4 4 10.286 24 2.285-11.429L28 14.286 4 4Z"
				fill="#F34E3F"
				stroke="#F34E3F"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	);
}
