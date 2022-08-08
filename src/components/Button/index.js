import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  small = false,
  large = false,
  disabled,
  leftIcon,
  children,
  onClick,
  ...passProps
}) {
  let Component = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  //  Remove event when button disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  const className = cx('wrapper', {
    primary,
    outline,
    text,
    rounded,
    small,
    large,
    leftIcon,
    disabled,
  });
  return (
    <Component className={className} {...props}>
      {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
      <span>{children}</span>
    </Component>
  );
}

export default Button;
