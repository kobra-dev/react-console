var Console =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	__webpack_require__(2);
	var ConsolePrompt = (function (_super) {
	    __extends(ConsolePrompt, _super);
	    function ConsolePrompt() {
	        _super.apply(this, arguments);
	        this.child = {};
	        // DOM Management
	        this.updateSemaphore = 0;
	    }
	    // Component Lifecycle
	    ConsolePrompt.prototype.componentDidMount = function () {
	        this.idle();
	    };
	    ConsolePrompt.prototype.componentDidUpdate = function () {
	        this.idle();
	    };
	    ConsolePrompt.prototype.idle = function () {
	        var _this = this;
	        // Blink cursor when idle
	        if (this.child.cursor) {
	            if (this.updateSemaphore == 0) {
	                this.child.cursor.className = "react-console-cursor";
	            }
	            this.updateSemaphore++;
	            window.setTimeout(function () {
	                _this.updateSemaphore--;
	                if (_this.updateSemaphore == 0 && _this.child.cursor) {
	                    _this.child.cursor.className = "react-console-cursor react-console-cursor-idle";
	                }
	            }, 1000);
	        }
	    };
	    ConsolePrompt.prototype.renderValue = function () {
	        var _this = this;
	        if (this.props.point < 0) {
	            return [this.props.value];
	        }
	        else if (this.props.point == this.props.value.length) {
	            return [this.props.value, React.createElement("span", {ref: function (ref) { return _this.child.cursor = ref; }, key: "cursor", className: "react-console-cursor"}, " ")];
	        }
	        else {
	            return [this.props.value.substring(0, this.props.point),
	                React.createElement("span", {ref: function (ref) { return _this.child.cursor = ref; }, key: "cursor", className: "react-console-cursor"}, this.props.value.substring(this.props.point, this.props.point + 1)),
	                this.props.value.substring(this.props.point + 1)];
	        }
	    };
	    ConsolePrompt.prototype.render = function () {
	        var label = this.props.label;
	        if (this.props.argument) {
	            var idx = label.lastIndexOf("\n");
	            if (idx >= 0) {
	                label = label.substring(0, idx + 1);
	            }
	            else {
	                label = '';
	            }
	        }
	        return React.createElement("div", {className: "react-console-prompt-box"}, React.createElement("span", {className: "react-console-prompt-label"}, label), React.createElement("span", {className: "react-console-prompt-argument"}, this.props.argument), React.createElement("span", {className: "react-console-prompt"}, this.renderValue()));
	    };
	    ConsolePrompt.defaultProps = {
	        point: -1,
	        value: "",
	        label: "> ",
	        argument: null,
	    };
	    return ConsolePrompt;
	}(React.Component));
	var ConsoleTableHeader = function (props) {
	    if (props.headers) {
	        return React.createElement("thead", null, React.createElement("tr", null, props.headers.map(function (header) {
	            return React.createElement("th", {scope: "col", key: header}, header);
	        })));
	    }
	    return null;
	};
	var ConsoleMessage = function (props) {
	    if (props.isTable) {
	        var data = props.value[0];
	        return React.createElement("div", {className: "react-console-message react-console-table" + (props.type ? " react-console-message-" + props.type : "")}, React.createElement("table", null, React.createElement(ConsoleTableHeader, {headers: data.headers}), React.createElement("tbody", null, data.rows && data.rows.map(function (row, index) {
	            return React.createElement("tr", {key: index}, row.map(function (cell, cellIndex) {
	                if (typeof cell === 'string') {
	                    return React.createElement("td", {key: cellIndex}, cell);
	                }
	                else if (typeof cell === 'object' && cell.type === 'link') {
	                    return React.createElement("td", {key: cellIndex}, React.createElement("a", {href: cell.href, target: cell.target ? cell.target : ''}, cell.text));
	                }
	                else {
	                    return React.createElement("td", {key: cellIndex}, JSON.stringify(cell));
	                }
	            }));
	        }))));
	    }
	    else {
	        return React.createElement("div", {className: "react-console-message" + (props.type ? " react-console-message-" + props.type : "")}, props.value.map(function (val, i) {
	            if (typeof val == 'string') {
	                return React.createElement("div", {key: i}, val);
	            }
	            else if (typeof val === 'object' && val.type === 'link') {
	                return React.createElement("div", {key: i}, React.createElement("a", {href: val.href, target: val.target ? val.target : ''}, val.text));
	            }
	            else {
	                return React.createElement("div", {key: i}, JSON.stringify(val));
	            }
	        }));
	    }
	};
	ConsoleMessage.defaultProps = {
	    type: null,
	    value: [],
	    isTable: false
	};
	;
	;
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.child = {};
	        // Command API
	        this.setBusy = function () {
	            _this.setState({ acceptInput: false });
	        };
	        this.getSafeLog = function () {
	            if (!_this.state.log.length) {
	                _this.state.log.push({ label: '', command: '', message: [] });
	            }
	            return _this.state.log;
	        };
	        this.updateLastLog = function () {
	            var messages = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                messages[_i - 0] = arguments[_i];
	            }
	            var log = _this.getSafeLog();
	            var indexToReplace = log[_this.state.log.length - 1].message.length > 0 ? log[_this.state.log.length - 1].message.length - 1 : 0;
	            log[_this.state.log.length - 1].message[indexToReplace] = { value: messages };
	            _this.setState({
	                log: log,
	            }, _this.scrollIfBottom());
	        };
	        this.log = function () {
	            var messages = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                messages[_i - 0] = arguments[_i];
	            }
	            var log = _this.getSafeLog();
	            log[_this.state.log.length - 1].message.push({ value: messages });
	            _this.setState({
	                log: log,
	            }, _this.scrollIfBottom());
	        };
	        this.logX = function (type) {
	            var messages = [];
	            for (var _i = 1; _i < arguments.length; _i++) {
	                messages[_i - 1] = arguments[_i];
	            }
	            var log = _this.getSafeLog();
	            if (!log.length) {
	                log.push({ label: '', command: '', message: [] });
	            }
	            log[_this.state.log.length - 1].message.push({ type: type, value: messages });
	            _this.setState({
	                log: log,
	            }, _this.scrollIfBottom());
	        };
	        this.logTable = function (tableData, type) {
	            var log = _this.getSafeLog();
	            if (type) {
	                log[_this.state.log.length - 1].message.push({ isTable: true, type: type, value: [tableData] });
	            }
	            else {
	                log[_this.state.log.length - 1].message.push({ isTable: true, value: [tableData] });
	            }
	            _this.setState({
	                log: log,
	            }, _this.scrollIfBottom());
	        };
	        this.return = function () {
	            _this.setState({
	                acceptInput: true,
	                currLabel: _this.nextLabel(),
	            }, _this.scrollIfBottom());
	        };
	        // Event Handlers
	        this.focus = function () {
	            if (!window.getSelection().toString()) {
	                _this.child.typer.focus();
	                _this.setState({ focus: true }, _this.scrollToBottom);
	            }
	        };
	        this.blur = function () {
	            _this.setState({ focus: false });
	        };
	        this.keyDown = function (e) {
	            var keyCodes = {
	                // return
	                13: _this.acceptLine,
	                // left
	                37: _this.backwardChar,
	                // right
	                39: _this.forwardChar,
	                // up
	                38: _this.previousHistory,
	                // down
	                40: _this.nextHistory,
	                // backspace
	                8: _this.backwardDeleteChar,
	                // delete
	                46: _this.deleteChar,
	                // end
	                35: _this.endOfLine,
	                // start
	                36: _this.beginningOfLine,
	                // tab
	                9: _this.complete,
	                // esc
	                27: _this.prefixMeta,
	            };
	            var ctrlCodes = {
	                // C-a
	                65: _this.beginningOfLine,
	                // C-e
	                69: _this.endOfLine,
	                // C-f
	                70: _this.forwardChar,
	                // C-b
	                66: _this.backwardChar,
	                // C-l
	                76: _this.clearScreen,
	                // C-p
	                80: _this.previousHistory,
	                // C-n
	                78: _this.nextHistory,
	                // C-r
	                82: _this.reverseSearchHistory,
	                // C-s
	                83: _this.forwardSearchHistory,
	                // C-d
	                68: _this.deleteChar,
	                // C-q TODO
	                //81: this.quotedInsert,
	                // C-v TODO
	                //86: this.quotedInsert,
	                // C-t TODO
	                //84: this.transposeChars,
	                // C-k
	                75: _this.killLine,
	                // C-u
	                85: _this.backwardKillLine,
	                // C-y TODO
	                89: _this.yank,
	                // C-c
	                67: _this.cancelCommand,
	            };
	            var ctrlXCodes = {
	                // C-x Rubout
	                8: _this.backwardKillLine,
	            };
	            var ctrlShiftCodes = {};
	            var metaCodes = {
	                // M-f
	                70: _this.forwardWord,
	                // M-b
	                66: _this.backwardWord,
	                // M-p
	                80: _this.nonIncrementalReverseSearchHistory,
	                // M-n
	                78: _this.nonIncrementalForwardSearchHistory,
	                // M-.
	                190: _this.yankLastArg,
	                // M-TAB TODO
	                //9: this.tabInsert,
	                // M-t TODO
	                //84: this.transposeWords,
	                // M-u TODO
	                //85: this.upcaseWord,
	                // M-l TODO
	                //76: this.downcaseWord,
	                // M-c TODO
	                //67: this.capitalizeWord,
	                // M-d
	                68: _this.killWord,
	                // M-backspace
	                8: _this.backwardKillWord,
	                // M-w TODO
	                //87: this.unixWordRubout,
	                // M-\ TODO
	                //220: this.deleteHorizontalSpace,
	                // M-y
	                89: _this.yankPop,
	            };
	            var metaShiftCodes = {
	                // M-<
	                188: _this.beginningOfHistory,
	                // M->
	                190: _this.endOfHistory,
	                // M-_
	                189: _this.yankLastArg,
	            };
	            var metaCtrlCodes = {
	                // M-C-y
	                89: _this.yankNthArg,
	            };
	            if (_this.state.acceptInput) {
	                if (e.altKey) {
	                    if (e.ctrlKey) {
	                        if (e.keyCode in metaCtrlCodes) {
	                            metaCtrlCodes[e.keyCode]();
	                            e.preventDefault();
	                        }
	                    }
	                    else if (e.shiftKey) {
	                        if (e.keyCode in metaShiftCodes) {
	                            metaShiftCodes[e.keyCode]();
	                            e.preventDefault();
	                        }
	                    }
	                    else if (e.keyCode in metaCodes) {
	                        metaCodes[e.keyCode]();
	                        e.preventDefault();
	                    }
	                    e.preventDefault();
	                }
	                else if (e.ctrlKey) {
	                    if (e.keyCode in ctrlCodes) {
	                        ctrlCodes[e.keyCode]();
	                        e.preventDefault();
	                    }
	                    e.preventDefault();
	                }
	                else if (e.keyCode in keyCodes) {
	                    keyCodes[e.keyCode]();
	                    e.preventDefault();
	                }
	            }
	            else if (e.ctrlKey && e.keyCode === 67) {
	                // if input is blocked, ctrl+c should still call cancel
	                ctrlCodes[e.keyCode]();
	                e.preventDefault();
	            }
	        };
	        this.change = function () {
	            var idx = 0;
	            for (; idx < _this.state.typer.length && idx < _this.child.typer.value.length; idx++) {
	                if (_this.state.typer[idx] != _this.child.typer.value[idx]) {
	                    break;
	                }
	            }
	            var insert = _this.child.typer.value.substring(idx);
	            var replace = _this.state.typer.length - idx;
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState({
	                    searchText: _this.state.searchInit ? insert : _this.textInsert(insert, _this.state.searchText, replace),
	                    typer: _this.child.typer.value,
	                }, _this.triggerSearch);
	            }
	            else {
	                _this.setState(Object.assign(_this.consoleInsert(insert, replace), {
	                    typer: _this.child.typer.value,
	                    lastCommand: 0 /* Default */,
	                }), _this.scrollToBottom);
	            }
	        };
	        this.paste = function (e) {
	            var insert = e.clipboardData.getData('text');
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState({
	                    searchText: _this.state.searchInit ? insert : _this.textInsert(insert, _this.state.searchText),
	                    typer: _this.child.typer.value,
	                }, _this.triggerSearch);
	            }
	            else {
	                _this.setState(Object.assign(_this.consoleInsert(insert), {
	                    lastCommand: 0 /* Default */,
	                }), _this.scrollToBottom);
	            }
	            e.preventDefault();
	        };
	        // Commands for Moving
	        this.beginningOfLine = function () {
	            _this.setState({
	                point: 0,
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        this.endOfLine = function () {
	            _this.setState({
	                point: _this.state.promptText.length,
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        this.forwardChar = function () {
	            _this.setState({
	                point: _this.movePoint(1),
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        this.backwardChar = function () {
	            _this.setState({
	                point: _this.movePoint(-1),
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        this.forwardWord = function () {
	            _this.setState({
	                point: _this.nextWord(),
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        this.backwardWord = function () {
	            _this.setState({
	                point: _this.previousWord(),
	                argument: null,
	                lastCommand: 0 /* Default */,
	            }, _this.scrollToBottom);
	        };
	        // Commands for Manipulating the History
	        this.acceptLine = function () {
	            _this.child.typer.value = "";
	            if (_this.props.continue(_this.state.promptText)) {
	                _this.setState(Object.assign(_this.consoleInsert("\n"), {
	                    typer: "",
	                    lastCommand: 0 /* Default */,
	                }), _this.scrollToBottom);
	            }
	            else {
	                var command_1 = _this.state.promptText;
	                var history_1 = _this.state.history;
	                var log = _this.state.log;
	                if (!history_1 || history_1[history_1.length - 1] != command_1) {
	                    history_1.push(command_1);
	                }
	                log.push({
	                    label: _this.state.currLabel,
	                    command: command_1,
	                    message: []
	                });
	                _this.setState({
	                    acceptInput: false,
	                    typer: "",
	                    point: 0,
	                    promptText: "",
	                    restoreText: "",
	                    log: log,
	                    history: history_1,
	                    historyn: 0,
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, function () {
	                    _this.scrollToBottom();
	                    if (_this.props.handler) {
	                        _this.props.handler(command_1);
	                    }
	                    else {
	                        _this.return();
	                    }
	                });
	            }
	        };
	        this.previousHistory = function () {
	            _this.rotateHistory(-1);
	        };
	        this.nextHistory = function () {
	            _this.rotateHistory(1);
	        };
	        this.beginningOfHistory = function () {
	            _this.rotateHistory(-_this.state.history.length);
	        };
	        this.endOfHistory = function () {
	            _this.rotateHistory(_this.state.history.length);
	        };
	        this.triggerSearch = function () {
	            if (_this.state.searchDirection == 0 /* Reverse */) {
	                _this.reverseSearchHistory();
	            }
	            else {
	                _this.forwardSearchHistory();
	            }
	        };
	        this.reverseSearchHistory = function () {
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState(Object.assign(_this.searchHistory(0 /* Reverse */, true), {
	                    argument: "(reverse-i-search)`" + _this.state.searchText + "': ",
	                    lastCommand: 1 /* Search */,
	                }), _this.scrollToBottom);
	            }
	            else {
	                _this.setState({
	                    searchDirection: 0 /* Reverse */,
	                    searchInit: true,
	                    argument: "(reverse-i-search)`': ",
	                    lastCommand: 1 /* Search */,
	                }, _this.scrollToBottom);
	            }
	        };
	        this.forwardSearchHistory = function () {
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState(Object.assign(_this.searchHistory(1 /* Forward */, true), {
	                    argument: "(forward-i-search)`" + _this.state.searchText + "': ",
	                    lastCommand: 1 /* Search */,
	                }), _this.scrollToBottom);
	            }
	            else {
	                _this.setState({
	                    searchDirection: 1 /* Forward */,
	                    searchInit: true,
	                    argument: "(forward-i-search)`': ",
	                    lastCommand: 1 /* Search */,
	                }, _this.scrollToBottom);
	            }
	        };
	        this.clearScreen = function () {
	            _this.setState({ log: [] });
	        };
	        this.nonIncrementalReverseSearchHistory = function () {
	            // TODO
	        };
	        this.nonIncrementalForwardSearchHistory = function () {
	            // TODO
	        };
	        this.historySearchBackward = function () {
	            // TODO
	        };
	        this.historySearchForward = function () {
	            // TODO
	        };
	        this.historySubstringSearchBackward = function () {
	            // TODO
	        };
	        this.historySubstringSearchForward = function () {
	            // TODO
	        };
	        this.yankNthArg = function () {
	            // TODO
	        };
	        this.yankLastArg = function () {
	            // TODO
	        };
	        // Commands for Changing Text
	        this.deleteChar = function () {
	            if (_this.state.point < _this.state.promptText.length) {
	                _this.setState({
	                    promptText: _this.state.promptText.substring(0, _this.state.point)
	                        + _this.state.promptText.substring(_this.state.point + 1),
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, _this.scrollToBottom);
	            }
	        };
	        this.backwardDeleteChar = function () {
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState({
	                    searchText: _this.state.searchText.substring(0, _this.state.searchText.length - 1),
	                    typer: _this.child.typer.value,
	                }, _this.triggerSearch);
	            }
	            else if (_this.state.point > 0) {
	                _this.setState({
	                    point: _this.movePoint(-1),
	                    promptText: _this.state.promptText.substring(0, _this.state.point - 1)
	                        + _this.state.promptText.substring(_this.state.point),
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, _this.scrollToBottom);
	            }
	        };
	        // Killing and Yanking
	        this.killLine = function () {
	            var kill = _this.state.kill;
	            if (_this.state.lastCommand == 2 /* Kill */) {
	                kill[0] = kill[0] + _this.state.promptText.substring(_this.state.point);
	            }
	            else {
	                kill.unshift(_this.state.promptText.substring(_this.state.point));
	            }
	            _this.setState({
	                promptText: _this.state.promptText.substring(0, _this.state.point),
	                kill: kill,
	                killn: 0,
	                argument: null,
	                lastCommand: 2 /* Kill */,
	            }, _this.scrollToBottom);
	        };
	        this.backwardKillLine = function () {
	            var kill = _this.state.kill;
	            if (_this.state.lastCommand == 2 /* Kill */) {
	                kill[0] = _this.state.promptText.substring(0, _this.state.point) + kill[0];
	            }
	            else {
	                kill.unshift(_this.state.promptText.substring(0, _this.state.point));
	            }
	            _this.setState({
	                point: 0,
	                promptText: _this.state.promptText.substring(_this.state.point),
	                kill: kill,
	                killn: 0,
	                argument: null,
	                lastCommand: 2 /* Kill */,
	            }, _this.scrollToBottom);
	        };
	        this.killWholeLine = function () {
	            var kill = _this.state.kill;
	            if (_this.state.lastCommand == 2 /* Kill */) {
	                kill[0] = _this.state.promptText.substring(0, _this.state.point)
	                    + kill[0] + _this.state.promptText.substring(_this.state.point);
	            }
	            else {
	                kill.unshift(_this.state.promptText);
	            }
	            _this.setState({
	                point: 0,
	                promptText: '',
	                kill: kill,
	                killn: 0,
	                argument: null,
	                lastCommand: 2 /* Kill */,
	            }, _this.scrollToBottom);
	        };
	        this.killWord = function () {
	            var kill = _this.state.kill;
	            if (_this.state.lastCommand == 2 /* Kill */) {
	                kill[0] = kill[0] + _this.state.promptText.substring(_this.state.point, _this.nextWord());
	            }
	            else {
	                kill.unshift(_this.state.promptText.substring(_this.state.point, _this.nextWord()));
	            }
	            _this.setState({
	                promptText: _this.state.promptText.substring(0, _this.state.point)
	                    + _this.state.promptText.substring(_this.nextWord()),
	                kill: kill,
	                killn: 0,
	                argument: null,
	                lastCommand: 2 /* Kill */,
	            }, _this.scrollToBottom);
	        };
	        this.backwardKillWord = function () {
	            var kill = _this.state.kill;
	            if (_this.state.lastCommand == 2 /* Kill */) {
	                kill[0] = _this.state.promptText.substring(_this.previousWord(), _this.state.point) + kill[0];
	            }
	            else {
	                kill.unshift(_this.state.promptText.substring(_this.previousWord(), _this.state.point));
	            }
	            _this.setState({
	                point: _this.previousWord(),
	                promptText: _this.state.promptText.substring(0, _this.previousWord())
	                    + _this.state.promptText.substring(_this.state.point),
	                kill: kill,
	                killn: 0,
	                argument: null,
	                lastCommand: 2 /* Kill */,
	            }, _this.scrollToBottom);
	        };
	        this.yank = function () {
	            _this.setState(Object.assign(_this.consoleInsert(_this.state.kill[_this.state.killn]), {
	                lastCommand: 3 /* Yank */,
	            }), _this.scrollToBottom);
	        };
	        this.yankPop = function () {
	            if (_this.state.lastCommand == 3 /* Yank */) {
	                var killn = _this.rotateRing(1, _this.state.killn, _this.state.kill.length);
	                _this.setState(Object.assign(_this.consoleInsert(_this.state.kill[killn], _this.state.kill[_this.state.killn].length), {
	                    killn: killn,
	                    lastCommand: 3 /* Yank */,
	                }), _this.scrollToBottom);
	            }
	        };
	        // Numeric Arguments
	        // Completing
	        this.complete = function () {
	            if (_this.props.complete) {
	                // Split text and find current word
	                var words = _this.state.promptText.split(" ");
	                var curr = 0;
	                var idx = words[0].length;
	                while (idx < _this.state.point && curr + 1 < words.length) {
	                    idx += words[++curr].length + 1;
	                }
	                var completions = _this.props.complete(words, curr, _this.state.promptText);
	                if (completions.length == 1) {
	                    // Perform completion
	                    words[curr] = completions[0];
	                    var point = -1;
	                    for (var i = 0; i <= curr; i++) {
	                        point += words[i].length + 1;
	                    }
	                    _this.setState({
	                        point: point,
	                        promptText: words.join(" "),
	                        argument: null,
	                        lastCommand: 0 /* Default */,
	                    }, _this.scrollToBottom);
	                }
	                else if (completions.length > 1) {
	                    // show completions
	                    var log = _this.state.log;
	                    log.push({
	                        label: _this.state.currLabel,
	                        command: _this.state.promptText,
	                        message: [{
	                                type: "completion",
	                                value: [completions.join("\t")],
	                            }]
	                    });
	                    _this.setState({
	                        currLabel: _this.nextLabel(),
	                        log: log,
	                        argument: null,
	                        lastCommand: 0 /* Default */,
	                    }, _this.scrollToBottom);
	                }
	            }
	        };
	        // Keyboard Macros
	        // Miscellaneous
	        this.prefixMeta = function () {
	            if (_this.state.lastCommand == 1 /* Search */) {
	                _this.setState({
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                });
	            }
	            // TODO Meta prefixed state
	        };
	        this.cancelCommand = function () {
	            if (_this.state.acceptInput) {
	                _this.child.typer.value = "";
	                var log = _this.state.log;
	                log.push({
	                    label: _this.state.currLabel,
	                    command: _this.state.promptText,
	                    message: []
	                });
	                _this.setState({
	                    typer: "",
	                    point: 0,
	                    promptText: "",
	                    restoreText: "",
	                    log: log,
	                    historyn: 0,
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, _this.scrollToBottom);
	            }
	            else {
	                _this.props.cancel();
	            }
	        };
	        // Helper functions
	        this.textInsert = function (insert, text, replace, point) {
	            if (replace === void 0) { replace = 0; }
	            if (point === void 0) { point = text.length; }
	            return text.substring(0, point - replace) + insert + text.substring(point);
	        };
	        this.consoleInsert = function (insert, replace) {
	            if (replace === void 0) { replace = 0; }
	            var promptText = _this.textInsert(insert, _this.state.promptText, replace, _this.state.point);
	            return {
	                point: _this.movePoint(insert.length - replace, insert.length - replace + _this.state.promptText.length),
	                promptText: promptText,
	                restoreText: promptText,
	                argument: null,
	                lastCommand: 0 /* Default */,
	            };
	        };
	        this.movePoint = function (n, max) {
	            if (max === void 0) { max = _this.state.promptText.length; }
	            var pos = _this.state.point + n;
	            if (pos < 0) {
	                return 0;
	            }
	            if (pos > max) {
	                return max;
	            }
	            else {
	                return pos;
	            }
	        };
	        this.rotateRing = function (n, ringn, ring, circular) {
	            if (circular === void 0) { circular = true; }
	            if (ring == 0)
	                return 0;
	            if (circular) {
	                return (ring + (ringn + n) % ring) % ring;
	            }
	            else {
	                ringn = ringn - n;
	                if (ringn < 0) {
	                    return 0;
	                }
	                else if (ringn >= ring) {
	                    return ring;
	                }
	                else {
	                    return ringn;
	                }
	            }
	        };
	        this.rotateHistory = function (n) {
	            var historyn = _this.rotateRing(n, _this.state.historyn, _this.state.history.length, false);
	            if (historyn == 0) {
	                _this.setState({
	                    point: _this.state.restoreText.length,
	                    promptText: _this.state.restoreText,
	                    historyn: historyn,
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, _this.scrollToBottom);
	            }
	            else {
	                var promptText = _this.state.history[_this.state.history.length - historyn];
	                _this.setState({
	                    point: promptText.length,
	                    promptText: promptText,
	                    historyn: historyn,
	                    argument: null,
	                    lastCommand: 0 /* Default */,
	                }, _this.scrollToBottom);
	            }
	        };
	        this.searchHistory = function (direction, next) {
	            if (direction === void 0) { direction = _this.state.searchDirection; }
	            if (next === void 0) { next = false; }
	            var idx = _this.state.historyn;
	            var inc = (direction == 0 /* Reverse */) ? 1 : -1;
	            if (next) {
	                idx = idx + inc;
	            }
	            for (; idx > 0 && idx <= _this.state.history.length; idx = idx + inc) {
	                var entry = _this.state.history[_this.state.history.length - idx];
	                var point = entry.indexOf(_this.state.searchText);
	                if (point > -1) {
	                    return {
	                        point: point,
	                        promptText: entry,
	                        searchDirection: direction,
	                        searchInit: false,
	                        historyn: idx,
	                    };
	                }
	            }
	            return {
	                searchDirection: direction,
	                searchInit: false,
	            };
	        };
	        // DOM management
	        this.scrollSemaphore = 0;
	        this.scrollIfBottom = function () {
	            if (_this.scrollSemaphore > 0 || _this.child.container.scrollTop == _this.child.container.scrollHeight - _this.child.container.offsetHeight) {
	                _this.scrollSemaphore++;
	                return _this.scrollIfBottomTrue;
	            }
	            else {
	                return null;
	            }
	        };
	        this.scrollIfBottomTrue = function () {
	            _this.scrollToBottom();
	            _this.scrollSemaphore--;
	        };
	        this.scrollToBottom = function () {
	            _this.child.container.scrollTop = _this.child.container.scrollHeight;
	            var rect = _this.child.focus.getBoundingClientRect();
	            if (rect.top < 0 || rect.left < 0 ||
	                rect.bottom > (window.innerHeight || document.documentElement.clientHeight) ||
	                rect.right > (window.innerWidth || document.documentElement.clientWidth)) {
	                _this.child.typer.scrollIntoView(false);
	            }
	        };
	        this.nextLabel = function () {
	            if (typeof _this.props.promptLabel === "string") {
	                return _this.props.promptLabel;
	            }
	            else {
	                return _this.props.promptLabel();
	            }
	        };
	        this.state = {
	            focus: false,
	            acceptInput: true,
	            typer: '',
	            point: 0,
	            currLabel: this.nextLabel(),
	            promptText: '',
	            restoreText: '',
	            searchText: '',
	            searchDirection: null,
	            searchInit: false,
	            log: [],
	            history: [],
	            historyn: 0,
	            kill: [],
	            killn: 0,
	            argument: null,
	            lastCommand: 0 /* Default */,
	        };
	    }
	    // Component Lifecycle
	    default_1.prototype.componentDidMount = function () {
	        if (this.props.autofocus) {
	            this.focus();
	        }
	    };
	    default_1.prototype.nextWord = function () {
	        // Find first alphanumeric char after first non-alphanumeric char
	        var search = /\W\w/.exec(this.state.promptText.substring(this.state.point));
	        if (search) {
	            return search.index + this.state.point + 1;
	        }
	        else {
	            return this.state.promptText.length;
	        }
	    };
	    default_1.prototype.previousWord = function () {
	        // Find first non-alphanumeric char after first alphanumeric char in reverse
	        var search = /\W\w(?!.*\W\w)/.exec(this.state.promptText.substring(0, this.state.point - 1));
	        if (search) {
	            return search.index + 1;
	        }
	        else {
	            return 0;
	        }
	    };
	    default_1.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {ref: function (ref) { return _this.child.container = ref; }, className: "react-console-container " + (this.state.focus ? "react-console-focus" : "react-console-nofocus"), onClick: this.focus}, this.props.welcomeMessage ?
	            React.createElement("div", {className: "react-console-message react-console-welcome"}, this.props.welcomeMessage)
	            : null, this.state.log.map(function (val) {
	            return [
	                React.createElement(ConsolePrompt, {label: val.label, value: val.command})
	            ].concat(val.message.map(function (val, idx) {
	                return React.createElement(ConsoleMessage, {key: idx, type: val.type, value: val.value, isTable: val.isTable});
	            }));
	        }), this.state.acceptInput ?
	            React.createElement(ConsolePrompt, {label: this.state.currLabel, value: this.state.promptText, point: this.state.point, argument: this.state.argument})
	            : null, React.createElement("div", {style: { overflow: "hidden", height: 1, width: 1 }}, React.createElement("textarea", {ref: function (ref) { return _this.child.typer = ref; }, className: "react-console-typer", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", style: { outline: "none",
	            color: "transparent",
	            backgroundColor: "transparent",
	            border: "none",
	            resize: "none",
	            overflow: "hidden",
	        }, onBlur: this.blur, onKeyDown: this.keyDown, onChange: this.change, onPaste: this.paste})), React.createElement("div", {ref: function (ref) { return _this.child.focus = ref; }}, " "));
	    };
	    default_1.defaultProps = {
	        promptLabel: '> ',
	        continue: function () { return false; },
	        cancel: function () { },
	    };
	    return default_1;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=react-console.js.map