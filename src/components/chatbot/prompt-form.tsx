import {useEnterSubmit} from '@/lib/hooks/use-enter-submit';
import {UseChatHelpers} from 'ai/react';
import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import {Button} from './ui/button';
import {IconChat, IconSpinner} from './ui/icons';

export interface PromptProps
	extends Pick<UseChatHelpers, 'input' | 'setInput'> {
	onSubmit: (value: string) => Promise<void>;
	isLoading: boolean;
}

export function PromptForm({
	onSubmit,
	input,
	setInput,
	isLoading
}: PromptProps) {
	const {formRef, onKeyDown} = useEnterSubmit();
	const inputRef = React.useRef<HTMLTextAreaElement>(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<form
			onSubmit={async e => {
				e.preventDefault();
				if (!input?.trim()) {
					return;
				}
				setInput('');
				await onSubmit(input);
			}}
			ref={formRef}
		>
			<div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border-light-border bg-background px-2 pb-2 sm:rounded-2xl sm:border dark:border-dark-border dark:bg-dark-bg">
				<div className="flex w-full flex-col">
					<label
						htmlFor="playground"
						className="text-config flex justify-between gap-y-4 rounded-xl px-3 py-4 font-medium leading-6 text-foreground md:flex-row md:items-center md:gap-y-0"
					>
						<div className="flex items-center gap-x-2">
							<IconChat
								className="h-5 w-5 text-muted-foreground/50 dark:text-dark-bg-3"
								aria-hidden="true"
							/>
							<h3 className="dark:text-slate-500">
								Ask your questions
							</h3>
						</div>

						<div className="flex items-center justify-center gap-2 md:justify-start">
							{/* Reset chat */}
							<Button
								variant="ghost"
								className="hover:bg-light-bg2 max-w-xs rounded-md text-slate-100 text-slate-500 ring-light-border-2 hover:ring-1 hover:ring-inset  dark:text-slate-400 dark:ring-dark-border dark:hover:bg-dark-bg-3 dark:hover:ring-inset"
								onClick={e => {
									e.preventDefault();
									location.reload();
								}}
							>
								Reset
							</Button>
							{/* Send button */}
							<Button
								type="submit"
								disabled={isLoading || input === ''}
								className="hover:bg-light-bg2 rounded-md bg-dark-bg-3 text-slate-100 shadow-sm ring-1 ring-inset ring-light-border-2 dark:bg-dark-bg-2 dark:text-slate-400 dark:ring-inset dark:ring-dark-border dark:hover:bg-dark-bg-3"
							>
								{isLoading ? (
									<>
										<IconSpinner className="h-5 w-5 text-background" />
										Generating
									</>
								) : (
									<>Send</>
								)}

								<span className="sr-only">Send message</span>
							</Button>
						</div>
					</label>
				</div>
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					maxRows={10}
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder="Ask any question related to Sourcegraph documentation..."
					spellCheck={false}
					className="min-h-[60px] w-full resize-none rounded-lg bg-light-bg px-4 py-[1.3rem] focus-within:outline-none sm:text-sm dark:bg-dark-bg-2"
				/>
			</div>
		</form>
	);
}
