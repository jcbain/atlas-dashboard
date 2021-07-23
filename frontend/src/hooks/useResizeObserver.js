import { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const font = 18;

function useResizeObserver () {
	const [observerEntry, setObserverEntry] = useState({});
	const [node, setNode] = useState(null);
	const observer = useRef(null);
    const [ dimensions, setDimension ] = useState({
        width:0,
        height:0
    });

	const disconnect = useCallback(() => observer.current?.disconnect(), []);

	const observe = useCallback(() => {
		observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
		if (node) observer.current.observe(node);
	}, [node]);

	useEffect(() => {
        if(observerEntry.target) {
            const { target } = observerEntry;
            setDimension({
                width: target.clientWidth,
                height: target.clientHeight-font
            });
        }
    }, [observerEntry]);

	useLayoutEffect(() => {
		observe();
		return () => disconnect();
	}, [disconnect, observe]);

	return [setNode, observerEntry, dimensions];
};

export { useResizeObserver };