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
         * @since 0.0.1
         */
        let defaults = {
            bottom: 20,     // Bottom fixed position (px)
            height: 35,     // Height of the button (px)
            right: 20,      // Right fixed position (px)
            width: 35,      // Width of the button (px)
            zIndex: 999,    // z-Index of the div container
        };

    };

    /**
     * Create jQuery plugin
     */
    $.fn.backToTop = function (options) {
        return new _BackToTop(options);
    }

}));