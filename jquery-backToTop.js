/**
 * jquery-backToTop
 *
 * @licence MIT
 * @author Pablo Pizarro @ppizarror.com
 * @version 0.0.5
 */

;(function (factory) {
    /* global define, define.amd */
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
     * @param {object} options - Initial creation options
     * @private
     */
    let _BackToTop = function (options) {

        /**
         * Default options
         * @private
         * @since 0.0.1
         */
        let _defaults = {
            backgroundColor: '#5d3d7a',         // Color of the backToTop, not all themes support this
            bottom: 20,                         // Bottom fixed position (px)
            container: $('body'),               // Container of the object
            effect: 'none',                     // Effect of the button
            enabled: true,                      // Back-to-top enabled when created
            height: 70,                         // Height of the button (px), not all themes support this
            onClick: function () {              // Function that is called when button is pressed
                $(window).scrollTop(0);
            },
            pxToTrigger: 600,                   // Scroll px to trigger the backToTop
            right: 20,                          // Right fixed position (px), not all themes support this
            theme: 'default',                   // Theme of the button
            width: 70,                          // Width of the button (px), not all themes support this
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
         * Saves pointer to object
         * @type {_BackToTop}
         * @private
         * @since 0.0.1
         */
        let self = this;

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
                'height': this._options.height + 'px',
                'right': this._options.right + 'px',
                'width': this._options.width + 'px',
                'z-index': this._options.zIndex,
            });

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
         * @since 0.0.6
         */
        this.show = function () {
            this._obj.removeClass(this._actualEffect.off);
            this._obj.addClass(this._actualEffect.on);
            self._opened = true;
        };

        /**
         * Hide the button
         * @function
         * @since 0.0.6
         */
        this.hide = function () {
            this._obj.removeClass(this._actualEffect.on);
            this._obj.addClass(this._actualEffect.off);
            self._opened = false;
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
            // noinspection JSValidateTypes
            if ($(window).scrollTop() > self._options.pxToTrigger) { // Open
                if (this._opened) return;
                self.show();
            } else { // Close
                if (!this._opened) return;
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
             * Apply window scroll event
             */
            $(window).off('scroll.backToTop');
            $(window).on('scroll.backToTop', function () {
                self._checkScroll();
            });

            /**
             * Button click
             */
            this._obj.off('click.backToTop');
            this._obj.on('click.backToTop', function (e) {
                e.preventDefault();
                self._options.onClick();
            });

        };

        /**
         * Creates DOM object
         */
        // noinspection JSJQueryEfficiency
        if ($('#back-to-top-container').length === 0) {

            /**
             * Creates object
             */
            $(this._options.container).append('<div id="back-to-top-container" class="jquery-back-to-top"></div>');
            self._obj = $('#back-to-top-container');

            /**
             * Apply theme and effect
             */
            this._applyTheme(this._options.theme);

            /**
             * Set effects
             */
            this._applyEffect(this._options.effect);

            /**
             * Init event
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