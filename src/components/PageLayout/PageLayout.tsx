import { useCallback, useState } from 'react';
import { Resizable } from 'react-resizable';
import Container from '../Container/Container.tsx';
import LinkToLesson from '../LinkToLesson.tsx';
import PathsList from '../PathsList.tsx';
import VerticalLinks from '../VerticalLinks/VerticalLinks.tsx';
import ResizeHandler from '../ResizeHandler/ResizeHandler.tsx';
import styles from './PageLayout.module.scss';
import type { SyntheticEvent } from 'react';
import type { ResizeCallbackData } from 'react-resizable';

const rootClass = styles['page-layout'];
const contentWrapperClass = styles['page-layout__content-wrapper'];
const contentClass = styles['page-layout__content'];
const headerClass = styles['page-layout__header'];
const mainClass = styles['page-layout__main'];
const footerClass = styles['page-layout__footer'];

const leftAsideWrapperClass = styles['page-layout__left-aside-wrapper'];
const asideClass = styles['page-layout__aside'];

function PageLayout() {
  const [width, setWidth] = useState(200);

  const handleResize = useCallback(
    (_: SyntheticEvent, { size }: ResizeCallbackData) => {
      setWidth(size.width);
    },
    [],
  );

  return (
    <div className={rootClass}>
      <Resizable
        axis="x"
        width={width}
        height={0}
        resizeHandles={['e']}
        handle={<ResizeHandler />}
        onResize={handleResize}
      >
        <div
          className={leftAsideWrapperClass}
          style={{ flexBasis: width + 'px' }}
        >
          <aside className={asideClass}>
            <VerticalLinks />
          </aside>
        </div>
      </Resizable>
      <div className={contentWrapperClass}>
        <Container className={contentClass}>
          <header className={headerClass}>
            <LinkToLesson />
          </header>
          <main className={mainClass}>
            <PathsList />
            {/* <div style={{ height: '1000px', background: 'lightyellow' }}></div> */}
          </main>
          <footer className={footerClass}>Footer</footer>
        </Container>
      </div>
    </div>
  );
}

export default PageLayout;
