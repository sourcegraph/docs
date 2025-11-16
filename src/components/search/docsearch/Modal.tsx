import {ReactNode, useState, useLayoutEffect} from 'react';
import {createPortal} from 'react-dom';
const defaultModalProps = {
	wrapperId: 'modal-portal-id'
};

type ModalProps = {
	children: ReactNode;
	wrapperId: string;
} & typeof defaultModalProps;
const Modal = ({children, wrapperId}: ModalProps) => {
	const [wrapper, setWrapper] = useState<Element | null>(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let created = false;
		if (!element) {
			created = true;
			const wrapper = document.createElement('div');
			wrapper.setAttribute('id', wrapperId);
			document.body.appendChild(wrapper);
			element = wrapper;
		}
		setWrapper(element);
		return () => {
			if (created && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);
	if (wrapper === null) return null;
	return createPortal(children, wrapper);
};
export default Modal;
