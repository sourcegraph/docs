'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

import {useState} from 'react';
import {Button} from './ui/button';

export default function AWSOneClickLaunchForm() {
	const [region, setRegion] = useState('us-east-1');

	const handleSubmit = (event: {preventDefault: () => void}) => {
		event.preventDefault();
		const url = `https://console.aws.amazon.com/cloudformation/home?region=${region}#/stacks/quickcreate?stackName=Sourcegraph&templateURL=https://sourcegraph-cloudformation.s3.us-west-2.amazonaws.com/sg-basic.yaml`;
		window.open(url, '_blank');
	};
	return (
		<form
			action=""
			className="launcher flex w-full items-center justify-start gap-4"
			name="launcher"
			target="_blank"
			onSubmit={handleSubmit}
		>
			<Select value={region} onValueChange={setRegion}>
				<SelectTrigger className="w-1/2 py-5 ring ring-[#ff9900]/10">
					<SelectValue placeholder="Select Region" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="us-east-2">
						us-east-2 (US East (Ohio))
					</SelectItem>
					<SelectItem value="us-east-1">
						us-east-1 (US East (N. Virginia))
					</SelectItem>
					<SelectItem value="us-west-1">
						us-west-1 (US West (N. California))
					</SelectItem>
					<SelectItem value="us-west-2">
						us-west-2 (US West (Oregon))
					</SelectItem>
					<SelectItem value="af-south-1">
						af-south-1 (Africa (Cape Town))
					</SelectItem>
					<SelectItem value="ap-east-1">
						ap-east-1 (Asia Pacific (Hong Kong))
					</SelectItem>
					<SelectItem value="ap-southeast-3">
						ap-southeast-3 (Asia Pacific (Jakarta))
					</SelectItem>
					<SelectItem value="ap-south-1">
						ap-south-1 (Asia Pacific (Mumbai))
					</SelectItem>
					<SelectItem value="ap-northeast-2">
						ap-northeast-2 (Asia Pacific (Seoul))
					</SelectItem>
					<SelectItem value="ap-southeast-1">
						ap-southeast-1 (Asia Pacific (Singapore))
					</SelectItem>
					<SelectItem value="ap-southeast-2">
						ap-southeast-2 (Asia Pacific (Sydney))
					</SelectItem>
					<SelectItem value="ap-northeast-1">
						ap-northeast-1 (Asia Pacific (Tokyo))
					</SelectItem>
					<SelectItem value="ca-central-1">
						ca-central-1 (Canada (Central))
					</SelectItem>
					<SelectItem value="eu-central-1">
						eu-central-1 (Europe (Frankfurt))
					</SelectItem>
					<SelectItem value="eu-west-1">
						eu-west-1 (Europe (Ireland))
					</SelectItem>
					<SelectItem value="eu-west-2">
						eu-west-2 (Europe (London))
					</SelectItem>
					<SelectItem value="eu-south-1">
						eu-south-1 (Europe (Milan))
					</SelectItem>
					<SelectItem value="eu-west-3">
						eu-west-3 (Europe (Paris))
					</SelectItem>
					<SelectItem value="eu-north-1">
						eu-north-1 (Europe (Stockholm))
					</SelectItem>
					<SelectItem value="me-south-1">
						me-south-1 (Middle East (Bahrain))
					</SelectItem>
					<SelectItem value="me-central-1">
						me-central-1 (Middle East (UAE))
					</SelectItem>
					<SelectItem value="sa-east-1">
						sa-east-1 (South America (São Paulo))
					</SelectItem>
				</SelectContent>
			</Select>
			<Button type="submit" className="bg-[#ff9900] text-black">
				AWS Launch Stack
			</Button>
		</form>
		// </div>
	);
}
