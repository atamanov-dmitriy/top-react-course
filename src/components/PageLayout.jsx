import Container from './Container';
import Links from './Links';
import LinkToLesson from './LinkToLesson';
import PathsList from './PathsList';
import styles from './PageLayout.module.scss';

function PageLayout({ children }) {
  return (
    <div class={styles['page-layout']}>
      <Container as="header" class={styles['page-layout__header']}>
        <Links />
        <LinkToLesson />
      </Container>
      <main class={styles['page-layout__main']}>
        <Container class={styles['page-layout__content']}>
          <PathsList />
        </Container>
      </main>
      <Container as="footer" class={styles['page-layout__footer']}>
        Footer
      </Container>
    </div>
  );
}

export default PageLayout;
