/**
 * jquery-backToTop
 *
 * @licence MIT
 * @author Pablo Pizarro @ppizarror.com
 * @version 0.0.1
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
            autoOpen: true,             // Open back-to-top when created
            bottom: 20,                 // Bottom fixed position (px)
            container: $('body'),       // Container of the object
            effect: 'none',             // Effect of the button
            height: 35,                 // Height of the button (px)
            right: 20,                  // Right fixed position (px)
            theme: 'default',           // Theme of the button
            width: 35,                  // Width of the button (px)
            zIndex: 999,                // z-Index of the div
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
         * Actual button theme
         * @type {string}
         * @private
         * @since 0.0.3
         */
        this._actualTheme = '';

        /**
         * Actual effect theme
         * @type {string}
         * @private
         * @since 0.0.3
         */
        this._actualEffect = '';

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
            this._actualTheme = 'jquery-back-to-top-' + theme + '-default';

            /**
             * Apply theme class
             */
            this._obj.addClass(this._actualTheme);

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

        }

    };

    /**
     * Create jQuery plugin
     */
    $.backToTop = function (options) {
        return new _BackToTop(options);
    };

}));