import React from 'react'
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';


function ButtonSubmission({ isEdit, onSubmit }) {
  return (
  <>
    <div className='btn__submit'>
        <Button
        onClick={() => {
            onSubmit && typeof onSubmit === 'function' && onSubmit();
        }}
        htmlType="submit"
        type='primary'
        >
            {isEdit ? '_.update' : '_.submit'}
        </Button>
    </div>
  </>
  )
}
ButtonSubmission.propTypes = {
    isEdit: PropTypes.string,
    onSubmit: PropTypes.func,
};
export default ButtonSubmission;