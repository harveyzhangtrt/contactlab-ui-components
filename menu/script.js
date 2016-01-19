'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuClab = (function () {
	function MenuClab() {
		_classCallCheck(this, MenuClab);
	}

	_createClass(MenuClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'menu-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				titleIcon: {
					type: String,
					value: 'fa-hand-peace-o'
				},
				menu: {
					type: Array,
					value: []
				},
				link: {
					type: String,
					value: '/'
				},
				draft: {
					type: String,
					value: null
				},
				firstChild: {
					type: Boolean,
					value: false
				},
				submenu: {
					type: Object
				},
				_url: {
					type: String
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this._url = location.hash;
			window.addEventListener('hashchange', function (evt) {
				_this._url = location.hash;
			});

			this._iosMenu();
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_openItem',
		value: function _openItem(evt) {
			var i = parseInt(evt.currentTarget.dataset.index);
			this._url = location.hash;
		}
	}, {
		key: '_toggleMenu',
		value: function _toggleMenu(evt) {
			var open = evt.target.parentNode.classList.contains('open-menu');
			if (open) {
				this.querySelector('.main-menu').style.display = 'block';
			} else {
				this.querySelector('.main-menu').style.display = 'none';
			}
		}

		/*---------- 
  METHODS
  ----------*/

	}, {
		key: '_setSubmenu',
		value: function _setSubmenu(current) {
			if (current.submenu) {
				this.set('submenu', current.submenu);
				this.fire('subchange', { links: current.submenu });
			} else {
				this.set('submenu', undefined);
				this.fire('subchange', { links: [] });
			}
		}
	}, {
		key: '_iosMenu',
		value: function _iosMenu() {
			var _this2 = this;

			document.querySelector('body').addEventListener('click', function (evt) {
				switch (evt.target.nodeName) {
					case 'INPUT':
					case 'BUTTON':
					case 'TEXTAREA':
					case 'LABEL':
					case 'SELECT':
						return true;
						break;
					default:
						_this2.querySelector('#main-logo a').focus();
						break;
				}
			});
		}

		/*---------- 
  COMPUTE
  ----------*/

	}, {
		key: '_computeUrl',
		value: function _computeUrl(item) {
			if (this.firstChild && item.submenu) {
				if (item.submenu[0].submenu) {
					// 3 levels
					return item.submenu[0].submenu[0].url;
				} else {
					// 2 levels
					return item.submenu[0].url;
				}
			} else {
				return item.url;
			}
		}
	}, {
		key: '_computeActive',
		value: function _computeActive(url, link, i) {
			var arr = [];
			if (url.search(link) > -1) {
				arr.push('active');
				this._setSubmenu(this.menu[i]);
			}
			return arr.join(' ');
		}
	}, {
		key: '_computeTitleIcon',
		value: function _computeTitleIcon(icon) {
			return ['clab', icon].join(' ');
		}
	}]);

	return MenuClab;
})();

Polymer(MenuClab);