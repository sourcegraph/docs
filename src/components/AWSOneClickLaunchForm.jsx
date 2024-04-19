export default function AWSOneClickLaunchForm() {
  return (
    <form className="launcher" name="launcher" action="" target="_blank">
      <select
        name="region"
        className="w-3/4 lg:w-3/5 xl:w-1/2 float-left text-base py-1 px-4 mr-1 mb-4 bg-white text-gray-900 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
    <option value="us-east-2">us-east-2 (US East (Ohio))</option>
    <option value="us-east-1">us-east-1 (US East (N. Virginia))</option>
    <option value="us-west-1">us-west-1 (US West (N. California))</option>
    <option value="us-west-2">us-west-2 (US West (Oregon))</option>
    <option value="af-south-1">af-south-1 (Africa (Cape Town))</option>
    <option value="ap-east-1">ap-east-1 (Asia Pacific (Hong Kong))</option>
    <option value="ap-southeast-3">ap-southeast-3 (Asia Pacific (Jakarta))</option>
    <option value="ap-south-1">ap-south-1 (Asia Pacific (Mumbai))</option>
    <option value="ap-northeast-2">ap-northeast-2 (Asia Pacific (Seoul))</option>
    <option value="ap-southeast-1">ap-southeast-1 (Asia Pacific (Singapore))</option>
    <option value="ap-southeast-2">ap-southeast-2 (Asia Pacific (Sydney))</option>
    <option value="ap-northeast-1">ap-northeast-1 (Asia Pacific (Tokyo))</option>
    <option value="ca-central-1">ca-central-1 (Canada (Central))</option>
    <option value="eu-central-1">eu-central-1 (Europe (Frankfurt))</option>
    <option value="eu-west-1">eu-west-1 (Europe (Ireland))</option>
    <option value="eu-west-2">eu-west-2 (Europe (London))</option>
    <option value="eu-south-1">eu-south-1 (Europe (Milan))</option>
    <option value="eu-west-3">eu-west-3 (Europe (Paris))</option>
    <option value="eu-north-1">eu-north-1 (Europe (Stockholm))</option>
    <option value="me-south-1">me-south-1 (Middle East (Bahrain))</option>
    <option value="me-central-1">me-central-1 (Middle East (UAE))</option>
    <option value="sa-east-1">sa-east-1 (South America (São Paulo))</option>
      </select>
      <input
        className="submit-btn cursor-pointer"
        formAction="https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?stackName=Sourcegraph&templateURL=https://sourcegraph-cloudformation.s3.us-west-2.amazonaws.com/sg-basic.yaml"
        type="image"
        alt="Launch Stack"
        src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"
      />
    </form>
  );
}
