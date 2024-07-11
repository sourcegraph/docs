import {type UseChatHelpers} from 'ai/react';

import {PromptForm} from './prompt-form';
import {Button} from './ui/button';
import {IconRegenerate, IconStop} from './ui/icons';

export interface ChatInputProps
	extends Pick<
		UseChatHelpers,
		| 'append'
		| 'isLoading'
		| 'reload'
		| 'messages'
		| 'stop'
		| 'input'
		| 'setInput'
	> {
	id?: string;
}

export function ChatInput({
	id,
	isLoading,
	stop,
	append,
	reload,
	input,
	setInput,
	messages
}: ChatInputProps) {
	return (
		<div>
			<div className="mx-auto max-w-3xl sm:max-w-3xl">
				<div className="flex h-10 items-center justify-center">
					{isLoading ? (
						<Button
							variant="outline"
							onClick={() => stop()}
							className="bg-background"
							size={'sm'}
						>
							<IconStop className="h-5 w-5 text-muted-foreground/50 group-hover:text-background" />
							Stop generating
						</Button>
					) : (
						messages?.length > 0 && (
							<Button
								variant="outline"
								onClick={() => reload()}
								className="bg-background"
								size={'sm'}
							>
								<IconRegenerate className="h-5 w-5 text-muted-foreground/50 group-hover:text-background" />
								Regenerate response
							</Button>
						)
					)}
				</div>
				<div className="space-y-4 py-2 md:pb-4 md:pt-2">
					<PromptForm
						onSubmit={async value => {
							await append({
								content: value,
								role: 'user'
							});
						}}
						input={input}
						setInput={setInput}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}
