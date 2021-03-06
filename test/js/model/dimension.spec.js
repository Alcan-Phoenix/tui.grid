'use strict';

var ColumnModelData = require('model/data/columnModel');
var RowListData = require('model/data/rowList');
var Model = require('base/model');
var Dimension = require('model/dimension');

describe('Dimension', function() {
    var columnModelList = [
        {
            title: 'changeCallback',
            columnName: 'changeCallback',
            editOption: {
                changeBeforeCallback: function(changeEvent) {
                    return !!changeEvent.value;
                },
                changeAfterCallback: function(changeEvent) {
                    return !!changeEvent.value;
                }
            }
        },
        {
            title: 'keyColumn',
            columnName: 'keyColumn'
        },
        {
            title: 'none',
            columnName: 'none'
        },
        {
            title: 'hasFormatter',
            columnName: 'hasFormatter',
            formatter: function(value) {
                return '<a href="http://www.testurl.com" >' + value + '</a> click<button> me</button>';
            }
        },
        {
            title: 'notUseHtmlEntity',
            columnName: 'notUseHtmlEntity',
            notUseHtmlEntity: true
        },
        {
            title: 'relationOptionList',
            columnName: 'relationOptionList',
            relationList: [
                {
                    columnList: ['select', 'checkbox', 'radio'],
                    optionListChange: function(value) {
                        if (value === true) {
                            return [
                                {text: '하나', value: 1},
                                {text: '둘', value: 2},
                                {text: '셋', value: 3},
                                {text: '넷', value: 4}
                            ];
                        }
                    }
                },
                {
                    columnList: ['text'],
                    isDisabled: function(value) {
                        return value === false;
                    },
                    isEditable: function(value) {
                        return value !== false;
                    }
                }

            ]
        },
        {
            title: 'text',
            columnName: 'text',
            editOption: {
                type: 'text'
            }
        },
        {
            title: 'text-convertible',
            columnName: 'text-convertible',
            editOption: {
                type: 'text-convertible'
            }
        },
        {
            title: 'select',
            columnName: 'select',
            editOption: {
                type: 'select',
                list: [
                    {text: 'text1', value: 1},
                    {text: 'text2', value: 2},
                    {text: 'text3', value: 3},
                    {text: 'text4', value: 4}
                ]
            }
        },
        {
            title: 'checkbox',
            columnName: 'checkbox',
            editOption: {
                type: 'checkbox',
                list: [
                    {text: 'text1', value: 1},
                    {text: 'text2', value: 2},
                    {text: 'text3', value: 3},
                    {text: 'text4', value: 4}
                ]
            }
        },
        {
            title: 'radio',
            columnName: 'radio',
            editOption: {
                type: 'radio',
                list: [
                    {text: 'text1', value: 1},
                    {text: 'text2', value: 2},
                    {text: 'text3', value: 3},
                    {text: 'text4', value: 4}
                ]
            }
        },
        {
            title: 'radioNoRelation',
            columnName: 'radioNoRelation',
            editOption: {
                type: 'radio',
                list: [
                    {text: 'text1', value: 1},
                    {text: 'text2', value: 2},
                    {text: 'text3', value: 3},
                    {text: 'text4', value: 4}
                ]
            }
        },

        {
            title: 'hidden',
            columnName: 'hidden',
            isHidden: true
        }
    ];
    var originalData = [
        {
            '_extraData': {
                rowState: 'CHECKED'
            },
            '_number': false,
            '_button': false,
            'keyColumn': 10,
            'none': 0,
            'text': 0,
            'text-convertible': 0,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_extraData': {
                rowSpan: {
                    'none': 2,
                    'text': 3
                }
            },
            '_number': false,
            '_button': false,
            'keyColumn': 11,
            'none': 1,
            'text': 1,
            'text-convertible': 1,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            'keyColumn': 12,
            'none': 2,
            'text': 2,
            'text-convertible': 2,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_number': false,
            '_button': false,
            'keyColumn': 13,
            'none': 3,
            'text': 3,
            'text-convertible': 3,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_number': true,
            '_button': true,
            'keyColumn': 14,
            'none': 4,
            'text': 4,
            'text-convertible': 4,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_number': false,
            '_button': false,
            'keyColumn': 15,
            'none': 5,
            'text': 5,
            'text-convertible': 5,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_number': false,
            '_button': false,
            'keyColumn': 16,
            'none': 6,
            'text': 6,
            'text-convertible': 6,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_number': false,
            '_button': false,
            'keyColumn': 17,
            'none': 7,
            'text': 7,
            'text-convertible': 7,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_extraData': {
                rowState: 'DISABLED'
            },
            '_number': false,
            '_button': false,
            'keyColumn': 18,
            'none': 8,
            'text': 8,
            'text-convertible': 8,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        },
        {
            '_extraData': {
                rowState: 'DISABLED_CHECK'
            },
            '_number': false,
            '_button': false,
            'keyColumn': 19,
            'none': 9,
            'text': 9,
            'text-convertible': 9,
            'select': 1,
            'checkbox': 1,
            'radio': 1,
            'hidden': 1
        }
    ];

    var rowList,
        dataModelInstance,
        columnModelInstance,
        dimensionModel,
        defaultConfig;

    beforeEach(function() {
        rowList = $.extend(true, [], originalData);
        columnModelInstance = new ColumnModelData();
        columnModelInstance.set('columnModelList', columnModelList);
        dataModelInstance = new RowListData([], {
            columnModel: columnModelInstance
        });
        defaultConfig = {
            offsetLeft: 100,
            offsetTop: 200,
            width: 500,
            height: 500,
            headerHeight: 150,
            rowHeight: 100,

            scrollX: true,
            scrollBarSize: 17,

            minimumColumnWidth: 20,
            displayRowCount: 20
        };
        dimensionModel = new Dimension(defaultConfig, {
            columnModel: columnModelInstance,
            dataModel: dataModelInstance
        });
        dimensionModel.renderModel = new Model({
            scrollLeft: 0,
            scrollTop: 0
        });
    });

    describe('getColumnWidthList()', function() {
        it('ColumnFixCount 를 기반으로 Left side 와 Right Side 를 잘 반환하는지 확인한다.', function() {
            columnModelInstance.set({
                columnFixCount: 3
            });
            dimensionModel.set({
                columnWidthList: [10, 20, 30, 40, 50, 60]
            });

            expect(dimensionModel.getColumnWidthList()).toEqual([10, 20, 30, 40, 50, 60]);
            expect(dimensionModel.getColumnWidthList('L')).toEqual([10, 20, 30, 40]);
            expect(dimensionModel.getColumnWidthList('R')).toEqual([50, 60]);

            columnModelInstance.set({
                columnFixCount: 4
            });
            dimensionModel.set({
                columnWidthList: [10, 20, 30, 40, 50, 60]
            });
            expect(dimensionModel.getColumnWidthList('L')).toEqual([10, 20, 30, 40, 50]);
            expect(dimensionModel.getColumnWidthList('R')).toEqual([60]);
        });
    });

    describe('_getFrameWidth()', function() {
        it('인자로 받은 columnModelList로부터 border 값을 포함하여 해당 columnModelList를 감싸고 있는 frame width를 구한다.', function() {
            var widthList = [10, 20, 30, 40, 50];
            expect(dimensionModel._getFrameWidth(widthList)).toEqual(156);
            expect(dimensionModel._getFrameWidth([])).toEqual(0);
        });
    });

    describe('getFrameWidth()', function() {
        describe('인자로 받은 값으로 columnWidthList 를 제대로 반환한다.', function() {
            beforeEach(function() {
                columnModelInstance.set({
                    columnFixCount: 2
                });
                dimensionModel.set('columnWidthList', [10, 20, 30, 40, 50]);
            });

            it('인자가 없을 경우 전체 frame의 너비 값을 반환한다.', function() {
                expect(dimensionModel.getFrameWidth()).toEqual(157);
            });

            it('L일 경우 Left Side의 Frame 너비를 반환한다.', function() {
                expect(dimensionModel.getFrameWidth('L')).toEqual(64);
            });

            it('R일 경우 Right Side의 Frame 너비를 반환한다.', function() {
                expect(dimensionModel.getFrameWidth('R')).toEqual(93);
            });
        });
    });

    describe('_getMinLeftSideWidth()', function() {
        it('Left Side의 최소 너비를 잘 구하는지 확인한다.', function() {
            columnModelInstance.set({
                columnFixCount: 3
            });
            dimensionModel = new Dimension({
                minimumColumnWidth: 20
            }, {
                dataModel: dataModelInstance,
                columnModel: columnModelInstance
            });
            expect(dimensionModel._getMinLeftSideWidth()).toEqual(85);
            columnModelInstance.set({
                columnFixCount: 0
            });
            expect(dimensionModel._getMinLeftSideWidth()).toEqual(22);
        });
    });

    describe('_getMaxLeftSideWidth()', function() {
        it('Left Side 의 최대 너비 를 잘 구하는지 확인한다.', function() {
            columnModelInstance.set({
                columnFixCount: 3
            });
            dimensionModel = new Dimension({
                width: 100,
                minimumColumnWidth: 20
            }, {
                dataModel: dataModelInstance,
                columnModel: columnModelInstance
            });
            expect(dimensionModel._getMaxLeftSideWidth()).toEqual(90);
            dimensionModel.set({
                minimumColumnWidth: 200
            });
            expect(dimensionModel._getMaxLeftSideWidth()).toEqual(805);
        });
    });

    describe('_setColumnWidthVariables()', function() {
        var sampleColumnModel;
        beforeEach(function() {
            sampleColumnModel = [
                {
                    columnName: 'column1',
                    width: 10
                },
                {
                    columnName: 'column2',
                    width: 20
                },
                {
                    columnName: 'column3',
                    width: 300,
                    isHidden: true
                },
                {
                    columnName: 'column4',
                    width: 40
                },
                {
                    columnName: 'column5',
                    width: 50
                },
                {
                    columnName: 'column6'
                },
                {
                    columnName: 'column7'
                },
                {
                    columnName: 'column8'
                },
                {
                    columnName: 'column9'
                },
                {
                    columnName: 'column10'
                }
            ];
            columnModelInstance.set({
                columnModelList: sampleColumnModel,
                hasNumberColumn: false,
                selectType: ''
            });
            dimensionModel.set({
                width: 1000,
                minimumWidth: 20
            });
        });

        describe('lside와 rside의 너비를 계산한다.', function() {
            function changeFixCount(FixCount, widthList) {
                widthList = widthList || dimensionModel.get('columnWidthList');
                columnModelInstance.set({columnFixCount: FixCount});
                dimensionModel._setColumnWidthVariables(widthList);
            }

            describe('인자로 넘긴 columnWidthList를 기준으로 lside와 rside를 계산한다.', function() {
                var widthList;
                beforeEach(function() {
                    widthList = [5, 10, 315, 320, 325, 330, 335, 340, 345, 350];

                    columnModelInstance.set({columnFixCount: 0});
                    dimensionModel._setColumnWidthVariables(widthList);
                });

                it('columnFixCount 값이 작아서, 열고정 영역의 너비가 전체의 90%를 넘지 않는 경우', function() {
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(0);
                    expect(dimensionModel.get('rsideWidth')).toEqual(1000);

                    changeFixCount(1);
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(7);
                    expect(dimensionModel.get('rsideWidth')).toEqual(993);

                    changeFixCount(2);
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(18);
                    expect(dimensionModel.get('rsideWidth')).toEqual(982);

                    changeFixCount(3);
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(18);
                    expect(dimensionModel.get('rsideWidth')).toEqual(982);

                    changeFixCount(4);
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(334);
                    expect(dimensionModel.get('rsideWidth')).toEqual(666);

                    changeFixCount(5);
                    expect(dimensionModel.get('columnWidthList')).toEqual(widthList);
                    expect(dimensionModel.get('lsideWidth')).toEqual(655);
                    expect(dimensionModel.get('rsideWidth')).toEqual(345);
                });

                it('columnFixCount 값이 충분히 커서 열고정 영역의 너비가 전체의 90%를 넘어가는 경우 전체의 열고정 영역의 너비를 전체의 90%로 강제 조정한다.', function() {
                    var leftSideframeWidth,
                        rsideWidthList;

                    changeFixCount(6);
                    leftSideframeWidth = dimensionModel._getFrameWidth(dimensionModel.getColumnWidthList('L'));
                    rsideWidthList = widthList.slice(5);
                    expect(dimensionModel.getColumnWidthList('R')).toEqual(rsideWidthList);
                    expect(leftSideframeWidth).toEqual(900);
                    expect(dimensionModel.get('lsideWidth')).toEqual(900);
                    expect(dimensionModel.get('rsideWidth')).toEqual(100);

                    changeFixCount(7);
                    leftSideframeWidth = dimensionModel._getFrameWidth(dimensionModel.getColumnWidthList('L'));
                    rsideWidthList = widthList.slice(6);
                    expect(dimensionModel.getColumnWidthList('R')).toEqual(rsideWidthList);
                    expect(leftSideframeWidth).toEqual(900);
                    expect(dimensionModel.get('lsideWidth')).toEqual(900);
                    expect(dimensionModel.get('rsideWidth')).toEqual(100);

                    changeFixCount(8);
                    leftSideframeWidth = dimensionModel._getFrameWidth(dimensionModel.getColumnWidthList('L'));
                    rsideWidthList = widthList.slice(7);
                    expect(dimensionModel.getColumnWidthList('R')).toEqual(rsideWidthList);
                    expect(leftSideframeWidth).toEqual(900);
                    expect(dimensionModel.get('lsideWidth')).toEqual(900);
                    expect(dimensionModel.get('rsideWidth')).toEqual(100);

                    changeFixCount(9);
                    leftSideframeWidth = dimensionModel._getFrameWidth(dimensionModel.getColumnWidthList('L'));
                    rsideWidthList = widthList.slice(8);
                    expect(dimensionModel.getColumnWidthList('R')).toEqual(rsideWidthList);
                    expect(leftSideframeWidth).toEqual(900);
                    expect(dimensionModel.get('lsideWidth')).toEqual(900);
                    expect(dimensionModel.get('rsideWidth')).toEqual(100);

                    changeFixCount(10);
                    leftSideframeWidth = dimensionModel._getFrameWidth(dimensionModel.getColumnWidthList('L'));
                    rsideWidthList = widthList.slice(9);
                    expect(dimensionModel.getColumnWidthList('R')).toEqual(rsideWidthList);
                    expect(leftSideframeWidth).toEqual(900);
                    expect(dimensionModel.get('lsideWidth')).toEqual(900);
                    expect(dimensionModel.get('rsideWidth')).toEqual(100);
                });
            });
        });
    });

    describe('_adjustLeftSideWidthList()', function() {
        var widthList;

        beforeEach(function() {
            dimensionModel.set({
                minimumColumnWidth: 10
            });
            widthList = [100, 80, 60, 40, 30, 20, 10];
        });

        it('열고정 영역을 인자로 넘긴 totalWidth 에 맞추어 조정한다. 가장 마지막 요소부터 처음 요소까지 조정이 완료될 까지 역으로 순환한다.', function() {
            expect(dimensionModel._adjustLeftSideWidthList(widthList, 300)).toEqual([100, 80, 60, 22, 10, 10, 10]);
        });

        it('인자로 넘긴 totalWidth 가 너무 작은값일 경우, minimumColumnWidth 크기 까지만 조정한다.', function() {
            expect(dimensionModel._adjustLeftSideWidthList(widthList, 50)).toEqual([10, 10, 10, 10, 10, 10, 10]);
        });
    });

    describe('_resetBodyHeight()', function() {
        describe('displayRowHeight 와 rowHeight 값을 기반으로 bodyHeight 값을 계산한다.', function() {
            it('scrollX 옵션이 false 일 경우', function() {
                dimensionModel.set({
                    displayRowCount: 10,
                    rowHeight: 20,
                    scrollX: false
                });
                dimensionModel._resetBodyHeight();
                expect(dimensionModel.get('bodyHeight')).toEqual(210);
            });

            it('scrollX 옵션이 true 일 경우', function() {
                dimensionModel.set({
                    displayRowCount: 10,
                    rowHeight: 20,
                    scrollX: true
                });
                dimensionModel._resetBodyHeight();
                expect(dimensionModel.get('bodyHeight')).toEqual(227);
            });
        });
    });

    describe('getScrollXHeight()', function() {
        it('Should return 0 when the "scrollX" attr is false', function() {
            dimensionModel.set({
                scrollX: false
            });
            expect(dimensionModel.getScrollXHeight()).toEqual(0);
        });

        it('Should return scrollbar size when the "scrollX" attr is true', function() {
            dimensionModel.set({
                scrollX: true,
                scrollbarSize: 17
            });
            expect(dimensionModel.getScrollXHeight()).toEqual(17);
        });
    });

    describe('getScrollYWidth()', function() {
        it('Should return 0 when the "scrollY" attr is false', function() {
            dimensionModel.set({
                scrollY: false
            });
            expect(dimensionModel.getScrollYWidth()).toEqual(0);
        });

        it('Should return scrollbar size when the "scrollY" attr is true', function() {
            dimensionModel.set({
                scrollY: true,
                scrollbarSize: 17
            });
            expect(dimensionModel.getScrollYWidth()).toEqual(17);
        });
    });

    describe('getCellPosition() Frame 으로 부터 상대적인 cell의 위치를 잘 반환한다.', function() {
        beforeEach(function() {
            columnModelInstance.set({
                selectType: '',
                hasNumberColumn: false,
                columnFixCount: 2
            });
            dataModelInstance.set(rowList, {parse: true});
        });

        it('rowSpan 이 없는 경우', function() {
            expect(dimensionModel.getCellPosition(0, 'changeCallback')).toEqual({
                'top': 0,
                'left': 0,
                'right': 40,
                'bottom': 101
            });
            expect(dimensionModel.getCellPosition(0, 'keyColumn')).toEqual({
                'top': 0,
                'left': 40,
                'right': 80,
                'bottom': 101
            });
            expect(dimensionModel.getCellPosition(0, 'none')).toEqual({
                top: 0,
                left: 0,
                right: 40,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(0, 'hasFormatter')).toEqual({
                top: 0,
                left: 40,
                right: 80,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(0, 'notUseHtmlEntity')).toEqual({
                top: 0,
                left: 80,
                right: 120,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(0, 'relationOptionList')).toEqual({
                top: 0,
                left: 120,
                right: 160,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(0, 'text')).toEqual({
                top: 0,
                left: 160,
                right: 200,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(0, 'text-convertible')).toEqual({
                top: 0,
                left: 200,
                right: 240,
                bottom: 101
            });
            expect(dimensionModel.getCellPosition(1, 'changeCallback')).toEqual({
                top: 101,
                left: 0,
                right: 40,
                bottom: 202
            });
            expect(dimensionModel.getCellPosition(1, 'keyColumn')).toEqual({
                top: 101,
                left: 40,
                right: 80,
                bottom: 202
            });
        });

        it('rowSpan 이 있는 경우 main row 가 아닌 row 라도 정상적으로 반환한다.', function() {
            var expectedPosition = {
                top: 101,
                left: 0,
                right: 40,
                bottom: 303
            };
            expect(dimensionModel.getCellPosition(1, 'none')).toEqual(expectedPosition);
            expect(dimensionModel.getCellPosition(2, 'none')).toEqual(expectedPosition);
        });

        it('rowSpan 이 3인 경우', function() {
            var expectedPosition = {
                top: 101,
                left: 160,
                right: 200,
                bottom: 404
            };
            expect(dimensionModel.getCellPosition(1, 'text')).toEqual(expectedPosition);
            expect(dimensionModel.getCellPosition(2, 'text')).toEqual(expectedPosition);
            expect(dimensionModel.getCellPosition(3, 'text')).toEqual(expectedPosition);
        });
    });

    describe('Scroll position', function() {
        var scrollBarSize = 17,
            bodyHeight = 100,
            rsideWidth = 100,
            lsideWidth = 100;

        beforeEach(function() {
            dimensionModel.set({ // defaults
                bodyHeight: bodyHeight,
                rsideWidth: rsideWidth,
                lsideWidth: lsideWidth,
                scrollBarSize: scrollBarSize
            });
        });

        describe('_getBodySize', function() {
            it('should return calculated values without scrollbars', function() {
                var actualBodySize,
                    expected = {
                        height: 100,
                        rsideWidth: 100,
                        totalWidth: 200
                    };

                dimensionModel.set({
                    scrollX: false,
                    scrollY: false
                });

                actualBodySize = dimensionModel._getBodySize();
                expect(actualBodySize).toEqual(expected);
            });

            it('should subtract scrollBar-Y width from rsideWidth', function() {
                var actualBodySize;

                dimensionModel.set({ // conditions
                    scrollX: false,
                    scrollY: true
                });
                actualBodySize = dimensionModel._getBodySize();
                expect(actualBodySize).toEqual({
                    height: 100,
                    rsideWidth: 83,
                    totalWidth: 183
                });
            });

            it('should subtract scrollBar-X height from bodyHeight', function() {
                var actualBodySize;

                dimensionModel.set({
                    scrollX: true,
                    scrollY: false
                });
                actualBodySize = dimensionModel._getBodySize();
                expect(actualBodySize).toEqual({
                    height: 83,
                    rsideWidth: 100,
                    totalWidth: 200
                });
            });
        });

        describe('_judgeScrollDirection', function() {
            var isRsideColumn, targetPosition, bodySize;

            beforeEach(function() {
                /**
                 * Given:
                 *  current scrollTop: 0
                 *  current scrollLeft: 0
                 */
                isRsideColumn = false;
                targetPosition = {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                };
                bodySize = {
                    height: 100,
                    rsideWidth: 100
                };
            });

            it('up', function() {
                var actual,
                    expectedDirection = {
                        isUp: true,
                        isDown: false,
                        isLeft: false,
                        isRight: false
                    };
                spyOn(dimensionModel.renderModel, 'get').and.callFake(function(key) {
                    if (key === 'scrollTop') {
                        return 200;
                    }
                    return 0;
                });
                actual = dimensionModel._judgeScrollDirection(targetPosition, isRsideColumn, bodySize);
                expect(actual).toEqual(expectedDirection);
            });

            it('down', function() {
                var actual,
                    expectedDirection = {
                        isUp: false,
                        isDown: true,
                        isLeft: false,
                        isRight: false
                    };
                targetPosition.bottom = 200;

                actual = dimensionModel._judgeScrollDirection(targetPosition, isRsideColumn, bodySize);
                expect(actual).toEqual(expectedDirection);
            });

            it('left', function() {
                var actual,
                    expectedDirection = {
                        isUp: false,
                        isDown: false,
                        isLeft: true,
                        isRight: false
                    };
                isRsideColumn = true;
                spyOn(dimensionModel.renderModel, 'get').and.callFake(function(key) {
                    if (key === 'scrollLeft') {
                        return 200;
                    }
                    return 0;
                });

                actual = dimensionModel._judgeScrollDirection(targetPosition, isRsideColumn, bodySize);
                expect(actual).toEqual(expectedDirection);
            });

            it('right', function() {
                var actual,
                    expectedDirection = {
                        isUp: false,
                        isDown: false,
                        isLeft: false,
                        isRight: true
                    };
                isRsideColumn = true;
                targetPosition.right = 200;

                actual = dimensionModel._judgeScrollDirection(targetPosition, isRsideColumn, bodySize);
                expect(actual).toEqual(expectedDirection);
            });
        });

        describe('_makeScrollPosition', function() {
            var scrollDirection, targetPosition, bodySize;

            beforeEach(function() { // Given
                scrollDirection = {
                    isUp: false,
                    isDown: false,
                    isLeft: false,
                    isRight: false
                };
                targetPosition = {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                };
                bodySize = {
                    height: 100,
                    rsideWidth: 100
                };
            });

            it('when direction is "up", should return a scrollTop for displaying the target', function() {
                var actual,
                    expected = {
                        scrollTop: 1
                    };
                scrollDirection.isUp = true;
                targetPosition.top = 1;

                actual = dimensionModel._makeScrollPosition(scrollDirection, targetPosition, bodySize);
                expect(actual).toEqual(expected);
            });

            it('when direction is "down", should return a scrollTop for displaying the target', function() {
                var actual,
                    expected = {
                        scrollTop: 150
                    };
                scrollDirection.isDown = true;
                bodySize.height = 50;
                targetPosition.bottom = 200;

                actual = dimensionModel._makeScrollPosition(scrollDirection, targetPosition, bodySize);
                expect(actual).toEqual(expected);
            });

            it('when direction is "left", should return a scrollLeft for displaying the target', function() {
                var actual,
                    expected = {
                        scrollLeft: 1
                    };
                scrollDirection.isLeft = true;
                targetPosition.left = 1;

                actual = dimensionModel._makeScrollPosition(scrollDirection, targetPosition, bodySize);
                expect(actual).toEqual(expected);
            });

            it('when direction is "right", should return a scrollLeft for displaying the target', function() {
                var actual,
                    expected = {
                        scrollLeft: 250
                    };
                scrollDirection.isRight = true;
                bodySize.rsideWidth = 51;
                targetPosition.right = 300;

                actual = dimensionModel._makeScrollPosition(scrollDirection, targetPosition, bodySize);
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('getIndexFromMousePosition()', function() {
        it('should return first cell when (0,0)', function() {
            var actual = dimensionModel.getIndexFromMousePosition(0, 0),
                expected = {
                    row: 0,
                    column: 0
                };

            expect(actual).toEqual(expected);
        });
        /************************************************
         * See the more test cases of unit functions
         * ----------------------------------------------
         *   1. _rebasePositionToContainer
         *   2. getOverflowFromMousePosition
         *   3. _calcRowIndexFromPositionY
         *   4. _calcColumnIndexFromPositionX
         * ----------------------------------------------
         ************************************************/
    });

    describe('_rebasePositionToContainer', function() {
        it('should return rebased position ' +
            'which subtracts the offset values from mouse position', function() {
            var pageX = 300,
                pageY = 300,
                expected = {
                    x: 200,
                    y: 98
                },
                actual;

            spyOn(dimensionModel, 'get').and.callFake(function(key) {
                switch(key) {
                    case 'offsetLeft':  // No break
                    case 'offsetTop':   // No break
                    case 'headerHeight':
                        return 100;
                    default:
                        return 0;
                }
            });
            actual = dimensionModel._rebasePositionToContainer(pageX, pageY);

            expect(actual).toEqual(expected);
        });
    });

    describe('getOverflowFromMousePosition', function() {
        var pageX, pageY;

        it('should return -1 when the position is negative', function() {
            var actual,
                expected = {
                    x: -1,
                    y: -1
                };

            spyOn(dimensionModel, '_rebasePositionToContainer').and.returnValue({
                x: -10,
                y: -10
            });
            actual = dimensionModel.getOverflowFromMousePosition(pageX, pageY);

            expect(actual).toEqual(expected);
        });

        it('should return 0 when the position is in container', function() {
            var actual,
                bodySize = dimensionModel._getBodySize(),
                expected = {
                    x: 0,
                    y: 0
                };

            spyOn(dimensionModel, '_rebasePositionToContainer').and.returnValue({
                x: bodySize.totalWidth - 1,
                y: bodySize.height - 1
            });
            actual = dimensionModel.getOverflowFromMousePosition(pageX, pageY);

            expect(actual).toEqual(expected);
        });

        it('should return 1 when the position is over the container size', function() {
            var bodySize = dimensionModel._getBodySize(),
                expected = {
                    x: 1,
                    y: 1
                },
                actual;

            spyOn(dimensionModel, '_rebasePositionToContainer').and.returnValue({
                x: bodySize.totalWidth + 100,
                y: bodySize.height + 100
            });

            actual = dimensionModel.getOverflowFromMousePosition(pageX, pageY);

            expect(actual).toEqual(expected);
        });
    });

    describe('_calcRowIndexFromPositionY', function() {
        beforeEach(function() {
            spyOn(dimensionModel.renderModel, 'get').and.returnValue(0);
        });

        it('should return 0 when the Y-position is in first row', function() {
            var containerY = 100,
                actual;

            spyOn(dimensionModel, 'get').and.callFake(function(key) {
                if (key === 'rowHeight') {
                    return 100;
                }
                return 0;
            });

            actual = dimensionModel._calcRowIndexFromPositionY(containerY);

            expect(actual).toEqual(0);
        });

        it('should return 0 when the Y-position is negative', function() {
            var containerY = -150,
                actual;

            spyOn(dimensionModel, 'get').and.callFake(function(key) {
                if (key === 'rowHeight') {
                    return 100;
                }
                return 0;
            });

            actual = dimensionModel._calcRowIndexFromPositionY(containerY);

            expect(actual).toEqual(0);
        });

        it('should return normal index when the Y-position is in container', function() {
            var rowHeight = 10,
                rowCount = 10,
                containerY = (rowHeight + 1) * 5,
                expectedIndex = 5,
                actual;

            dimensionModel.dataModel.length = rowCount;
            spyOn(dimensionModel, 'get').and.callFake(function(key) {
                if (key === 'rowHeight') {
                    return rowHeight;
                }
                return 0;
            });

            actual = dimensionModel._calcRowIndexFromPositionY(containerY);

            expect(actual).toEqual(expectedIndex);
        });

        it('should return last index of rows ' +
            'when the Y-position is over the container', function() {
            var containerY = Number.MAX_SAFE_INTEGER || 9007199254740991,
                rowCount = 10,
                expectedIndex = rowCount - 1,
                actual;

            dimensionModel.dataModel.length = rowCount;
            spyOn(dimensionModel, 'get').and.callFake(function(key) {
                if (key === 'rowHeight') {
                    return 100;
                }
                return 0;
            });

            actual = dimensionModel._calcRowIndexFromPositionY(containerY);

            expect(actual).toEqual(expectedIndex);
        });
    });

    describe('_calcColumnIndexFromPositionX', function() {
        var columnWidthList = [10, 20, 30, 40];

        beforeEach(function() {
            spyOn(dimensionModel.columnModel, 'getVisibleMetaColumnCount')
                .and
                .returnValue(1);
            spyOn(dimensionModel, 'getColumnWidthList')
                .and
                .returnValue(columnWidthList);
        });

        it('should return 0 when the X-position is in first cell', function() {
            var containerX = dimensionModel.getColumnWidthList()[0] - 1,
                withMeta = false,
                actual = dimensionModel._calcColumnIndexFromPositionX(containerX, withMeta);

            expect(actual).toEqual(0);
        });

        it('should return 0 when the X-position is negative', function() {
            var containerX = -1,
                withMeta = false,
                actual = dimensionModel._calcColumnIndexFromPositionX(containerX, withMeta);

            expect(actual).toEqual(0);
        });

        it('should return normal index considered meta columns ' +
            'when the X-position is in container', function() {
            var withMeta = true,
                containerX = columnWidthList[0] + columnWidthList[1] + columnWidthList[2],
                expectedIndex = 2,
                actual;

            actual = dimensionModel._calcColumnIndexFromPositionX(containerX, withMeta);
            expect(actual).toEqual(expectedIndex);
        });

        it('should return normal index that is not considered meta columns' +
            'when the X-position is in container', function() {
            var withMeta = false,
                containerX = columnWidthList[0] + columnWidthList[1] + columnWidthList[2],
                expectedIndex = 1,  // because meta column count is 1, see 'beforeEach'
                actual;

            actual = dimensionModel._calcColumnIndexFromPositionX(containerX, withMeta);
            expect(actual).toEqual(expectedIndex);
        });

        it('should return last index of columns ' +
            'when the X-position is over the container', function() {
            var containerX = Number.MAX_SAFE_INTEGER || 9007199254740991,
                withMeta = false,
                expectedIndex = 2,  // because meta column count is 1, see 'beforeEach'
                actual;

            actual = dimensionModel._calcColumnIndexFromPositionX(containerX, withMeta);
            expect(actual).toEqual(expectedIndex);
        });
    });

    describe('change:displayRowCount', function() {
        it('이벤트 발생시 bodyHeight를 재설정한다.', function() {
            dimensionModel.set('displayRowCount', 10);
            expect(dimensionModel.get('bodyHeight')).toBe(1027);
        });
    });
});
