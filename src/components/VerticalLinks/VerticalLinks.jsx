import { Fragment } from 'react/jsx-runtime';
import { Link, useLocation } from 'react-router';
import { paths } from '../../consts';
import styles from './VerticalLinks.module.scss';
import clsx from 'clsx';

const rootClass = styles['vertical-links'];
const listClass = styles['vertical-links__list'];
const titleClass = styles['vertical-links__title'];
const linkClass = styles['vertical-links__link'];
const activeLinkClass = styles['vertical-links__link--active'];

function VerticaLinks() {
  const { pathname } = useLocation();

  return (
    <div class={rootClass}>
      <ul class={listClass}>
        {paths.map(({ path, title, chapter }, index) => {
          const hasDivider = chapter !== paths[index - 1]?.chapter;
          const isActive = pathname === path;

          return (
            <Fragment key={path}>
              {hasDivider && (
                <li class={titleClass}>
                  <b>{chapter}</b>
                </li>
              )}
              <li key={index}>
                <Link
                  to={path}
                  class={clsx(linkClass, isActive && activeLinkClass)}
                >
                  {String(index + 1).padStart(3, '0')}. {title.slice(0, 12)}...
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
export default VerticaLinks;
