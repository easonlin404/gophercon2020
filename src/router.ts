import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home.vue';
import Agenda from './pages/Agenda.vue';
import Activity from './pages/Activity.vue';
import Traffic from './pages/Traffic.vue';
import Venue from './pages/Venue.vue';
import Team from './pages/Team.vue';
import CFP from './pages/CFP.vue';
import { Route } from 'vue-router';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      index: 0,
      label: 'SITCON 2020',
      menuItem: true
    }
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: {
      index: 1,
      label: '議程資訊',
      menuItem: true
    }
  },
  {
    path: '/agenda/:sid',
    name: 'AgendaView',
    component: Agenda,
    meta: {
      menuItem: false
    }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
    meta: {
      index: 2,
      label: '活動',
      menuItem: false
    }
  },
  {
    path: '/activity/:aid',
    name: 'ActivityView',
    component: Activity,
    meta: {
      menuItem: false
    }
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue,
    meta: {
      index: 3,
      label: '會場地圖',
      menuItem: true
    }
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic,
    meta: {
      index: 4,
      label: '交通方式',
      menuItem: true
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    meta: {
      index: 5,
      label: 'SITCON 團隊',
      menuItem: true
    }
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    redirect: '/team/sponsor',
    meta: {
      label: '贊助',
      menuItem: true
    }
  },
  {
    path: '/team/:tid',
    name: 'TeamView',
    component: Team,
    meta: {
      menuItem: false
    }
  },
  {
    path: '/cfp',
    name: 'CFP',
    component: CFP,
    meta: {
      menuItem: false
    }
  }
];

const router = new Router({
  mode: 'history',
  base: '/2020/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'CFP' && to.query.popUp && to.hash) {
      const target = document.querySelector(`.popup-content>${to.hash}`) as HTMLElement;
      const popUp = document.querySelector(`.popup-content`) as HTMLElement;
      const popupPadding = 24;

      return window.scrollTo({
        top: target.offsetTop + popUp.offsetTop - popupPadding,
        behavior: 'smooth'
      });
    } else if (to.hash) {
      const target = document.querySelector(to.hash) as HTMLElement;

      return window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to: Route, from: Route, next: (...args: any[]) => any) => {
  if (from.path.startsWith('/activity') && to.path === '/activity') {
    next(false);
  } else {
    next();
  }
});

export default router;
