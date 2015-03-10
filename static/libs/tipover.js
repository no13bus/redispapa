// Copyright (c) 2013 Clay Street Online LLC
// http://www.claystreet.com
//
// MIT License
// http://opensource.org/licenses/MIT
//
// NOTE: This file is not intended to be utilized as a standalone Javascsript
//       file in production code.  So...
//       Please copy/paste the functions below into your Javascript
//       ...ideally within a protected namespace
//       ...rename as desired
//
//-----------------------------------------------------------------------------

// Allows a custom className to be added to Bootstrap tooltips (which enables custom styling)
// Note: 'tooltip-custom.less' can be used to facilitate generating css
// Usage:
//         $('#myTooltip').tooltip(ttOptions('myTipStyle', {'placement': 'top'}));
function ttOptions(classStr, options) {
    if ($.isPlainObject(classStr)) {
        options = classStr;
        classStr = '';
    }
    return $.extend({'template': '<div class="tooltip ' + classStr + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}, options);
}

// Allows a custom className to be added to Bootstrap popovers (which enables custom styling)
// Note: 'popover-custom.less' can be used to facilitate generating css
// Usage:
//         $('#myPopover').popover(poOptions('myPopoverStyle', {'placement': 'right'}));
function poOptions(classStr, options) {
    if ($.isPlainObject(classStr)) {
        options = classStr;
        classStr = '';
    }
    return $.extend({'template': '<div class="popover ' + classStr + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}, options);
}
