import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { initializeForm as initializeFormAction } from '../actions/formActions';

export default DecoratedComponent => {
    class DefaultValue extends Component {
        static propTypes = {
            defaultValue: PropTypes.any,
            initializeForm: PropTypes.func.isRequired,
            input: PropTypes.object,
            source: PropTypes.string,
            validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
        };

        componentDidMount() {
            const { defaultValue, input, initializeForm, source } = this.props;
            if (typeof defaultValue === 'undefined' || input) {
                return;
            }
            initializeForm({
                [source]:
                    typeof defaultValue === 'function'
                        ? defaultValue()
                        : defaultValue,
            });
        }

        componentWillReceiveProps(nextProps) {
            const { defaultValue, input, initializeForm, source } = nextProps;
            if (typeof defaultValue === 'undefined' || input) {
                return;
            }

            if (defaultValue !== this.props.defaultValue) {
                initializeForm({
                    [source]:
                        typeof defaultValue === 'function'
                            ? defaultValue()
                            : defaultValue,
                });
            }
        }

        render() {
            const { initializeForm, ...props } = this.props;
            return <DecoratedComponent {...props} />;
        }
    }

    return connect(
        undefined,
        { initializeForm: initializeFormAction }
    )(DefaultValue);
};
