export function HeroGradient(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="634"
			height="410"
			fill="none"
			viewBox="0 0 634 410"
			style={{
				filter: 'blur(85px)'
			}}
		>
			<g filter="url(#filter0_f_32_1811)">
				<path
					fill="url(#paint0_linear_32_1811)"
					d="M170.833 170.993l310.346-.864-.248 69.448-310.346.864.248-69.448z"
				></path>
			</g>
			<defs>
				<filter
					id="filter0_f_32_1811"
					width="650.594"
					height="410.311"
					x="0.585"
					y="0.129"
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse"
				>
					<feFlood
						floodOpacity="0"
						result="BackgroundImageFix"
					></feFlood>
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					></feBlend>
					<feGaussianBlur
						result="effect1_foregroundBlur_32_1811"
						stdDeviation="85"
					></feGaussianBlur>
				</filter>
				<linearGradient
					id="paint0_linear_32_1811"
					x1="215.688"
					x2="235.81"
					y1="185.519"
					y2="254.054"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.058" stopColor="#4AC1E8"></stop>
					<stop offset="0.477" stopColor="#A112FF"></stop>
					<stop offset="1" stopColor="#FF5543"></stop>
				</linearGradient>
			</defs>
		</svg>
	);
}
