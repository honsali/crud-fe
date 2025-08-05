import { Col, Form, InputNumber, Row, Slider, SliderSingleProps } from 'antd';
import _ from 'lodash';
import { useCallback, useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampSliderNumerique = (props) => {
    const validateur = useContext(FormulaireValidateur);
    const { min, max, form, attributes } = props;

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', type: 'number' };
        }
        return { required: false };
    };

    const valueChanged = (a) => {
        if (props.attributes.onChange) {
            props.attributes.onChange(a);
        }
    };

    const setValue = (value) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = value;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = value;
            form.setFieldsValue(d);
        }

        if (attributes.onChange) {
            attributes.onChange(value);
        }
    };

    const getMarks = useCallback(() => {
        if (min && max) {
            setValue(min);
            const marks: SliderSingleProps['marks'] = {
                [min]: {
                    style: {
                        color: 'green',
                    },
                    label: <strong>{min}</strong>,
                },
                [max]: {
                    style: {
                        color: 'red',
                    },
                    label: <strong>{max}</strong>,
                },
            };
            return marks;
        }
        return {};
    }, [min, max]);
    return (
        <Row>
            <Col span="6">
                <Form.Item {...props.attributes} rules={[getRules]}>
                    <InputNumber style={{ ...props.attributes.style, width: '100%' }} disabled={true} placeholder={props.attributes.placeholder} onBlur={valueChanged} controls={false} decimalSeparator="," precision={2} />
                </Form.Item>
            </Col>
            <Col span="16" offset="2" style={{ paddingTop: '14px' }}>
                <Slider
                    min={min}
                    max={max}
                    marks={getMarks()}
                    onChange={setValue}
                    step={0.5}
                    styles={{
                        track: {
                            background: 'transparent',
                        },
                        tracks: { background: 'linear-gradient(to right, green 0, orange 60%, orange 100%)' },
                    }}
                />
            </Col>
        </Row>
    );
};

export default ChampSliderNumerique;
