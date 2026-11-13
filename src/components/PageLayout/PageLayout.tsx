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

function PageLayout() {
  const [width, setWidth] = useState(200);

  const handleResize = useCallback(
    (_: SyntheticEvent, { size }: ResizeCallbackData) => {
      setWidth(size.width);
    },
    [],
  );

  return (
    <div className={styles['page-layout']}>
      <Resizable
        axis="x"
        width={width}
        height={0}
        resizeHandles={['e']}
        handle={<ResizeHandler />}
        onResize={handleResize}
      >
        <aside
          className={styles['page-layout__left-aside']}
          style={{ flexBasis: width + 'px' }}
        >
          <VerticalLinks />
        </aside>
      </Resizable>
      <div className={styles['page-layout__content-wrapper']}>
        <Container className={styles['page-layout__content']}>
          <header className={styles['page-layout__header']}>
            <LinkToLesson />
          </header>
          <main className={styles['page-layout__main']}>
            <PathsList />
            <div style={{ height: '1000px', background: 'lightyellow' }}></div>
          </main>
          <footer className={styles['page-layout__footer']}>Footer</footer>
        </Container>
      </div>
    </div>
  );
}

export default PageLayout;
