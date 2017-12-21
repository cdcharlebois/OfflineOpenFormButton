define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",


], function(declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent) {
    "use strict";

    return declare("OfflineOpenFormButton.widget.OfflineOpenFormButton", [_WidgetBase], {

        // modeler
        form: null,
        placeholder: null,
        targetButtonName: null,
        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            // get the button
            var button = this.domNode.parentElement.querySelector(".mx-name-" + this.targetButtonName);
            if (button) {
                this.connect(button, "click", lang.hitch(this, function() {
                    var ctx = new mendix.lib.MxContext();
                    ctx.setTrackObject(this._contextObj);
                    mx.ui.openForm(this.form, {
                        location: this.placeholder,
                        context: ctx,
                        callback: lang.hitch(this, function(form) {
                            console.log("showing form " + this.form);
                        })
                    });
                }));
            } else {
                console.error("Could not find the element with class: .mx-name-" + this.targetButtonName + ". Please ensure that it is a sibling of the widget and check your configuration.");
            }


            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["OfflineOpenFormButton/widget/OfflineOpenFormButton"]);