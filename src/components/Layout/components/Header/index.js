import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEllipsisVertical, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import logo from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
  FeedbackIcon,
  InboxIcon,
  KeyboardIcon,
  LanguageIcon,
  LogOutIcon,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
  SettingIcon,
  TiktokCoinIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <LanguageIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FeedbackIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'Keyboard shortcuts',
  },
];
function Header() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 3000);
  }, []);

  // Handle logic
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const currentUser = true;
  const USER_MENU = [
    {
      icon: <ProfileIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'View profile',
      to: '/@huy3kk',
    },
    {
      icon: <TiktokCoinIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogOutIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Log out',
      to: '/logout',
      separate: 'separate',
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <img className={cx('tiktok-logo')} src={logo.src} alt="tiktok-logo" />
        <HeadlessTippy
          interactive
          visible={searchResult.length > 0}
          render={(attrs) => {
            return (
              <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                <PopperWrapper>
                  <h4 className={cx('search-title')}>Accounts</h4>
                  <AccountItem />
                  <AccountItem />
                  <AccountItem />
                </PopperWrapper>
              </div>
            );
          }}
        >
          <div className={cx('search')}>
            <input placeholder="Search accounts and videos" spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <button className={cx('search-btn')}>
              <SearchIcon width="2.4rem" height="2.4rem" className="search-icon" />
            </button>
          </div>
        </HeadlessTippy>
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                <span>Upload</span>
              </Button>
              <Tippy content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                <span>Upload</span>
              </Button>
              <Button primary>Login</Button>
            </>
          )}
          <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('user-avatar')}
                alt="avatar"
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/3076832c615a895e39ee03cd549a6eff~c5_720x720.jpeg?x-expires=1660024800&x-signature=3d%2BaA3%2FNNaiis5g3pPlnUE%2BjDek%3D"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
