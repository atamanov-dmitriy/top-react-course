import Container from '../Container/Container';
import LinkToLesson from '../LinkToLesson';
import PathsList from '../PathsList';
import styles from './PageLayout.module.scss';
import VerticalLinks from '../VerticalLinks/VerticalLinks';

function PageLayout({ children }) {
  return (
    <div class={styles['page-layout']}>
      <aside class={styles['page-layout__left-aside']}>
        <VerticalLinks />
      </aside>
      <Container class={styles['page-layout__main']}>
        <header class={styles['page-layout__header']}>
          <LinkToLesson />
        </header>
        <main class={styles['page-layout__content']}>
          <PathsList />
        </main>
        <footer class={styles['page-layout__footer']}>Footer</footer>
      </Container>
    </div>
  );
}

export default PageLayout;
