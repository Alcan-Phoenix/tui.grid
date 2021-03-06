/**
 * @fileoverview Controller class to handle actions from the painters
 * @author NHN Ent. FE Development Team
 */
'use strict';

var util = require('../common/util');

/**
 * Controller class to handle actions from the painters
 * @module painter/controller
 */
var PainterController = tui.util.defineClass(/**@lends module:painter/controller.prototype */{
    /**
     * @constructs
     * @param {Object} options - options
     */
    init: function(options) {
        this.focusModel = options.focusModel;
        this.dataModel = options.dataModel;
        this.columnModel = options.columnModel;
        this.selectionModel = options.selectionModel;
    },

    /**
     * Starts editing a cell identified by a given address, and returns the result.
     * @param {{rowKey:String, columnName:String}} address - cell address
     * @param {Boolean} force - if set to true, finish current editing before start.
     * @returns {Boolean} true if succeeded, false otherwise
     */
    startEditing: function(address, force) {
        var result;

        if (force) {
            this.focusModel.finishEditing();
        }

        result = this.focusModel.startEditing(address.rowKey, address.columnName);

        if (result) {
            this.selectionModel.end();
        }

        return result;
    },

    /**
     * Ends editing a cell identified by a given address, and returns the result.
     * @param {{rowKey:String, columnName:String}} address - cell address
     * @param {Boolean} shouldBlur - if set to true, make the current input lose focus.
     * @param {String} [value] - if exists, set the value of the data model to this value.
     * @returns {Boolean} - true if succeeded, false otherwise
     */
    finishEditing: function(address, shouldBlur, value) {
        var focusModel = this.focusModel;
        var row, currentValue;

        if (!focusModel.isEditingCell(address.rowKey, address.columnName)) {
            return false;
        }

        this.selectionModel.enable();

        if (!_.isUndefined(value)) {
            row = this.dataModel.get(address.rowKey);
            currentValue = row.get(address.columnName);

            if (!(util.isBlank(value) && util.isBlank(currentValue))) {
                this.setValue(address, value);
                row.validateCell(address.columnName);
            }
        }
        focusModel.finishEditing();

        if (shouldBlur) {
            focusModel.focusClipboard();
        } else {
            _.defer(function() {
                focusModel.refreshState();
            });
        }

        return true;
    },

    /**
     * Moves focus to the next cell, and starts editing the cell.
     * @param {Boolean} reverse - if set to true, find the previous cell instead of next cell
     */
    focusInToNextCell: function(reverse) {
        var focusModel = this.focusModel;
        var rowKey = focusModel.get('rowKey');
        var columnName = focusModel.get('columnName');
        var nextColumnName = reverse ? focusModel.prevColumnName() : focusModel.nextColumnName();

        if (columnName !== nextColumnName) {
            focusModel.focusIn(rowKey, nextColumnName, true);
        }
    },

    /**
     * Executes the custom handler (defined by user) of the input events.
     * @param {Event} event - DOM Event object
     * @param {{rowKey:String, columnName:String}} address - cell address
     */
    executeCustomInputEventHandler: function(event, address) {
        var columnModel = this.columnModel.getColumnModel(address.columnName);
        var eventType = event.type;
        var eventHandler;

        if (eventType === 'focusin') {
            eventType = 'focus';
        } else if (eventType === 'focusout') {
            eventType = 'blur';
        }

        eventHandler = tui.util.pick(columnModel, 'editOption', 'inputEvents', eventType);

        if (_.isFunction(eventHandler)) {
            eventHandler.call(event.target, event, address);
        }
    },

    /**
     * Appends an empty row and moves focus to the first cell of the row.
     */
    appendEmptyRowAndFocus: function() {
        this.dataModel.append({}, {
            focus: true
        });
    },

    /**
     * Sets the value of the given cell.
     * @param {{rowKey:String, columnName:String}} address - cell address
     * @param {(Number|String|Boolean)} value - value
     */
    setValue: function(address, value) {
        this.dataModel.setValue(address.rowKey, address.columnName, value);
    }
});

module.exports = PainterController;
