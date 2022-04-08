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
        >
            {isEdit ? 'update' : 'submit'}
        </Button>
    </div>
  </>
  )
}
ButtonSubmission.propTypes = {
    isEdit: PropTypes.string,
    onSubmit: PropTypes.func,
};
