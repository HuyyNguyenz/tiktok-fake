import HeaderOnly from '~/components/Layout/HeaderOnly';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import configRoutes from '~/config/routes';

const publicRoutes = [
  {
    path: configRoutes.home,
    component: Home,
  },
  {
    path: configRoutes.following,
    component: Following,
  },
  {
    path: configRoutes.profile,
    component: Profile,
  },
  {
    path: configRoutes.upload,
    component: Upload,
    layout: HeaderOnly,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
