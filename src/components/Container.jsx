import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

function Container({
  as: Component = 'div',
  class: classProp,
  className,
  children,
  ...props
}) {
  const combinedClasses = clsx(styles.container, classProp, className);

  return (
    <Component class={combinedClasses} className={combinedClasses} {...props}>
      {children}
    </Component>
  );
}

export default Container;
