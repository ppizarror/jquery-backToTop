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
     * @param {object} options - Initial creation options
     * @class
     * @private
     */
    let _BackToTop = function (options) {

        /**
         * Default options
         * @private
         * @since 0.0.1
         */
        let _defaults = {
            autoOpen: true,         // Open back-to-top when created
            bottom: 20,             // Bottom fixed position (px)
            container: $('body'),   // Container of the object
            effect: 'none',         // Effect of the button
            height: 35,             // Height of the button (px)
            right: 20,              // Right fixed position (px)
            theme: 'default',       // Theme of the button
            width: 35,              // Width of the button (px)
            zIndex: 999,            // z-Index of the div
        };
        this._options = $.extend(_defaults, options);

        /**
         * back-to-top main div
         * @type {jQuery | HTMLElement | null}
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
         * Saves pointer to object
         * @type {_BackToTop}
         * @private
         * @since 0.0.1
         */
        let self = this;

        /**
         * Append back-to-top div if not created
         */
        // noinspection JSJQueryEfficiency
        if ($('#back-to-top-container').length === 0) {

            /**
             * Creates object
             */
            $(this._options.container).append('<div id="back-to-top-container" class="jquery-back-to-top"></div>');
            this._obj = $('#back-to-top-container');

            /**
             * Apply theme and effect
             */
        }

    };

    /**
     * Create jQuery plugin
     */
    $.backToTop = function (options) {
        return new _BackToTop(options);
    };

}));