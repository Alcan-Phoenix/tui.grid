'use strict';

var ColumnModelData = require('model/data/columnModel');
var RowListData = require('model/data/rowList');

describe('data.rowList', function() {
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
            title: '_button',
            columnName: '_button'
        },
        {
            title: '_number',
            columnName: '_number'
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
            title: 'relationList',
            columnName: 'relationList',
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
                        //false 면 true 를 반환
                        return value === false;
                    },
                    isEditable: function(value) {
                        //false 면 false 를 반환
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

    var rowList, dataModelInstance, columnModelInstance;

    beforeEach(function() {
        rowList = $.extend(true, [], originalData);
        columnModelInstance = new ColumnModelData();
        columnModelInstance.set('columnModelList', columnModelList);
        dataModelInstance = new RowListData([], {
            columnModel: columnModelInstance
        });
    });

    describe('Model 테스트', function() {
        describe('_getListTypeVisibleText()', function() {
            it('List Type 의 경우 columnModel 의 editOptionList 에 정의된 Value를 반환한다.', function() {
                var sampleList = [{
                        'select': 1,
                        'radio': 2,
                        'checkbox': '1,2,3',
                        'none': 1
                    }],
                    row;
                dataModelInstance.set(sampleList, {parse: true});
                row = dataModelInstance.at(0);

                expect(row._getListTypeVisibleText('select')).toBe('1');
                expect(row._getListTypeVisibleText('radio')).toBe('2');
                expect(row._getListTypeVisibleText('checkbox')).toBe('1,2,3');
                expect(row._getListTypeVisibleText('none')).toBe('');
            });

            it('changeOptionList Relation 이 걸려있을 경우에도 정상 동작하는지 확인한다.', function() {
                var sampleList = [{
                        'relationList': true,
                        'select': 1,
                        'radio': 2,
                        'radioNoRelation': 2,
                        'checkbox': '1,2,3',
                        'none': 1
                    }],
                    row;
                dataModelInstance.set(sampleList, {parse: true});
                row = dataModelInstance.at(0);

                expect(row._getListTypeVisibleText('select')).toBe('1');
                expect(row._getListTypeVisibleText('radio')).toBe('2');
                expect(row._getListTypeVisibleText('checkbox')).toBe('1,2,3');
                expect(row._getListTypeVisibleText('radioNoRelation')).toBe('2');
            });
        });

        describe('getValueString()', function() {
            it('copy & paste 기능을 사용할 때 정상적으로 텍스트를 반환한다.', function() {
                var sampleList = [{
                        'none': 'nope',
                        'hasFormatter': '<script>alert("test");</script>',
                        'notUseHtmlEntity': '<html></html>',
                        'relationList': false,
                        'text': 'text',
                        'text-convertible': 'convertible-text',
                        'select': 1,
                        'radio': 2,
                        'checkbox': '1,2,3',
                        'radioNoRelation': 2,
                        'hidden': 1
                    }, {
                        'none': 'nope',
                        'hasFormatter': '<script>alert("test");</script>',
                        'notUseHtmlEntity': '<html></html>',
                        'relationList': true,
                        'text': 'text',
                        'text-convertible': 'convertible-text',
                        'select': 1,
                        'radio': 2,
                        'checkbox': '1,2,3',
                        'radioNoRelation': 2,
                        'hidden': 1
                    }],
                    row;
                dataModelInstance.set(sampleList, {parse: true});
                row = dataModelInstance.at(0);

                expect(row.getValueString('none')).toBe('nope');
                expect(row.getValueString('hasFormatter')).toBe('<script>alert("test");</script>');
                expect(row.getValueString('notUseHtmlEntity')).toBe('<html></html>');
                expect(row.getValueString('relationList')).toBe('false');
                expect(row.getValueString('text')).toBe('text');
                expect(row.getValueString('text-convertible')).toBe('convertible-text');
                expect(row.getValueString('select')).toBe('1');
                expect(row.getValueString('radio')).toBe('2');
                expect(row.getValueString('checkbox')).toBe('1,2,3');
                expect(row.getValueString('radioNoRelation')).toBe('2');
                expect(row.getValueString('hidden')).toBe('1');

                row = dataModelInstance.at(1);
                expect(row.getValueString('none')).toBe('nope');
                expect(row.getValueString('hasFormatter')).toBe('<script>alert("test");</script>');
                expect(row.getValueString('notUseHtmlEntity')).toBe('<html></html>');
                expect(row.getValueString('relationList')).toBe('true');
                expect(row.getValueString('text')).toBe('text');
                expect(row.getValueString('text-convertible')).toBe('convertible-text');
                expect(row.getValueString('select')).toBe('1');
                expect(row.getValueString('radio')).toBe('2');
                expect(row.getValueString('checkbox')).toBe('1,2,3');
                expect(row.getValueString('radioNoRelation')).toBe('2');
                expect(row.getValueString('hidden')).toBe('1');
            });
        });

        describe('getClassNameList()', function() {
            it('extraData 에 정의된 className 을 반환한다.', function() {
                var sampleList = [{
                    '_extraData': {
                        'className': {
                            'row': ['rowClass0', 'rowClass1']
                        }
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    '_extraData': {
                        'className': {
                            'column': {
                                'text': ['textClass1', 'textClass2'],
                                'relationList': ['relationClass1']
                            }
                        }
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    '_extraData': {
                        'className': {
                            'row': ['rowClass0'],
                            'column': {
                                'text': ['textClass1', 'textClass2'],
                                'relationList': ['relationClass1']
                            }
                        }
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': false,
                    'text': 'sample1'
                }],
                row0, row1, row2, row3;

                columnModelInstance.set({
                    'hasNumberColumn': true,
                    'selectType': 'checkbox'
                });

                dataModelInstance.set(sampleList, {parse: true});
                row0 = dataModelInstance.get(0);
                row1 = dataModelInstance.get(1);
                row2 = dataModelInstance.get(2);
                row3 = dataModelInstance.get(3);

                expect(row0.getClassNameList('relationList').length).toEqual(2);
                expect(row0.getClassNameList('relationList')).toContain('rowClass0');
                expect(row0.getClassNameList('relationList')).toContain('rowClass1');
                expect(row0.getClassNameList('text').length).toEqual(3);
                expect(row0.getClassNameList('text')).toContain('rowClass0');
                expect(row0.getClassNameList('text')).toContain('rowClass1');

                expect(row1.getClassNameList('relationList').length).toEqual(1);
                expect(row1.getClassNameList('relationList')).toContain('relationClass1');
                expect(row1.getClassNameList('text').length).toEqual(3);
                expect(row1.getClassNameList('text')).toContain('textClass1');
                expect(row1.getClassNameList('text')).toContain('textClass2');

                expect(row2.getClassNameList('relationList').length).toEqual(2);
                expect(row2.getClassNameList('relationList')).toContain('rowClass0');
                expect(row2.getClassNameList('relationList')).toContain('relationClass1');

                expect(row2.getClassNameList('text').length).toEqual(4);
                expect(row2.getClassNameList('text')).toContain('rowClass0');
                expect(row2.getClassNameList('text')).toContain('textClass1');
                expect(row2.getClassNameList('text')).toContain('textClass2');

                expect(row3.getClassNameList('relationList').length).toEqual(0);
                expect(row3.getClassNameList('text').length).toEqual(1);
            });
        });

        describe('getCellState() relation list 결과와 rowState 를 종합한 결과를 통해 isDisabled, isEditable 을 반환한다.', function() {
            var sampleList;

            beforeEach(function() {
                sampleList = [{
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': true,
                    'text': 'sample2'
                }];
                columnModelInstance.set({
                    'hasNumberColumn': true,
                    'selectType': 'checkbox'
                });
                dataModelInstance.set(sampleList, {parse: true});
            });

            it('결과값에 맞게 반환하는지 확인한다.', function() {
                expect(dataModelInstance.at(0).getCellState('_button')).toEqual({
                    isDisabled: false,
                    isEditable: true
                });
                expect(dataModelInstance.at(0).getCellState('_number')).toEqual({
                    isDisabled: false,
                    isEditable: false
                });
                expect(dataModelInstance.at(0).getCellState('text')).toEqual({
                    isDisabled: true,
                    isEditable: false
                });
                expect(dataModelInstance.at(1).getCellState('text')).toEqual({
                    isDisabled: false,
                    isEditable: true
                });
            });

            it('rowState 값이 DISABLED 일 경우 결과를 확인한다.', function() {
                sampleList = [{
                    '_extraData': {
                        'rowState': 'DISABLED'
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': true,
                    'text': 'sample2'
                }];
                dataModelInstance.set(sampleList, {parse: true});

                expect(dataModelInstance.at(0).getCellState('_button')).toEqual({
                    isDisabled: true,
                    isEditable: true
                });
                expect(dataModelInstance.at(0).getCellState('_number')).toEqual({
                    isDisabled: true,
                    isEditable: false
                });
                expect(dataModelInstance.at(0).getCellState('text')).toEqual({
                    isDisabled: true,
                    isEditable: false
                });
            });

            it('rowState 값이 DISABLED_CHECK 일 경우 결과를 확인한다.', function() {
                sampleList = [{
                    '_extraData': {
                        'rowState': 'DISABLED_CHECK'
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': true,
                    'text': 'sample2'
                }];
                dataModelInstance.set(sampleList, {parse: true});

                expect(dataModelInstance.at(0).getCellState('_button')).toEqual({
                    isDisabled: true,
                    isEditable: true
                });
                expect(dataModelInstance.at(0).getCellState('_number')).toEqual({
                    isDisabled: false,
                    isEditable: false
                });
                expect(dataModelInstance.at(0).getCellState('text')).toEqual({
                    isDisabled: true,
                    isEditable: false
                });
            });
        });

        describe('isDisabled() cellState 를 사용하는 메서드이므로 파라미터에 대해 동작하는지 간단하게 확인한다..', function() {
            it('columnName 을 전달했을경우 정상적으로 isDisabled 값을 반환한다..', function() {
                var sampleList = [{
                    '_extraData': {
                        'rowState': 'DISABLED'
                    },
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': true,
                    'text': 'sample2'
                }];
                dataModelInstance.set(sampleList, {parse: true});

                expect(dataModelInstance.at(0).isDisabled('_button')).toEqual(true);
                expect(dataModelInstance.at(0).isDisabled('_number')).toEqual(true);
                expect(dataModelInstance.at(0).isDisabled('relationList')).toEqual(true);
                expect(dataModelInstance.at(0).isDisabled('text')).toEqual(true);

                expect(dataModelInstance.at(1).isDisabled('_button')).toEqual(false);
                expect(dataModelInstance.at(1).isDisabled('_number')).toEqual(false);
                expect(dataModelInstance.at(1).isDisabled('relationList')).toEqual(false);
                expect(dataModelInstance.at(1).isDisabled('text')).toEqual(false);
            });
        });

        describe('isEditable() cellState 를 사용하는 메서드이므로, cellState 를 이용하지 않을때 정상 동작하는지 확인한다.', function() {
            it('_number, normal type 의 경우 false 를 리턴하는지 확인한다.', function() {
                var sampleList = [{
                    'relationList': false,
                    'text': 'sample1'
                }, {
                    'relationList': true,
                    'text': 'sample2'
                }];
                columnModelInstance.set({
                    'hasNumberColumn': true,
                    'selectType': 'checkbox'
                });
                dataModelInstance.set(sampleList, {parse: true});
                expect(dataModelInstance.get(0).isEditable('_number')).toEqual(false);
                expect(dataModelInstance.get(0).isEditable('normal')).toEqual(false);
            });
        });

        describe('getRelationResult()', function() {
            var sampleList, row;
            beforeEach(function() {
                sampleList = [{
                    'relationList': false,
                    'select': 1,
                    'radio': 2,
                    'checkbox': '1,2,3',
                    'radioNoRelation': 2
                }, {
                    'relationList': true,
                    'select': 1,
                    'radio': 2,
                    'checkbox': '1,2,3',
                    'radioNoRelation': 2
                }];
                dataModelInstance.set(sampleList, {parse: true});
            });

            it('relation 수행 결과를 정확하게 반환한다.', function() {
                row = dataModelInstance.at(0);
                expect(row.executeRelationCallbacksAll()).toEqual({
                    select: {
                        optionList: undefined
                    },
                    checkbox: {
                        optionList: undefined
                    },
                    radio: {
                        optionList: undefined
                    },
                    text: {
                        isDisabled: true,
                        isEditable: false
                    }
                });

                row = dataModelInstance.at(1);
                expect(row.executeRelationCallbacksAll()).toEqual({
                    select: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    checkbox: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    radio: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    text: {
                        isDisabled: false,
                        isEditable: true
                    }
                });
            });

            it('원하는 callbackNameList에 맞게 relationResult 를 반환한다.', function() {
                row = dataModelInstance.at(1);
                expect(row.executeRelationCallbacksAll(['optionListChange'])).toEqual({
                    select: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    checkbox: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    radio: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    }
                });

                expect(row.executeRelationCallbacksAll(['optionListChange', 'isEditable'])).toEqual({
                    select: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    checkbox: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    radio: {
                        optionList: [
                            {text: '하나', value: 1},
                            {text: '둘', value: 2},
                            {text: '셋', value: 3},
                            {text: '넷', value: 4}
                        ]
                    },
                    text: {
                        isEditable: true
                    }
                });

                expect(row.executeRelationCallbacksAll(['isEditable'])).toEqual({
                    text: {isEditable: true}
                });

                expect(row.executeRelationCallbacksAll(['isEditable', 'isDisabled'])).toEqual({
                    text: {isDisabled: false, isEditable: true}
                });
            });
        });
    });

    describe('Collection 테스트', function() {
        describe('rowList set 시 parse 관련 로직을 테스트한다.', function() {
            describe('_baseFormat()', function() {
                describe('keyColumnName 이 존재하지 않을 때', function() {
                    it('extraData 가 없을때', function() {
                        var baseRow = dataModelInstance._baseFormat({
                                'none': 4,
                                'text': 4,
                                'text-convertible': 4,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            }, 0),
                            expectResult = {
                                'rowKey': 0,
                                '_button': false,
                                '_extraData': {
                                    rowSpan: null,
                                    rowState: null,
                                    rowSpanData: null
                                },

                                'none': 4,
                                'text': 4,
                                'text-convertible': 4,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            };

                        expect(baseRow).toEqual(expectResult);
                    });

                    it('rowState가 CHECKED 일 때', function() {
                        var baseRow = dataModelInstance._baseFormat({
                                '_extraData': {
                                    rowState: 'CHECKED'
                                },
                                'none': 0,
                                'text': 0,
                                'text-convertible': 0,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            }, 0),
                            expectResult = {
                                'rowKey': 0,
                                '_button': true,
                                '_extraData': {
                                    rowSpan: null,
                                    rowSpanData: null,
                                    rowState: 'CHECKED'
                                },
                                'none': 0,
                                'text': 0,
                                'text-convertible': 0,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            };

                        expect(baseRow).toEqual(expectResult);
                    });

                    it('rowSpan 이 존재할 때', function() {
                        var baseRow = dataModelInstance._baseFormat({
                                '_extraData': {
                                    rowSpan: {
                                        'none': 2,
                                        'text': 3,
                                        'text-convertible': 4,
                                        'select': 5,
                                        'checkbox': 6,
                                        'radio': 7
                                    }
                                },
                                'none': 1,
                                'text': 1,
                                'text-convertible': 1,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            }, 0),
                            expectResult = {
                                'rowKey': 0,
                                '_button': false,
                                '_extraData': {
                                    rowSpan: {
                                        'none': 2,
                                        'text': 3,
                                        'text-convertible': 4,
                                        'select': 5,
                                        'checkbox': 6,
                                        'radio': 7
                                    },
                                    rowState: null,
                                    rowSpanData: null
                                },
                                'none': 1,
                                'text': 1,
                                'text-convertible': 1,
                                'select': 1,
                                'checkbox': 1,
                                'radio': 1,
                                'hidden': 1
                            };

                        expect(baseRow).toEqual(expectResult);
                    });
                });

                describe('keyColumnName이 설정되어 있다면', function() {
                    it('keyColumnName이 설정되어 있다면 rowKey는 keyColumn에 해당하는 값으로 설정된다.', function() {
                        var baseRow;

                        columnModelInstance.set('keyColumnName', 'none');
                        baseRow = dataModelInstance._baseFormat({
                            'none': 4,
                            'text': 4,
                            'text-convertible': 4,
                            'select': 1,
                            'checkbox': 1,
                            'radio': 1,
                            'hidden': 1
                        }, 0);
                        expect(baseRow.rowKey).toEqual(4);
                    });
                });
            });
            describe('_setExtraRowSpanData()', function() {
                it('자신과 자식 row 까지 rowSpanData를 잘 설정하는지 확인한다.', function() {
                    //_baseFormat 을 타고 온다고 가정하기 때문에 셈플 데이터에 rowKey 를 할당한다
                    var testList = [
                        {
                            '_extraData': {
                                'rowSpan': {
                                    'none': 2,
                                    'text': 3
                                }
                            },
                            rowKey: 0
                        }, {
                            rowKey: 1
                        }, {
                            rowKey: 2
                        }, {
                            rowKey: 3
                        }
                    ];
                    var formattedList = dataModelInstance._setExtraRowSpanData(testList, 0);

                    expect(formattedList[0]._extraData.rowSpanData).toEqual({
                        'none': {
                            count: 2,
                            isMainRow: true,
                            mainRowKey: 0
                        },
                        'text': {
                            count: 3,
                            isMainRow: true,
                            mainRowKey: 0
                        }
                    });
                    expect(formattedList[1]._extraData.rowSpanData).toEqual({
                        'none': {
                            count: -1,
                            isMainRow: false,
                            mainRowKey: 0
                        },
                        'text': {
                            count: -1,
                            isMainRow: false,
                            mainRowKey: 0
                        }
                    });
                    expect(formattedList[2]._extraData.rowSpanData).toEqual({
                        'text': {
                            count: -2,
                            isMainRow: false,
                            mainRowKey: 0
                        }
                    });
                    expect(formattedList[3]._extraData).not.toBeDefined();
                });
            });

            describe('_formatData()', function() {
                it('_paseFormat, _setExtraRowSpanData 를 정상적으로 잘 수행하는지 확인한다.', function() {
                    var testList = [
                        {
                            '_extraData': {
                                'rowSpan': {
                                    'none': 2,
                                    'text': 3
                                }
                            },
                            'none': 0,
                            'text': 0
                        }, {
                            'none': 1,
                            'text': 1
                        }, {
                            'none': 2,
                            'text': 2
                        }, {
                            'none': 3,
                            'text': 3
                        }
                    ];
                    var formattedList = dataModelInstance._formatData(testList, 0);
                    expect(formattedList[0]).toEqual({
                        '_extraData': {
                            'rowSpan': {
                                'none': 2,
                                'text': 3
                            },
                            'rowState': null,
                            'rowSpanData': {
                                'none': {
                                    count: 2,
                                    isMainRow: true,
                                    mainRowKey: 0
                                },
                                'text': {
                                    count: 3,
                                    isMainRow: true,
                                    mainRowKey: 0
                                }
                            }
                        },
                        'none': 0,
                        'text': 0,
                        'rowKey': 0,
                        '_button': false
                    });

                    expect(formattedList[1]).toEqual({
                        '_extraData': {
                            'rowSpan': null,
                            'rowState': null,
                            'rowSpanData': {
                                'none': {
                                    count: -1,
                                    isMainRow: false,
                                    mainRowKey: 0
                                },
                                'text': {
                                    count: -1,
                                    isMainRow: false,
                                    mainRowKey: 0
                                }
                            }
                        },
                        'none': 0,
                        'text': 0,
                        'rowKey': 1,
                        '_button': false
                    });

                    expect(formattedList[2]).toEqual({
                        '_extraData': {
                            'rowSpan': null,
                            'rowState': null,
                            'rowSpanData': {
                                'text': {
                                    count: -2,
                                    isMainRow: false,
                                    mainRowKey: 0
                                }
                            }
                        },
                        'none': 2,
                        'text': 0,
                        'rowKey': 2,
                        '_button': false
                    });

                    expect(formattedList[3]).toEqual({
                        '_extraData': {
                            'rowSpan': null,
                            'rowState': null,
                            'rowSpanData': null
                        },
                        'none': 3,
                        'text': 3,
                        'rowKey': 3,
                        '_button': false
                    });
                });
            });
        });

        describe('original Data 시리즈', function() {
            beforeEach(function() {
                dataModelInstance.set(rowList, {
                    parse: true
                });
                dataModelInstance.setOriginalRowList();
            });

            describe('getOriginalRowList()', function() {
                it('set 에서 parse 후 originalRowList 가 정상적으로 생성되었는지 확인한다.', function() {
                    var expectResult;
                    dataModelInstance.lastRowKey = -1;
                    expectResult = dataModelInstance._formatData(originalData);
                    expect(dataModelInstance.toJSON()).toEqual(expectResult);
                    //데이터 변경
                    dataModelInstance.get(0).set('none', '2222');
                    expect(dataModelInstance.toJSON()).not.toEqual(expectResult);
                    expect(dataModelInstance.getOriginalRowList()).toEqual(expectResult);
                });
            });

            describe('getOriginalRow()', function() {
                it('set 에서 parse 후 originalRowList 가 정상적으로 생성되었는지 확인한다.', function() {
                    var expectResultList;
                    dataModelInstance.lastRowKey = -1;
                    expectResultList = dataModelInstance._formatData(originalData);
                    expect(dataModelInstance.get(0).toJSON()).toEqual(expectResultList[0]);
                    dataModelInstance.at(0).set('none', '2222');
                    expect(dataModelInstance.get(0).toJSON()).not.toEqual(expectResultList[0]);
                    expect(dataModelInstance.getOriginalRow(0)).toEqual(expectResultList[0]);
                });
            });

            describe('getOriginal()', function() {
                it('set 에서 parse 후 originalRowList 가 정상적으로 생성되었는지 확인한다.', function() {
                    var expectResultList = dataModelInstance._formatData(originalData);

                    expect(dataModelInstance.get(0).get('none')).toBe(expectResultList[0]['none']);
                    //데이터 변경
                    dataModelInstance.at(0).set('none', '2222');
                    expect(dataModelInstance.get(0).get('none')).not.toBe(expectResultList[0]['none']);
                    expect(dataModelInstance.getOriginal(0, 'none')).toBe(expectResultList[0]['none']);
                });
            });
        });

        describe('indexOfRowKey()', function() {
            it('rowKey 를 인자로 index 를 알 수 있다.', function() {
                columnModelInstance.set('keyColumnName', 'keyColumn');
                dataModelInstance.set(rowList, {
                    parse: true
                });
                expect(dataModelInstance.indexOfRowKey(10)).toBe(0);
                expect(dataModelInstance.indexOfRowKey(11)).toBe(1);
                expect(dataModelInstance.indexOfRowKey(12)).toBe(2);
                expect(dataModelInstance.indexOfRowKey(1)).toBe(-1);
            });
        });

        describe('getRowList', function() {
            it('isRaw 옵션값이 설정되어 있으면 내부용 데이터를 제거하지 않고 반환한다.', function() {
                var myRowList;
                columnModelInstance.set({
                    hasNumberColumn: true,
                    selectType: 'checkbox'
                });
                dataModelInstance.set(rowList, {
                    parse: true
                });
                myRowList = dataModelInstance.getRowList();
                expect(myRowList[0]._button).not.toBeDefined();
                expect(myRowList[0]._extraData).not.toBeDefined();
                expect(myRowList[0]._number).not.toBeDefined();

                myRowList = dataModelInstance.getRowList(false, true);
                expect(myRowList[0]._button).toBeDefined();
                expect(myRowList[0]._extraData).toBeDefined();
                expect(myRowList[0]._number).toBeDefined();
            });

            it('isChecked 옵션값이 설정되어 있으면 checked 된 리스트만 반환한다.', function() {
                var myRowList;
                columnModelInstance.set({
                    hasNumberColumn: true,
                    selectType: 'checkbox'
                });
                dataModelInstance.set(rowList, {
                    parse: true
                });

                dataModelInstance.at(0).set('_button', true);
                dataModelInstance.at(2).set('_button', true);
                dataModelInstance.at(3).set('_button', true);

                myRowList = dataModelInstance.getRowList(true);
                expect(myRowList.length).toBe(3);
                expect(myRowList[1].keyColumn).toBe(12);
                expect(myRowList[1]._extraData).not.toBeDefined();

                myRowList = dataModelInstance.getRowList(true, true);
                expect(myRowList[1]._extraData).toBeDefined();
            });
        });

        describe('isSortedByField()', function() {
            it('현재 sorting 상태인지 확인할 수 있다.', function() {
                dataModelInstance.set(rowList, {
                    parse: true
                });
                expect(dataModelInstance.isSortedByField()).toBe(false);
                dataModelInstance.sortByField('none');
                expect(dataModelInstance.isSortedByField()).toBe(true);
                dataModelInstance.sortByField('rowKey');
                expect(dataModelInstance.isSortedByField()).toBe(false);
            });
        });

        describe('_onChange() 테스트', function() {
            describe('syncRowSpannedData()', function() {
                describe('데이터에 변경이 있다면, rowSpan 된 데이터를 함께 업데이트 해준다.', function() {
                    var testRowList;

                    beforeEach(function() {
                        testRowList = [
                            {
                                'none': 1,
                                'text': 1
                            }, {
                                '_extraData': {
                                    'rowSpan': {
                                        'none': 2,
                                        'text': 3
                                    }
                                },
                                'none': 2,
                                'text': 2
                            }, {
                                'none': 3,
                                'text': 3
                            }, {
                                'none': 4,
                                'text': 4
                            }, {
                                'none': 5,
                                'text': 5
                            }, {
                                'none': 6,
                                'text': 6
                            }
                        ];
                        dataModelInstance.set(testRowList, {parse: true});
                    });

                    it('Main row 를 변경했을 때 자식 row 도 변경되는지 확인한다.', function() {
                        var spannedRow = dataModelInstance.at(1);
                        dataModelInstance.syncRowSpannedData(spannedRow, 'text', 'changed');

                        expect(dataModelInstance.at(0).get('text')).toBe(1);
                        expect(dataModelInstance.at(1).get('text')).toBe('changed');
                        expect(dataModelInstance.at(2).get('text')).toBe('changed');
                        expect(dataModelInstance.at(3).get('text')).toBe('changed');
                        expect(dataModelInstance.at(4).get('text')).toBe(5);
                    });

                    it('자식 row 를 변경했을 때 Main row 도 변경되는지 확인한다.', function() {
                        var childRow = dataModelInstance.at(3);
                        dataModelInstance.syncRowSpannedData(childRow, 'text', 'changed');

                        expect(dataModelInstance.at(0).get('text')).toBe(1);
                        expect(dataModelInstance.at(1).get('text')).toBe('changed');
                        expect(dataModelInstance.at(2).get('text')).toBe('changed');
                        expect(dataModelInstance.at(3).get('text')).toBe('changed');
                        expect(dataModelInstance.at(4).get('text')).toBe(5);
                    });

                    it('rowSpan 하지 않은 row 에 대해서는 아무 동작 하지 않는다.', function() {
                        var childRow = dataModelInstance.at(0);
                        dataModelInstance.syncRowSpannedData(childRow, 'text', 'changed');

                        expect(dataModelInstance.at(0).get('text')).toBe(1);
                        expect(dataModelInstance.at(1).get('text')).toBe(2);
                        expect(dataModelInstance.at(2).get('text')).toBe(2);
                        expect(dataModelInstance.at(3).get('text')).toBe(2);
                        expect(dataModelInstance.at(4).get('text')).toBe(5);
                    });

                    it('sort 되지 않았을 경우는 Spanned 된 데이터라도 업데이트 하지 않는다.', function() {
                        var spannedRow = dataModelInstance.at(1);
                        dataModelInstance.sortByField('text');
                        dataModelInstance.syncRowSpannedData(spannedRow, 'text', 'changed');

                        expect(dataModelInstance.at(0).get('text')).toBe(1);
                        expect(dataModelInstance.at(1).get('text')).toBe(2);
                        expect(dataModelInstance.at(2).get('text')).toBe(2);
                        expect(dataModelInstance.at(3).get('text')).toBe(2);
                        expect(dataModelInstance.at(4).get('text')).toBe(5);
                    });
                });
            });
        });

        describe('_removePrivateProp() 테스트', function() {
            it('_privateProperty (_number|_button|_extraData) 를 제거하고 반환한다.', function() {
                var notFiltered, filtered;

                dataModelInstance.set(rowList, {parse: true});
                notFiltered = dataModelInstance.toJSON();
                filtered = dataModelInstance._removePrivateProp(notFiltered);
                expect(notFiltered[0]._number).toBeDefined();
                expect(notFiltered[0]._button).toBeDefined();
                expect(notFiltered[0]._extraData).toBeDefined();
                expect(notFiltered[1]._number).toBeDefined();
                expect(notFiltered[1]._button).toBeDefined();
                expect(notFiltered[1]._extraData).toBeDefined();

                expect(filtered[0]._number).not.toBeDefined();
                expect(filtered[0]._button).not.toBeDefined();
                expect(filtered[0]._extraData).not.toBeDefined();
                expect(filtered[1]._number).not.toBeDefined();
                expect(filtered[1]._button).not.toBeDefined();
                expect(filtered[1]._extraData).not.toBeDefined();
            });
        });

        describe('removeRow() 테스트', function() {
            var sampleRowList;

            beforeEach(function() {
                sampleRowList = [
                    {},
                    {},
                    {},
                    {},
                    {}
                ];
                dataModelInstance.set(sampleRowList, {parse: true});
                dataModelInstance.setOriginalRowList();
            });

            it('row 가 삭제되는지 확인한다.', function() {
                var originalRowList;
                originalRowList = dataModelInstance.getOriginalRowList();
                expect(dataModelInstance.length).toBe(5);
                expect(dataModelInstance.get(0)).toBeDefined();
                expect(dataModelInstance.get(1)).toBeDefined();
                expect(dataModelInstance.get(2)).toBeDefined();
                expect(dataModelInstance.get(3)).toBeDefined();
                expect(dataModelInstance.get(4)).toBeDefined();
                expect(originalRowList.length).toBe(5);

                dataModelInstance.removeRow(3);
                originalRowList = dataModelInstance.getOriginalRowList();
                expect(dataModelInstance.length).toBe(4);
                expect(dataModelInstance.get(0)).toBeDefined();
                expect(dataModelInstance.get(1)).toBeDefined();
                expect(dataModelInstance.get(2)).toBeDefined();
                expect(dataModelInstance.get(3)).not.toBeDefined();
                expect(dataModelInstance.get(4)).toBeDefined();
                expect(originalRowList.length).toBe(5);
            });

            it('isRemoveOriginalData 옵션을 주었을 때 originalData 도 함께 삭제되는지 확인한다.', function() {
                var originalRowList;
                originalRowList = dataModelInstance.getOriginalRowList();
                expect(dataModelInstance.length).toBe(5);
                expect(dataModelInstance.get(0)).toBeDefined();
                expect(dataModelInstance.get(1)).toBeDefined();
                expect(dataModelInstance.get(2)).toBeDefined();
                expect(dataModelInstance.get(3)).toBeDefined();
                expect(dataModelInstance.get(4)).toBeDefined();

                expect(dataModelInstance.getOriginalRow(3)).toBeDefined();
                expect(originalRowList.length).toBe(5);

                dataModelInstance.removeRow(3, {
                    removeOriginalData: true
                });
                originalRowList = dataModelInstance.getOriginalRowList();
                expect(dataModelInstance.length).toBe(4);
                expect(dataModelInstance.get(0)).toBeDefined();
                expect(dataModelInstance.get(1)).toBeDefined();
                expect(dataModelInstance.get(2)).toBeDefined();
                expect(dataModelInstance.get(3)).not.toBeDefined();
                expect(dataModelInstance.get(4)).toBeDefined();
                expect(dataModelInstance.getOriginalRow(3)).not.toBeDefined();
                expect(originalRowList.length).toBe(4);
            });
        });

        describe('append 테스트', function() {
            var length;

            function setDefaultRowList() {
                dataModelInstance.set([{
                    'text': '1'
                }, {
                    'text': '2'
                }, {
                    'text': '3'
                }, {
                    'text': '4'
                }, {
                    'text': '5'
                }], {parse: true});
                length = dataModelInstance.length;
            }

            it('at 옵션을 주지 않았을 경우 맨 뒤에 추가된다.', function() {
                setDefaultRowList();
                dataModelInstance.append({text: '6'});
                expect(dataModelInstance.length).toBe(length + 1);

                dataModelInstance.append({text: '7'});
                expect(dataModelInstance.length).toBe(length + 2);
                expect(dataModelInstance.at(4).get('text')).toEqual('5');
                expect(dataModelInstance.at(5).get('text')).toEqual('6');
                expect(dataModelInstance.at(6).get('text')).toEqual('7');
            });

            it('at 옵션이 있을 경우 해당 위치에 추가된다.', function() {
                setDefaultRowList();
                dataModelInstance.append({text: '6'}, {at: 1});
                expect(dataModelInstance.at(1).get('text')).toEqual('6');

                dataModelInstance.append({text: '7'}, {at: 1});
                expect(dataModelInstance.at(0).get('text')).toEqual('1');
                expect(dataModelInstance.at(1).get('text')).toEqual('7');
                expect(dataModelInstance.at(2).get('text')).toEqual('6');
                expect(dataModelInstance.at(3).get('text')).toEqual('2');
                expect(dataModelInstance.at(4).get('text')).toEqual('3');
                expect(dataModelInstance.at(5).get('text')).toEqual('4');
                expect(dataModelInstance.at(6).get('text')).toEqual('5');
            });

            it('keyColumn 이 없을 경우 rowKey 는 자동으로 생성된다.', function() {
                setDefaultRowList();
                dataModelInstance.append({text: '6'}, {at: 1});
                expect(dataModelInstance.at(1).get('text')).toEqual('6');

                dataModelInstance.append({text: '7'}, {at: 1});
                expect(dataModelInstance.at(1).get('rowKey')).toEqual(6);
                expect(dataModelInstance.at(2).get('rowKey')).toEqual(5);
            });

            it('keyColumn 이 설정되어 있을 경우, keyColumn 으로 설정된다.', function() {
                columnModelInstance.set('keyColumnName', 'text');
                setDefaultRowList();
                dataModelInstance.append({text: '6'}, {at: 1});
                expect(dataModelInstance.at(1).get('text')).toEqual('6');

                dataModelInstance.append({text: '7'}, {at: 1});
                expect(dataModelInstance.at(1).get('rowKey')).toEqual('7');
                expect(dataModelInstance.at(2).get('rowKey')).toEqual('6');
            });
        });

        describe('prepend() 는 append 를 이용하므로 간단하게 테스트한다.', function() {
            it('상단에 추가되는지 확인한다.', function() {
                var length;

                dataModelInstance.set([{
                    'text': '1'
                }, {
                    'text': '2'
                }, {
                    'text': '3'
                }, {
                    'text': '4'
                }, {
                    'text': '5'
                }], {parse: true});

                length = dataModelInstance.length;

                dataModelInstance.prepend({
                    text: '0'
                });
                expect(dataModelInstance.length).toBe(length + 1);

                dataModelInstance.prepend({
                    text: '-1'
                });
                expect(dataModelInstance.length).toBe(length + 2);

                expect(dataModelInstance.at(0).get('text')).toEqual('-1');
                expect(dataModelInstance.at(1).get('text')).toEqual('0');
                expect(dataModelInstance.at(2).get('text')).toEqual('1');
            });
        });

        describe('getModifiedRowList()', function() {
            var sampleRowList;

            function append() {
                dataModelInstance.append({
                    'none': 'none_appended',
                    'text': 'text_appended',
                    'hidden': 'hidden_appended'
                });
            }
            function prepend() {
                dataModelInstance.prepend({
                    'none': 'none_prepended',
                    'text': 'text_prepended',
                    'hidden': 'hidden_prepended'
                });
            }
            function remove(rowKey) {
                dataModelInstance.remove(rowKey);
            }

            function refreshOriginal() {
                dataModelInstance.setOriginalRowList();
            }

            function spoil(rowKey, columnName) {
                columnName = columnName || 'none';
                dataModelInstance.get(rowKey).set(columnName, 'dirty');
            }
            function check(rowKey) {
                dataModelInstance.get(rowKey).set('_button', true);
            }
            function uncheck(rowKey) {
                dataModelInstance.get(rowKey).set('_button', false);
            }
            function checkAll() {
                dataModelInstance.forEach(function(row) {
                    row.set('_button', true);
                });
            }
            function uncheckAll() {
                dataModelInstance.forEach(function(row) {
                    row.set('_button', false);
                });
            }
            function getModified() {
                return dataModelInstance.getModifiedRowList({
                    isOnlyChecked: true
                });
            }
            function messUp() {
                append();
                prepend();
                spoil(0);
                spoil(1);
                remove(2);
                remove(3);
            }

            beforeEach(function() {
                sampleRowList = [
                    {
                        'none': 'none1',
                        'text': 'text1',
                        'hidden': 'hidden1'
                    }, {
                        'none': 'none2',
                        'text': 'text2',
                        'hidden': 'hidden2'
                    }, {
                        'none': 'none3',
                        'text': 'text3',
                        'hidden': 'hidden3'
                    }, {
                        'none': 'none4',
                        'text': 'text4',
                        'hidden': 'hidden4'
                    }, {
                        'none': 'none5',
                        'text': 'text5',
                        'hidden': 'hidden5'
                    }, {
                        'none': 'none6',
                        'text': 'text6',
                        'hidden': 'hidden6'
                    }
                ];
                dataModelInstance.set(sampleRowList, {parse: true});
                dataModelInstance.setOriginalRowList();
            });

            describe('isOnlyChecked 옵션 true 일 때.', function() {
                it('check 된 리스트가 존재하지 않을 경우 removeList 를 제외하고 createList, updateList는 빈 배열을 반환한다.', function() {
                    var modifiedList;
                    messUp();
                    uncheckAll();
                    modifiedList = getModified();
                    expect(modifiedList).toEqual({
                        createList: [],
                        updateList: [],
                        deleteList: [
                            {none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2},
                            {none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3}
                        ]
                    });
                });

                it('변경 사항이 없는 행에만 check 가 되었을 경우 removeList 를 제외하고 createList, updateList 는 빈 배열을 반환한다.', function() {
                    var modifiedList;
                    messUp();
                    uncheckAll();
                    check(5);
                    modifiedList = getModified();
                    expect(modifiedList).toEqual({
                        createList: [],
                        updateList: [],
                        deleteList: [
                            {none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2},
                            {none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3}
                        ]
                    });
                });

                it('모두 check 되었다면 isOnlyChecked === false 와 동일한 결과를 반환한다.', function() {
                    var modifiedList;
                    messUp();
                    checkAll();
                    modifiedList = getModified();
                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain({none: 'none_appended', text: 'text_appended', hidden: 'hidden_appended', rowKey: 6});
                    expect(modifiedList.createList).toContain({none: 'none_prepended', text: 'text_prepended', hidden: 'hidden_prepended', rowKey: 7});

                    expect(modifiedList.updateList).toBeDefined();
                    expect(modifiedList.updateList.length).toBe(2);
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text1', hidden: 'hidden1', rowKey: 0});
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text2', hidden: 'hidden2', rowKey: 1});

                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(2);
                    expect(modifiedList.deleteList).toContain({none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2});
                    expect(modifiedList.deleteList).toContain({none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3});
                });
            });

            describe('isOnlyChecked 옵션 false 일 때.', function() {
                function getModified() {
                    return dataModelInstance.getModifiedRowList({
                        isOnlyChecked: false
                    });
                }

                it('변경 사항이 없을 경우 아무 리스트도 반환하지 않는다.', function() {
                    var modifiedList;
                    modifiedList = getModified();
                    expect(modifiedList).toEqual({
                        createList: [],
                        updateList: [],
                        deleteList: []
                    });
                });

                it('추가 사항이 있을 경우 createList 에 추가하여 반환한다.', function() {
                    var modifiedList;
                    append();
                    prepend();

                    modifiedList = getModified();

                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain({none: 'none_appended', text: 'text_appended', hidden: 'hidden_appended', rowKey: 6});
                    expect(modifiedList.createList).toContain({none: 'none_prepended', text: 'text_prepended', hidden: 'hidden_prepended', rowKey: 7});
                    expect(modifiedList.updateList.length).toBe(0);
                    expect(modifiedList.deleteList.length).toBe(0);
                });

                it('변경 사항이 있을 경우 updateList 에 추가하여 반환한다.', function() {
                    var modifiedList;
                    spoil(0);
                    spoil(1);

                    modifiedList = getModified();

                    expect(modifiedList.updateList).toBeDefined();
                    expect(modifiedList.updateList.length).toBe(2);
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text1', hidden: 'hidden1', rowKey: 0});
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text2', hidden: 'hidden2', rowKey: 1});
                    expect(modifiedList.createList.length).toBe(0);
                    expect(modifiedList.deleteList.length).toBe(0);
                });

                it('삭제 사항이 있을 경우 deleteList 에 추가하여 반환한다.', function() {
                    var modifiedList;
                    remove(0);
                    remove(1);

                    modifiedList = getModified();
                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(2);
                    expect(modifiedList.deleteList).toContain({none: 'none1', text: 'text1', hidden: 'hidden1', rowKey: 0});
                    expect(modifiedList.deleteList).toContain({none: 'none2', text: 'text2', hidden: 'hidden2', rowKey: 1});
                    expect(modifiedList.createList.length).toBe(0);
                    expect(modifiedList.updateList.length).toBe(0);
                });

                it('추가/변경/삭제 종합 테스트. 변경한 행을 삭제한 경우', function() {
                    var modifiedList;
                    messUp();
                    remove(0);
                    remove(1);
                    modifiedList = getModified();

                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain({none: 'none_appended', text: 'text_appended', hidden: 'hidden_appended', rowKey: 6});
                    expect(modifiedList.createList).toContain({none: 'none_prepended', text: 'text_prepended', hidden: 'hidden_prepended', rowKey: 7});

                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(4);
                    expect(modifiedList.deleteList).toContain({none: 'none1', text: 'text1', hidden: 'hidden1', rowKey: 0});
                    expect(modifiedList.deleteList).toContain({none: 'none2', text: 'text2', hidden: 'hidden2', rowKey: 1});
                    expect(modifiedList.deleteList).toContain({none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2});
                    expect(modifiedList.deleteList).toContain({none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3});

                    expect(modifiedList.updateList.length).toBe(0);
                });

                it('추가/변경/삭제 종합 테스트', function() {
                    var modifiedList;
                    messUp();
                    modifiedList = getModified();
                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain({none: 'none_appended', text: 'text_appended', hidden: 'hidden_appended', rowKey: 6});
                    expect(modifiedList.createList).toContain({none: 'none_prepended', text: 'text_prepended', hidden: 'hidden_prepended', rowKey: 7});

                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(2);
                    expect(modifiedList.deleteList).toContain({none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2});
                    expect(modifiedList.deleteList).toContain({none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3});

                    expect(modifiedList.updateList).toBeDefined();
                    expect(modifiedList.updateList.length).toBe(2);
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text1', hidden: 'hidden1', rowKey: 0});
                    expect(modifiedList.updateList).toContain({none: 'dirty', text: 'text2', hidden: 'hidden2', rowKey: 1});
                });
            });

            describe('filteringColumnList 옵션이 있을 때', function() {
                function getModified() {
                    return dataModelInstance.getModifiedRowList({
                        filteringColumnList: ['none']
                    });
                }

                it('none', function() {
                    var modifiedList;
                    messUp();
                    spoil(4, 'text');
                    modifiedList = getModified();
                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain({none: 'none_appended', text: 'text_appended', hidden: 'hidden_appended', rowKey: 6});
                    expect(modifiedList.createList).toContain({none: 'none_prepended', text: 'text_prepended', hidden: 'hidden_prepended', rowKey: 7});

                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(2);
                    expect(modifiedList.deleteList).toContain({none: 'none3', text: 'text3', hidden: 'hidden3', rowKey: 2});
                    expect(modifiedList.deleteList).toContain({none: 'none4', text: 'text4', hidden: 'hidden4', rowKey: 3});

                    expect(modifiedList.updateList).toBeDefined();
                    expect(modifiedList.updateList.length).toBe(1);
                    expect(modifiedList.updateList).toContain({none: 'none5', text: 'dirty', hidden: 'hidden5', rowKey: 4});
                });
            });

            describe('isOnlyRowKeyList 옵션 true 일 때.', function() {
                function getModified() {
                    return dataModelInstance.getModifiedRowList({
                        isOnlyRowKeyList: true
                    });
                }

                it('변경한 행의 rowKey 만 추려서 반환한다.', function() {
                    var modifiedList;
                    messUp();
                    modifiedList = getModified();

                    expect(modifiedList.createList).toBeDefined();
                    expect(modifiedList.createList.length).toBe(2);
                    expect(modifiedList.createList).toContain(6);
                    expect(modifiedList.createList).toContain(7);

                    expect(modifiedList.updateList).toBeDefined();
                    expect(modifiedList.updateList.length).toBe(2);
                    expect(modifiedList.updateList).toContain(0);
                    expect(modifiedList.updateList).toContain(1);

                    expect(modifiedList.deleteList).toBeDefined();
                    expect(modifiedList.deleteList.length).toBe(2);
                    expect(modifiedList.deleteList).toContain(2);
                    expect(modifiedList.deleteList).toContain(3);
                });
            });

            describe('isRaw 옵션 true 일 때.', function() {
                function getModified() {
                    return dataModelInstance.getModifiedRowList({
                        isRaw: true
                    });
                }

                it('row 의 private property 를 제거하지 않고 반환한다.', function() {
                    var modifiedList;
                    messUp();
                    modifiedList = getModified();
                    expect(modifiedList.createList[0]._button).toBeDefined();
                    expect(modifiedList.createList[0]._extraData).toBeDefined();
                    expect(modifiedList.createList[0].rowKey).toBeDefined();

                    expect(modifiedList.updateList[0]._button).toBeDefined();
                    expect(modifiedList.updateList[0]._extraData).toBeDefined();
                    expect(modifiedList.updateList[0].rowKey).toBeDefined();

                    expect(modifiedList.deleteList[0]._button).toBeDefined();
                    expect(modifiedList.deleteList[0]._extraData).toBeDefined();
                    expect(modifiedList.deleteList[0].rowKey).toBeDefined();
                });
            });
        });
    });
});
