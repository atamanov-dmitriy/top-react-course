import { Link, useLocation } from 'react-router';

function LinkToLesson() {
  const { pathname } = useLocation();
  const to = `https://code.mu/ru/javascript/framework/react/book/prime${pathname}`;

  return (
    <Link to={to} target="_blank">
      Ссылка на текущий урок
    </Link>
  );
}

export default LinkToLesson;
