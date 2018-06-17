/**
 * jquery-backToTop
 *
 * @licence MIT
 * @author Pablo Pizarro @ppizarror.com
 */

;(function (factory) {
    /* global define, define.amd, jQuery */
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
}));