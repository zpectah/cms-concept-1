import { memo, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { WithChildren } from '@common';

interface DynamicPortalProps extends WithChildren {
  targetId: string;
}

const DynamicPortal = ({ children, targetId }: DynamicPortalProps): null | ReactNode => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!targetId) return;

    const initialElement = document.getElementById(targetId);

    if (initialElement) {
      setTargetElement(initialElement);

      return;
    }

    const callback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const newElement = document.getElementById(targetId);

          if (newElement) {
            setTargetElement(newElement);
            observer.disconnect();

            return;
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, [targetId]);

  if (!targetElement) {
    return null;
  }

  return createPortal(children, targetElement) as ReactNode;
};

export default memo(DynamicPortal);
