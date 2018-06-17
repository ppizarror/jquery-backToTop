/**
 * jquery-backToTop
 *
 * @license MIT
 * @author Pablo Pizarro @ppizarror.com
 * @version 0.1.6
 */

;(function (factory) {
    /** @namespace define.amd */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module
        define(['jquery'], factory)
    } else {
        // Browser globals
        factory(jQuery)
    }
}(function ($) {
    "use scrict";

    /**
     * BackToTop class
     *
     * @class
     * @param {object=} options - Initial creation options
     * @private
     */
    let _BackToTop = function (options) {

        /**
         * Version
         * @type {string}
         * @private
         */
        this._version = '0.1.6';

        /**
         * Saves body selector
         * @type {jQuery | JQuery | HTMLElement}
         * @private
         */
        this._body = $('body');

        /**
         * Default options
         * @private
         * @since 0.0.1
         */
        let _defaults = {
            backgroundColor: '#5d5d5d',         // [theme] Color of the backToTop
            bottom: 20,                         // Bottom fixed position (px)
            color: '#ffffff',                   // [theme] Text color
            container: this._body,              // Container of the object
            divFloat: 'right',                  // Float left,right
            effect: 'none',                     // Effect of the button
            enabled: true,                      // Back-to-top enabled when created
            height: 70,                         // Height of the button (px)
            icon: 'fas fa-chevron-up',          // [theme] Font-awesome icon
            pxToTrigger: 600,                   // Scroll px to trigger the backToTop
            right: 20,                          // Right fixed position (px)
            scrollAnimation: 0,                 // Scroll animation
            theme: 'default',                   // Theme of the button
            width: 70,                          // Width of the button (px)
            zIndex: 999,                        // z-Index of the div
        };
        this._options = $.extend(_defaults, options);

        /**
         * back-to-top main div
         * @type {jQuery | HTMLElement | JQuery | null}
         * @private
         * @since 0.0.1
         */
        this._obj = null;

        /**
         * Indicates the current status of the back-to-top
         * @type {boolean}
         * @private
         * @since 0.0.1
         */
        this._opened = false;

        /**
         * Indicates that the button is enabled
         * @type {boolean}
         * @private
         * @since 0.0.4
         */
        this._enabled = this._options.enabled;

        /**
         * Actual button theme
         * @type {string}
         * @private
         * @since 0.0.3
         */
        this._actualTheme = '';

        /**
         * Actual effect theme
         * @private
         * @since 0.0.3
         */
        this._actualEffect = {
            off: '',
            on: '',
        };

        /**
         * Indicates that position is fixed, used for 'body' container
         * @type {boolean}
         * @private
         */
        this._fixed = false;

        /**
         * Saves pointer to object
         * @type {_BackToTop}
         * @private
         * @since 0.0.1
         */
        let self = this;

        /**
         * Generates safe random ID, https://stackoverflow.com/a/2117523
         * @function
         * @returns {string}
         */
        this._randomID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        /**
         * Apply a theme to the button
         * @function
         * @param {string} theme - Theme of the button
         * @private
         * @since 0.0.3
         */
        this._applyTheme = function (theme) {

            /**
             * If button is has not been built returns
             */
            if (this._obj === null) return;

            /**
             * If previous theme has been applied
             */
            if (this._actualTheme !== '') {
                this._obj.removeClass(this._actualTheme);
            }

            /**
             * Generates CSS theme name
             */
            this._actualTheme = 'jquery-back-to-top-theme-' + theme;

            /**
             * Apply theme class
             */
            this._obj.addClass(this._actualTheme);

            /**
             * Defines default styles (width,size,color,etc)
             */
            this._obj.css({
                'background-color': this._options.backgroundColor,
                'bottom': this._options.bottom + 'px',
                'color': this._options.color,
                'float': this._options.divFloat,
                'height': this._options.height + 'px',
                'line-height': this._options.height + 'px',
                'right': this._options.right + 'px',
                'width': this._options.width + 'px',
                'z-index': this._options.zIndex,
            });

            // Set button position
            if (!this._fixed) {
                this._obj.css('position', 'sticky');
            } else {
                this._obj.css('position', 'fixed');
            }

        };

        /**
         * Public function that changes button theme
         * @function
         * @param {string} theme - Theme name
         * @since 0.0.6
         */
        this.changeTheme = function (theme) {
            this._options.theme = theme;
            this._applyTheme(theme);
        };

        /**
         * Apply effect
         * @param {string} effect - Effect name
         * @private
         * @since 0.0.5
         */
        this._applyEffect = function (effect) {

            /**
             * If button is has not been built returns
             */
            if (this._obj === null) return;

            /**
             * Remove classes if present
             */
            if (this._actualEffect.on !== '') this._obj.removeClass(this._actualEffect.on);
            if (this._actualEffect.off !== '') this._obj.removeClass(this._actualEffect.off);

            /**
             * Create class name
             */
            this._actualEffect.on = 'jquery-back-to-top-status-on jquery-back-to-top-effect-' + effect + '-on';
            this._actualEffect.off = 'jquery-back-to-top-status-off jquery-back-to-top-effect-' + effect + '-off';

        };

        /**
         * Public function that changes button effect
         * @function
         * @param {string} effect - Effect name
         * @since 0.0.6
         */
        this.changeEffect = function (effect) {
            this._options.effect = effect;
            this._applyEffect(effect);
        };

        /**
         * Opens the button
         * @function
         * @param {boolean=} disableEffect - Open with no efect
         * @since 0.0.6
         */
        this.show = function (disableEffect) {
            this._obj.removeClass(this._actualEffect.off);
            if (disableEffect) {
                this._obj.addClass('jquery-back-to-top-status-on');
            } else {
                this._obj.addClass(this._actualEffect.on);
            }
            self._opened = true;
        };

        /**
         * Hide the button
         * @function
         * @param {boolean=} disableEffect - Hide with no efect
         * @since 0.0.6
         */
        this.hide = function (disableEffect) {
            this._obj.removeClass(this._actualEffect.on);
            if (disableEffect) {
                this._obj.addClass('jquery-back-to-top-status-off');
            } else {
                this._obj.addClass(this._actualEffect.off);
            }
            self._opened = false;
        };

        /**
         * Toggles the button
         * @function
         * @param {boolean=} disableEffect - Disables the effect
         * @since 0.1.1
         */
        this.toggle = function (disableEffect) {
            if (self._opened) {
                this.hide(disableEffect);
            } else {
                this.show(disableEffect);
            }
        };

        /**
         * Enables/disables the button
         * @function
         * @param {boolean} status - true: enables, false: disables
         * @param {boolean=} disableEffect - Disables the effect
         * @since 0.1.1
         */
        this.enable = function (status, disableEffect) {
            this._enabled = status;
            if (!this._enabled && this._opened) this.hide(disableEffect)
        };

        /**
         * Check window scroll, if scrolled px is greater than options then open, otherwise close
         * @function
         * @private
         * @since 0.0.4
         */
        this._checkScroll = function () {

            /**
             * Object is disabled
             */
            if (!self._enabled) return;

            /**
             * Open-Close depending of the scroll
             */
            if (self._options.container.scrollTop() > self._options.pxToTrigger) { // Open
                if (self._opened) return;
                self.show();
            } else { // Close
                if (!self._opened) return;
                self.hide();
            }

        };

        /**
         * Init main scroll event
         * @function
         * @private
         */
        this._initEvent = function () {

            /**
             * Generates event ID
             */
            let $id = this._randomID();

            /**
             * Apply window scroll event
             */
            self._options.container.on('scroll.' + $id, function () {
                self._checkScroll();
            });

            /**
             * Button click
             */
            this._obj.off('click.backToTop');
            this._obj.on('click.backToTop', function (e) {
                e.preventDefault();
                if (self._options.scrollAnimation === 0) {
                    self._options.container.scrollTop(0);
                } else {
                    self._options.container.animate({
                        scrollTop: 0
                    }, self._options.scrollAnimation);
                }
            });

        };

        /**
         * Init
         */
        // noinspection JSJQueryEfficiency
        if ($(this._options.container).find('.back-to-top-container').length === 0) {

            /**
             * Creates object
             */
            let $id = this._randomID();
            $(this._options.container).append('<div id="' + $id + '" class="jquery-back-to-top"><i class="' + this._options.icon + '"></i></div>');
            self._obj = $('#' + $id);

            /**
             * If container is body changes to window
             */
            if (this._options.container.get(0) === this._body.get(0)) {
                self._options.container = $(window);
                self._fixed = true; // fixed instead of sticky
            }

            /**
             * Apply theme and effect
             */
            this._applyTheme(this._options.theme);

            /**
             * Set effects
             */
            this._applyEffect(this._options.effect);

            /**
             * Init events
             */
            this._initEvent();

        }

    };

    /**
     * Create jQuery plugin
     */
    $.backToTop = function (options) {
        return new _BackToTop(options);
    };

}));