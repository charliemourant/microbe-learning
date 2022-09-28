import React, { useRef, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
    selector: string;
}

export const Portal: React.FC<PortalProps> = ({ children, selector }) => {
    const ref = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    return mounted && ref.current ? createPortal(children, ref.current) : null;
};
