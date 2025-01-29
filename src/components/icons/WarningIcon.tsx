import {Gradient} from '@/components/Icon';

export function WarningIcon({
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
					gradientTransform="matrix(0 24.5 -24.5 0 16 5.5)"
				/>
			</defs>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14-6.268 14-14 14S2 23.732 2 16Zm11.386-4.85a2.66 2.66 0 1 1 5.228 0l-1.039 5.543a1.602 1.602 0 0 1-3.15 0l-1.04-5.543ZM16 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
				fill="#F34E3F"
			/>
		</>
	);
}
