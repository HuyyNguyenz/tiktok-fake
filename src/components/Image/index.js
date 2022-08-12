import { forwardRef, useState } from 'react';
import image from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

const Image = forwardRef(({ fallback: customFallback = image.noImage, className, alt, src, ...props }, ref) => {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      alt={alt}
      src={fallback || src}
      {...props}
      onError={handleError}
    />
  );
});

export default Image;
