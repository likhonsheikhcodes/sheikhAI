import React from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

interface ResizablePanelsProps {
  children: React.ReactNode[];
  direction?: 'horizontal' | 'vertical';
  sizes?: number[];
  className?: string;
  onResize?: (sizes: number[]) => void;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  children,
  direction = 'horizontal',
  sizes = [],
  className = '',
  onResize,
}) => {
  // Default sizes if not provided
  const defaultSizes = 
    sizes.length === children.length 
      ? sizes 
      : Array(children.length).fill(100 / children.length);

  return (
    <PanelGroup
      direction={direction}
      onLayout={onResize}
      className={className}
    >
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <PanelResizeHandle className={`
              flex justify-center items-center
              ${direction === 'horizontal' 
                ? 'w-2 cursor-col-resize hover:bg-gray-300 dark:hover:bg-gray-700'
                : 'h-2 cursor-row-resize hover:bg-gray-300 dark:hover:bg-gray-700'
              }
              transition-colors duration-200
            `}>
              <div className={`
                ${direction === 'horizontal' 
                  ? 'w-1 h-8'
                  : 'h-1 w-8'
                }
                bg-gray-200 dark:bg-gray-700 rounded-full
              `} />
            </PanelResizeHandle>
          )}
          <Panel 
            defaultSize={defaultSizes[index]}
            minSize={10}
          >
            {child}
          </Panel>
        </React.Fragment>
      ))}
    </PanelGroup>
  );
};

export default ResizablePanels;