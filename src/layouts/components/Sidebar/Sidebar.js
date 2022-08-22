import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import { HomeIcon, HomeActiveIcon, FollowIcon, FollowActiveIcon, LiveIcon, LiveActiveIcon } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestAccounts from '~/components/SuggestAccounts';

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem to={config.routes.home} title={'For you'} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem
          to={config.routes.following}
          title={'Following'}
          icon={<FollowIcon />}
          activeIcon={<FollowActiveIcon />}
        />
        <MenuItem to={config.routes.live} title={'LIVE'} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>

      <SuggestAccounts label={'Suggested accounts'} />
      <SuggestAccounts label={'Following accounts'} />
    </aside>
  );
}

export default Sidebar;
