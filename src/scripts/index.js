import '../views/index.pug';
import '../styles/main.styl';
import $ from 'jquery';
import fastclick from 'fastclick';
import initHeaderNav from './modules/init-header-nav';
import initHeaderElements from './modules/init-header-elements';

fastclick.attach(document.body);
initHeaderNav();
initHeaderElements();
