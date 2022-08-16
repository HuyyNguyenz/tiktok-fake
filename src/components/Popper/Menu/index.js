import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, history.length - 1));
  };

  // Reset to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  const renderResult = (attrs) => {
    return (
      <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
        <PopperWrapper className={cx('menu-popper')}>
          {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
          <div className={cx('menu-language')}>{renderItems()}</div>
        </PopperWrapper>
      </div>
    );
  };

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  return (
    <Tippy
      delay={[0, 1000]}
      offset={[8, 8]}
      interactive
      placement="bottom-end"
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default Menu;
