import React from 'react'
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './index.scss';


export const ButtonSubmission= ({ isEdit, onSubmit }) => {
  return (
  <>
    <div className='btn__submit'>
        <Button
        onClick={() => {
            onSubmit && typeof onSubmit === 'function' && onSubmit();
        }}
        htmlType="submit"
        >
            {isEdit ? 'update' : 'Add new'}
        </Button>
    </div>
  </>
  )
}
ButtonSubmission.propTypes = {
    isEdit: PropTypes.any,
    onSubmit: PropTypes.func,
};
