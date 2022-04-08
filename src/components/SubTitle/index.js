import React from 'react';
import { PropTypes } from 'prop-types';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss'
export const SubTitle = ({ title, onClickClose, icon, onClickDelete }) => {
    return (
        <div className="page--sub-title">
            <span className="border--left"> {title}</span>
            <CloseOutlined className="border--right" onClick={onClickClose} />
            {icon && <DeleteOutlined className="border--right delete" onClick={onClickDelete} />}
        </div>
    );
};

SubTitle.propTypes = {
    title: PropTypes.string.isRequired,
    onClickClose: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func,
    icon: PropTypes.string,
};